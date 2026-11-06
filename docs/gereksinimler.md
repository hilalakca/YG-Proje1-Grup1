# Gereksinimler: Etkileşimli Ders Deneyimi Panosu

Bu belge projenin **tek geçerli gereksinim belgesidir**. Çelişen eski belgeler `docs/arsiv/` altına taşınmıştır ve geçersizdir.

- Kaynak: Hafta 1 analiz raporu (US-01 … US-17)
- Sürüm: v1.0 taslak
- İlgili issue: #5 (P1-02)

## 1. Amaç ve kapsam

Öğrencilerin haftalık ders içeriklerini, görevlerini ve ilerlemelerini takip edebildiği, tarayıcıda çalışan bir web uygulaması. Backend ve veri tabanı yoktur. Ders içeriği statik JSON dosyasından gelir, kullanıcı durumu `localStorage`’da tutulur.

**Kullanıcılar:** öğrenci, ders sorumlusu (içerik hazırlayan).

**Öncelikler:** Must (asgari kabul için zorunlu), Should (önemli), Could (zaman kalırsa).

**Kabul kriteri yazım kuralı:** Her kriter bir test adımıyla doğrulanabilir (sayı, eşik veya gözlemlenebilir davranış içerir). Kriter numarası test adımının kimliğidir (örn. `US-04.3`).

## 2. Fonksiyonel gereksinimler

| Kod | Gereksinim | Öncelik | Hikâye |
| --- | --- | --- | --- |
| FR-01 | Haftalar kartlar halinde listelenir | Must | US-01 |
| FR-02 | Hafta detayı (hedefler, görevler, kaynaklar) görüntülenir | Must | US-02 |
| FR-03 | Görevler listelenir | Must | US-03 |
| FR-04 | Görev durumu değiştirilir (yapılacak / devam ediyor / tamamlandı) | Must | US-04 |
| FR-05 | Genel ve haftalık ilerleme gösterilir | Must | US-05 |
| FR-06 | Görevler duruma ve haftaya göre filtrelenir | Must | US-06, US-07 |
| FR-07 | Görevlerde anahtar sözcükle arama yapılır | Must | US-08 |
| FR-08 | Durum ve tercihler localStorage’da kalıcıdır | Must | US-09, US-13 |
| FR-09 | Açık/koyu tema seçilebilir | Must | US-11 |
| FR-10 | İçerik tek JSON dosyasından beslenir | Must | US-14 |
| FR-11 | Son tarihi geçen görevler işaretlenir | Should | US-15 |
| FR-12 | Haftalar ders yolculuğu (zaman çizelgesi) olarak görüntülenir | Should | US-16 |
| FR-13 | İlerleme onaylı şekilde sıfırlanabilir | Could | US-17 |

## 3. Fonksiyonel olmayan gereksinimler

### 3.1 Responsive

| Kod | Gereksinim (ölçülebilir) |
| --- | --- |
| NFR-01 | Arayüz **360 px**, **768 px** ve **1280 px** ekran genişliklerinde kullanılabilir. Üç genişlikte de sayfada **yatay kaydırma çıkmaz** (`scrollWidth ≤ pencere genişliği`). |
| NFR-02 | Hafta kartları 360 px’te tek sütun, 768 px’te en az 2, 1280 px’te en az 3 sütun gösterir. |
| NFR-03 | Tüm dokunulabilir öğelerin (düğme, seçim kutusu, kart) yüksekliği **en az 44 px**’tir. |
| NFR-04 | Tüm temel işlevler (US-01 … US-11) 360 px genişlikte de eksiksiz kullanılabilir. |

### 3.2 Erişilebilirlik (WCAG 2.2 AA hedefi)

