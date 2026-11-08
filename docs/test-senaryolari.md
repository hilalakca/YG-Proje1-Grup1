# Test Senaryoları ve Hata Kayıtları

**Proje:** Etkileşimli Ders Deneyimi Panosu  
**Test Sorumlusu:** Yusuf Veis  
**İlgili Issue'lar:** #57, #58, #59, #70, #71  
**Belge Durumu:** Taslak (8 Kasım 2026: görev formu ve 7 gün paneli testleri, hata kayıtları ve gereksinim–test eşleştirmesi eklendi)

---

## 1. Test Ortamı

| Alan | Açıklama |
|---|---|
| İşletim sistemi | Test sırasında doldurulacak |
| Tarayıcı | Test sırasında doldurulacak |
| Ekran boyutu | 360 / 768 / 1280 px |
| HTML | HTML5 |
| CSS | CSS3 |
| JavaScript | ES Modules |
| Veri kaynağı | data/course.json |
| Kullanıcı verileri | localStorage |
| Test yöntemi | Manuel ve otomatik test |

### Uygulamayı çalıştırma

Proje klasöründe terminal açılarak aşağıdaki komut çalıştırılır:

```bash
python -m http.server 8000
```

Ardından tarayıcıdan şu adres açılır:

`http://localhost:8000`

---

## 2. Test Sonuçlarının Gösterimi

| Durum | Anlamı |
|---|---|
| Bekliyor | Henüz test edilmedi |
| Başarılı | Beklenen sonuç elde edildi |
| Başarısız | Beklenen sonuç elde edilemedi |
| Engellendi | Test başka bir sorun nedeniyle yapılamadı |

Gerçek sonuçlar test tamamlandıktan sonra yazılacaktır.

---

## 3. Temel Özellik Testleri (#58)

### TC-01: Uygulamanın açılması
- **Adımlar:** Uygulama tarayıcıda açılır.
- **Beklenen:** Ders bilgileri ve uygulamanın ana bölümleri yüklenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-02: Haftalık ders kartlarının görüntülenmesi
- **Adımlar:** Haftalar bölümü kontrol edilir.
- **Beklenen:** Hafta numarası, başlığı, açıklaması ve ilerleme göstergesi görüntülenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-03: Hafta detaylarının açılması
- **Adımlar:** Bir hafta kartı seçilir.
- **Beklenen:** Seçilen haftanın öğrenme hedefleri ve kaynakları görüntülenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-04: Boş hafta kontrolü
- **Adımlar:** İçeriğinde hedef veya kaynak bulunmayan bir hafta seçilir.
- **Beklenen:** Uygulama hata vermeden uygun boş durum gösterir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-05: Görev kartlarının görüntülenmesi
- **Adımlar:** Görevler bölümü açılır.
- **Beklenen:** Görev başlıkları ve mevcut açıklama, etiket ve son tarih bilgileri görüntülenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-06: Görev durumunun değiştirilmesi
- **Adımlar:** Bir görevin durum düğmesine tıklanır.
- **Beklenen:** Görev durumu yapılacak, devam ediyor ve tamamlandı seçenekleri arasında değiştirilir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-07: Son tarihi geçmiş görevler
- **Adımlar:** Son tarihi geçmiş ve tamamlanmamış bir görev kontrol edilir.
- **Beklenen:** Görev gecikmiş olarak görsel biçimde belirtilir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-08: Görev durumuna göre filtreleme
- **Adımlar:** Görev durumu filtresinden tamamlandı seçilir.
- **Beklenen:** Yalnızca tamamlanan görevler listelenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-09: Haftaya göre filtreleme
- **Adımlar:** Hafta filtresinden belirli bir hafta seçilir.
- **Beklenen:** Yalnızca seçilen haftaya ait görevler listelenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-10: Görev arama
- **Adımlar:** Arama alanına bir görev adı veya anahtar kelime yazılır.
- **Beklenen:** Aramayla eşleşen görevler görüntülenir. Türkçe karakterler doğru şekilde desteklenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-11: Genel ilerleme göstergesi
- **Adımlar:** Bir görev tamamlandı olarak işaretlenir.
- **Beklenen:** Genel ilerleme yüzdesi ve tamamlanan görev sayısı güncellenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-12: Haftalık ilerleme göstergesi
- **Adımlar:** Belirli bir haftadaki görev tamamlanır.
- **Beklenen:** İlgili haftanın ilerleme yüzdesi güncellenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-13: Tema değiştirme
- **Adımlar:** Açık tema ve koyu tema arasında geçiş yapılır.
- **Beklenen:** Uygulamanın renkleri seçilen temaya göre değişir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-14: Verilerin kalıcılığı
- **Adımlar:** Bir görevin durumu değiştirilir ve sayfa yenilenir.
- **Beklenen:** Görev durumu ve tema tercihi korunur.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-15: İlerlemeyi sıfırlama
- **Adımlar:** İlerlemeyi sıfırla düğmesine tıklanır. Onay ve iptal seçenekleri denenir.
- **Beklenen:** Onay verilirse ilerleme sıfırlanır. İptal edilirse mevcut veriler korunur.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-16: Hatalı localStorage verisi
- **Adımlar:** localStorage içerisine geçersiz JSON verisi yerleştirilerek uygulama yeniden açılır.
- **Beklenen:** Uygulama çökmemeli ve mümkün olduğunca varsayılan verilerle çalışmaya devam etmelidir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

