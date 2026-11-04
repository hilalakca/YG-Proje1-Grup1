# Etkileşimli Ders Deneyimi Panosu

**Yazılım Geliştirme dersi · Proje 1 · Grup 1** (`YG-Proje1-Grup1`)

Öğrencilerin haftalık ders içeriklerini, görevlerini ve ilerlemelerini takip edebildiği, tarayıcıda çalışan bir web uygulaması.
Backend ve veri tabanı yoktur; ders içeriği statik bir JSON dosyasından gelir, kullanıcı durumu `localStorage`’da tutulur.

- **Görevler:** [Issues](https://github.com/hilalakca/YG-Proje1-Grup1/issues) · [Teslim milestone'u](https://github.com/hilalakca/YG-Proje1-Grup1/milestone/1)
- **Teslim tarihi:** 11 Kasım 2026

## Ekip ve roller

Bütün üyeler aynı zamanda geliştiricidir. Roller hocanın takip listesindeki rollerdir.

| Üye             | GitHub                                                       | Rol                       | Takip listesindeki işleri          |
| --------------- | ------------------------------------------------------------ | ------------------------- | ---------------------------------- |
| Hilal Akça      | [@hilalakca](https://github.com/hilalakca)                   | Lider + Geliştirici       | P1-03, P1-05, P1-12, P1-13, P1-19, P1-20 |
| Fatih Ulupınar  | [@fatih-software](https://github.com/fatih-software)         | Analist + Geliştirici     | P1-01, P1-02, P1-09, P1-14         |
| Ayşe Yurtseven  | [@ayseyurtseven](https://github.com/ayseyurtseven)           | Dokümantasyon + Geliştirici | P1-04, P1-08, P1-11, P1-17, P1-18 |
| Yusuf Veis      | [@ManufactoredConductor](https://github.com/ManufactoredConductor) | Test / Kalite + Geliştirici | P1-06, P1-07, P1-10, P1-15, P1-16 |

Her maddenin issue'su, sorumlusu ve kabul kriterleri [Issues](https://github.com/hilalakca/YG-Proje1-Grup1/issues) sayfasındadır.

## Özellikler

| Özellik                                                   | Takip listesi | Durum                  |
| --------------------------------------------------------- | ------------- | ---------------------- |
| Haftalık ders kartları ve hafta detayı (hedefler, kaynaklar) | P1-06      | Kodda var, test bekliyor |
| Görev listesi ve durum değiştirme                         | P1-07         | Kodda var, test bekliyor |
| Responsive düzen (mobil / masaüstü)                       | P1-08         | Kodda var, test bekliyor |
| Duruma ve haftaya göre filtre, Türkçe karakter uyumlu arama | P1-11       | Kodda var, test bekliyor |
| Genel ve haftalık ilerleme göstergesi                     | P1-12         | Kodda var, test bekliyor |
| Açık/koyu tema, tercih kalıcılığı                         | P1-13         | Kodda var, test bekliyor |
| Görev durumlarının `localStorage`'da saklanması           | P1-14         | Kodda var, test bekliyor |

"Test bekliyor": özellik kodda var ama kabul kriterlerine göre henüz test edilmedi. Bir özellik test edilip PR'ı
birleşmeden **Hazır** sayılmaz.

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
.github/            PR şablonu
```

## İçeriği düzenleme

Hafta ve görevler `data/course.json` dosyasındadır; kodu değiştirmeden yeni hafta veya görev ekleyebilirsin.
Alan açıklamaları için [docs/data-model.md](docs/data-model.md) dosyasına bak.
Not: `data/course.json` içindeki içerik örnektir.

## Çalışma düzeni

Hocanın takip listesindeki her madde (P1-01…P1-20) bir **GitHub issue**'sudur. Issue başlığı madde koduyla başlar
(`P1-11 Arama ve durum/hafta filtresi`); içinde beklenen çıktı ve **kabul kriterleri** yazar. Bütün issue'lar
**Teslim (11 Kasım 2026)** milestone'una bağlıdır; kaç işin bittiği milestone sayfasında yüzde olarak görünür.

Etiketler:

| Etiket                | Anlamı                                   |
| --------------------- | ---------------------------------------- |
| `enhancement`         | Özellik                                  |
| `bug`                 | Hata                                     |
| `documentation`       | Belge, rapor, sunum                      |
| `test`                | Test senaryosu, test kodu, kalite kontrol |
| `hafta-1` … `hafta-4` | Takip listesinde hangi haftanın işi olduğu |

### Görev akışı

1. Issue'yu kendinize atayın (sorumlular atanmış durumda).
2. `main`'den, issue numarasıyla bir dal açın:

   ```bash
   git switch main
   git pull
   git switch -c feat/13-arama-filtre
   ```

3. Küçük ve anlamlı commitler atın (aşağıdaki kurallara göre).
4. Dalı gönderin ve PR açın. Şablondaki `Closes #` satırını issue numarasıyla tamamlayın (`Closes #13`).
5. En az bir ekip arkadaşı PR'ı inceler ve onaylar. Test sorumlusu kabul kriterlerini dener.
6. PR `main`'e **Create a merge commit** ile birleştirilir; issue kendiliğinden kapanır.

Hatalar `bug` etiketiyle ayrı issue olarak açılır ve düzeltme PR'ına bağlanır.

### Commit mesajı

```text
<tür>: <ne yapıldı, kısa ve emir kipinde> (#<issue no>)

<Bir cümleyle neden yapıldığı.>

- <Değişiklik 1>
- <Değişiklik 2>
```

| Tür        | Ne zaman                                        |
| ---------- | ----------------------------------------------- |
| `feat`     | Yeni özellik                                    |
| `fix`      | Hata düzeltme                                   |
| `style`    | Görünüm ve tasarım değişikliği                  |
| `refactor` | Davranışı değiştirmeden kodu düzenleme          |
| `docs`     | README, rapor, belgeler                         |
| `test`     | Test ekleme veya düzeltme                       |
| `chore`    | Ayar, klasör düzeni gibi ürün dışı işler        |

Örnek: `feat: görevlere durum filtresi ekle (#13)`. `update`, `son hali` gibi açıklamasız mesajlar kullanılmaz.

### Kurallar

- Herkes **kendi GitHub hesabıyla, kendi bilgisayarından** commit atar. Git e-postanız GitHub hesabınızdakiyle aynı olmalı:
  `git config user.email "github-adresiniz"`. Başkasının hesabıyla commit atılmaz; aksi halde katkınız görünmez.
- `main` dalına doğrudan commit atılmaz.
- Son gün toplu commit yerine düzenli ve küçük commitler atılır.
- **Test edilmeyen iş bitmiş sayılmaz.** Issue, kabul kriterleri denenmeden kapatılmaz.

### Süreç kaydı hakkında not

1–3. haftalarda iş takibi GitHub'da düzenli tutulmadı: issue'lar takip listesiyle eşleşmiyordu ve kod tek seferde
`main`'e eklendi. 5 Kasım 2026'da takip listesindeki her madde issue olarak açıldı ve yukarıdaki düzen kuruldu.
Bu tarihten önceki geçmiş olduğu gibi bırakıldı.
