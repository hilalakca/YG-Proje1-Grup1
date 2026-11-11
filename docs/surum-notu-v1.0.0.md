# Sürüm Notu: v1.0.0

> Bu metin GitHub'da **Releases** sayfasında `v1.0.0` etiketiyle yayımlanır (#81).

**Etkileşimli Ders Deneyimi Panosu** · Yazılım Geliştirme dersi · Proje 1 · Grup 1
Canlı demo: https://hilalakca.github.io/YG-Proje1-Grup1/

## Özellikler

- Haftalık ders kartları: hafta no, başlık, açıklama ve haftalık ilerleme; tıklayınca ya da klavyeyle hedefler ve
  kaynaklar açılır.
- Görev listesi: başlık, açıklama, etiketler, son tarih; durum tek tıkla yapılacak / devam ediyor / tamamlandı.
- Son tarihi geçen görevlerin işaretlenmesi.
- Duruma ve haftaya göre filtre; büyük/küçük harf ve Türkçe karakter duyarsız arama; sonuç sayısı ekran okuyucuya
  duyurulur.
- Genel (halka) ve haftalık ilerleme göstergesi.
- Kendi görevini ekleme, düzenleme ve silme; alan bazında doğrulama ve hata mesajları.
- "Önümüzdeki 7 gün" paneli: yaklaşan görevler ve süresi geçenlerin sayısı.
- Açık / koyu tema; tercihler, görev durumları ve eklenen görevler `localStorage`'da saklanır; onaylı sıfırlama.
- Responsive düzen (360 / 768 / 1280 px), klavyeyle kullanım, WCAG kontrast eşikleri.

## Kalite

- 65 birim testi (`tests/`), her push ve PR'da GitHub Actions'ta çalışır.
- Elle test senaryoları: [`docs/test-senaryolari.md`](test-senaryolari.md).
- Düzeltilen hatalar: #66 (gecikme kontrolünde saat dilimi), #94 (sekme simgesi), #93 ve #98 (hafta kartında
  başlık yapısı ve klavye odağı), #111 (görev formunun açılışta görünmesi).
- Elle test senaryoları: 25 (TC-01–TC-25); 15 fonksiyonel gereksinimle eşleştirildi.

## Bilinen sınırlamalar

- Veriler yalnızca kullanılan tarayıcıda tutulur; cihazlar arası eşitleme ve backend yok.
- "Ders yolculuğu (zaman çizelgesi)" görünümü (US-16) sonraki sürüme bırakıldı.

## Katkıda bulunanlar

Hilal Akça (@hilalakca), Fatih Ulupınar (@fatih-software), Ayşe Yurtseven (@ayseyurtseven),
Yusuf Veis (@ManufactoredConductor). Ayrıntı: [`docs/katki-tablosu.md`](katki-tablosu.md).
