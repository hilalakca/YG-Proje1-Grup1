# Teslim Kontrol Listesi

**Proje:** Etkileşimli Ders Deneyimi Panosu · Grup 1
**Teslim:** 11 Kasım 2026 · **Sorumlu:** Hilal Akça (P1-20, [#20](https://github.com/hilalakca/YG-Proje1-Grup1/issues/20))
**Durum:** 9 Kasım 2026 öğleden sonra itibarıyla

Hocanın teknik dokümanındaki "Teslim paketi" ve "Değerlendirme rubriği" bölümlerine göre hazırlandı.

## 1. Teslim paketi

| # | Hocanın istediği | Bizdeki karşılığı | Durum | Sorumlu |
| --- | --- | --- | --- | --- |
| 1 | GitHub repository ve README | https://github.com/hilalakca/YG-Proje1-Grup1, [README](../README.md) | Hazır | Hilal |
| 2 | Çalışan web uygulaması | `index.html`, `css/`, `js/`, `data/course.json`; 65 birim testi geçiyor | Hazır | Ekip |
| 3 | Proje raporu | [`kisa-proje-raporu.md`](kisa-proje-raporu.md) güncel; `.docx` ve **PDF güncellenecek** | Bekliyor ([#76](https://github.com/hilalakca/YG-Proje1-Grup1/issues/76), #108) | Ayşe |
| 4 | Kullanıcı dokümantasyonu | [`kullanici-kilavuzu.md`](kullanici-kilavuzu.md) güncel; **ekran görüntüleri eklenecek** | Bekliyor ([#74](https://github.com/hilalakca/YG-Proje1-Grup1/issues/74), #108) | Ayşe |
| 5 | Sunum dosyası | [`proje-sunumu.pptx`](proje-sunumu.pptx) taslak; **son haline getirilecek** | Bekliyor ([#77](https://github.com/hilalakca/YG-Proje1-Grup1/issues/77)) | Ayşe + ekip |
| 6 | Canlı demo veya kurulum | Canlı demo: https://hilalakca.github.io/YG-Proje1-Grup1/ · kurulum: README → "Kurulum ve çalıştırma" | Hazır | Hilal |
| 7 | Bireysel yansıtma raporu ve akran değerlendirmesi | Her üye kendisi yazar ve LMS'e kendisi yükler | Bekliyor (#87–#90) | Herkes |

## 2. Rubrik (grup ürünü, 60 puan) ve kanıtlar

| Kriter | Puan | Kanıt | Eksik |
| --- | ---: | --- | --- |
| Temel işlevlerin çalışması | 15 | Hafta kartları ve detayı, görev durumu, filtre ve arama, ilerleme, tema, kalıcılık; TC-01–TC-16; 65 birim testi | — |
| Web arayüzü ve kullanıcı etkileşimi | 12 | Görev ekleme/düzenleme/silme formu, "Önümüzdeki 7 gün" paneli, anlık güncellenen ilerleme | — |
| Responsive tasarım ve kullanılabilirlik | 8 | 360/768/1280 px'de taşma yok, 44 px dokunma hedefleri, klavye ve odak (TC-17–TC-23), [kontrast ölçümü](tema-ve-kontrast.md) | Ekran görüntüleri (#39) |
| İhtiyaç analizi / kullanıcı senaryoları | 7 | [Gereksinimler](gereksinimler.md): FR-01–FR-15, US-01–US-19, kabul kriterleri, izlenebilirlik | — |
| Kod ve repository düzeni | 6 | Modüler kod (`logic` / `storage` / `main`), issue + dal + PR + inceleme düzeni, CI, [mimari](mimari.md) | `sonson/` kopyası `main`'e girmemeli (#108) |
| Rapor ve kullanıcı dokümanı | 7 | Rapor (md), kullanıcı kılavuzu, [test senaryoları](test-senaryolari.md), [katkı tablosu](katki-tablosu.md) | Rapor PDF'i, kılavuz görüntüleri |
| Sunum ve demo | 5 | Canlı demo | Sunumun son hali, prova |

Bireysel katkı (%40): GitHub katkısı, rol çıktısı, issue/task katkısı, akran değerlendirmesi ve sunum/demo
performansı. Kanıtlar: [katkı tablosu](katki-tablosu.md).

## 3. Takvim

| Ne zaman | İş | Kim |
| --- | --- | --- |
| 9 Kasım akşam | #102 (test belgesi) ve #108 (ekran görüntüleri, mobil wireframe, rapor PDF'i) birleşmiş olacak | Yusuf, Ayşe |
| 10 Kasım öğlen | Sunumun son hali (#77); yansıtma raporları (#87–#90) | Ayşe + ekip, herkes |
| 10 Kasım akşam | Demo provası (#82); katkı tablosunun son güncellemesi (#78) | Ekip, Hilal |
| 11 Kasım sabah | `v1.0.0` etiketi ve GitHub sürümü (#81); LMS teslimi (#83) | Hilal |

## 4. Demo provası (#82)

Provadan önce:

- [ ] Canlı demo yeni bir gizli pencerede açılıyor, konsolda hata yok.
- [ ] İnternet olmazsa diye yerel kurulum hazır: `python -m http.server 8000` → `http://localhost:8000`.
- [ ] Sunum dosyası son hali, herkesin anlatacağı bölüm belli.

Provada denenecek akış (ayrıntısı sunumda, #77):

1. Açılış: haftalar, genel ilerleme, "Önümüzdeki 7 gün".
2. Bir hafta kartını açma (fare ve klavyeyle).
3. Görev durumu değiştirme → ilerlemenin anında güncellenmesi.
4. Filtre + Türkçe arama ("İŞ" / "iş").
5. Kendi görevini ekleme, hatalı gönderimde hata mesajları, düzenleme, silme.
6. Tema değiştirme, sayfa yenileyince kalıcılık.
7. Mobil görünüm (360 px).
8. GitHub: görev panosu, bir issue → PR → inceleme → birleşme örneği, Actions'ta testler.

Prova sonrası: tarih, süre ve katılanlar #82'ye yazılır.

## 5. Teslim günü (#81, #83)

- [ ] Açık PR kalmadı; `main` güncel, CI yeşil.
- [ ] `v1.0.0` etiketi ve GitHub sürümü: [sürüm notu taslağı](surum-notu-v1.0.0.md).
- [ ] Canlı demo `v1.0.0` ile aynı kodu gösteriyor.
- [ ] LMS'e yüklenecekler: repo bağlantısı, canlı demo bağlantısı, rapor (PDF), kullanıcı kılavuzu, sunum dosyası.
- [ ] Herkes kendi yansıtma raporunu ve akran değerlendirmesini LMS'e yükledi.
- [ ] #20, #81, #82, #83 kapatıldı.
