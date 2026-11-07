import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateCourse, localIsoDate } from '../js/logic.js';

const raw = JSON.parse(readFileSync(new URL('../data/course.json', import.meta.url), 'utf8'));

describe('data/course.json tutarlılığı (#11, #40, #41)', () => {
  it('validateCourse uyarısı olmadan yüklenir', () => {
    const { warnings } = validateCourse(raw);
    assert.deepEqual(warnings, []);
  });

  it('ham veride id ve weekNo değerleri benzersizdir', () => {
    const weekIds = raw.weeks.map((w) => w.id);
    const weekNos = raw.weeks.map((w) => w.weekNo);
    const taskIds = raw.tasks.map((t) => t.id);
    assert.equal(new Set(weekIds).size, weekIds.length);
    assert.equal(new Set(weekNos).size, weekNos.length);
    assert.equal(new Set(taskIds).size, taskIds.length);
  });

  it('her görevin weekId değeri var olan bir haftayı gösterir', () => {
    const ids = new Set(raw.weeks.map((w) => w.id));
    for (const t of raw.tasks) assert.ok(ids.has(t.weekId), `${t.id} → ${t.weekId}`);
  });

  it('4 hafta vardır; her haftada hedef ve en az 3 görev bulunur', () => {
    assert.equal(raw.weeks.length, 4);
    for (const w of raw.weeks) {
      assert.ok(w.objectives.length >= 1, `${w.id} hedefsiz`);
      const count = raw.tasks.filter((t) => t.weekId === w.id).length;
      assert.ok(count >= 3, `${w.id} yalnızca ${count} görev içeriyor`);
    }
  });

  it('en az bir görevin son tarihi geçmiştir (2026-11-06 referans)', () => {
    const ref = '2026-11-06';
    assert.ok(raw.tasks.some((t) => t.dueDate && t.dueDate < ref));
    assert.match(localIsoDate(new Date(2026, 10, 6)), /^2026-11-06$/);
  });
});