| Kod | Gereksinim (ölçülebilir) |
| --- | --- |
| NFR-05 | **Kontrast:** normal metin için en az **4,5:1**, büyük metin ve arayüz bileşeni sınırları (düğme, giriş kutusu kenarlığı) için en az **3:1**. Açık ve koyu temada ayrı ayrı sağlanır. |
| NFR-06 | **Klavye:** Tüm etkileşimli öğelere yalnızca Tab / Shift+Tab ile ulaşılır; düğmeler Enter ve Boşluk ile çalışır; **klavye tuzağı yoktur**. |
| NFR-07 | **Odak:** Odaktaki öğede görünür odak halkası bulunur (en az 2 px). Durum değişince odak aynı düğmede kalır. |
| NFR-08 | **Etiketler:** Her form alanı ve ikon/düğme erişilebilir bir ada sahiptir. İlerleme göstergesi `progressbar` rolü ve değer metni taşır. |
| NFR-09 | **Duyuru:** Arama/filtre sonuç sayısı `aria-live` bölgesiyle duyurulur. |
| NFR-10 | **Renge bağımlılık yok:** Durum ve gecikme bilgisi yalnızca renkle verilmez; metin veya ikon da içerir. |
| NFR-11 | **Hareket:** `prefers-reduced-motion: reduce` açıkken geçiş animasyonları kapanır. |
| NFR-12 | **Dil:** Sayfa dili `lang="tr"` olarak işaretlidir. |

### 3.3 Diğer

| Kod | Gereksinim (ölçülebilir) |
| --- | --- |
| NFR-13 | **Performans:** 100 görevlik veride durum değişikliği, filtre ve arama sonucu **200 ms** içinde ekrana yansır (arama için yazma bittikten sonra en fazla 250 ms bekleme dahil **500 ms**). |
| NFR-14 | **Uyumluluk:** Chrome, Edge, Firefox ve Safari’nin güncel sürümünde çalışır. |
| NFR-15 | **Dayanıklılık:** Bozuk localStorage verisi veya erişilemeyen localStorage uygulamayı **çökertmez**; varsayılan değerlerle devam eder ve gerekirse kullanıcıya uyarı gösterilir. |
| NFR-16 | **Gizlilik:** Kullanıcı verisi yalnızca kendi tarayıcısında kalır; hiçbir sunucuya gönderilmez. |
| NFR-17 | **Kurulum:** Proje, ek kurulum olmadan README’deki bir komutla yerel sunucuda çalıştırılabilir. |
| NFR-18 | **Bakım/test:** İş mantığı (doğrulama, hesaplama, filtre, arama) arayüzden ayrı saf fonksiyonlardadır ve birim testle doğrulanabilir. |

## 4. Kullanıcı hikâyeleri ve kabul kriterleri

Her hikâyede kullanıcı, ihtiyaç, amaç ve öncelik belirtilmiştir.

### US-01 Haftalık ders kartları

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Dersin haftalarını kartlar halinde görmek
- **Amaç:** Dönemin akışını hızlıca kavramak

Kabul kriterleri:

1. `course.json`’daki **her hafta için 1 kart** görünür; kart sayısı = hafta sayısı.
2. Kartlar `weekNo` artan sırasındadır.
3. Her kart hafta numarasını, başlığı, açıklamayı ve “X / Y görev tamamlandı” bilgisini içerir.
4. Hafta sayısı 0 ise “Henüz içerik eklenmemiş” mesajı görünür ve sayfa hata vermez.
5. Kart düzeni NFR-02’ye uyar.

### US-02 Hafta detayını görüntüleme

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Seçtiği haftanın hedeflerini, görevlerini ve kaynaklarını görmek
- **Amaç:** O hafta ne yapacağını bilmek

Kabul kriterleri:

1. Karta tıklayınca veya klavyede Enter/Boşluk ile hafta seçilir; seçili kart `aria-pressed="true"` olur ve görsel olarak ayırt edilir.
2. Detay alanı o haftanın **tüm hedeflerini** listeler; hedef yoksa “Bu hafta için hedef girilmemiş” yazar.
3. Kaynak bağlantıları yeni sekmede açılır (`rel="noopener noreferrer"`).
4. Seçili haftaya yeniden tıklayınca seçim kalkar ve tüm haftalar görünür.

### US-03 Görev listesi

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Görevleri/mini etkinlikleri liste halinde görmek
- **Amaç:** Yapması gerekenleri tek yerden izlemek

Kabul kriterleri:

1. Filtre yokken `tasks` dizisindeki **geçerli her görev** listelenir (sayı eşleşir).
2. Her görev başlık, durum, ait olduğu hafta ve etiketleri gösterir; açıklama ve son tarih varsa gösterilir.
3. Görev yoksa “Henüz görev eklenmemiş” mesajı görünür.
4. Geçersiz kayıtlar (bilinmeyen `weekId`, yinelenen `id`) listeye girmez ve konsola uyarı yazılır.

