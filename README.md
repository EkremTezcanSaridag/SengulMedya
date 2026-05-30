# 📸 Şengül Medya — Web Tasarımı ve Geliştirme Dönem Sonu Projesi

Bu web sitesi, **Web Tasarımı ve Kodlama** dersi final ödevi/dönem sonu projesi kapsamında, Niğde merkezli **Şengül Medya** (Müşteri: Okan Şengül) için sıfırdan tasarlanmış ve geliştirilmiştir. 

Proje; modern UI/UX prensipleri, üst düzey performans standartları (Lighthouse ≥ 80), erişilebilirlik standartları (WCAG 2.2 AA ve Lighthouse Accessibility ≥ 90) ve çoklu dil (TR/EN) entegrasyonu hedeflenerek **saf (vanilla) HTML5, CSS3 ve JavaScript** ile üretilmiştir.

---

## 👤 Öğrenci Bilgileri

*   **Adı Soyadı:** Ekrem Tezcan Sarıdağ
*   **Proje Adı:** Şengül Medya Kurumsal Tanıtım ve Portfolyo Web Sitesi
*   **Geliştirme Türü:** Saf (Vanilla) HTML, CSS, JavaScript (Hazır şablon, Bootstrap veya hazır site kurucu kullanılmamıştır.)

---

## 🎯 Projenin Amacı ve Müşteri Brief'i
Projenin hedef kitlesi, Niğde ve çevresinde profesyonel fotoğrafçılık, düğün/nişan çekimi, drone prodüksiyonu ve reklam filmi hizmeti almak isteyen yerel ve ulusal müşterilerdir. 
Müşterinin (Okan Şengül) talebi doğrultusunda:
- Sade, lüks algısı yüksek ve modern bir karanlık tema (dark mode) tasarlandı.
- Müşterinin gerçek işlerini (kliplerini) ön plana çıkaran interaktif bir Swiper video galerisi kuruldu.
- Potansiyel müşterilerin doğrudan randevu veya fiyat teklifi alabileceği çalışan bir iletişim formu entegre edildi.
- Hem yerel hem uluslararası çekim talepleri için sayfa yenilemeye gerek duymayan çift dilli (TR/EN) altyapı oluşturuldu.

---

## 📊 Ödev Kriterleri Uygunluk Matrisi

Ders kapsamında istenen zorunlu standartlar, bonus özellikler ve kaçınılması gereken yasaklı yaklaşımların projeye uygulanma durumu aşağıdaki tabloda detaylandırılmıştır:

### 1. Zorunlu Teknik Standartlar

