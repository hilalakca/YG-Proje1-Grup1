import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function fakeStorage(store = new Map()) {
  return {
    store,
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
}

// storage.js modül yüklenirken window.localStorage'ı yoklar; her senaryoda yeni kopya yüklenir.
let n = 0;
async function loadStorage(windowStub) {
  globalThis.window = windowStub;
  return import(`../js/storage.js?case=${n++}`);
}

describe('storage: kalıcılık (#16, #54, #55, #56)', () => {
  it('kayıt yazılır ve okunur (yenileme benzetimi)', async () => {
    const ls = fakeStorage();
    const s1 = await loadStorage({ localStorage: ls });
    assert.equal(s1.isPersistent(), true);
    assert.equal(s1.save('progress', { a: { status: 'done' } }), true);
    const s2 = await loadStorage({ localStorage: ls }); // sayfa yenilendi
    assert.deepEqual(s2.load('progress', {}), { a: { status: 'done' } });
  });

  it('localStorage kullanılamazken bellekte çalışır ve kalıcı değil bildirir (#54)', async () => {
    const blocked = {
      getItem() { throw new Error('SecurityError'); },
      setItem() { throw new Error('SecurityError'); },
      removeItem() { throw new Error('SecurityError'); },
    };
    const s = await loadStorage({ localStorage: blocked });
    assert.equal(s.isPersistent(), false);
    assert.equal(s.save('progress', { x: 1 }), false);
    assert.deepEqual(s.load('progress', null), { x: 1 });
  });

  it('window.localStorage hiç yoksa da çökmez (#54)', async () => {
    const s = await loadStorage({});
    assert.equal(s.isPersistent(), false);
    assert.equal(s.load('progress', 'varsayılan'), 'varsayılan');
  });

  it('bozuk JSON varsayılana döner, çökmez (#55)', async () => {
    const ls = fakeStorage(new Map([['ldp:v1:progress', '{bozuk']]));
    const s = await loadStorage({ localStorage: ls });
    assert.deepEqual(s.load('progress', {}), {});
  });

  it('clearAll yalnızca ldp:v1:* anahtarlarını siler, başkalarına dokunmaz (#56)', async () => {
    const ls = fakeStorage(new Map([
      ['ldp:v1:progress', '{}'],
      ['ldp:v1:prefs', '{}'],
      ['baska-uygulama', 'kalmali'],
    ]));
    const s = await loadStorage({ localStorage: ls });
    s.clearAll();
    assert.equal(ls.store.has('ldp:v1:progress'), false);
    assert.equal(ls.store.has('ldp:v1:prefs'), false);
    assert.equal(ls.store.get('baska-uygulama'), 'kalmali');
  });
});
