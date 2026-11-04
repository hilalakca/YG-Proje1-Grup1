import {
  STATUSES, STATUS_LABELS, validateCourse, getStatus, setStatus,
  computeProgress, computeWeekProgress, filterTasks, isOverdue,
} from './logic.js';
import { KEYS, load, save, clearAll, isPersistent } from './storage.js';

const DEFAULT_PREFS = { theme: 'system', filters: { status: 'all', weekId: 'all', query: '' }, lastViewedWeekId: null };

const $ = (id) => document.getElementById(id);
const el = {
  title: $('course-title'), term: $('course-term'), search: $('search'), theme: $('theme-toggle'),
  notice: $('notice'), summary: $('progress-summary'), weeks: $('weeks'), detail: $('week-detail'),
  status: $('filter-status'), week: $('filter-week'), clear: $('filter-clear'),
  count: $('result-count'), list: $('task-list'), reset: $('reset'),
};

const state = { course: { weeks: [], tasks: [] }, progress: {}, prefs: structuredClone(DEFAULT_PREFS) };

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
  const { done, total, percent } = computeProgress(state.course.tasks, state.progress);
  const r = 40;
  const c = 2 * Math.PI * r;
  el.summary.innerHTML = `
    <div class="overview__inner" style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap">
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

function renderWeeks() {
  const { weeks, tasks } = state.course;
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
      <span class="muted">${p.done} / ${p.total} görev tamamlandı</span>
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
  const visible = filterTasks(state.course.tasks, state.progress, f);
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
    return `<li class="task" data-status="${status}">
      <h3 class="task__title">${esc(t.title)}</h3>
      ${t.description ? `<p class="muted">${esc(t.description)}</p>` : ''}
      <div class="task__meta"><span>${weekNo[t.weekId]}. hafta</span>${due}${t.tags.map((g) => `<span class="tag">${esc(g)}</span>`).join('')}</div>
      <div class="status" role="group" aria-label="${esc(t.title)} durumu">${buttons}</div>
    </li>`;
  }).join('');

  if (focusTarget) {
    el.list.querySelector(`button[data-task="${CSS.escape(focusTarget.task)}"][data-status="${focusTarget.status}"]`)?.focus();
  }
}

function renderWeekOptions() {
  el.week.innerHTML = '<option value="all">Tüm haftalar</option>' +
    state.course.weeks.map((w) => `<option value="${esc(w.id)}">${w.weekNo}. hafta: ${esc(w.title)}</option>`).join('');
}

function renderAll() {
  renderSummary();
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
  renderWeeks();
  renderTasks({ task, status });
}

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

function bindEvents() {
  el.list.addEventListener('click', onStatusClick);
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
  el.reset.addEventListener('click', () => {
    if (!window.confirm('Tüm ilerlemen silinecek. Devam edilsin mi?')) return;
    state.progress = {};
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

  // İçerik güncellenip kayıtlı hafta silindiyse filtre boş liste göstermesin.
  if (!state.course.weeks.some((w) => w.id === state.prefs.filters.weekId)) {
    state.prefs.filters.weekId = 'all';
  }

  renderWeekOptions();
  renderAll();
}

init();
