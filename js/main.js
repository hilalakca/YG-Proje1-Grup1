import {
  STATUSES, STATUS_LABELS, validateCourse, getStatus, setStatus,
  computeProgress, computeWeekProgress, filterTasks, isOverdue,
  validateTaskInput, createUserTask, sanitizeUserTasks, upcomingTasks,
} from './logic.js';
import { KEYS, load, save, clearAll, isPersistent } from './storage.js';

const DEFAULT_PREFS = { theme: 'system', filters: { status: 'all', weekId: 'all', query: '' }, lastViewedWeekId: null };

const $ = (id) => document.getElementById(id);
const el = {
  title: $('course-title'), term: $('course-term'), search: $('search'), theme: $('theme-toggle'),
  notice: $('notice'), summary: $('progress-summary'), weeks: $('weeks'), detail: $('week-detail'),
  status: $('filter-status'), week: $('filter-week'), clear: $('filter-clear'),
  count: $('result-count'), list: $('task-list'), reset: $('reset'), announce: $('announce'), upcoming: $('upcoming'),
  add: $('task-add'), form: $('task-form'), formHeading: $('task-form-heading'), cancel: $('task-form-cancel'),
};

// Form alanları: ad → [input id, hata mesajı id]
const FIELDS = {
  title: ['tf-title', 'tf-title-error'], weekId: ['tf-week', 'tf-week-error'], dueDate: ['tf-due', 'tf-due-error'],
  description: ['tf-desc', 'tf-desc-error'], tags: ['tf-tags', 'tf-tags-error'],
};
const field = Object.fromEntries(Object.entries(FIELDS).map(([k, [i, e]]) => [k, { input: $(i), error: $(e) }]));

const state = {
  course: { weeks: [], tasks: [] }, userTasks: [], progress: {}, prefs: structuredClone(DEFAULT_PREFS),
  editingId: null, // düzenlenen kendi görevinin id'si; null ise form "yeni görev" modunda
};

/** Ders içeriğindeki görevler + kullanıcının eklediği görevler. */
function allTasks() {
  return [...state.course.tasks, ...state.userTasks];
}

