# Ekip Katkı Tablosu

**Proje:** Etkileşimli Ders Deneyimi Panosu · Grup 1
**Durum:** 11 Kasım 2026, teslim günü; son hali (#113 birleştikten sonra). Açık PR'lar birleşince ve teslimden önce son kez güncellenecek (P1-19, #78).

Veriler GitHub'dan alındı: `main` dalındaki commitler, birleşen PR'lar ve issue kayıtları. Kişi bazında commit
listesi: [Insights → Contributors](https://github.com/hilalakca/YG-Proje1-Grup1/graphs/contributors).

## Özet

| Üye | Rol | `main`'deki commit | Birleşen PR | PR incelemesi | Değişen satır* |
| --- | --- | ---: | ---: | ---: | ---: |
| Hilal Akça ([@hilalakca](https://github.com/hilalakca)) | Lider + Geliştirici | 40 | 18 | 11 | +2667 / −1317 |
| Fatih Ulupınar ([@fatih-software](https://github.com/fatih-software)) | Analist + Geliştirici | 5 | 3 | 0 | +1434 / −3 |
| Yusuf Veis ([@ManufactoredConductor](https://github.com/ManufactoredConductor)) | Test / Kalite + Geliştirici | 13 | 3 | 4 | +618 / −62 |
| Ayşe Yurtseven ([@ayseyurtseven](https://github.com/ayseyurtseven)) | Dokümantasyon + Geliştirici | 1 | 1 (#108 birleşmedi) | 0 | +111 / −0 (+ `.docx`, `.pptx`) |

\* Birleştirme commitleri hariç; ikili dosyalar (`.docx`, `.pptx`, PDF) satır olarak sayılmaz. Satır sayısı emeğin
ölçüsü değildir, yalnızca kayıttır. Hilal'in sayılarına teslim günü devralınan belgeler ve Ayşe'nin mobil wireframe
dosyasının eklenmesi (`81827af`, dosya Ayşe'nin) de dahildir.

Yusuf'un yerel git adı `Conductor-exe`'dir; commitleri e-posta üzerinden @ManufactoredConductor hesabına bağlıdır.
#67'deki iki commit Yusuf'un kapanan PR'ından (#64) yazarlığı korunarak aktarıldı.

## Kim ne yaptı?

### Hilal Akça — Lider + Geliştirici

| İş | Kanıt |
| --- | --- |
| Depo, ilk uygulama kodu (`index.html`, `css/`, `js/`, `data/course.json`) | 4 Kasım commitleri (`651971a`, `5e36bff`, `9ceff00`, `04bdcf7`) |
| Takip listesini issue'lara, alt görevlere ve GitHub Projects panosuna dökme; README ve çalışma düzeni (P1-03) | [#21](https://github.com/hilalakca/YG-Proje1-Grup1/pull/21) |
| Geliştirme ortamı, mimari belgesi (P1-05) | [#60](https://github.com/hilalakca/YG-Proje1-Grup1/pull/60) |
| Haftalık ilerleme yüzdesi (P1-12) | [#61](https://github.com/hilalakca/YG-Proje1-Grup1/pull/61) |
| Tema ve kontrast düzeltmeleri (P1-13) | [#62](https://github.com/hilalakca/YG-Proje1-Grup1/pull/62) |
| Gecikme hatası düzeltmesi (#66) | [#68](https://github.com/hilalakca/YG-Proje1-Grup1/pull/68) |
| GitHub Pages canlı demo (P1-20.1) | [#84](https://github.com/hilalakca/YG-Proje1-Grup1/pull/84) |
| Kendi görevini ekleme/düzenleme/silme formu (P1-07'ye ek) | [#91](https://github.com/hilalakca/YG-Proje1-Grup1/pull/91) |
| "Önümüzdeki 7 gün" paneli, simge hatası (#94) | [#92](https://github.com/hilalakca/YG-Proje1-Grup1/pull/92) |
| README ve belge güncellemeleri | [#69](https://github.com/hilalakca/YG-Proje1-Grup1/pull/69), [#100](https://github.com/hilalakca/YG-Proje1-Grup1/pull/100), [#104](https://github.com/hilalakca/YG-Proje1-Grup1/pull/104) |
| Ekip katkı tablosu ve hesap kontrolü (P1-19) | [#105](https://github.com/hilalakca/YG-Proje1-Grup1/pull/105), [#107](https://github.com/hilalakca/YG-Proje1-Grup1/pull/107) |
| Teslim kontrol listesi, v1.0.0 sürüm notu taslağı (P1-20) | [#109](https://github.com/hilalakca/YG-Proje1-Grup1/pull/109) |
| Görev formunun açılışta görünmesi hatası (bulma ve düzeltme) | [#111](https://github.com/hilalakca/YG-Proje1-Grup1/issues/111) |
| Teslim günü devralınan işler: ekran görüntüleri, rapor PDF/Word, sunumun son hali (Ayşe'ye atanmıştı; aşağıdaki nota bakın) | #39, #73, #74, #76, #77 |
| PR incelemeleri | #65, #95, #96, #101, #102, #106, #108 |
| 7 Kasım entegrasyon denemesi, bulunan hata kaydı | [#98](https://github.com/hilalakca/YG-Proje1-Grup1/issues/98) |

### Fatih Ulupınar — Analist + Geliştirici

| İş | Kanıt |
| --- | --- |
| İlk iskelet ve temel JS dosyaları (27 Ekim; sonradan yeniden yazıldı) | `7a67763` |
| Analiz ve veri modeli raporu (2 Kasım; eski taslak olarak `docs/arsiv/`'de) | `fb7be4b` |
| Kullanıcı ihtiyaç analizi ve kullanıcı hikâyeleri (P1-01) | [#1](https://github.com/hilalakca/YG-Proje1-Grup1/issues/1) |
| Gereksinim belgesi: 13 FR, 13 NFR, 17 kullanıcı hikâyesi, kabul kriterleri (P1-02) | [#95](https://github.com/hilalakca/YG-Proje1-Grup1/pull/95) |
| Örnek veri ve `localStorage` dayanıklılık testleri, 10 test (P1-09, P1-14) | [#96](https://github.com/hilalakca/YG-Proje1-Grup1/pull/96) |
| Gereksinimlere görev formu (FR-14/US-18) ve 7 gün paneli (FR-15/US-19); US-16 "sonraki sürüm" | [#106](https://github.com/hilalakca/YG-Proje1-Grup1/pull/106) |

### Yusuf Veis — Test / Kalite + Geliştirici

| İş | Kanıt |
| --- | --- |
| `js/logic.js` için 37 birim testi (P1-10.1) | [#63](https://github.com/hilalakca/YG-Proje1-Grup1/pull/63) |
| GitHub Actions test iş akışı, test senaryoları belgesi TC-01–TC-23 (P1-10.2, P1-15) | [#67](https://github.com/hilalakca/YG-Proje1-Grup1/pull/67) |
| Gecikme hatasını bulup kaydetme | [#66](https://github.com/hilalakca/YG-Proje1-Grup1/issues/66) |
| Hafta kartında odak kaybı ve başlık yapısı düzeltmesi (#93, #98) | [#101](https://github.com/hilalakca/YG-Proje1-Grup1/pull/101) |
| TC-24/TC-25, hata kayıtları, gereksinim–test eşleştirmesi (P1-16) | [#102](https://github.com/hilalakca/YG-Proje1-Grup1/pull/102) |
| #104, #105 ve #109'un incelenip onaylanması | [#104](https://github.com/hilalakca/YG-Proje1-Grup1/pull/104), [#105](https://github.com/hilalakca/YG-Proje1-Grup1/pull/105), [#109](https://github.com/hilalakca/YG-Proje1-Grup1/pull/109) |

### Ayşe Yurtseven — Dokümantasyon + Geliştirici

| İş | Kanıt |
| --- | --- |
| Sayfa haritası ve kullanıcı akışı, masaüstü wireframe (P1-04) | [#65](https://github.com/hilalakca/YG-Proje1-Grup1/pull/65) |
| Kullanıcı kılavuzu ilk sürümü (P1-17) | [#65](https://github.com/hilalakca/YG-Proje1-Grup1/pull/65) |
| Kısa rapor (md, docx) ve sunum taslağı (P1-18) | [#65](https://github.com/hilalakca/YG-Proje1-Grup1/pull/65) |
| Mobil wireframe ve ilk ekran görüntüleri | [#108](https://github.com/hilalakca/YG-Proje1-Grup1/pull/108) (9 Kasım; düzeltme istendi, birleşmedi). Mobil wireframe `docs/wireframe-mobil.svg` olarak Ayşe'nin adıyla alındı |

## Kendi hesabıyla katkı kontrolü (P1-19.2, #79)

| Üye | Kendi hesabından commit | Kendi hesabından PR | GitHub hesabına bağlı | Sonuç |
| --- | --- | --- | --- | --- |
| Hilal | Var | Var | Evet | Uygun |
| Fatih | Var | Var (#95, #96, #106) | Evet | Uygun |
| Yusuf | Var | Var (#63, #101, #102) | Evet (`Conductor-exe` adıyla) | Uygun |
| Ayşe | Var | Var (#65, #108) | Evet | Uygun |

Başka bir üyenin hesabıyla atılmış commit yoktur. Lider, ekip arkadaşlarının dallarına yalnızca inceleme sırasında
küçük düzeltme commitleri ekledi (#65'te iki commit); bunlar Hilal'in adıyla görünür.

## Not: issue sayıları

Issue sayıları katkı ölçüsü olarak kullanılmamalıdır. 7 Kasım'da kodu önceden yazılmış ama kimse doğrulamadığı için
açık kalan 17 issue, lider tarafından tarayıcıda doğrulanarak kapatıldı; bu issue'lar atandıkları kişinin üzerinde
görünse de işi yapanı kapanış yorumları gösterir.

## Not: teslim günü devralınan işler

Ayşe Yurtseven'e atanan ekran görüntüleri (#39, #73, #74), raporun PDF ve Word sürümü (#76) ve sunumun son hali (#77)
teslim gününe kadar `main`'e girmedi: 9 Kasım'da açılan [#108](https://github.com/hilalakca/YG-Proje1-Grup1/pull/108) projenin eski bir kopyasını içerdiği için
düzeltme istendi ve düzeltilmedi. Bu işler 11 Kasım'da lider tarafından tamamlandı; ilgili issue'ların kapanış
yorumlarında da yazılıdır. Mobil wireframe (#27) Ayşe'nin dosyasıdır. README'yi projeyi bilmeyen biriyle deneme işi
(#75) yapılmadı.
