import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  STATUSES,
  normalizeText,
  validateCourse,
  getStatus,
  setStatus,
  computeProgress,
  computeWeekProgress,
  isOverdue,
  filterTasks,
} from '../js/logic.js';

const week = (id, weekNo, extra = {}) => ({ id, weekNo, title: `Hafta ${weekNo}`, ...extra });
const task = (id, weekId, extra = {}) => ({
  id, weekId, title: `Görev ${id}`, description: '', dueDate: null, tags: [], ...extra,
});

describe('normalizeText', () => {
  it('Türkçe büyük harfleri doğru küçültür', () => {
    assert.equal(normalizeText('IŞIK'), 'ışık');
    assert.equal(normalizeText('İSTANBUL'), 'istanbul');
  });
  it('null ve undefined için boş metin döner', () => {
    assert.equal(normalizeText(null), '');
    assert.equal(normalizeText(undefined), '');
  });
  it('baştaki ve sondaki boşlukları siler', () => {
    assert.equal(normalizeText('  Merhaba '), 'merhaba');
  });
});

describe('validateCourse', () => {
  it('geçersiz girdide boş ders döndürür', () => {
    for (const raw of [undefined, null, {}, 'metin']) {
      const { course, warnings } = validateCourse(raw);
      assert.deepEqual(course.weeks, []);
      assert.deepEqual(course.tasks, []);
      assert.deepEqual(warnings, []);
    }
  });

  it('eksik alanlara varsayılan değer atar', () => {
    const { course, warnings } = validateCourse({
      weeks: [{ id: 'w1', weekNo: 1, title: 'Giriş' }],
      tasks: [{ id: 't1', weekId: 'w1', title: 'Oku' }],
    });
    assert.equal(warnings.length, 0);
    assert.equal(course.weeks[0].description, '');
    assert.deepEqual(course.weeks[0].objectives, []);
    assert.deepEqual(course.weeks[0].resources, []);
    assert.equal(course.tasks[0].dueDate, null);
    assert.deepEqual(course.tasks[0].tags, []);
  });

  it('haftaları weekNo sırasına dizer', () => {
    const { course } = validateCourse({ weeks: [week('w3', 3), week('w1', 1), week('w2', 2)] });
    assert.deepEqual(course.weeks.map((w) => w.weekNo), [1, 2, 3]);
  });

  it('başlıksız veya weekNo geçersiz haftayı atlar', () => {
    const { course, warnings } = validateCourse({
      weeks: [
        { id: 'a', weekNo: 1 },
        week('b', 0),
        week('c', 1.5),
        week('ok', 2),
      ],
    });
    assert.deepEqual(course.weeks.map((w) => w.id), ['ok']);
    assert.equal(warnings.length, 3);
  });

  it('yinelenen hafta id ve weekNo değerlerini atlar', () => {
    const { course, warnings } = validateCourse({
      weeks: [week('w1', 1), week('w1', 2), week('w2', 1)],
    });
    assert.equal(course.weeks.length, 1);
    assert.equal(warnings.length, 2);
  });

  it('başlığı veya url\'si olmayan kaynağı eler', () => {
    const { course } = validateCourse({
      weeks: [week('w1', 1, {
        resources: [{ title: 'A', url: 'http://a' }, { title: 'B' }, { url: 'http://c' }],
      })],
    });
    assert.equal(course.weeks[0].resources.length, 1);
  });

  it('bilinmeyen weekId olan görevi atlar', () => {
    const { course, warnings } = validateCourse({
      weeks: [week('w1', 1)],
      tasks: [task('t1', 'w1'), task('t2', 'yok')],
    });
    assert.deepEqual(course.tasks.map((t) => t.id), ['t1']);
    assert.equal(warnings.length, 1);
  });

  it('yinelenen ve başlıksız görevi atlar', () => {
    const { course, warnings } = validateCourse({
      weeks: [week('w1', 1)],
      tasks: [task('t1', 'w1'), task('t1', 'w1'), { id: 't2', weekId: 'w1' }],
    });
    assert.equal(course.tasks.length, 1);
    assert.equal(warnings.length, 2);
  });
});

describe('getStatus', () => {
  it('kayıt yoksa todo döner', () => {
    assert.equal(getStatus({}, 't1'), 'todo');
    assert.equal(getStatus(undefined, 't1'), 'todo');
  });
  it('geçersiz durumda todo döner', () => {
    assert.equal(getStatus({ t1: { status: 'bozuk' } }, 't1'), 'todo');
  });
  it('geçerli durumu döndürür', () => {
    for (const s of STATUSES) {
      assert.equal(getStatus({ t1: { status: s } }, 't1'), s);
    }
  });
});

describe('setStatus', () => {
  const now = new Date('2026-11-05T10:00:00Z');

  it('done için completedAt doldurur', () => {
    const result = setStatus({}, 't1', 'done', now);
    assert.equal(result.t1.status, 'done');
    assert.equal(result.t1.updatedAt, '2026-11-05T10:00:00.000Z');
    assert.equal(result.t1.completedAt, '2026-11-05T10:00:00.000Z');
  });
  it('done dışındaki durumda completedAt null olur', () => {
    const result = setStatus({}, 't1', 'in_progress', now);
    assert.equal(result.t1.completedAt, null);
  });
  it('girdi nesnesini değiştirmez', () => {
    const progress = { t1: { status: 'todo' } };
    const result = setStatus(progress, 't1', 'done', now);
    assert.notEqual(result, progress);
    assert.equal(progress.t1.status, 'todo');
  });
  it('geçersiz durumda ilerlemeyi aynen döndürür', () => {
    const progress = { t1: { status: 'todo' } };
    assert.equal(setStatus(progress, 't1', 'bozuk', now), progress);
  });
  it('ilerleme undefined olsa da çalışır', () => {
    assert.equal(setStatus(undefined, 't1', 'done', now).t1.status, 'done');
  });
});

