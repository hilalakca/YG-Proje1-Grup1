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
  const todayIso = today.toISOString().slice(0, 10);
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
