# Kısa Proje Raporu

## Proje
**Etkileşimli Ders Deneyimi Panosu** — Yazılım Geliştirme dersi için haftalık içerik, öğrenme hedefleri, görevler ve kişisel ilerlemeyi tek arayüzde takip etmeyi amaçlayan web uygulaması.

## Kapsam
Uygulama; `index.html`, `css/styles.css`, `js/main.js`, `js/logic.js`, `js/storage.js` ve `data/course.json` dosyalarından oluşur. Ders ve görev verileri JSON dosyasından yüklenir. Görev durumları ve kullanıcı tercihleri tarayıcının `localStorage` alanında saklanır.

## Uygulanan işlevler
- Haftalara göre ders içeriğini görüntüleme.
- Görev durumlarını yapılacak, devam ediyor ve tamamlandı olarak takip etme.
- Görevleri durum, hafta ve metin aramasıyla filtreleme.
- Aramada Türkçe büyük/küçük harf dönüşümünü destekleme.
- Genel ve haftalık ilerlemeyi hesaplama.
- Tema ve kullanıcı tercihlerini saklama.

## Otomatik testler
Testler proje kök dizininde `node --test tests/logic.test.mjs` komutuyla çalıştırıldı.

- Test dosyası: `tests/logic.test.mjs`
- Test sayısı: **37**
- Başarılı: **37**
- Başarısız: **0**
- Atlanan: **0**

Test kapsamı; Türkçe metin normalizasyonu, ders verisi doğrulama, görev durumu, ilerleme hesaplama, gecikme kontrolü ve birleşik filtreleme davranışlarını içerir.

## Responsive ekran görüntüleri
Canlı demo `https://hilalakca.github.io/YG-Proje1-Grup1/` üzerinden alınan dört ekran görüntüsü `docs/screenshots/` klasörüne eklenmiştir. Kayıt sırası 360 px, 768 px, 1280 px ve görev formu açık görünüm şeklindedir.

- 360 px görünümü
- 768 px görünümü
- 1280 px görünümü
- Görev formu açık görünüm

Görseller, tarayıcı geliştirici araçlarında ilgili viewport genişliği seçilerek alınmıştır. Görüntüler özgün dosya adlarıyla korunmuştur.

## Kullanılabilirlik testi
Kullanılabilirlik testi gerçekleştirilmiştir. Katılımcı README ve kullanıcı yönergelerini izleyerek projeyi açmış, uygulamanın temel akışlarını denemiştir. Test sırasında uygulamanın açılması ve temel işlevlerin kullanılması sorunsuz tamamlanmıştır. Test sonucunda raporlanacak bir engel bildirilmemiştir.

## Sonuç
Otomatik mantık testleri başarıyla tamamlanmış, responsive ekran görüntüleri eklenmiş ve kullanılabilirlik testi sorunsuz sonuçlanmıştır. Proje teslim dokümantasyonu güncellenmiştir.