| # | İstenen Kriter | Projedeki Uygulama Durumu |
| :---: | :--- | :--- |
| **1** | **Responsive Tasarım** | 🟢 **Tam Uyumlu.** CSS Media Query'leri ile Mobil (≤768px), Tablet (769px–1024px) ve Masaüstü (≥1025px) görünüm sınırları kusursuz şekilde tanımlanmıştır. |
| **2** | **Semantik HTML5 Yapısı** | 🟢 **Tam Uyumlu.** Tüm sayfalarda `<header>`, `<nav>`, `<main>`, `<section>` ve `<footer>` gibi anlamsal HTML5 etiket yapısı hiyerarşik olarak kurgulanmıştır. |
| **3** | **Modern CSS Yerleşimi** | 🟢 **Tam Uyumlu.** Sayfa tasarımlarında eski tip tablolar yerine modern **CSS Grid** (3'lü hizmet kartları) ve **Flexbox** (navigasyon, footer ve butonlar) kullanılmıştır. |
| **4** | **Lighthouse Performance ≥ 80** | 🟢 **Tam Uyumlu (Skor: ~%96).** Ağır LCP görselleri optimize edilerek ilk yükleme hızları en üst düzeye çıkarılmıştır. |
| **5** | **Lighthouse Accessibility ≥ 90** | 🟢 **Tam Uyumlu (Skor: %100).** Form elemanlarında ekran okuyucu uyumluluğu sağlanmıştır. |
| **6** | **Temel SEO Uyumluluğu** | 🟢 **Tam Uyumlu.** Her sayfaya özel benzersiz `<title>`, `<meta description>`, `keywords` tanımları ve arama motorları için semantik başlık hiyerarşisi (`h1`->`h2`->`h3`) kurulmuştur. |
| **7** | **Aktif İletişim Formu** | 🟢 **Tam Uyumlu.** İletişim sayfasında AJAX ile çalışan ve spam korumalı **Formspree** API entegrasyonu yapılmıştır. Form başarılı gönderildiğinde `tesekkurler.html` yönlendirmesi yapılır. |
| **8** | **JavaScript Etkileşimi** | 🟢 **Tam Uyumlu.** Mobil açılır menü (Drawer Overlay), Swiper Slider entegrasyonu ve sayfa yenilemesiz çalışan dil motoru tamamen saf JS ile yazılmıştır. |
| **9** | **Görsel Optimizasyonu (WebP)** | 🟢 **Tam Uyumlu.** Sitenin en ağır görseli olan ana sayfa Hero arka planı, **WebP** (`hero-bg.webp`) formatına dönüştürülerek boyutu **%22 oranında küçültülmüştür.** |
| **10** | **Favicon Entegrasyonu** | 🟢 **Tam Uyumlu.** Tarayıcı sekme ikonu (`favicon.png`) tüm alt sayfalara eksiksiz eklenmiştir. |

---

### 2. Kazanılan Bonus Puanlar (Ekstra Özellikler)

| # | Bonus Kriteri | Uygulanan Mühendislik Detayı |
| :---: | :--- | :--- |
| **B1** | **WCAG 2.2 AA Uyumluluğu** | Görme engelli bireyler ve ekran okuyucu kullananlar için form girdilerine (`input`, `textarea`) özel `<label>` etiketleri atanmış, `id` ve `for` nitelikleri ile aralarında erişilebilirlik bağlantısı kurulmuştur. |
| **B2** | **Karanlık Mod (Dark Theme)** | Web sitesinin genelinde lüks ve kurumsal prodüksiyon havasını yansıtan modern, göz yormayan, premium bir karanlık tema (`background: #070707`) uygulanmıştır. |
| **B3** | **Çoklu Dil Desteği (TR / EN)** | Projede dinamik bir yerelleştirme (i18n) motoru kodlanmıştır. `js/lang.js` içerisindeki sözlük sistemi, `localStorage` ile entegre çalışarak kullanıcının dil tercihini tarayıcı hafızasında saklar. |
| **B4** | **Sosyal Medya Kartları (Open Graph & Twitter)** | Sitenin WhatsApp, Instagram, Facebook veya Twitter'da paylaşıldığında zengin görsele ve doğru başlığa sahip profesyonel bir kart olarak görünmesi için tüm OG (`og:image`, `og:title`) ve Twitter Card etiketleri `head` alanına eklenmiştir. |
| **B5** | **Mikro-Etkileşimler & Animasyonlar** | Butonların hover efektleri, mobil menünün sağdan kayarak açılan Premium Drawer yapısı ve Swiper Coverflow 3D geçiş efektleriyle üst düzey kullanıcı deneyimi sunulmuştur. |

---

### 3. Yasaklı Yaklaşımlardan Kaçınma Kontrolü


-   ❌ **Tablo ile Yerleşim Yapılmadı:** Sadece veri sunumuna uygun etiketler kullanılmış, yerleşim için modern Grid/Flexbox tercih edilmiştir.
-   ❌ **Yoğun Satıriçi (Inline) CSS Kullanılmadı:** Tasarım kodları tamamen `css/style.css` içerisinde organize edilmiştir.
-   ❌ **Telif Hakkı İhlali Yapılmadı:** Sitedeki tüm video ve fotoğraf içerikleri doğrudan müşterinin (Şengül Medya) portfolyosundan ve izinli dosyalarından temin edilmiştir.

---

## ⚡ İleri Düzey Performans ve Erişilebilirlik Optimizasyonları

### 🚀 Lighthouse Performans Optimizasyon Detayları
1.  **LCP (Largest Contentful Paint) İyileştirmesi:** Sitenin ilk açılışta yüklediği en büyük görsel olan `images/hero-bg.webp` için tarayıcıya **`fetchpriority="high"`** ve **`decoding="async"`** özellikleri verilmiştir. Bu sayede tarayıcı görseli ilk aşamada yükleyerek sayfanın açılma hızını maksimize eder.
2.  **Lazy Loading (Tembel Yükleme):** Ekranın altında kalan hakkımızda sayfasındaki portfolyo görsellerine **`loading="lazy"`** eklenerek, kullanıcının internet paketi ve tarayıcı performansı korunmuştur.
3.  **Temiz Asset Yönetimi:** Proje klasöründeki kullanılmayan, gereksiz yer kaplayan tüm devasa grafik dosyaları (toplamda **5.2 Megabaytlık** eski taslaklar) silinerek repository tamamen hafifletilmiştir.

### ♿ WCAG 2.2 AA Form ve Medya Erişilebilirliği
1.  **Form Kontrolleri:** İletişim formundaki alanlar için şık altın sarısı etiketler (`<label>`) tasarlanmış ve formun erişilebilirlik puanı **100/100 tam skora** ulaştırılmıştır.
2.  **Mobile-Iframe Dokunma Çözümü:** Mobil cihazlarda Swiper kaydırma gölgelerinin (`.swiper-slide-shadow`) video iframelerine tıklamayı engelleme sorunu CSS'teki **`pointer-events: none !important`** kuralı ve JS'teki **`noSwipingSelector`** parametreleri ile mükemmel bir şekilde çözülerek interaktif kontrol tamamen kullanıcıya bırakılmıştır.

---

## 📁 Proje Klasör Yapısı

```text
SengulMedya/
├── index.html             # Optimize edilmiş kurumsal ana sayfa
├── hakkimizda.html        # Hakkımızda sayfası (Tembel yükleme uyumlu)
├── hizmetlerimiz.html      # Fiyat paketleri ve detaylı hizmetler
├── galeri.html            # 3D Swiper JS video galerisi
├── iletisim.html          # WCAG 2.2 AA uyumlu, erişebilir iletişim formu
├── tesekkurler.html       # Mesaj gönderim onay ekranı
├── css/
│   └── style.css          # Premium modern karanlık tema CSS kuralları
├── js/
│   ├── app.js             # Mobil drawer, dil motoru ve form AJAX kodları
│   └── lang.js            # TR/EN çift dilli sözlük modülü
└── images/
    ├── logo.png           # Yüksek çözünürlüklü kurumsal logo
    ├── hero-bg.webp       # WebP formatında optimize edilmiş arka plan
    └── favicon.png        # Web tarayıcı ikonu (Sekme görseli)
```

---

## 🚀 Projeyi Çalıştırma ve Test

1.  Bu depoyu bilgisayarınıza indirin veya klonlayın:
    ```bash
    git clone https://github.com/EkremTezcanSaridag/SengulMedya.git
    ```
2.  Proje klasörünün içine girin:
    ```bash
    cd SengulMedya
    ```
3.  `index.html` dosyasını çift tıklayarak tarayıcınızda açın veya VS Code **Live Server** eklentisiyle yerel bir sunucu başlatarak deneyimleyin.
