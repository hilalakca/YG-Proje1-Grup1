# Sayfa Haritası ve Kullanıcı Akışı

**Proje:** Etkileşimli Ders Deneyimi Panosu

## Sayfa haritası

```text
Ders Deneyimi Panosu (tek sayfa)
├── Üst çubuk: ders adı/dönem, görev arama, tema düğmesi
├── Genel ilerleme: dairesel yüzde ve tamamlanan/toplam görev
│   └── Önümüzdeki 7 gün: yaklaşan en çok 5 görev, süresi geçen görev sayısı
├── Haftalar: hafta kartları ve haftalık ilerleme
│   └── Seçili hafta: öğrenme hedefleri ve kaynak bağlantıları
├── Görevler
│   ├── Görev ekle formu: başlık*, hafta*, son tarih, açıklama, etiketler
│   ├── Durum filtresi (Tümü/Yapılacak/Devam/Tamamlandı)
│   ├── Hafta filtresi ve filtreleri temizle
│   ├── Sonuç sayısı
│   └── Görevler: başlık, açıklama, hafta, etiket, son tarih, durum; kendi görevlerinde Düzenle/Sil
└── Alt bilgi: ilerlemeyi sıfırla (onaylı)
```

## Kullanıcı akışı
1. Öğrenci uygulamayı açar; ders, genel ilerleme ve hafta kartları yüklenir.
2. Bir hafta kartını seçer; hedefler/kaynaklar görüntülenir ve hafta filtresi uygulanır.
3. Arama sözcüğü yazar ve/veya durum ile hafta filtresi seçer.
4. Filtreler VE (AND) mantığıyla birlikte uygulanır; sonuç sayısı güncellenir.
5. Görev durumunu değiştirir; genel ve haftalık ilerleme ile "Önümüzdeki 7 gün" paneli yeniden hesaplanır.
6. İsterse **Görev ekle** ile kendi görevini ekler; daha sonra düzenler ya da onaylayarak siler.
7. Tema, görev durumları ve eklenen görevler tarayıcı depolamasında saklanır.
8. İsterse ilerlemeyi sıfırlamayı onaylayarak kayıtlarını temizler.

## Bölüm-dosya eşlemesi
| Bölüm | Kod karşılığı |
|---|---|
| Üst çubuk | `index.html`, `js/main.js` |
| Genel ilerleme | `#progress-summary`, `renderSummary()` |
| Önümüzdeki 7 gün | `#upcoming`, `renderUpcoming()` |
| Haftalar | `#weeks`, `renderWeeks()` |
| Hafta detayı | `#week-detail`, `renderDetail()` |
| Görev arama/filtre | `#search`, `#filter-status`, `#filter-week`, `#task-list` |
| Görev ekleme formu | `#task-add`, `#task-form`, `openForm()`, `onFormSubmit()` |
| Sıfırlama | `#reset` |

Masaüstü wireframe taslağı `wireframes.svg` dosyasındadır; görev formu ve 7 gün paneli wireframe'den sonra eklendiği için bu taslakta yer almaz. Mobil (360 px) wireframe `wireframe-mobil.svg` dosyasındadır (Ayşe Yurtseven) ve 7 gün panelini ve görev formunu da içerir.
