# Kısa Proje Raporu — Etkileşimli Ders Deneyimi Panosu

**Ders:** Yazılım Geliştirme | **Proje:** 1 | **Grup:** 1

## 1. Proje özeti
Öğrencilerin haftalık ders içeriğini, öğrenme hedeflerini, görevlerini ve ilerleme durumlarını tek sayfada takip etmelerini sağlayan istemci taraflı web uygulamasıdır. HTML5, CSS3 ve modüler JavaScript kullanılır; backend ve sunucu veritabanı kapsam dışıdır.

## 2. Gereksinimler
Haftaları görüntüleme, hedeflere erişme, görev durumunu değiştirme, ilerlemeyi görme, görev arama ve durum/hafta filtrelerini birlikte kullanma temel gereksinimlerdir. Mobil uyumluluk, erişilebilir etiketler, klavye ile kullanım, tema kontrastı ve depolama hatalarına tolerans da dikkate alınır.

## 3. Tasarım
Tek sayfalı yapıda üst çubuk, genel ilerleme, hafta kartları, seçili hafta detayları ve görev listesi bulunur. Sayfa haritası `sayfa-haritasi-ve-kullanici-akisi.md`, wireframe taslağı `wireframes.svg` dosyasındadır.

## 4. Teknik uygulama
`index.html` semantik iskeleti; `css/styles.css` tema ve responsive düzeni; `js/main.js` arayüz çizimi ve olayları; `js/logic.js` doğrulama, Türkçe metin normalizasyonu, ilerleme ve filtre mantığını; `js/storage.js` localStorage işlemlerini; `data/course.json` örnek ders içeriğini sağlar.

## 5. Doğrulama ve test
`tests/logic.test.mjs` iş mantığı test dosyasıdır. Bu rapor testlerin tamamının geçtiğini iddia etmez. Ekran boyutu kontrolleri ve kabul testi sonuçları ekip tarafından gerçek tarayıcıda çalıştırılıp kaydedilmelidir.

## 6. Sınırlamalar
Ders içeriği JSON dosyasından gelir. Kullanıcı ilerlemesi yalnızca kullanılan tarayıcıda saklanır ve cihazlar arasında eşitlenmez. Backend, kullanıcı hesabı, merkezi raporlama ve canlı demo yayını ayrıca yapılandırılmalıdır.

## 7. Sonuç ve sonraki adımlar
Uygulama haftalık ders akışını ve görev ilerlemesini tek arayüzde birleştirir. Teslim öncesinde gerçek test sonuçları, ekran görüntüleri, katkı/PR bağlantıları ve canlı demo durumu ekipçe tamamlanmalıdır.
