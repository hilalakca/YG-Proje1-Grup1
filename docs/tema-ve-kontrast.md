# Tema ve kontrast

Takip listesindeki **P1-13** maddesi ([#15](https://github.com/hilalakca/YG-Proje1-Grup1/issues/15)).

## Tema nasıl çalışır?

| Durum                             | Ne olur                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| İlk açılış (kayıtlı tercih yok)   | Tema `system`: işletim sisteminin açık/koyu tercihi (`prefers-color-scheme`) kullanılır |
| Tema düğmesine basılınca          | Ekranda görünen temanın tersi seçilir ve `ldp:v1:prefs` → `theme` olarak kaydedilir     |
| Sayfa yenilenince                 | `index.html`'deki küçük betik kayıtlı temayı **stil dosyası yüklenmeden** uygular; sayfa bir an yanlış temada görünmez (#51) |
| Tema `system` iken sistem değişirse | Sayfa renkleri ve düğme yazısı birlikte güncellenir (#52)                             |
| `localStorage` yoksa ya da kayıt bozuksa | Hata verilmez, sistem teması kullanılır                                          |
| İlerlemeyi sıfırla                | Tema da `system`'e döner                                                                |

Renkler `css/styles.css`'in başındaki CSS değişkenleridir (`--bg`, `--ink`, `--accent` …). Koyu tema aynı
değişkenleri `:root[data-theme="dark"]` ve `@media (prefers-color-scheme: dark)` altında yeniden tanımlar;
bileşenler yalnızca değişkenleri kullanır, renk yazmaz.

## Kontrast ölçümü (#53)

WCAG 2.1 bağıl parlaklık formülüyle, `css/styles.css`'teki değerlerden hesaplandı (5 Kasım 2026).
Eşik: normal metin **4,5:1** (AA), grafik öğeler **3:1**.

| Kullanım                      | Ön plan / arka plan          | Açık tema | Koyu tema | Sonuç |
| ----------------------------- | ---------------------------- | --------: | --------: | ----- |
| Ana metin / sayfa             | `--ink` / `--bg`             |     14,73 |     15,52 | Geçti |
| Ana metin / kart              | `--ink` / `--surface`        |     16,10 |     13,65 | Geçti |
| İkincil metin / kart          | `--ink-soft` / `--surface`   |      7,33 |      7,79 | Geçti |
| İkincil metin / sayfa         | `--ink-soft` / `--bg`        |      6,70 |      8,86 | Geçti |
| Etiket metni / etiket         | `--ink-soft` / `--surface-2` |      6,23 |      6,65 | Geçti |
| Seçili durum düğmesi          | `--accent-ink` / `--accent`  |      7,13 |      7,65 | Geçti |
| Hafta no, bağlantı / kart     | `--accent` / `--surface`     |      7,13 |      6,73 | Geçti |
| "Süresi geçti" / kart         | `--warn` / `--surface`       |      6,09 |      9,14 | Geçti |
| İlerleme çubuğu / iz (grafik) | `--done` / `--surface-2`     |      4,57 |      7,20 | Geçti |

Renk değiştiren her PR bu tabloyu yeniden hesaplayıp güncellemelidir.

## Nasıl denendi?

Yerel sunucuda, tarayıcıda (5 Kasım 2026):

- Kayıtlı tercih yokken sistem açıkken açık tema, düğme "Koyu tema"
- Düğmeye basınca koyu tema, düğme "Açık tema", `aria-pressed="true"`, tercih `dark` olarak kaydedildi
- Sayfa yenilenince koyu tema korundu; `index.html`'deki betik tek başına çalıştırılınca da koyu tema kuruldu
- Bozuk `ldp:v1:prefs` kaydıyla betik hata vermedi
- Tema `system` iken sistem teması açık ↔ koyu değiştirilince düğme yazısı güncellendi
