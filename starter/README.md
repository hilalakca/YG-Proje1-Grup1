# Etkileşimli Ders Deneyimi Panosu

Öğrencilerin haftalık ders içeriklerini, görevlerini ve ilerlemelerini takip edebildiği, tarayıcıda çalışan bir web uygulaması.
Backend ve veri tabanı yoktur; ders içeriği statik bir JSON dosyasından gelir, kullanıcı durumu `localStorage`’da tutulur.

> Bu repo Yazılım Geliştirme dersi Proje 1 kapsamındadır. Hafta 1 çıktısı: analiz, veri modeli ve çalışan bir iskelet.

## Özellikler (Hafta 1 iskeleti)

- Haftalık ders kartları ve hafta detayı (hedefler, kaynaklar)
- Görev listesi ve durum değiştirme (yapılacak / devam ediyor / tamamlandı)
- Duruma ve haftaya göre filtreleme, Türkçe karakter uyumlu arama
- Genel ve haftalık ilerleme göstergesi
- Açık/koyu tema (ilk açılışta sistem tercihi)
- Responsive düzen, klavye ile kullanım, odak göstergesi
- Veriler sayfa yenilenince korunur

## Çalıştırma

Uygulama `fetch` ve ES modülleri kullandığı için dosyayı çift tıklayıp açmak yerine basit bir yerel sunucu gerekir.
Ek bir kurulum (npm install vb.) gerekmez.

```bash
# Windows (PowerShell) -> "python"
python -m http.server 8000

# macOS / Linux -> "python3"
python3 -m http.server 8000

# veya Node ile (tüm sistemlerde)
npx serve .
```

Komutu proje klasörünün (`index.html`’in bulunduğu klasör) içinde çalıştır.
Ardından tarayıcıda `http://localhost:8000` adresini aç.

## Klasör yapısı

```
index.html          Sayfa iskeleti
css/styles.css      Tasarım belirteçleri, tema, responsive düzen
js/main.js          Arayüz: çizim ve olaylar
js/logic.js         Saf iş mantığı: doğrulama, ilerleme, filtre, arama
js/storage.js       localStorage sarmalayıcısı (hata toleranslı)
data/course.json    Ders içeriği (örnek veri)
docs/               Veri modeli ve analiz dokümanları
```

## İçeriği düzenleme

Hafta ve görevler `data/course.json` dosyasındadır; kodu değiştirmeden yeni hafta veya görev ekleyebilirsin.
Alan açıklamaları için [docs/data-model.md](docs/data-model.md) dosyasına bak.
Not: `data/course.json` içindeki içerik örnektir.

## Katkı kuralları

- `main` dalına doğrudan commit atılmaz; her iş kendi dalında (`feat/...`, `docs/...`, `fix/...`) yapılır ve pull request ile birleştirilir.
- Commit mesajları [Conventional Commits](https://www.conventionalcommits.org/) biçimindedir: `feat(ui): hafta kartlarını ekle`.
- Her pull request en az bir takım üyesi tarafından incelenir.
