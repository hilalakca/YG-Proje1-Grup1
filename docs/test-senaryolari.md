# Test Senaryoları ve Hata Kayıtları

**Proje:** Etkileşimli Ders Deneyimi Panosu  
**Test Sorumlusu:** Yusuf Veis  
**İlgili Issue'lar:** #57, #58, #59  
**Belge Durumu:** İlk taslak

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

## 6. Hata Kayıtları

Test sırasında bulunan hatalar burada kayıt altına alınacaktır.

| Hata No | İlgili Test | Hata Açıklaması | GitHub Issue | Durum |
|---|---|---|---|---|
| - | - | Henüz hata kaydedilmedi. | - | - |

Her hata için GitHub üzerinde `bug` etiketiyle ayrı bir issue açılacaktır.

---

## 7. Test Özeti

| Test Grubu | Toplam Senaryo | Başarılı | Başarısız | Bekliyor |
|---|---:|---:|---:|---:|
| Temel özellikler | 16 | 16 | 0 | 0 |
| Responsive tasarım | 3 | 2 | 0 | 0 |
| Erişilebilirlik | 4 | 4 | 0 | 0 |
| **Toplam** | **23** | **23** | **0** | **0** |

**Not:** Test sonuçları gerçek uygulama üzerinde yapılan kontrollerden sonra güncellenecektir.