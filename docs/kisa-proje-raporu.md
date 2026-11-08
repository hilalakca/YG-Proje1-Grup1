# Kısa Proje Raporu — Etkileşimli Ders Deneyimi Panosu

**Ders:** Yazılım Geliştirme | **Proje:** 1 | **Grup:** 1

## 1. Proje özeti
Öğrencilerin haftalık ders içeriğini, öğrenme hedeflerini, görevlerini ve ilerleme durumlarını tek sayfada takip etmelerini sağlayan istemci taraflı web uygulamasıdır. HTML5, CSS3 ve modüler JavaScript kullanılır; backend ve sunucu veritabanı kapsam dışıdır.

## 2. Gereksinimler
Haftaları görüntüleme, hedeflere erişme, görev durumunu değiştirme, ilerlemeyi görme, görev arama ve durum/hafta filtrelerini birlikte kullanma temel gereksinimlerdir. Bunlara ek olarak öğrenci kendi görevini ekleyip düzenleyebilir, silebilir ve önümüzdeki 7 günde son tarihi gelen görevleri ayrı bir panelde görebilir. Gereksinimlerin tamamı ve kabul kriterleri `gereksinimler.md` dosyasındadır. Mobil uyumluluk, erişilebilir etiketler, klavye ile kullanım, tema kontrastı ve depolama hatalarına tolerans da dikkate alınır.

## 3. Tasarım
Tek sayfalı yapıda üst çubuk, genel ilerleme ve "Önümüzdeki 7 gün" paneli, hafta kartları, seçili hafta detayları, görev ekleme formu ve görev listesi bulunur. Sayfa haritası `sayfa-haritasi-ve-kullanici-akisi.md`, wireframe taslağı `wireframes.svg` dosyasındadır.

## 4. Teknik uygulama
`index.html` semantik iskeleti; `css/styles.css` tema ve responsive düzeni; `js/main.js` arayüz çizimi ve olayları; `js/logic.js` doğrulama, Türkçe metin normalizasyonu, ilerleme, filtre, form doğrulaması ve yaklaşan görev hesabını; `js/storage.js` localStorage işlemlerini; `data/course.json` örnek ders içeriğini sağlar.

## 5. Doğrulama ve test
**Otomatik testler:** `tests/` klasöründe üç dosyada 65 birim testi vardır (iş mantığı, örnek verinin tutarlılığı, `localStorage` dayanıklılığı). Testler her push ve PR'da GitHub Actions'ta çalışır; 8 Kasım 2026 itibarıyla 65 testin hepsi geçmektedir.

**Elle yapılan testler:** `test-senaryolari.md` belgesinde 23 senaryo (TC-01–TC-23) temel özellikleri, 360/768/1280 px ekran genişliklerini, klavye kullanımını, kontrastı ve form etiketlerini kapsar. 7 Kasım'daki entegrasyon denemesinde filtrelerin birlikte çalışması, Türkçe karakterle arama, durum değişikliğinde odağın korunması, bozuk kayıtla açılış, üç genişlikte yatay taşma olmaması ve 44 px dokunma hedefleri tarayıcıda doğrulanmıştır.

**Bulunan hatalar:** Gecikme kontrolünde saat dilimi hatası (#66) ve eksik sekme simgesi (#94) düzeltildi. Hafta kartlarındaki iki erişilebilirlik hatası (#93 düğme içinde başlık, #98 klavyeyle açınca odak kaybı) da PR #101 ile düzeltildi; şu an bilinen açık hata yoktur.

## 6. Sınırlamalar
Ders içeriği JSON dosyasından gelir. Kullanıcı ilerlemesi yalnızca kullanılan tarayıcıda saklanır ve cihazlar arasında eşitlenmez. Backend, kullanıcı hesabı ve merkezi raporlama kapsam dışıdır. "Ders yolculuğu (zaman çizelgesi)" görünümü (US-16) uygulanmamıştır; haftalar kart ızgarasıyla gösterilir.

## 7. Sonuç ve sonraki adımlar
Uygulama haftalık ders akışını ve görev ilerlemesini tek arayüzde birleştirir ve GitHub Pages'te yayındadır: https://hilalakca.github.io/YG-Proje1-Grup1/. Teslim öncesinde form ve panel test senaryolarının birleştirilmesi, ekran görüntüleri ve ekip katkı tablosu tamamlanacaktır.
