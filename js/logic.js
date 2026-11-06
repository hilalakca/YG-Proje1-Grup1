// Saf (arayüzden bağımsız) iş mantığı. DOM ve localStorage'a dokunmaz; test edilebilir.

export const STATUSES = ['todo', 'in_progress', 'done'];
export const STATUS_LABELS = {
  todo: 'Yapılacak',
  in_progress: 'Devam ediyor',
  done: 'Tamamlandı',
};

/** Arama için Türkçe uyumlu küçük harfe çevirme (I/ı, İ/i). */
export function normalizeText(value) {
  return String(value ?? '').toLocaleLowerCase('tr-TR').trim();
}

/**
 * Ham course.json verisini doğrular ve temizler.
 * Geçersiz kayıtları atar, nedenini warnings dizisinde döndürür.
 */
export function validateCourse(raw) {
  const warnings = [];
  const weeks = [];
  const tasks = [];
  const weekIds = new Set();
  const weekNos = new Set();
  const taskIds = new Set();

  for (const w of Array.isArray(raw?.weeks) ? raw.weeks : []) {
    if (!w?.id || !w?.title || !Number.isInteger(w?.weekNo) || w.weekNo < 1) {
      warnings.push(`Geçersiz hafta atlandı: ${JSON.stringify(w?.id ?? w)}`);
      continue;
    }
    if (weekIds.has(w.id) || weekNos.has(w.weekNo)) {
      warnings.push(`Yinelenen hafta atlandı: ${w.id}`);
      continue;
    }
    weekIds.add(w.id);
    weekNos.add(w.weekNo);
    weeks.push({
      id: w.id,
      weekNo: w.weekNo,
      title: w.title,
      description: w.description ?? '',
      objectives: Array.isArray(w.objectives) ? w.objectives : [],
      resources: Array.isArray(w.resources) ? w.resources.filter((r) => r?.title && r?.url) : [],
    });
  }
  weeks.sort((a, b) => a.weekNo - b.weekNo);

  for (const t of Array.isArray(raw?.tasks) ? raw.tasks : []) {
    if (!t?.id || !t?.title) {
      warnings.push(`Geçersiz görev atlandı: ${JSON.stringify(t?.id ?? t)}`);
      continue;
    }
    if (taskIds.has(t.id)) {
      warnings.push(`Yinelenen görev atlandı: ${t.id}`);
      continue;
    }
    if (!weekIds.has(t.weekId)) {
      warnings.push(`Görev ${t.id}: bilinmeyen weekId (${t.weekId}), atlandı.`);
      continue;
    }
    taskIds.add(t.id);
    tasks.push({
      id: t.id,
      weekId: t.weekId,
      title: t.title,
      description: t.description ?? '',
      dueDate: t.dueDate ?? null,
      tags: Array.isArray(t.tags) ? t.tags : [],
    });
  }

  return {
    course: { id: raw?.id ?? 'course', title: raw?.title ?? 'Ders', term: raw?.term ?? '', weeks, tasks },
    warnings,
  };
}

/** Bir görevin durumu. Kayıt yoksa veya değer geçersizse 'todo'. */
export function getStatus(progress, taskId) {
  const status = progress?.[taskId]?.status;
  return STATUSES.includes(status) ? status : 'todo';
}

/** Durumu değiştirilmiş YENİ ilerleme nesnesi döndürür (girdiyi değiştirmez). */
export function setStatus(progress, taskId, status, now = new Date()) {
  if (!STATUSES.includes(status)) return progress;
  const stamp = now.toISOString();
  return {
    ...progress,
    [taskId]: {
      status,
      updatedAt: stamp,
      completedAt: status === 'done' ? stamp : null,
    },
  };
}