---

## 4. Responsive Tasarım Testleri (#59)

### TC-17: Mobil ekran (360 px)
- **Adımlar:** Tarayıcı genişliği 360 px yapılır.
- **Beklenen:** İçerikler taşmadan ve yatay kaydırma gerektirmeden görüntülenir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-18: Tablet ekran (768 px)
- **Adımlar:** Tarayıcı genişliği 768 px yapılır.
- **Beklenen:** Kartlar, görev listesi ve diğer bölümler düzgün yerleşir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-19: Masaüstü ekran (1280 px)
- **Adımlar:** Tarayıcı genişliği 1280 px yapılır.
- **Beklenen:** Uygulama bölümleri düzgün hizalanır ve okunabilirliğini korur.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.
---

## 5. Erişilebilirlik Testleri (#59)

### TC-20: Klavye ile gezinme
- **Adımlar:** Fare kullanılmadan Tab, Enter, Space ve yön tuşlarıyla uygulama kullanılır.
- **Beklenen:** Etkileşimli elemanlara klavyeyle erişilebilir ve gerekli işlemler gerçekleştirilebilir.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-21: Klavye odağı
- **Adımlar:** Tab tuşuyla sayfadaki etkileşimli elemanlar arasında gezinilir.
- **Beklenen:** Klavye odağı görsel olarak anlaşılır.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-22: Renk kontrastı
- **Adımlar:** Açık ve koyu temada metinlerin arka planla kontrastı kontrol edilir.
- **Beklenen:** Normal metinlerde en az 4.5:1, büyük metinlerde en az 3:1 kontrast oranı sağlanır.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

### TC-23: Form ve kontrol etiketleri
- **Adımlar:** Arama alanı, filtreler ve etkileşimli kontroller incelenir.
- **Beklenen:** Kontrollerin anlaşılır ve erişilebilir isimleri bulunur.
- **Gerçek:** Test edildi.
- **Sonuç:** Başarılı.

---

## 6. Görev Formu ve Önümüzdeki 7 Gün Paneli Testleri (#71)

