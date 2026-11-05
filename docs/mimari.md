# Bileşen ve modül taslağı

Takip listesindeki **P1-05** maddesi için bileşen ve veri yapısı taslağı
([#4](https://github.com/hilalakca/YG-Proje1-Grup1/issues/4), alt görev
[#29](https://github.com/hilalakca/YG-Proje1-Grup1/issues/29)). Veri alanlarının ayrıntısı
[`data-model.md`](data-model.md)'dedir.

## Modüller

Uygulama çerçevesiz (framework kullanmadan) yazılır ve üç JavaScript modülüne ayrılır. Ayrımın amacı, iş
mantığını arayüzden bağımsız tutup tek başına test edilebilir kılmaktır.

| Modül           | Sorumluluğu                                                                  | Neye dokunur           |
| --------------- | ---------------------------------------------------------------------------- | ---------------------- |
| `js/main.js`    | Sayfayı çizmek, kullanıcı olaylarını dinlemek, durumu (`state`) güncellemek  | DOM, `logic`, `storage` |
| `js/logic.js`   | Doğrulama, ilerleme hesabı, filtre ve arama; **saf fonksiyonlar**            | Hiçbir şeye (yalnız girdi/çıktı) |
| `js/storage.js` | `localStorage` okuma/yazma; depolama yoksa bellekte çalışma                  | `localStorage`         |

```text
            data/course.json
                   │ fetch
                   ▼
┌──────────────────────────────────┐      ┌──────────────────┐
│ main.js                          │─────▶│ logic.js         │
│  state = { course, progress,     │◀─────│ validateCourse   │
│            prefs }               │      │ computeProgress  │
│  render*()  ←→  olaylar          │      │ filterTasks ...  │
└──────────────────────────────────┘      └──────────────────┘
                   │ load / save
                   ▼
            ┌──────────────┐
            │ storage.js   │──▶ localStorage (ldp:v1:*)
            └──────────────┘
```

## Ekran bölümleri ve kod karşılıkları

| Ekran bölümü           | HTML (`index.html`)                          | Çizen fonksiyon (`main.js`)   | İş mantığı (`logic.js`)            | Takip listesi |
| ---------------------- | -------------------------------------------- | ----------------------------- | ---------------------------------- | ------------- |
| Üst çubuk: arama, tema | `#search`, `#theme-toggle`                   | `renderFilters`, `applyTheme` | `normalizeText`                    | P1-11, P1-13  |
| Genel ilerleme         | `#progress-summary`                          | `renderSummary`               | `computeProgress`                  | P1-12         |
| Önümüzdeki 7 gün       | `#upcoming`                                  | `renderUpcoming`              | `upcomingTasks`, `daysBetween`     | #86           |
| Hafta kartları         | `#weeks`                                     | `renderWeeks`                 | `computeWeekProgress`              | P1-06, P1-12  |
| Hafta detayı           | `#week-detail`                               | `renderDetail`                | —                                  | P1-06         |
| Filtreler              | `#filter-status`, `#filter-week`, `#filter-clear` | `renderFilters`, `renderWeekOptions` | —                         | P1-11         |
| Görev listesi          | `#task-list`, `#result-count`                | `renderTasks`                 | `filterTasks`, `getStatus`, `setStatus`, `isOverdue` | P1-07, P1-11 |
| Görev ekleme formu     | `#task-add`, `#task-form`                    | `openForm`, `onFormSubmit`, `onTaskToolClick` | `validateTaskInput`, `createUserTask`, `sanitizeUserTasks` | P1-07 (#85) |
| Uyarı alanı            | `#notice`                                    | `showNotice`                  | —                                  | P1-14         |
| İlerlemeyi sıfırlama   | `#reset`                                     | `bindEvents`                  | —                                  | P1-14         |

## Durum (state)

`main.js` tek bir `state` nesnesi tutar; ekran her zaman bu nesneden çizilir:

| Alan             | Nereden gelir                     | Ne zaman değişir                    |
| ---------------- | --------------------------------- | ----------------------------------- |
| `state.course`   | `data/course.json` (doğrulanmış)  | Yalnızca açılışta                   |
| `state.progress` | `localStorage` → `ldp:v1:progress` | Görev durumu değişince              |
| `state.prefs`    | `localStorage` → `ldp:v1:prefs`   | Tema, filtre ya da hafta seçilince  |
| `state.userTasks` | `localStorage` → `ldp:v1:userTasks` (doğrulanmış) | Kendi görevi eklenince, düzenlenince ya da silinince |

Ekrandaki görev listesi, ilerleme ve filtreler `allTasks()` ile ders görevleri ve kendi görevleri birlikte kullanır.

Akış her değişiklikte aynıdır: **olay → `state` güncellenir → `storage.save` → ilgili `render*` çağrılır.**
Yüzdeler saklanmaz; her çizimde `logic.js` ile yeniden hesaplanır.

## Kurallar

- `logic.js` DOM'a, `window`'a ya da `localStorage`'a dokunmaz. Yeni bir hesap gerekiyorsa buraya saf fonksiyon
  olarak eklenir ve testi yazılır (P1-10).
- Kullanıcıdan ya da JSON'dan gelen her metin ekrana `esc()` ile kaçışlanarak yazılır.
- Yeni bir ekran bölümü eklenirse bu tabloya satırı eklenir.