/** Genel ilerleme: { done, total, percent }. total=0 ise yüzde 0. */
export function computeProgress(tasks, progress) {
  const total = tasks.length;
  const done = tasks.filter((t) => getStatus(progress, t.id) === 'done').length;
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

/** Hafta bazlı ilerleme: { [weekId]: { done, total, percent } }. */
export function computeWeekProgress(weeks, tasks, progress) {
  const result = {};
  for (const w of weeks) {
    result[w.id] = computeProgress(tasks.filter((t) => t.weekId === w.id), progress);
  }
  return result;
}

/** Son tarihi geçmiş ve tamamlanmamış mı? Tarihler ISO (YYYY-MM-DD). */
export function isOverdue(task, progress, today = new Date()) {
  if (!task.dueDate || getStatus(progress, task.id) === 'done') return false;
  // Yerel tarih kullanılır; toISOString() UTC verdiği için Türkiye'de 00:00-03:00 arası bir önceki günü gösterir (#66).
  const pad = (n) => String(n).padStart(2, '0');
  const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  return task.dueDate < todayIso;
}

/** Durum + hafta + arama filtrelerini VE mantığıyla uygular. */
export function filterTasks(tasks, progress, { status = 'all', weekId = 'all', query = '' } = {}) {
  const q = normalizeText(query);
  return tasks.filter((t) => {
    if (status !== 'all' && getStatus(progress, t.id) !== status) return false;
    if (weekId !== 'all' && t.weekId !== weekId) return false;
    if (q) {
      const haystack = normalizeText([t.title, t.description, ...t.tags].join(' '));
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/* ---------- Kendi görevleri (#85) ---------- */

export const TASK_LIMITS = { title: 120, description: 500, tag: 30, tags: 5 };

function isValidIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

/**
 * Formdan gelen görev girdisini doğrular.
 * Dönen değer: { value, errors }. errors boşsa value kaydedilebilir; değilse { alan: mesaj }.
 * tags virgülle ayrılmış metin ya da dizi olabilir.
 */
export function validateTaskInput(input, weeks) {
  const errors = {};
  const title = String(input?.title ?? '').trim();
  const description = String(input?.description ?? '').trim();
  const weekId = String(input?.weekId ?? '');
  const dueDate = String(input?.dueDate ?? '').trim();
  const rawTags = Array.isArray(input?.tags) ? input.tags : String(input?.tags ?? '').split(',');
  const tags = [...new Set(rawTags.map((t) => String(t).trim()).filter(Boolean))];

  if (!title) errors.title = 'Başlık boş olamaz.';
  else if (title.length > TASK_LIMITS.title) errors.title = `Başlık en çok ${TASK_LIMITS.title} karakter olabilir.`;

  if (!weeks.some((w) => w.id === weekId)) errors.weekId = 'Bir hafta seç.';

  if (dueDate && !isValidIsoDate(dueDate)) errors.dueDate = 'Geçerli bir tarih gir (gg.aa.yyyy).';

  if (description.length > TASK_LIMITS.description) {
    errors.description = `Açıklama en çok ${TASK_LIMITS.description} karakter olabilir.`;
  }

  if (tags.length > TASK_LIMITS.tags) errors.tags = `En çok ${TASK_LIMITS.tags} etiket ekleyebilirsin.`;
  else if (tags.some((t) => t.length > TASK_LIMITS.tag)) errors.tags = `Bir etiket en çok ${TASK_LIMITS.tag} karakter olabilir.`;

  return { value: { title, description, weekId, dueDate: dueDate || null, tags }, errors };
}

/** Doğrulanmış girdiden yeni kendi görevi üretir. */
export function createUserTask(value, now = new Date()) {
  const id = `u-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  return { ...value, id, custom: true, createdAt: now.toISOString() };
}

/**
 * localStorage'dan okunan kendi görevlerini temizler: bozuk, yinelenen ya da
 * artık var olmayan haftaya ait kayıtlar atılır; ders görevlerinin id'leriyle çakışanlar da atılır.
 */
export function sanitizeUserTasks(stored, weeks, courseTasks = []) {
  if (!Array.isArray(stored)) return [];
  const seen = new Set(courseTasks.map((t) => t.id));
  const result = [];
  for (const t of stored) {
    if (!t || typeof t.id !== 'string' || seen.has(t.id)) continue;
    const { value, errors } = validateTaskInput(t, weeks);
    if (Object.keys(errors).length) continue;
    seen.add(t.id);
    result.push({ ...value, id: t.id, custom: true, createdAt: t.createdAt ?? null });
  }
  return result;
}