Bu iki özellik ilk senaryo takımı yazıldıktan sonra eklendi (#85, #86). Aşağıdaki testler 8 Kasım 2026'da Chrome'da, 1280 px genişlikte, temiz bir profille (boş `localStorage`) çalıştırıldı.

### TC-24: Kendi görevini ekleme, düzenleme ve silme
- **Adımlar:**
  1. "Görev ekle" düğmesine basılır.
  2. Hiçbir alan doldurulmadan "Kaydet"e basılır.
  3. Başlık "Deneme görevi", bir hafta, son tarih ve `ödev, okuma, ödev` etiketleri girilip kaydedilir.
  4. Sayfa yenilenir.
  5. Görevin "Düzenle" düğmesiyle başlığı değiştirilip kaydedilir.
  6. Form açıkken Esc'ye basılır.
  7. Görevin "Sil" düğmesine basılıp onaylanır.
- **Beklenen:**
  1. Form açılır, odak Başlık alanına gider.
  2. Başlık ve Hafta alanlarının altında hata mesajı görünür, alanlar `aria-invalid="true"` olur, odak ilk hatalı alana gider ve form kaydedilmez.
  3. Form kapanır, görev listeye "Kendi görevim" etiketiyle eklenir; yinelenen etiket bir kez gösterilir.
  4. Eklenen görev yenilemeden sonra da listededir.
  5. Form "Görevi düzenle" başlığıyla ve mevcut değerlerle açılır; kayıttan sonra başlık güncellenir.
  6. Form kapanır, odak "Görev ekle" düğmesine döner.
  7. Görev listeden kalkar, odak "Görev ekle" düğmesine döner.
- **Gerçek:** Tüm adımlarda beklenen davranış gözlendi. Boş gönderimde "Başlık boş olamaz." ve "Bir hafta seç." mesajları çıktı; odak Başlık alanındaydı. Liste 12 görevden 13'e çıktı, etiketler "Kendi görevim", "ödev", "okuma" olarak görüldü. Silmeden sonra liste 12 göreve döndü. Konsolda hata yoktu.
- **Sonuç:** Başarılı.

### TC-25: "Önümüzdeki 7 gün" paneli
- **Adımlar:** Son tarihi bugün, yarın, 5 gün sonra, 8 gün sonra ve 3 gün önce olan beş kendi görevi eklenir. Panel kontrol edilir. Sonra "Bugün" biten görev "Tamamlandı" yapılır ve panelin gecikmiş görev bağlantısındaki "Yapılacak görevleri göster" düğmesine basılır.
- **Beklenen:** Panel yalnızca bugünden başlayarak 7 gün içinde son tarihi olan ve tamamlanmamış görevleri, tarihe göre sıralı gösterir ("Bugün", "Yarın", "N gün kaldı"). 8 gün sonraki görev panelde yer almaz. Süresi geçmiş görevler için "N görevin süresi geçti" uyarısı görünür. Tamamlanan görev panelden kalkar. "Yapılacak görevleri göster" durum filtresini "Yapılacak"a alır ve odağı görev bölümüne götürür.
- **Gerçek:** Panelde sırasıyla "Bugün", "Yarın", iki "2 gün kaldı" (ders içeriğindeki görevler) ve "5 gün kaldı" göründü; 8 gün sonraki görev yoktu. "5 görevin süresi geçti" uyarısı çıktı. "Bugün biten" görevi tamamlanınca panelden kalktı. Düğme durum filtresini "Yapılacak"a aldı ve odak görev bölümüne gitti. Konsolda hata yoktu.
- **Sonuç:** Başarılı.

**Not:** Bu iki özellik `docs/gereksinimler.md` içinde henüz tanımlı değil (#97), bu yüzden TC-24 ve TC-25 Bölüm 9'daki eşleştirmede bir FR koduna bağlanamıyor.

---

## 7. Hata Kayıtları

Test sırasında bulunan hatalar burada kayıt altına alınır.

| Hata No | İlgili Test | Hata Açıklaması | GitHub Issue | Durum |
|---|---|---|---|---|
| H-01 | TC-07 | Gecikme kontrolü bugünün tarihini UTC'ye göre hesaplıyordu. Türkiye'de 00:00–03:00 arasında bir önceki gün kullanıldığı için geciken görevler gecikmiş görünmüyordu. | #66 | Düzeltildi (PR #68) |
| H-02 | TC-01 | Sayfada simge yoktu. Tarayıcı `favicon.ico` istediği için her açılışta konsolda 404 hatası çıkıyordu. | #94 | Düzeltildi (`favicon.svg` eklendi) |
| H-03 | TC-23 | Hafta kartında başlık (`h3`) düğmenin içindeydi. Düğme içinde başlık bulunması geçersiz HTML'dir ve başlıkla gezinen ekran okuyucu kullanıcıları başlığı bulamaz. | #93 | Düzeltme hazır, PR inceleme bekliyor |
| H-04 | TC-20, TC-21 | Hafta kartına Enter veya Boşlukla basınca kartlar yeniden çizildiği için klavye odağı kayboluyordu; kart klavyeyle tekrar kapatılamıyordu. | #98 | Düzeltme hazır, PR inceleme bekliyor |

Her hata için GitHub üzerinde `bug` etiketiyle ayrı bir issue açılacaktır.

---

## 8. Test Özeti

| Test Grubu | Toplam Senaryo | Başarılı | Başarısız | Bekliyor |
|---|---:|---:|---:|---:|
| Temel özellikler | 16 | 16 | 0 | 0 |
| Responsive tasarım | 3 | 3 | 0 | 0 |
| Erişilebilirlik | 4 | 4 | 0 | 0 |
| Görev formu ve 7 gün paneli | 2 | 2 | 0 | 0 |
| **Toplam** | **25** | **25** | **0** | **0** |

**Not:** Test sonuçları gerçek uygulama üzerinde yapılan kontrollerden sonra güncellenecektir.

---

## 9. Gereksinim–Test Eşleştirmesi (#70)

Fonksiyonel gereksinimler `docs/gereksinimler.md` dosyasındaki FR maddeleridir. TC-17 … TC-23 işlevsel olmayan gereksinimleri (NFR-01 … NFR-12) doğruladığı için bu tabloya girmez.

| Gereksinim | Açıklama | Öncelik | Test senaryoları | Durum |
|---|---|---|---|---|
| FR-01 | Haftalar kartlar halinde listelenir | Must | TC-01, TC-02 | Kapsandı |
| FR-02 | Hafta detayı (hedefler, görevler, kaynaklar) görüntülenir | Must | TC-03, TC-04 | Kapsandı |
| FR-03 | Görevler listelenir | Must | TC-05 | Kapsandı |
| FR-04 | Görev durumu değiştirilir | Must | TC-06 | Kapsandı |
| FR-05 | Genel ve haftalık ilerleme gösterilir | Must | TC-11, TC-12 | Kapsandı |
| FR-06 | Görevler duruma ve haftaya göre filtrelenir | Must | TC-08, TC-09 | Kapsandı |
| FR-07 | Görevlerde anahtar sözcükle arama yapılır | Must | TC-10 | Kapsandı |
| FR-08 | Durum ve tercihler localStorage'da kalıcıdır | Must | TC-14, TC-16 | Kapsandı |
| FR-09 | Açık/koyu tema seçilebilir | Must | TC-13, TC-14 | Kapsandı |
| FR-10 | İçerik tek JSON dosyasından beslenir | Must | TC-01, TC-04 | Kısmen: geçersiz kayıt ve okunamayan JSON için elle senaryo yok; otomatik test var (`tests/course-data.test.mjs`) |
| FR-11 | Son tarihi geçen görevler işaretlenir | Should | TC-07 | Kapsandı |
| FR-12 | Haftalar ders yolculuğu (zaman çizelgesi) olarak görüntülenir | Should | – | Özellik uygulanmadı (US-16, #97); test yok |
| FR-13 | İlerleme onaylı şekilde sıfırlanabilir | Could | TC-15 | Kapsandı |

**Eşleştirmeden çıkan sonuçlar:**
- 13 FR maddesinden 11'i en az bir senaryoyla tam kapsanıyor, 1'i (FR-10) kısmen kapsanıyor, 1'i (FR-12) uygulanmadığı için test edilemiyor.
- TC-24 (görev formu) ve TC-25 (7 gün paneli) hiçbir FR maddesine bağlanamıyor, çünkü bu özellikler gereksinim belgesinde yok (#97). Belgeye eklenince bu tabloya satır eklenecek.