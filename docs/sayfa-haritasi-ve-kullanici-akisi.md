# Sayfa Haritası ve Kullanıcı Akışı

**Proje:** Etkileşimli Ders Deneyimi Panosu

## Sayfa haritası

```text
Ders Deneyimi Panosu (tek sayfa)
├── Üst çubuk: ders adı/dönem, görev arama, tema düğmesi
├── Genel ilerleme: dairesel yüzde ve tamamlanan/toplam görev
├── Haftalar: hafta kartları ve haftalık ilerleme
│   └── Seçili hafta: öğrenme hedefleri ve kaynak bağlantıları
├── Görevler
│   ├── Durum filtresi (Tümü/Yapılacak/Devam/Tamamlandı)
│   ├── Hafta filtresi ve filtreleri temizle
│   ├── Sonuç sayısı
│   └── Görevler: başlık, açıklama, hafta, etiket, son tarih, durum
└── Alt bilgi: ilerlemeyi sıfırla (onaylı)
```

## Kullanıcı akışı
1. Öğrenci uygulamayı açar; ders, genel ilerleme ve hafta kartları yüklenir.
2. Bir hafta kartını seçer; hedefler/kaynaklar görüntülenir ve hafta filtresi uygulanır.
3. Arama sözcüğü yazar ve/veya durum ile hafta filtresi seçer.
4. Filtreler VE (AND) mantığıyla birlikte uygulanır; sonuç sayısı güncellenir.
5. Görev durumunu değiştirir; genel ve haftalık ilerleme yeniden hesaplanır.
6. Tema ve görev durumu tarayıcı depolamasında saklanır.
7. İsterse ilerlemeyi sıfırlamayı onaylayarak kayıtlarını temizler.

## Bölüm-dosya eşlemesi
| Bölüm | Kod karşılığı |
|---|---|
| Üst çubuk | `index.html`, `js/main.js` |
| Genel ilerleme | `#progress-summary`, `renderSummary()` |
| Haftalar | `#weeks`, `renderWeeks()` |
| Hafta detayı | `#week-detail`, `renderDetail()` |
| Görev arama/filtre | `#search`, `#filter-status`, `#filter-week`, `#task-list` |
| Sıfırlama | `#reset` |

Wireframe taslağı `wireframes.svg` dosyasındadır.