### US-04 Görev durumunu değiştirme

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Görevi “yapılacak / devam ediyor / tamamlandı” olarak işaretlemek
- **Amaç:** İlerlemesini yansıtmak

Kabul kriterleri:

1. Durum **tek tıkla** (veya tek tuş vuruşuyla) değişir; sayfa yenilenmez.
2. Durum yalnızca üç değerden biri olabilir.
3. “Tamamlandı”ya geçişte `completedAt` ISO zamanıyla kaydedilir; başka duruma geçişte `null` olur.
4. Değişiklik localStorage’a yazılır; sayfa yenilenince aynı durum görünür.
5. Değişiklikten sonra klavye odağı aynı düğmede kalır (NFR-07).

### US-05 İlerleme göstergesi

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Genel ve haftalık ilerlemesini görsel olarak görmek
- **Amaç:** Nerede olduğunu bilmek ve motivasyonunu korumak

Kabul kriterleri:

1. Genel yüzde = `tamamlanan / toplam × 100` (en yakın tam sayıya yuvarlanır); “X / Y” sayacı da gösterilir. Örnek: 12 görevden 1’i bitince **%8** ve **1 / 12**.
2. Her hafta kartında o haftanın ilerlemesi gösterilir; örnek: 3 görevli haftada 1 tamamlanınca **1 / 3**.
3. Durum değişince göstergeler NFR-13’teki süre içinde güncellenir.
4. Toplam görev sayısı 0 ise yüzde **%0** gösterilir, hata oluşmaz.
5. Gösterge `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` taşır (NFR-08).

### US-06 Duruma göre filtreleme

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Görevleri duruma göre filtrelemek
- **Amaç:** Yalnızca ilgilendiklerini görmek

Kabul kriterleri:

1. Seçenekler: Tümü, Yapılacak, Devam eden, Tamamlanan.
2. Bir durum seçilince listede **yalnızca o durumdaki** görevler kalır; gösterilen görev sayısı sonuç bölgesinde yazılır.
3. Eşleşen görev yoksa “Bu filtreyle eşleşen görev yok” mesajı görünür.
4. Görev durumu değişince liste, aktif filtreye göre yeniden hesaplanır.

### US-07 Haftaya göre filtreleme

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Görevleri haftaya göre filtrelemek
- **Amaç:** Belirli bir haftaya odaklanmak

Kabul kriterleri:

1. Hafta seçim listesi “Tüm haftalar” ve içerikteki **her haftayı** içerir.
2. Hafta seçilince yalnızca o haftanın görevleri listelenir.
3. Durum, hafta ve arama filtreleri **birlikte (VE mantığıyla)** çalışır.
4. “Filtreleri temizle” düğmesi üç filtreyi tek eylemle varsayılana döndürür.

### US-08 Görev arama

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Anahtar sözcükle görev aramak
- **Amaç:** Aradığına hızlıca ulaşmak

Kabul kriterleri:

1. Arama görev başlığında, açıklamasında ve etiketlerinde yapılır.
2. Büyük/küçük harfe duyarsızdır ve Türkçe karakterlerle doğru çalışır. Örnek: `ERİŞİLEBİLİRLİK` ile `erişilebilirlik` aynı sonuçları verir.
3. Başındaki ve sonundaki boşluklar yok sayılır.
4. Sonuç, yazma bittikten sonra en fazla 500 ms içinde güncellenir (NFR-13).
5. Eşleşme yoksa anlamlı bir “sonuç yok” mesajı görünür; arama kutusu boşaltılınca tüm liste döner.

### US-09 Verinin kalıcılığı

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** İşaretlediği durumların sayfa yenilense de kalması
- **Amaç:** Her seferinde baştan başlamamak

Kabul kriterleri:

1. Görev durumları `ldp:v1:progress` anahtarında saklanır; sayfa yenilendikten sonra **aynı durumlar** ve aynı ilerleme yüzdesi görünür.
2. localStorage kullanılamıyorsa uygulama bellekte çalışmaya devam eder ve kullanıcıya “veriler kalıcı saklanamıyor” uyarısı gösterilir.
3. Kayıtlı JSON bozuksa uygulama çökmez; varsayılan durumla açılır.
4. İçerikten silinmiş bir göreve ait eski ilerleme kaydı hesaplamalara girmez.