describe('computeProgress', () => {
  const tasks = [task('t1', 'w1'), task('t2', 'w1'), task('t3', 'w1')];

  it('görev yoksa yüzde 0 döner', () => {
    assert.deepEqual(computeProgress([], {}), { done: 0, total: 0, percent: 0 });
  });
  it('hiçbiri tamamlanmadıysa yüzde 0 olur', () => {
    assert.deepEqual(computeProgress(tasks, {}), { done: 0, total: 3, percent: 0 });
  });
  it('yüzdeyi yuvarlar', () => {
    assert.equal(computeProgress(tasks, { t1: { status: 'done' } }).percent, 33);
    const two = { t1: { status: 'done' }, t2: { status: 'done' } };
    assert.equal(computeProgress(tasks, two).percent, 67);
  });
  it('hepsi tamamlandıysa yüzde 100 olur', () => {
    const all = { t1: { status: 'done' }, t2: { status: 'done' }, t3: { status: 'done' } };
    assert.deepEqual(computeProgress(tasks, all), { done: 3, total: 3, percent: 100 });
  });
  it('devam eden görevi tamamlanmış saymaz', () => {
    assert.equal(computeProgress(tasks, { t1: { status: 'in_progress' } }).done, 0);
  });
});

describe('computeWeekProgress', () => {
  it('her hafta için ayrı ilerleme hesaplar', () => {
    const weeks = [week('w1', 1), week('w2', 2), week('w3', 3)];
    const tasks = [task('t1', 'w1'), task('t2', 'w1'), task('t3', 'w2')];
    const progress = { t1: { status: 'done' }, t3: { status: 'done' } };
    const result = computeWeekProgress(weeks, tasks, progress);
    assert.deepEqual(result.w1, { done: 1, total: 2, percent: 50 });
    assert.deepEqual(result.w2, { done: 1, total: 1, percent: 100 });
    assert.deepEqual(result.w3, { done: 0, total: 0, percent: 0 });
  });
});

describe('isOverdue', () => {
  const today = new Date('2026-11-05T12:00:00Z');

  it('geçmiş tarihli tamamlanmamış görev gecikmiştir', () => {
    assert.equal(isOverdue(task('t1', 'w1', { dueDate: '2026-11-04' }), {}, today), true);
  });
  it('tamamlanmış görev gecikmiş sayılmaz', () => {
    const progress = { t1: { status: 'done' } };
    assert.equal(isOverdue(task('t1', 'w1', { dueDate: '2026-11-04' }), progress, today), false);
  });
  it('son tarihi bugün olan görev gecikmiş değildir', () => {
    assert.equal(isOverdue(task('t1', 'w1', { dueDate: '2026-11-05' }), {}, today), false);
  });
  it('gelecek tarihli görev gecikmiş değildir', () => {
    assert.equal(isOverdue(task('t1', 'w1', { dueDate: '2026-11-06' }), {}, today), false);
  });
  it('son tarihi olmayan görev gecikmiş değildir', () => {
    assert.equal(isOverdue(task('t1', 'w1'), {}, today), false);
  });
  it('gün yerel saate göre değişir (#66)', () => {
    const yerelGeceYarisiSonrasi = new Date(2026, 10, 6, 1, 0); // yerel saatle 6 Kasım 01:00
    assert.equal(isOverdue(task('t1', 'w1', { dueDate: '2026-11-05' }), {}, yerelGeceYarisiSonrasi), true);
  });
});

describe('filterTasks', () => {
  const tasks = [
    task('t1', 'w1', { title: 'Işık deneyi', tags: ['fizik'] }),
    task('t2', 'w1', { title: 'İstanbul gezisi' }),
    task('t3', 'w2', { title: 'Rapor', tags: ['teslim'] }),
  ];
  const progress = { t1: { status: 'done' }, t2: { status: 'in_progress' } };
  const ids = (list) => list.map((t) => t.id);

  it('filtre verilmezse hepsini döndürür', () => {
    assert.deepEqual(ids(filterTasks(tasks, progress)), ['t1', 't2', 't3']);
  });
  it('duruma göre filtreler', () => {
    assert.deepEqual(ids(filterTasks(tasks, progress, { status: 'done' })), ['t1']);
    assert.deepEqual(ids(filterTasks(tasks, progress, { status: 'todo' })), ['t3']);
  });
  it('haftaya göre filtreler', () => {
    assert.deepEqual(ids(filterTasks(tasks, progress, { weekId: 'w2' })), ['t3']);
  });
  it('Türkçe karakterlerle arar', () => {
    assert.deepEqual(ids(filterTasks(tasks, progress, { query: 'IŞIK' })), ['t1']);
    assert.deepEqual(ids(filterTasks(tasks, progress, { query: 'İSTANBUL' })), ['t2']);
    assert.deepEqual(ids(filterTasks(tasks, progress, { query: 'istanbul' })), ['t2']);
  });
  it('etiketlerde de arar', () => {
    assert.deepEqual(ids(filterTasks(tasks, progress, { query: 'teslim' })), ['t3']);
  });
  it('filtreleri VE mantığıyla birleştirir', () => {
    assert.deepEqual(ids(filterTasks(tasks, progress, { status: 'done', weekId: 'w2' })), []);
  });
  it('eşleşme yoksa boş liste döner', () => {
    assert.deepEqual(filterTasks(tasks, progress, { query: 'yokyok' }), []);
  });
});