# Veri modeli

İki ayrı veri kaynağı vardır: **içerik** (statik JSON, salt okunur) ve **kullanıcı durumu** (localStorage).
Görev durumu içerikte tutulmaz; böylece ders sorumlusu içeriği güncellediğinde öğrencinin ilerlemesi bozulmaz.
İlerleme yüzdeleri saklanmaz, her seferinde hesaplanır.

## 1. İçerik: `data/course.json`

| Varlık | Alan | Tür | Zorunlu | Açıklama |
| --- | --- | --- | --- | --- |
| Course | `schemaVersion` | sayı | evet | Şema sürümü (şimdilik 1) |
| Course | `id`, `title`, `term` | metin | `title` evet | Ders bilgisi |
| Course | `weeks`, `tasks` | dizi | evet | Hafta ve görev listeleri |
| Week | `id` | metin | evet | Benzersiz, örn. `w01` |
| Week | `weekNo` | tam sayı | evet | 1’den başlar, benzersiz |
| Week | `title`, `description` | metin | `title` evet | |
| Week | `objectives` | metin dizisi | hayır | Öğrenme hedefleri |
| Week | `resources` | dizi | hayır | `{ title, url, type }` |
| Task | `id` | metin | evet | Benzersiz, örn. `t01-01` |
| Task | `weekId` | metin | evet | Var olan bir `Week.id` olmalı |
| Task | `title` | metin | evet | |
| Task | `description` | metin | hayır | |
| Task | `dueDate` | ISO tarih veya `null` | hayır | `YYYY-MM-DD` |
| Task | `tags` | metin dizisi | hayır | |

İlişkiler: Course 1—N Week, Week 1—N Task.

## 2. Kullanıcı durumu: localStorage

Anahtarlar `ldp:v1:` önekini taşır.

| Anahtar | İçerik |
| --- | --- |
| `ldp:v1:progress` | `{ [taskId]: { status, updatedAt, completedAt } }`; `status`: `todo` \| `in_progress` \| `done`. Kaydı olmayan görev `todo` sayılır. `completedAt` yalnızca `done` iken doludur. |
| `ldp:v1:prefs` | `{ theme: "light" \| "dark" \| "system", filters: { status, weekId, query }, lastViewedWeekId }` |
| `ldp:v1:meta` | `{ schemaVersion, createdAt }` |

Örnek `ldp:v1:progress`:

```json
{
  "t01-01": { "status": "done", "updatedAt": "2026-10-30T09:15:00Z", "completedAt": "2026-10-30T09:15:00Z" },
  "t01-02": { "status": "in_progress", "updatedAt": "2026-10-30T09:20:00Z", "completedAt": null }
}
```

## 3. Türetilen değerler

- Genel ilerleme = `done` görev sayısı / toplam görev sayısı (toplam 0 ise %0)
- Hafta ilerlemesi = haftanın `done` görevleri / haftanın görev sayısı
- Gecikmiş görev = `dueDate` bugünden önce ve durum `done` değil

## 4. Doğrulama ve hata durumları

- Yinelenen `id` veya `weekNo`, bilinmeyen `weekId` veya eksik zorunlu alan: kayıt atlanır, uyarı verilir.
- Geçersiz `status` değeri `todo` kabul edilir.
- localStorage’daki JSON bozuksa ilgili anahtar yok sayılır, varsayılan değerlerle devam edilir.
- localStorage kullanılamazsa uygulama bellekte çalışır ve kullanıcı uyarılır.
- İçerikten silinmiş görevlere ait ilerleme kayıtları hesaplamalara girmez.

Uygulama tarafındaki karşılığı: `js/logic.js` (doğrulama ve hesaplar), `js/storage.js` (okuma/yazma).
