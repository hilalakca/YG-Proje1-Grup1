// localStorage sarmalayıcısı. Depolama kullanılamazsa (gizli mod, kota, izin)
// uygulama bellekte çalışmaya devam eder; çağıran taraf isPersistent() ile uyarı gösterebilir.

const PREFIX = 'ldp:v1:';
export const KEYS = { progress: 'progress', prefs: 'prefs', meta: 'meta' };

const memory = new Map();
let persistent = detect();

function detect() {
  try {
    const probe = `${PREFIX}__probe`;
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

/** Veriler gerçekten kalıcı olarak saklanabiliyor mu? */
export function isPersistent() {
  return persistent;
}

/** Anahtarı okur. Yoksa ya da JSON bozuksa fallback döner. */
export function load(key, fallback) {
  const fullKey = PREFIX + key;
  if (!persistent) return memory.has(fullKey) ? memory.get(fullKey) : fallback;
  try {
    const raw = window.localStorage.getItem(fullKey);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/** Anahtarı yazar. Başarılıysa true; kalıcı yazılamadıysa bellekte tutar ve false döner. */
export function save(key, value) {
  const fullKey = PREFIX + key;
  memory.set(fullKey, value);
  if (!persistent) return false;
  try {
    window.localStorage.setItem(fullKey, JSON.stringify(value));
    return true;
  } catch {
    persistent = false;
    return false;
  }
}

/** Yalnızca bu uygulamanın anahtarlarını siler (ilerlemeyi sıfırlama için). */
export function clearAll() {
  memory.clear();
  if (!persistent) return;
  try {
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(PREFIX + k));
  } catch {
    /* yok say */
  }
}
