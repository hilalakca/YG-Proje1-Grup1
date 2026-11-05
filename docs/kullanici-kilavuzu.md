# Kullanıcı Kılavuzu

## Uygulamayı açma
1. Proje klasörünü indirin ve VS Code ile açın.
2. `index.html` dosyasını Live Server ile açın. Alternatif olarak terminalde `python -m http.server 8000` komutunu çalıştırıp `http://localhost:8000` adresine gidin.
3. `fetch` ve ES modülleri kullanıldığı için dosyayı çift tıklayarak açmayın; yerel sunucu kullanın.

## Haftalar
Hafta kartına tıklayarak öğrenme hedeflerini ve varsa kaynak bağlantılarını açın. Aynı karta tekrar tıklayarak tüm haftalara dönün.

## Arama ve filtreler
Üstteki Görev ara alanı başlık, açıklama ve etiketlerde arama yapar. Durum ve hafta filtrelerini seçebilirsiniz. Birden fazla koşul birlikte VE (AND) mantığıyla uygulanır. Filtreleri temizle düğmesi tüm filtreleri varsayılana döndürür.

## Görev durumu ve tema
Her görev kartında Yapılacak, Devam ediyor veya Tamamlandı durumlarından birini seçin. İlerleme göstergeleri güncellenir. Üst çubuktaki düğme açık/koyu tema arasında geçiş yapar.

## İlerlemeyi sıfırlama
Alt bölümdeki İlerlemeyi sıfırla düğmesine basın ve onay penceresini kabul edin. Kayıtlı ilerleme ve tercihler temizlenir; işlem geri alınamaz.

## Veri ve gizlilik
Ders içeriği `data/course.json` dosyasından gelir. Görev durumları ve tercihler kullanılan tarayıcının `localStorage` alanında saklanır; sunucuya gönderilmez.