### US-10 Responsive tasarım

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Uygulamayı telefon, tablet ve bilgisayarda rahatça kullanmak
- **Amaç:** İstediği cihazdan ders akışına erişmek

Kabul kriterleri:

1. NFR-01 … NFR-04 üç genişlikte (360 / 768 / 1280 px) sağlanır.
2. Metin ve düğmeler 360 px’te taşmaz veya üst üste binmez.
3. Yalnızca masaüstünde bulunan hiçbir işlev yoktur.

### US-11 Karanlık / aydınlık tema

- **Kullanıcı:** Öğrenci · **Öncelik:** Must
- **İhtiyaç:** Temayı değiştirebilmek
- **Amaç:** Gözünü yormadan çalışmak

Kabul kriterleri:

1. İlk açılışta sistem tercihi (`prefers-color-scheme`) uygulanır.
2. Tema düğmesi tek tıkla temayı değiştirir; seçim yenilemeden sonra korunur.
3. Her iki temada NFR-05’teki kontrast oranları sağlanır.
4. Tema düğmesi `aria-pressed` ile mevcut durumu bildirir.

### US-12 Temel erişilebilirlik

- **Kullanıcı:** Öğrenci (klavye veya yardımcı teknoloji kullanan) · **Öncelik:** Should
- **İhtiyaç:** Uygulamayı klavye ve ekran okuyucuyla kullanabilmek
- **Amaç:** Hiçbir işlevden mahrum kalmamak

Kabul kriterleri:

1. NFR-06 … NFR-12 sağlanır.
2. “Görevlere geç” bağlantısı Tab ile ilk odak noktasıdır ve ana görev alanına götürür.
3. Mouse kullanılmadan US-01 … US-08 akışlarının tamamı tamamlanabilir.

### US-13 Tercihlerin hatırlanması

- **Kullanıcı:** Öğrenci · **Öncelik:** Should
- **İhtiyaç:** Son kullandığı filtre ve temanın hatırlanması
- **Amaç:** Her açılışta aynı ayarları yeniden yapmamak

Kabul kriterleri:

1. Durum filtresi, hafta filtresi, arama metni ve tema `ldp:v1:prefs` içinde saklanır ve yeniden açılışta geri yüklenir.
2. Kayıtlı hafta içerikten silinmişse filtre “Tüm haftalar”a döner ve liste boş görünmez.
3. “Filtreleri temizle” varsayılanlara döner.

### US-14 İçeriğin JSON dosyasından beslenmesi

- **Kullanıcı:** Ders sorumlusu · **Öncelik:** Must
- **İhtiyaç:** Hafta ve görev içeriğini kod yazmadan güncellemek
- **Amaç:** Ders akışını kolayca yönetmek

Kabul kriterleri:

1. Tüm ders içeriği `data/course.json` dosyasından okunur; dosyaya yeni bir hafta veya görev eklenince **kod değişmeden** kart/liste oluşur.
2. Şemaya uymayan kayıtlar (eksik zorunlu alan, yinelenen `id`/`weekNo`, bilinmeyen `weekId`) atlanır; kullanıcıya atlanan kayıt sayısını bildiren bir uyarı çıkar, geçerli kayıtlar gösterilmeye devam eder.
3. JSON dosyası okunamazsa “Ders içeriği yüklenemedi” mesajı görünür; sayfa çökmez.
4. Alanların tanımı `docs/data-model.md` dosyasındadır.

### US-15 Son tarih görünürlüğü

- **Kullanıcı:** Öğrenci · **Öncelik:** Should
- **İhtiyaç:** Yaklaşan ve geçmiş son tarihleri ayırt etmek
- **Amaç:** Geciken işi kaçırmamak

Kabul kriterleri:

1. Son tarihi bugünden önce olan ve “tamamlandı” olmayan görev “Süresi geçti” metniyle işaretlenir.
2. “Tamamlandı” durumundaki görev, tarihi geçmiş olsa da gecikmiş sayılmaz.
3. Son tarihi olmayan görevde tarih alanı gösterilmez.
4. Vurgu yalnızca renge dayanmaz (NFR-10).