function announce(message) {
  el.announce.textContent = '';
  // Aynı mesaj üst üste gelirse de okunsun diye bir sonraki karede yazılır.
  setTimeout(() => { el.announce.textContent = message; }, 50);
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

function showNotice(message) {
  el.notice.textContent = message;
  el.notice.hidden = !message;
}

/* ---------- Tercihler ve tema ---------- */

function mergePrefs(stored) {
  const s = stored && typeof stored === 'object' ? stored : {};
  return { ...DEFAULT_PREFS, ...s, filters: { ...DEFAULT_PREFS.filters, ...(s.filters ?? {}) } };
}

function effectiveTheme() {
  if (state.prefs.theme === 'light' || state.prefs.theme === 'dark') return state.prefs.theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme() {
  const root = document.documentElement;
  if (state.prefs.theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', state.prefs.theme);
  const dark = effectiveTheme() === 'dark';
  el.theme.setAttribute('aria-pressed', String(dark));
  el.theme.textContent = dark ? 'Açık tema' : 'Koyu tema';
}

function persistPrefs() {
  if (!save(KEYS.prefs, state.prefs)) warnNotPersistent();
}

function warnNotPersistent() {
  showNotice('Tarayıcı verileri kalıcı olarak saklayamıyor. İşaretlediklerin sayfayı kapatınca silinir.');
}

/* ---------- Çizim ---------- */

function renderSummary() {
  const { done, total, percent } = computeProgress(allTasks(), state.progress);
  const r = 40;
  const c = 2 * Math.PI * r;
  el.summary.innerHTML = `
    <div class="overview__inner">
      <svg class="ring" viewBox="0 0 100 100" role="progressbar" aria-label="Genel ilerleme"
           aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}" aria-valuetext="%${percent}">
        <circle class="ring__track" cx="50" cy="50" r="${r}" fill="none" stroke-width="10"></circle>
        <circle class="ring__value" cx="50" cy="50" r="${r}" fill="none" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - percent / 100)}" transform="rotate(-90 50 50)"></circle>
        <text x="50" y="56" text-anchor="middle">%${percent}</text>
      </svg>
      <div class="overview__text">
        <strong>${done} / ${total} görev tamamlandı</strong>
        <p class="muted">${total === 0 ? 'Henüz görev eklenmemiş.' : 'Bir görevi işaretlediğinde ilerleme anında güncellenir.'}</p>
      </div>
    </div>`;
}

function whenLabel(daysLeft) {
  if (daysLeft === 0) return 'Bugün';
  if (daysLeft === 1) return 'Yarın';
  return `${daysLeft} gün kaldı`;
}

function renderUpcoming() {
  const { overdue, upcoming } = upcomingTasks(allTasks(), state.progress);
  const weekNo = Object.fromEntries(state.course.weeks.map((w) => [w.id, w.weekNo]));
  const items = upcoming.map(({ task, daysLeft }) => `<li>
      <span>${esc(task.title)} <span class="muted">· ${weekNo[task.weekId]}. hafta</span></span>
      <span class="when${daysLeft === 0 ? ' when--today' : ''}">${whenLabel(daysLeft)}</span>
    </li>`).join('');
  const late = overdue.length
    ? `<p class="upcoming__overdue">${overdue.length} görevin süresi geçti. <button type="button" data-show-overdue>Yapılacak görevleri göster</button></p>` : '';
  el.upcoming.innerHTML = `
    <h3 id="upcoming-heading">Önümüzdeki 7 gün</h3>
    ${items ? `<ul>${items}</ul>` : '<p class="muted">Önümüzdeki 7 günde son tarihi olan açık görev yok.</p>'}
    ${late}`;
}

function renderWeeks() {
  const { weeks } = state.course;
  const tasks = allTasks();
  if (weeks.length === 0) {
    el.weeks.innerHTML = '<p class="empty">Henüz içerik eklenmemiş. data/course.json dosyasına hafta ekleyebilirsin.</p>';
    return;
  }
  const progress = computeWeekProgress(weeks, tasks, state.progress);
  const selected = state.prefs.filters.weekId;
  el.weeks.innerHTML = weeks.map((w) => {
    const p = progress[w.id];
    return `<button class="week-card" type="button" data-week="${esc(w.id)}" aria-pressed="${selected === w.id}">
      <span class="week-card__no" aria-hidden="true">${w.weekNo}</span>
      <h3>${w.weekNo}. hafta: ${esc(w.title)}</h3>
      <span class="muted">${esc(w.description)}</span>
      <span class="bar" aria-hidden="true"><span style="width:${p.percent}%"></span></span>
      <span class="muted">${p.total === 0 ? 'Bu haftada görev yok' : `%${p.percent} · ${p.done} / ${p.total} görev tamamlandı`}</span>
    </button>`;
  }).join('');
}

function renderDetail() {
  const week = state.course.weeks.find((w) => w.id === state.prefs.filters.weekId);
  if (!week) { el.detail.hidden = true; el.detail.innerHTML = ''; return; }
  const objectives = week.objectives.map((o) => `<li>${esc(o)}</li>`).join('');
  const resources = week.resources
    .map((r) => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)}</a> <span class="muted">(${esc(r.type ?? 'kaynak')})</span></li>`).join('');
  el.detail.hidden = false;
  el.detail.innerHTML = `
    <h3>${week.weekNo}. hafta hedefleri</h3>
    ${objectives ? `<ul>${objectives}</ul>` : '<p class="muted">Bu hafta için hedef girilmemiş.</p>'}
    ${resources ? `<h3 style="margin-top:1rem">Kaynaklar</h3><ul>${resources}</ul>` : ''}`;
}

function renderFilters() {
  const f = state.prefs.filters;
  el.status.value = f.status;
  el.week.value = f.weekId;
  el.search.value = f.query;
}

function renderTasks(focusTarget) {
  const f = state.prefs.filters;
  const visible = filterTasks(allTasks(), state.progress, f);
  const weekNo = Object.fromEntries(state.course.weeks.map((w) => [w.id, w.weekNo]));

  el.count.textContent = `${visible.length} görev gösteriliyor`;

  if (visible.length === 0) {
    const hasFilter = f.status !== 'all' || f.weekId !== 'all' || f.query.trim() !== '';
    el.list.innerHTML = `<li class="empty">${hasFilter ? 'Bu filtreyle eşleşen görev yok. Filtreleri temizleyip tekrar dene.' : 'Henüz görev eklenmemiş.'}</li>`;
    return;
  }

  el.list.innerHTML = visible.map((t) => {
    const status = getStatus(state.progress, t.id);
    const overdue = isOverdue(t, state.progress);
    const buttons = STATUSES.map((s) =>
      `<button type="button" data-task="${esc(t.id)}" data-status="${s}" aria-pressed="${s === status}">${STATUS_LABELS[s]}</button>`).join('');
    const due = t.dueDate
      ? `<span class="${overdue ? 'overdue' : ''}">${overdue ? 'Süresi geçti: ' : 'Son tarih: '}${formatDate(t.dueDate)}</span>` : '';
    const tools = t.custom
      ? `<div class="task__tools">
          <button class="btn btn--quiet" type="button" data-edit="${esc(t.id)}" aria-label="${esc(t.title)} görevini düzenle">Düzenle</button>
          <button class="btn btn--quiet" type="button" data-delete="${esc(t.id)}" aria-label="${esc(t.title)} görevini sil">Sil</button>
        </div>` : '';
    const own = t.custom ? '<span class="tag tag--own">Kendi görevim</span>' : '';
    return `<li class="task" data-status="${status}" data-id="${esc(t.id)}">
      <div class="task__head"><h3 class="task__title">${esc(t.title)}</h3>${tools}</div>
      ${t.description ? `<p class="muted">${esc(t.description)}</p>` : ''}
      <div class="task__meta"><span>${weekNo[t.weekId]}. hafta</span>${due}${own}${t.tags.map((g) => `<span class="tag">${esc(g)}</span>`).join('')}</div>
      <div class="status" role="group" aria-label="${esc(t.title)} durumu">${buttons}</div>
    </li>`;
  }).join('');

  if (focusTarget) {
    el.list.querySelector(`button[data-task="${CSS.escape(focusTarget.task)}"][data-status="${focusTarget.status}"]`)?.focus();
  }
}

function renderWeekOptions() {
  const options = state.course.weeks.map((w) => `<option value="${esc(w.id)}">${w.weekNo}. hafta: ${esc(w.title)}</option>`).join('');
  el.week.innerHTML = '<option value="all">Tüm haftalar</option>' + options;
  field.weekId.input.innerHTML = '<option value="">Hafta seç</option>' + options;
}

/* ---------- Kendi görevini ekleme / düzenleme / silme (#85) ---------- */

function setFieldErrors(errors) {
  for (const [name, { input, error }] of Object.entries(field)) {
    const message = errors[name];
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message ?? '';
    error.hidden = !message;
  }
}

function openForm(task = null) {
  state.editingId = task?.id ?? null;
  el.formHeading.textContent = task ? 'Görevi düzenle' : 'Yeni görev';
  const f = state.prefs.filters;
  field.title.input.value = task?.title ?? '';
  field.weekId.input.value = task?.weekId ?? (f.weekId !== 'all' ? f.weekId : '');
  field.dueDate.input.value = task?.dueDate ?? '';
  field.description.input.value = task?.description ?? '';
  field.tags.input.value = task ? task.tags.join(', ') : '';
  setFieldErrors({});
  el.form.hidden = false;
  el.add.setAttribute('aria-expanded', 'true');
  field.title.input.focus();
}

function closeForm(returnFocusTo = el.add) {
  el.form.hidden = true;
  el.add.setAttribute('aria-expanded', 'false');
  state.editingId = null;
  setFieldErrors({});
  returnFocusTo?.focus();
}

function persistUserTasks() {
  if (!save(KEYS.userTasks, state.userTasks)) warnNotPersistent();
}

function onFormSubmit(event) {
  event.preventDefault();
  const input = Object.fromEntries(Object.entries(field).map(([name, { input: i }]) => [name, i.value]));
  // Tarih alanına geçersiz değer girilince value boş gelir; bunu "boş" değil "geçersiz" say.
  if (!input.dueDate && field.dueDate.input.validity.badInput) input.dueDate = 'geçersiz';
  const { value, errors } = validateTaskInput(input, state.course.weeks);
  setFieldErrors(errors);
  const firstInvalid = Object.keys(FIELDS).find((name) => errors[name]);
  if (firstInvalid) {
    field[firstInvalid].input.focus();
    announce(`Görev kaydedilmedi: ${Object.keys(errors).length} alanda hata var.`);
    return;
  }

  const wasEditing = Boolean(state.editingId);
  let id = state.editingId;
  if (id) {
    state.userTasks = state.userTasks.map((t) => (t.id === id ? { ...t, ...value } : t));
  } else {
    const task = createUserTask(value);
    id = task.id;
    state.userTasks = [...state.userTasks, task];
  }
  persistUserTasks();
  renderAll();

  const visible = filterTasks(allTasks(), state.progress, state.prefs.filters).some((t) => t.id === id);
  closeForm(visible ? el.list.querySelector(`button[data-edit="${CSS.escape(id)}"]`) : el.add);
  announce(`"${value.title}" ${wasEditing ? 'güncellendi' : 'eklendi'}.${visible ? '' : ' Seçili filtreler yüzünden listede görünmüyor.'}`);
}

function onTaskToolClick(event) {
  const edit = event.target.closest('button[data-edit]');
  const del = event.target.closest('button[data-delete]');
  if (edit) {
    const task = state.userTasks.find((t) => t.id === edit.dataset.edit);
    if (task) openForm(task);
    return;
  }
  if (!del) return;
  const task = state.userTasks.find((t) => t.id === del.dataset.delete);
  if (!task || !window.confirm(`"${task.title}" görevi silinsin mi?`)) return;
  state.userTasks = state.userTasks.filter((t) => t.id !== task.id);
  const { [task.id]: _removed, ...rest } = state.progress;
  state.progress = rest;
  persistUserTasks();
  if (!save(KEYS.progress, state.progress)) warnNotPersistent();
  if (state.editingId === task.id) closeForm(null);
  renderAll();
  el.add.focus();
  announce(`"${task.title}" silindi.`);
}

function renderAll() {
  renderSummary();
  renderUpcoming();
  renderWeeks();
  renderDetail();
  renderFilters();
  renderTasks();
}

/* ---------- Olaylar ---------- */

function updateFilters(patch) {
  state.prefs.filters = { ...state.prefs.filters, ...patch };
  if (patch.weekId !== undefined) state.prefs.lastViewedWeekId = patch.weekId === 'all' ? null : patch.weekId;
  persistPrefs();
  renderWeeks();
  renderDetail();
  renderFilters();
  renderTasks();
}

function onStatusClick(event) {
  const btn = event.target.closest('button[data-task]');
  if (!btn) return;
  const { task, status } = btn.dataset;
  state.progress = setStatus(state.progress, task, status);
  if (!save(KEYS.progress, state.progress)) warnNotPersistent();
  renderSummary();
  renderUpcoming();
  renderWeeks();
  renderTasks({ task, status });
}

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function bindEvents() {
  el.list.addEventListener('click', onStatusClick);
  el.list.addEventListener('click', onTaskToolClick);
  el.add.addEventListener('click', () => (el.form.hidden ? openForm() : closeForm()));
  el.cancel.addEventListener('click', () => closeForm());
  el.upcoming.addEventListener('click', (e) => {
    if (!e.target.closest('button[data-show-overdue]')) return;
    updateFilters({ status: 'todo', weekId: 'all', query: '' });
    document.getElementById('gorevler').focus();
  });
  el.form.addEventListener('submit', onFormSubmit);
  el.form.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeForm(); });
  el.weeks.addEventListener('click', (e) => {
    const card = e.target.closest('button[data-week]');
    if (!card) return;
    const same = state.prefs.filters.weekId === card.dataset.week;
    updateFilters({ weekId: same ? 'all' : card.dataset.week });
  });
  el.status.addEventListener('change', () => updateFilters({ status: el.status.value }));
  el.week.addEventListener('change', () => updateFilters({ weekId: el.week.value }));
  el.search.addEventListener('input', debounce(() => updateFilters({ query: el.search.value }), 250));
  el.clear.addEventListener('click', () => updateFilters({ status: 'all', weekId: 'all', query: '' }));
  el.theme.addEventListener('click', () => {
    state.prefs.theme = effectiveTheme() === 'dark' ? 'light' : 'dark';
    persistPrefs();
    applyTheme();
  });
  // Tema "sistem" iken işletim sistemi teması değişirse düğme yazısı da güncellensin.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.prefs.theme === 'system') applyTheme();
  });
  el.reset.addEventListener('click', () => {
    if (!window.confirm('Tüm ilerlemen ve eklediğin görevler silinecek. Devam edilsin mi?')) return;
    state.progress = {};
    state.userTasks = [];
    if (!el.form.hidden) closeForm(null);
    clearAll();
    state.prefs = structuredClone(DEFAULT_PREFS);
    applyTheme();
    renderAll();
  });
}

/* ---------- Başlangıç ---------- */

async function init() {
  state.prefs = mergePrefs(load(KEYS.prefs, null));
  const stored = load(KEYS.progress, {});
  state.progress = stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
  if (!load(KEYS.meta, null)) save(KEYS.meta, { schemaVersion: 1, createdAt: new Date().toISOString() });
  applyTheme();
  bindEvents();
  if (!isPersistent()) warnNotPersistent();

  try {
    const response = await fetch('data/course.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { course, warnings } = validateCourse(await response.json());
    warnings.forEach((w) => console.warn(w));
    state.course = course;
    el.title.textContent = course.title;
    el.term.textContent = course.term;
    document.title = `${course.title} · Ders Deneyimi Panosu`;
    if (warnings.length) showNotice(`${warnings.length} içerik kaydı geçersiz olduğu için atlandı. Ayrıntılar tarayıcı konsolunda.`);
  } catch (error) {
    console.error(error);
    showNotice('Ders içeriği yüklenemedi. Sayfayı bir yerel sunucu üzerinden açtığından emin ol (README’ye bak).');
  }

  state.userTasks = sanitizeUserTasks(load(KEYS.userTasks, []), state.course.weeks, state.course.tasks);

  // İçerik güncellenip kayıtlı hafta silindiyse filtre boş liste göstermesin.
  if (!state.course.weeks.some((w) => w.id === state.prefs.filters.weekId)) {
    state.prefs.filters.weekId = 'all';
  }

  renderWeekOptions();
  renderAll();
}

init();
