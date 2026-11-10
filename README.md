# Etkileşimli Ders Deneyimi Panosu

**Yazılım Geliştirme dersi · Proje 1 · Grup 1** (`YG-Proje1-Grup1`)

Öğrencilerin bir dersin haftalık içeriğini, öğrenme hedeflerini, görevlerini ve kendi ilerlemelerini tek
sayfada, etkileşimli bir web arayüzüyle takip edebildiği uygulama.

- **Görev panosu (GitHub Projects):** https://github.com/users/hilalakca/projects/1 (yalnızca ekip üyeleri görür)
- **Görevler:** [Issues](https://github.com/hilalakca/YG-Proje1-Grup1/issues) ·
  [Teslim milestone'u](https://github.com/hilalakca/YG-Proje1-Grup1/milestone/1)
- **Teslim tarihi:** 11 Kasım 2026
- **Canlı demo:** https://hilalakca.github.io/YG-Proje1-Grup1/ (GitHub Pages; `main`'e her birleşmede kendiliğinden güncellenir)

## Güncel durum (10 Kasım 2026)

Lider özeti; teslim yarın (11 Kasım). Ayrıntılar: [katkı tablosu](docs/katki-tablosu.md),
[teslim kontrol listesi](docs/teslim-kontrol-listesi.md).

**Bitti**

- **Uygulama:** Hocanın belgesindeki zorunlu işlevlerin hepsi çalışıyor ve [canlı demoda](https://hilalakca.github.io/YG-Proje1-Grup1/)
  yayında: hafta kartları ve detayı, görev durumu, filtre ve Türkçe arama, ilerleme, tema, kalıcılık. Ek olarak kendi
  görevini ekleme/düzenleme/silme ve "Önümüzdeki 7 gün" paneli var.
- **Test:** 65 birim testi her push ve PR'da GitHub Actions'ta çalışıyor, hepsi geçiyor. 25 elle test senaryosu
  (TC-01–TC-25) sonuçlarıyla yazılı; 15 fonksiyonel gereksinim test senaryolarıyla eşleştirildi. Bulunan 4 hatanın
  4'ü de düzeltildi (#66, #93, #94, #98); bilinen açık hata yok.
- **Belgeler:** Gereksinimler (FR-01–FR-15, US-01–US-19), mimari, veri modeli, tema ve kontrast, sayfa haritası,
  masaüstü wireframe, kullanıcı kılavuzu, kısa rapor (md), test senaryoları, katkı tablosu, teslim kontrol listesi,
  v1.0.0 sürüm notu taslağı.
- **Süreç:** 20 takip listesi maddesi issue ve alt görevlere bölündü; bütün işler dal + PR + inceleme ile
  `main`'e giriyor.

**Kalan**

| Kim | İş | Hedef |
| --- | --- | --- |
| Ayşe | [#108](https://github.com/hilalakca/YG-Proje1-Grup1/pull/108)'in düzeltilmesi: ekran görüntüleri (#39, #73, #74), mobil wireframe (#27), raporun PDF'i (#76); README denemesi (#75) | 10 Kasım |
| Ayşe + ekip | Sunumun son hali ([#77](https://github.com/hilalakca/YG-Proje1-Grup1/issues/77)) | 10 Kasım prova |
| Hilal + ekip | Demo provası ([#82](https://github.com/hilalakca/YG-Proje1-Grup1/issues/82)) | 10 Kasım akşam |
| Hilal | Katkı tablosunun son hali (#78), v1.0.0 etiketi (#81), LMS teslimi (#83) | 11 Kasım |
| Herkes | Bireysel yansıtma raporu ve akran değerlendirmesi (#87–#90) | 11 Kasım teslimden önce |

## İçindekiler

1. [Güncel durum](#güncel-durum-10-kasım-2026)
1. [Projenin amacı](#projenin-amacı)
2. [Ekip, roller ve katkılar](#ekip-roller-ve-katkılar)
3. [Özellikler](#özellikler)
4. [Ekranın bölümleri](#ekranın-bölümleri)
5. [Kullanılan teknolojiler](#kullanılan-teknolojiler)
6. [Kurulum ve çalıştırma](#kurulum-ve-çalıştırma)
7. [Proje yapısı: hangi dosya ne işe yarar?](#proje-yapısı-hangi-dosya-ne-işe-yarar)
8. [Veri modeli ve veri akışı](#veri-modeli-ve-veri-akışı)
9. [Çalışma düzeni: GitHub Projects](#çalışma-düzeni-github-projects)
10. [Gizlilik](#gizlilik)
11. [Bilinen eksikler](#bilinen-eksikler)
12. [Teslim dosyaları](#teslim-dosyaları)

## Projenin amacı

Bir öğrenci, dersin hangi haftasında olduğunu, o hafta neyi öğrenmesi gerektiğini ve hangi görevleri
bitirdiğini çoğu zaman farklı yerlerden takip eder. Bu proje, bu bilgileri tek bir panoda toplar:

- Dersin her haftası bir kart olarak görünür; kartta haftanın ilerlemesi yazar.
- Bir hafta seçilince o haftanın öğrenme hedefleri ve kaynakları açılır.
- Her görevin durumu (yapılacak, devam ediyor, tamamlandı) tek tıkla değiştirilir.
- Görevler duruma ve haftaya göre süzülür, anahtar sözcükle aranır.
- Genel ve haftalık ilerleme görsel olarak gösterilir.
- Açık/koyu tema seçilebilir; seçimler ve görev durumları sayfa yenilenince kaybolmaz.

Amaç klasik bir "yapılacaklar listesi" değil; ders akışını ve öğrenme ilerlemesini anlamlı biçimde sunan bir
ders deneyimi panosudur. Backend ve veri tabanı yoktur: ders içeriği statik bir JSON dosyasından gelir,
öğrencinin durumu tarayıcının `localStorage`'ında tutulur.

### Hedef kullanıcılar

| Kullanıcı      | İhtiyaç                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Öğrenci        | Haftalık akışı, görevleri ve ilerlemesini tek bakışta görmek; tamamlananları işaretlemek.          |
| Ders sorumlusu | Ders akışının anlaşılır görünmesi; içeriği kod yazmadan, yalnızca JSON'u düzenleyerek güncellemek. |

Gereksinimler, kullanıcı hikâyeleri ve kabul kriterleri: [docs/gereksinimler.md](docs/gereksinimler.md)
([P1-01 #1](https://github.com/hilalakca/YG-Proje1-Grup1/issues/1),
[P1-02 #5](https://github.com/hilalakca/YG-Proje1-Grup1/issues/5)).

## Ekip, roller ve katkılar

Bütün üyeler aynı zamanda geliştiricidir. Roller hocanın takip listesindeki rollerdir.

| Üye            | GitHub                                                             | Rol                         | Takip listesindeki işleri                |
| -------------- | ------------------------------------------------------------------ | --------------------------- | ---------------------------------------- |
| Hilal Akça     | [@hilalakca](https://github.com/hilalakca)                         | Lider + Geliştirici         | P1-03, P1-05, P1-12, P1-13, P1-19, P1-20 |
| Fatih Ulupınar | [@fatih-software](https://github.com/fatih-software)               | Analist + Geliştirici       | P1-01, P1-02, P1-09, P1-14               |
| Ayşe Yurtseven | [@ayseyurtseven](https://github.com/ayseyurtseven)                 | Dokümantasyon + Geliştirici | P1-04, P1-08, P1-11, P1-17, P1-18        |
| Yusuf Veis     | [@ManufactoredConductor](https://github.com/ManufactoredConductor) | Test / Kalite + Geliştirici | P1-06, P1-07, P1-10, P1-15, P1-16        |

### Kim ne yaptı?

Git geçmişine ve issue kayıtlarına göre, 10 Kasım 2026 itibarıyla. Commit, PR ve satır
sayılarıyla ayrıntılı tablo: [docs/katki-tablosu.md](docs/katki-tablosu.md) (P1-19).

**Hilal Akça (Lider + Geliştirici)**

- GitHub deposunu açtı (18 Ekim), ilk görev issue'larını açıp ekibe atadı (22 Ekim).
- Başlangıç kodunu depoya ekledi (4 Kasım): `index.html`, `css/styles.css`, `js/main.js`, `js/logic.js`,
  `js/storage.js`, `data/course.json`, `docs/data-model.md`.
- Takip listesindeki 20 maddeyi issue olarak açtı; etiketleri, milestone'u ve görev panosunu kurdu
  (5 Kasım; P1-03).
- Maddeleri alt görevlere bölüp atadı; `docs/mimari.md`, `.editorconfig` ve ortak editör ayarlarını ekledi
  ([#60](https://github.com/hilalakca/YG-Proje1-Grup1/pull/60); P1-05).
- Hafta kartına ilerleme yüzdesini ekledi, hesabı `docs/data-model.md`'de anlattı
  ([#61](https://github.com/hilalakca/YG-Proje1-Grup1/pull/61); P1-12).
- Açılışta tema yanıp sönmesini ve sistem teması değişikliğini düzeltti, iki temada kontrastı ölçtü
  ([#62](https://github.com/hilalakca/YG-Proje1-Grup1/pull/62); P1-13).
- Yusuf'un bulduğu gecikme hatasını düzeltti ve regresyon testi ekledi
  ([#68](https://github.com/hilalakca/YG-Proje1-Grup1/pull/68)).
- Uygulamayı GitHub Pages'te yayına aldı ([#84](https://github.com/hilalakca/YG-Proje1-Grup1/pull/84)).
- Kendi görevini ekleme, düzenleme, silme formunu ([#91](https://github.com/hilalakca/YG-Proje1-Grup1/pull/91);
  P1-07'ye ek) ve "Önümüzdeki 7 gün" panelini ([#92](https://github.com/hilalakca/YG-Proje1-Grup1/pull/92)) yazdı.
- 7 Kasım'da entegrasyon denemesi yaptı: kabul kriterleri karşılanan 17 issue'yu kanıtıyla kapattı, bulunan
  hatayı kaydetti ([#98](https://github.com/hilalakca/YG-Proje1-Grup1/issues/98)).
- Ekip arkadaşlarının PR'larını inceledi (#65, #95, #96, #101, #102, #106, #108); belgeleri her birleşmeden sonra güncel
  tuttu ([#69](https://github.com/hilalakca/YG-Proje1-Grup1/pull/69), [#100](https://github.com/hilalakca/YG-Proje1-Grup1/pull/100), [#104](https://github.com/hilalakca/YG-Proje1-Grup1/pull/104)) ve katkı tablosunu hazırladı
  ([#105](https://github.com/hilalakca/YG-Proje1-Grup1/pull/105); P1-19); teslim kontrol listesini ve v1.0.0 sürüm notu taslağını yazdı
  ([#109](https://github.com/hilalakca/YG-Proje1-Grup1/pull/109); P1-20).

**Fatih Ulupınar (Analist + Geliştirici)**

- Kullanıcı ihtiyaç analizi ve kullanıcı hikâyeleri ([#1](https://github.com/hilalakca/YG-Proje1-Grup1/issues/1), kapandı).
- İlk iskelet ve temel JS dosyaları (27 Ekim; sonradan `main`'deki sürümle değiştirildi); analiz ve veri
  modeli raporu (2 Kasım).
- Gereksinim belgesini yazdı: 13 fonksiyonel, 13 fonksiyonel olmayan gereksinim, 17 kullanıcı hikâyesi ve
  kabul kriterleri; eski taslakları arşive taşıdı ([#95](https://github.com/hilalakca/YG-Proje1-Grup1/pull/95); P1-02).
- Örnek veri tutarlılığı ve `localStorage` dayanıklılığı için 10 birim testi ekledi
  ([#96](https://github.com/hilalakca/YG-Proje1-Grup1/pull/96); P1-09, P1-14).
- Gereksinim belgesine görev formu (FR-14, US-18) ve 7 gün panelini (FR-15, US-19) ekledi; uygulanmayan zaman
  çizelgesini (US-16) "sonraki sürüm" olarak işaretledi ([#106](https://github.com/hilalakca/YG-Proje1-Grup1/pull/106)).

**Ayşe Yurtseven (Dokümantasyon + Geliştirici)**

- Sayfa haritası, kullanıcı akışı, masaüstü wireframe, kullanıcı kılavuzu ve rapor/sunum taslağını hazırladı
  ([#65](https://github.com/hilalakca/YG-Proje1-Grup1/pull/65), birleşti; mobil wireframe bekleniyor).

**Yusuf Veis (Test / Kalite + Geliştirici)**

- `js/logic.js` için 37 birim testi yazdı ([#63](https://github.com/hilalakca/YG-Proje1-Grup1/pull/63); P1-10.1).
- Testleri her push ve PR'da çalıştıran GitHub Actions iş akışını ve test senaryoları belgesinin ilk taslağını
  ekledi ([#67](https://github.com/hilalakca/YG-Proje1-Grup1/pull/67); P1-10.2, P1-15).
- Hafta kartlarındaki iki erişilebilirlik hatasını düzeltti: klavyeyle açınca odak kaybı ve düğme içindeki
  başlık ([#101](https://github.com/hilalakca/YG-Proje1-Grup1/pull/101); #93, #98).
- Gecikme kontrolündeki saat dilimi hatasını buldu ve kaydetti
  ([#66](https://github.com/hilalakca/YG-Proje1-Grup1/issues/66)).
- Görev formu ve 7 gün paneli için test senaryoları (TC-24, TC-25), hata kayıtları ve gereksinim–test
  eşleştirmesini yazdı ([#102](https://github.com/hilalakca/YG-Proje1-Grup1/pull/102); P1-16); #104, #105 ve #109'u inceleyip onayladı.

## Özellikler

10 Kasım 2026 itibarıyla:

| Özellik                                                      | Takip listesi | Durum                                                                                                   |
| ------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------- |
| Haftalık ders kartları ve hafta detayı (hedefler, kaynaklar) | P1-06         | Test edildi; klavye hataları [#101](https://github.com/hilalakca/YG-Proje1-Grup1/pull/101) ile düzeltildi |
| Görev listesi ve durum değiştirme                            | P1-07         | Test edildi                                                                                             |
| Son tarihi geçmiş görevin işaretlenmesi                      | P1-07         | Test edildi                                                                                             |
| Responsive düzen: 360, 768, 1280 px'de taşma yok, ≥ 44 px dokunma hedefleri | P1-08 | Test edildi; ekran görüntüleri bekleniyor ([#39](https://github.com/hilalakca/YG-Proje1-Grup1/issues/39)) |
| Klavyeyle kullanım, "Görevlere geç" bağlantısı               | P1-08         | Test edildi                                                                                             |
| Duruma ve haftaya göre filtre, Türkçe karakter uyumlu arama  | P1-11         | Test edildi                                                                                             |
| Genel ve haftalık ilerleme göstergesi                        | P1-12         | Test edildi                                                                                             |
| Açık/koyu tema, tercih kalıcılığı                            | P1-13         | Test edildi                                                                                             |
| Görev durumlarının `localStorage`'da saklanması, bozuk kayda dayanıklılık | P1-14 | Test edildi                                                                                         |
| İlerlemeyi sıfırlama (onaylı)                                | P1-14         | Test edildi                                                                                             |
| Kendi görevini ekleme, düzenleme, silme; form doğrulaması    | P1-07 (#85)   | Test edildi (birim testler, TC-24) |
| Önümüzdeki 7 gün: yaklaşan ve süresi geçen görevler          | #86 (ek)      | Test edildi (birim testler, TC-25) |

"Test edildi": kabul kriterleri tarayıcıda denendi; kanıtı ilgili issue'nun kapanış yorumunda ve
[`docs/test-senaryolari.md`](docs/test-senaryolari.md)'de (TC-01–TC-25).

Arayüzün arkasındaki hesaplar (ilerleme, filtre ve arama, durum değiştirme, gecikme, form doğrulaması, veri
doğrulama, depolama) **65 birim testiyle** denetleniyor (`tests/`).

## Ekranın bölümleri

Uygulama tek sayfadır; bölümler yukarıdan aşağıya:

| Bölüm          | İçerik                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------ |
| Üst çubuk      | Dersin adı ve dönemi, görev arama kutusu, tema düğmesi                                           |
| Genel ilerleme | Halka gösterge (%), "tamamlanan / toplam görev" sayısı; önümüzdeki 7 günün görevleri ve gecikenler |
| Haftalar       | Hafta kartları (no, başlık, açıklama, ilerleme çubuğu); seçilen haftanın hedefleri ve kaynakları |
| Görevler       | **Görev ekle** formu, durum ve hafta filtresi, sonuç sayısı, görev listesi ve durum düğmeleri; kendi görevlerinde Düzenle/Sil |
| Alt bilgi      | İlerlemeyi sıfırlama                                                                             |

Sayfa haritası ve kullanıcı akışı: [docs/sayfa-haritasi-ve-kullanici-akisi.md](docs/sayfa-haritasi-ve-kullanici-akisi.md);
masaüstü wireframe: [docs/wireframes.svg](docs/wireframes.svg)
([P1-04 #7](https://github.com/hilalakca/YG-Proje1-Grup1/issues/7); mobil wireframe bekleniyor,
[#27](https://github.com/hilalakca/YG-Proje1-Grup1/issues/27)).

## Kullanılan teknolojiler

| Teknoloji                         | Projede ne için kullanılıyor                                                      |
| --------------------------------- | --------------------------------------------------------------------------------- |
| HTML5                             | Sayfa iskeleti, anlamlı etiketler (`header`, `main`, `section`), erişilebilirlik  |
| CSS3 (değişkenler, Grid, Flexbox) | Tasarım, responsive düzen, açık/koyu tema                                         |
| JavaScript (ES modülleri)         | Arayüz, olaylar, iş mantığı; ek kütüphane yok                                     |
| `localStorage`                    | Görev durumlarını ve tercihleri tarayıcıda saklamak                               |
| JSON                              | Ders içeriği (`data/course.json`)                                                 |
| Git ve GitHub                     | Sürüm kontrolü ve bireysel katkının kaydı                                         |
| GitHub Projects                   | Görev takibi ve iş bölümü (issue'lar ve pano)                                     |
| Node.js test çalıştırıcısı        | Birim testleri (`node --test`), ek paket gerekmez                                 |
| GitHub Actions                    | Her push ve PR'da testleri otomatik çalıştırmak                                   |

## Kurulum ve çalıştırma

### Gereksinimler

- Güncel bir tarayıcı (Chrome, Edge, Firefox, Safari)
- Yerel sunucu için **Python 3** ya da **Node.js** (hangisi varsa)
- **Git**

### Adımlar

```bash
git clone https://github.com/hilalakca/YG-Proje1-Grup1.git
cd YG-Proje1-Grup1
```

Uygulama `fetch` ve ES modülleri kullandığı için `index.html`'i çift tıklayıp açmak yerine basit bir yerel
sunucu gerekir. Ek kurulum (npm install vb.) gerekmez. Proje klasöründe şu komutlardan birini çalıştırın:

```bash
# Windows (PowerShell) -> "python"
python -m http.server 8000

# macOS / Linux -> "python3"
python3 -m http.server 8000

# veya Node ile (tüm sistemlerde)
npx serve .
```

Ardından tarayıcıda `http://localhost:8000` adresini açın. VS Code kullanıyorsanız **Live Server**
eklentisiyle `index.html`'i açmak da yeterlidir.

### Testleri çalıştırma

Node.js 20 veya üstü gerekir; ek paket kurulmaz.

```bash
node --test "tests/*.test.mjs"
```

Üç test dosyası var: `logic.test.mjs` (iş mantığı), `course-data.test.mjs` (örnek verinin tutarlılığı),
`storage.test.mjs` (`localStorage` kapalı ya da bozukken davranış). 10 Kasım itibarıyla 65 testin hepsi geçiyor.

Aynı testler her push ve PR'da GitHub Actions'ta da çalışır; sonuç PR sayfasındaki **Checks** bölümünde
görünür. Testi geçmeyen PR birleştirilmez.

## Proje yapısı: hangi dosya ne işe yarar?

```
index.html            Sayfa iskeleti
css/styles.css        Tasarım belirteçleri, tema, responsive düzen
js/main.js            Arayüz: çizim ve olaylar
js/logic.js           Saf iş mantığı: doğrulama, ilerleme, filtre, arama (DOM'a dokunmaz)
js/storage.js         localStorage sarmalayıcısı (hata toleranslı)
data/course.json      Ders içeriği (örnek veri)
favicon.svg           Sekme simgesi
tests/                Birim testleri: logic, course-data, storage
docs/gereksinimler.md Gereksinimler, kullanıcı hikâyeleri, kabul kriterleri
docs/data-model.md    Veri modeli ve ilerleme hesabı
docs/mimari.md        Modüller, veri akışı, ekran bölümü ↔ kod eşlemesi
docs/tema-ve-kontrast.md  Tema davranışı ve kontrast ölçümleri
docs/test-senaryolari.md  Elle yapılan test senaryoları ve sonuçları
docs/kullanici-kilavuzu.md  Kullanıcı kılavuzu
docs/kisa-proje-raporu.*  Kısa proje raporu (md, docx); docs/proje-sunumu.pptx sunum
docs/katki-tablosu.md     Ekip katkı tablosu
docs/teslim-kontrol-listesi.md  Teslim paketi, prova ve teslim günü listesi
docs/arsiv/           Eski taslaklar (yalnızca geçmiş kaydı)
.github/              PR şablonu, GitHub Actions test iş akışı
```

### İçeriği düzenleme

Hafta ve görevler `data/course.json` dosyasındadır; kodu değiştirmeden yeni hafta veya görev eklenebilir.
Alan açıklamaları [docs/data-model.md](docs/data-model.md)'de. `data/course.json` içindeki içerik örnektir.

## Veri modeli ve veri akışı

İçerik ile kullanıcı durumu ayrı tutulur:

| Veri               | Nerede                             | Kim değiştirir               |
| ------------------ | ---------------------------------- | ---------------------------- |
| Haftalar, görevler | `data/course.json`                 | Ders sorumlusu (salt okunur) |
| Görev durumları    | `localStorage` → `ldp:v1:progress` | Öğrenci                      |
| Kendi eklediği görevler | `localStorage` → `ldp:v1:userTasks` | Öğrenci                 |
| Tema ve filtreler  | `localStorage` → `ldp:v1:prefs`    | Öğrenci                      |

Akış: sayfa açılınca `main.js` içeriği `fetch` ile okur, `logic.js`'teki `validateCourse` ile doğrular
(geçersiz kayıtlar atlanır), kayıtlı durumu `storage.js` ile yükler ve ekranı çizer. Öğrenci bir görevin
durumunu değiştirince yeni durum `localStorage`'a yazılır, ilerleme yeniden hesaplanır. Yüzdeler saklanmaz,
her seferinde hesaplanır. Ayrıntılar: [docs/data-model.md](docs/data-model.md).

## Çalışma düzeni: GitHub Projects

Görevler GitHub Projects panosunda takip edilir. Panodaki her kart bir **GitHub issue**'sudur; görev, dal,
commit ve PR aynı yerde durur.

Hocanın takip listesindeki her madde (P1-01…P1-20) bir issue'dur. Issue başlığı madde koduyla başlar
(`P1-11 Arama ve durum/hafta filtresi`); içinde beklenen çıktı ve **kabul kriterleri** yazar. Büyük maddeler
**alt görevlere** (sub-issue) bölünür; alt görevler de panoda görünür. Bütün işler
**Teslim (11 Kasım 2026)** milestone'una bağlıdır; kaç işin bittiği milestone sayfasında yüzde olarak görünür.

### Pano

- **Pano:** https://github.com/users/hilalakca/projects/1 (repo sayfasındaki **Projects** sekmesinden de açılır).
  Pano gizlidir; yalnızca ekip üyeleri görür.
- **Sütunlar (Status):**

  | Sütun        | Anlamı                                  |
  | ------------ | --------------------------------------- |
  | Yapılacaklar | Görev açıldı, henüz başlanmadı          |
  | Yapılıyor    | Görevi üstlenen kişi üzerinde çalışıyor |
  | İnceleme     | PR açıldı, bir ekip arkadaşı inceliyor  |
  | Test         | Kabul kriterleri deneniyor              |
  | Yapıldı      | PR birleşti ya da issue kapandı         |

- **Öncelik** alanı: En yüksek / Yüksek / Orta / Düşük. Takip listesine göre gecikmiş 1–2. hafta işleri
  **En yüksek**, 3. hafta işleri **Yüksek**, 4. hafta işleri **Orta** önceliklidir.
- **Etiketler:**

  | Etiket                | Anlamı                                     |
  | --------------------- | ------------------------------------------ |
  | `enhancement`         | Özellik                                    |
  | `bug`                 | Hata                                       |
  | `documentation`       | Belge, rapor, sunum                        |
  | `test`                | Test senaryosu, test kodu, kalite kontrol  |
  | `hafta-1` … `hafta-4` | Takip listesinde hangi haftanın işi olduğu |

### Görev akışı

1. Issue'yu kendinize atayın (sorumlular atanmış durumda) ve kartı panoda **Yapılıyor** sütununa taşıyın.
2. `main` dalından, issue numarasıyla bir dal açın:

   ```bash
   git switch main
   git pull
   git switch -c feat/13-arama-filtre
   ```

3. Küçük ve anlamlı commitler atın; mesajı aşağıdaki kurallara göre yazın.
4. Dalı GitHub'a gönderin ve PR açın. Şablondaki `Closes #` satırını issue numarasıyla tamamlayın
   (`Closes #13`); kart kendiliğinden **İnceleme** sütununa geçer.
5. En az bir ekip arkadaşı PR'ı inceler ve onaylar. Kart **Test** sütununa taşınır; test sorumlusu kabul
   kriterlerini dener.
6. PR `main`'e **Create a merge commit** ile birleştirilir; böylece her commit geçmişte ayrı ayrı görünür.
   Issue kendiliğinden kapanır ve kart **Yapıldı** sütununa geçer.

Hatalar `bug` etiketiyle ayrı issue olarak açılır ve düzeltme PR'ına bağlanır. Mesajında `#13` geçen commit ve
PR'lar issue sayfasının akışında görünür; bu, kimin hangi görevi hangi kodla yaptığının kanıtıdır.

Panonun otomasyonları **⋯ → Workflows** bölümündedir:

| Ne olunca                               | Kart nereye geçer  | Otomasyon                        |
| --------------------------------------- | ------------------ | -------------------------------- |
| Repoda yeni issue açılınca              | Yapılacaklar       | Auto-add to project, Item added  |
| Bir issue'ya alt görev eklenince        | Panoya eklenir     | Auto-add sub-issues to project   |
| Issue'ya `Closes #13` ile PR bağlanınca | İnceleme           | Pull request linked to issue     |
| PR birleşince ya da issue kapanınca     | Yapıldı            | Pull request merged, Item closed |
| Kapalı issue yeniden açılınca           | Yapılıyor          | Item reopened                    |
| Kart elle Yapıldı'ya taşınınca          | (issue da kapanır) | Auto-close issue                 |

**Yapılıyor** ve **Test** sütunlarına kartı elle taşıyın.

### Commit mesajı nasıl yazılır?

Hoca bireysel katkıyı commit geçmişinden değerlendirir; her commit **ne yapıldığını ve nedenini** anlatmalı:

```text
<tür>: <ne yapıldı, kısa ve emir kipinde> (#<issue no>)

<Bir cümleyle neden yapıldığı.>

- <Değişiklik 1>
- <Değişiklik 2>
```

| Tür        | Ne zaman                                 |
| ---------- | ---------------------------------------- |
| `feat`     | Yeni özellik                             |
| `fix`      | Hata düzeltme                            |
| `style`    | Görünüm ve tasarım değişikliği           |
| `refactor` | Davranışı değiştirmeden kodu düzenleme   |
| `docs`     | README, rapor, belgeler                  |
| `test`     | Test ekleme veya düzeltme                |
| `chore`    | Ayar, klasör düzeni gibi ürün dışı işler |

Örnek: `feat: görevlere durum filtresi ekle (#13)`. Başlık kısa olsun (~72 karakter), issue numarası
başlığın sonuna yazılsın. `update`, `son hali` gibi açıklamasız mesajlar kullanılmaz.

### Commitlere nereden bakılır?

- **Tüm commitler:** https://github.com/hilalakca/YG-Proje1-Grup1/commits/main
- **Kişi bazında katkı:** **Insights → Contributors**. Yalnızca `main`'e giren ve git e-postası GitHub
  hesabıyla eşleşen commitler sayılır.

### Kurallar

- Herkes **kendi GitHub hesabıyla, kendi bilgisayarından** commit atar. Git e-postanız GitHub hesabınızdakiyle
  aynı olmalı: `git config user.email "github-adresiniz"`. Başkasının hesabıyla commit atılmaz.
- `main` dalına doğrudan commit atılmaz.
- Son gün toplu commit yerine düzenli ve küçük commitler atılır.
- **Test edilmeyen iş bitmiş sayılmaz.** Issue, kabul kriterleri denenmeden kapatılmaz; kart **Yapıldı**'ya
  geçmeden önce **Test** sütunundan geçer.
- Kod içindeki adlar (değişken, fonksiyon) İngilizce; ekranda görünen metinler Türkçedir.

### Süreç kaydı hakkında not

1–3. haftalarda iş takibi GitHub'da düzenli tutulmadı: issue'lar takip listesiyle eşleşmiyordu ve kod tek
seferde `main`'e eklendi. 5 Kasım 2026'da takip listesindeki her madde issue olarak açıldı ve yukarıdaki düzen
kuruldu. Bu tarihten önceki geçmiş olduğu gibi bırakıldı.

## Gizlilik

Uygulama hiçbir veriyi sunucuya göndermez. Görev durumları, eklenen görevler ve tercihler yalnızca
kullanıcının kendi tarayıcısında (`localStorage`) tutulur; **İlerlemeyi sıfırla** düğmesiyle silinir. Hesap, giriş ya da kişisel
veri yoktur.

## Bilinen eksikler

10 Kasım 2026 itibarıyla:

- "Ders yolculuğu (zaman çizelgesi)" görünümü (FR-12, US-16) uygulanmadı; haftalar kart ızgarasıyla gösteriliyor.
  Gereksinim belgesinde "sonraki sürüm" olarak işaretli ([#106](https://github.com/hilalakca/YG-Proje1-Grup1/pull/106)).
- Veriler cihaza ve tarayıcıya özeldir; başka cihazda ilerleme görünmez.
- Ders sorumlusu öğrencilerin ilerlemesini göremez (backend kapsam dışı).
- Arayüz kodu (`js/main.js`) otomatik testle değil, tarayıcıda elle test ediliyor.

## Teslim dosyaları

10 Kasım 2026 itibarıyla:

| Dosya                                    | İçerik                                                                                                     | Durum      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------- |
| [`docs/gereksinimler.md`](docs/gereksinimler.md) | Gereksinimler ve kabul kriterleri ([P1-02 #5](https://github.com/hilalakca/YG-Proje1-Grup1/issues/5)) | Var (FR-01–FR-15, US-01–US-19) |
| [`docs/sayfa-haritasi-ve-kullanici-akisi.md`](docs/sayfa-haritasi-ve-kullanici-akisi.md), [`docs/wireframes.svg`](docs/wireframes.svg) | Sayfa haritası ve masaüstü wireframe ([P1-04 #7](https://github.com/hilalakca/YG-Proje1-Grup1/issues/7)) | Var; mobil wireframe bekleniyor (#27) |
| [`docs/test-senaryolari.md`](docs/test-senaryolari.md) | Test senaryoları ve hata kaydı ([P1-15 #2](https://github.com/hilalakca/YG-Proje1-Grup1/issues/2)) | Var: TC-01–TC-25, hata kayıtları, gereksinim–test eşleştirmesi |
| [`docs/kullanici-kilavuzu.md`](docs/kullanici-kilavuzu.md) | Kullanıcı kılavuzu ([P1-17 #3](https://github.com/hilalakca/YG-Proje1-Grup1/issues/3)) | Var; ekran görüntüleri bekleniyor (#74) |
| [`docs/kisa-proje-raporu.md`](docs/kisa-proje-raporu.md) (+ `.docx`) | Kısa proje raporu ([P1-18 #18](https://github.com/hilalakca/YG-Proje1-Grup1/issues/18)) | Var; `.docx` ve PDF güncel değil (#76) |
| [`docs/proje-sunumu.pptx`](docs/proje-sunumu.pptx) | Grup sunumu ([P1-18 #18](https://github.com/hilalakca/YG-Proje1-Grup1/issues/18))                         | Taslak (#77) |
| `docs/screenshots/`                      | Masaüstü ve mobil ekran görüntüleri ([P1-08 #10](https://github.com/hilalakca/YG-Proje1-Grup1/issues/10)) | Henüz yok (#39) |
| [`docs/katki-tablosu.md`](docs/katki-tablosu.md) | Ekip katkı tablosu ([P1-19 #19](https://github.com/hilalakca/YG-Proje1-Grup1/issues/19)) | Var (10 Kasım); teslimden önce son güncelleme (#78) |
| [`docs/teslim-kontrol-listesi.md`](docs/teslim-kontrol-listesi.md) | Teslim paketi, rubrik kanıtları, prova ve teslim günü listesi ([P1-20 #20](https://github.com/hilalakca/YG-Proje1-Grup1/issues/20)) | Var (10 Kasım) |
| [`docs/surum-notu-v1.0.0.md`](docs/surum-notu-v1.0.0.md) | v1.0.0 sürüm notu ([#81](https://github.com/hilalakca/YG-Proje1-Grup1/issues/81)) | Taslak; etiket teslim günü |

Ekran görüntüleri `docs/screenshots/` klasörüne `responsive-360.png`, `responsive-768.png` ve
`responsive-1280.png` adlarıyla eklenecek; wireframe gerçek ekran görüntüsü yerine kullanılmaz.