### US-16 Ders yolculuğu görünümü

- **Kullanıcı:** Öğrenci · **Öncelik:** Should
- **İhtiyaç:** Dönemi sıradan bir yapılacaklar listesinden öte, görsel bir akış olarak görmek
- **Amaç:** Dersin ilerleyişini bir bakışta kavramak

Kabul kriterleri:

1. Haftalar zaman çizelgesi benzeri bir akışta, `weekNo` sırasıyla gösterilir.
2. Seçili hafta akışta belirgindir.
3. Her haftanın tamamlanma durumu görsel olarak (halka veya çubuk) görünür ve yüzdesi metin olarak da yazılıdır.
4. Görünüm NFR-01 … NFR-12’ye uyar.

### US-17 İlerlemeyi sıfırlama

- **Kullanıcı:** Öğrenci · **Öncelik:** Could
- **İhtiyaç:** Tüm ilerlemesini sıfırlayabilmek
- **Amaç:** Baştan başlayabilmek

Kabul kriterleri:

1. Sıfırlama bir onay adımından sonra yapılır; onaylanmazsa hiçbir veri silinmez.
2. Yalnızca bu uygulamanın localStorage anahtarları (`ldp:v1:*`) silinir.
3. Ders içeriği (`course.json`) değişmez; sıfırlamadan sonra genel ilerleme %0 olur.

## 5. Kapsam dışı

Aşağıdaki özellikler bu sürümde **yapılmayacaktır**. Gerekçeler:

| Özellik | Gerekçe |
| --- | --- |
| **Streak (seri gün sayacı)** | Ders haftalık bir akışa sahiptir; günlük kullanım baskısı yaratmak amaca uygun değildir. Backend olmadan yalnızca cihaz saatine ve tek tarayıcıya dayanır, bu yüzden güvenilir hesaplanamaz ve cihaz değişince sıfırlanır. Çekirdek akışa (haftalar, görevler, ilerleme) değer katmaz. |
| **Rozet** | Rozet kuralları, görselleri ve içeriği ayrıca tasarlanmayı gerektirir. Veriler kullanıcının kendi tarayıcısında olduğundan doğrulanamaz ve kolayca değiştirilebilir, dolayısıyla anlamlı bir ödül sistemi sağlamaz. Yüzde göstergesi ilerlemeyi zaten gösterir. |
| **Konfeti** | Yalnızca süs amaçlı bir animasyondur. Hareket hassasiyeti olan kullanıcılar için erişilebilirlik riski taşır (NFR-11) ve ek kod veya bağımlılık demektir. Temel ihtiyaca (ilerlemeyi görmek) katkısı yoktur. |
| **Sürükle-bırak** | Klavye ve dokunmatik kullanımda erişilebilir bir alternatif gerektirir (WCAG 2.2, 2.5.7) ve bu, eşdeğer işlevi (durum düğmeleri) zaten sağlayan basit çözümden çok daha karmaşıktır. Görev sıralaması bir gereksinim değildir. |

Bu özellikler ileride, temel gereksinimler tamamlandıktan sonra ayrı bir kapsam kararıyla yeniden değerlendirilebilir.

## 6. İzlenebilirlik

| Gereksinim | Hikâyeler | Test yöntemi |
| --- | --- | --- |
| FR-01 … FR-05 | US-01 … US-05 | Birim test (hesaplama) + elle senaryo |
| FR-06, FR-07 | US-06 … US-08 | Birim test (filtre/arama) |
| FR-08, FR-09 | US-09, US-11, US-13 | Elle senaryo (yenileme, bozuk veri, localStorage kapalı) |
| FR-10 | US-14 | Birim test (doğrulama) + hatalı JSON ile elle deneme |
| NFR-01 … NFR-04 | US-10 | Tarayıcıda 360/768/1280 px elle kontrol |
| NFR-05 … NFR-12 | US-11, US-12 | Kontrast ölçümü + yalnızca klavyeyle gezinme testi |

## 7. Eski belgeler

Önceki taslaklar çelişkili olduğu için geçersizdir; ayrıntı için bkz. [docs/arsiv/README.md](arsiv/README.md).
