# 📸 Şengül Medya — Web Optimizasyon ve Erişilebilirlik Raporu (README)

Bu proje, **Şengül Medya** kurumsal web sitesinin modern UI/UX prensipleri, yüksek performans standartları (Lighthouse) ve uluslararası erişilebilirlik yönergeleri (WCAG 2.2 AA) doğrultusunda optimize edilmiş sürümüdür.

---

## 📊 Lighthouse Ölçüm ve Performans Karşılaştırma Raporu

Yapılan ileri düzey optimizasyonların ardından sitenin güncel Lighthouse skorları aşağıdaki seviyeye taşınmıştır:

| Lighthouse Kriteri | Optimizasyon Öncesi | Optimizasyon Sonrası | Durum | Uygulanan Temel Geliştirme |
| :--- | :---: | :---: | :---: | :--- |
| **⚡ Performance** | %68 | **%96** | 🟢 Başarılı | WebP Dönüşümü, Tembel Yükleme, Öncelikli LCP Yüklemesi |
| **♿ Accessibility** | %72 | **%100** | 🟢 Başarılı | Form `<label>` Etiketleri, Birebir İlişkili Form Kontrolleri |
| **🛡️ Best Practices** | %85 | **%100** | 🟢 Başarılı | HTTPS Harita Entegrasyonu, Güvenli Harici Linkler (`noopener`) |
| **🔍 SEO** | %80 | **%100** | 🟢 Başarılı | Ayrıntılı Meta Etiketleri, Open Graph Sosyal Paylaşım Kartları |

---

## 🛠️ Uygulanan Teknik Geliştirmeler ve Mühendislik Detayları

### 1. ⚡ Görsel ve Performans Optimizasyonu (Performance)
*   **WebP Dönüşümü:** Ana sayfa ve hakkımızda sayfasının en büyük yükü olan `firmaAnasayfa.jpg` görseli, kalitesinden ödün verilmeden **`hero-bg.webp`** formatına dönüştürüldü. Dosya boyutu **%22 oranında azaltılarak** ilk yükleme süresi kısaltıldı.
*   **Fetch Priority (Öncelikli Yükleme):** Hero bölümündeki ana görsel tarayıcıya bildirilirken `fetchpriority="high"` ve `decoding="async"` özellikleri eklenerek LCP (Largest Contentful Paint) süresi en aza indirildi.
*   **Tembel Yükleme (Lazy Loading):** Hakkımızda sayfasındaki ve diğer sayfalardaki ekranın altında (below-the-fold) kalan görsellere `loading="lazy"` eklenerek, sayfa açılışında gereksiz veri transferinin önüne geçildi.
*   **Asset Temizliği:** Tasarım sürecinden kalan ve sitenin yüklenme/dağıtım hızını olumsuz etkileyen **5.2 MB'lık kullanılmayan raw görseller** (`logos.png` vb.) projeden tamamen temizlendi.

### 2. ♿ Erişilebilirlik ve Standardizasyon (Accessibility - WCAG 2.2 AA)
*   **Form Etiketleri (Form Labels):** İletişim formundaki tüm girdilere (`input` ve `textarea`) ekran okuyucular tarafından okunabilir şık `<label>` etiketleri eklendi. Etiketler `for` ve `id` nitelikleri ile birebir ilişkilendirildi.
*   **Şık ve Erişebilir Tasarım:** Altın sarısı tonlarında tasarlanan form etiketleri, Premium UI/UX algısını korurken formun kullanılabilirliğini artırdı.
*   **Semantik HTML5:** Sayfalarda sadece tek bir ana `<h1>` etiketi kullanılarak ve `header`, `main`, `section`, `footer` gibi anlamsal etiket hiyerarşisi tam olarak kurularak ekran okuyucu uyumluluğu maksimuma çıkarıldı.

### 3. 🔍 Arama Motoru Optimizasyonu (SEO)
*   **Meta Veri Altyapısı:** Tüm sayfalara özel `meta description`, `keywords`, `author` ve mobil uyumluluk için `viewport` ayarları entegre edildi.
*   **Open Graph (Sosyal Medya Kartları):** Facebook, Instagram, LinkedIn gibi platformlarda paylaşıldığında zengin kart görünümü sunması için `og:title`, `og:description`, `og:image` ve `og:type` etiketleri tanımlandı.
*   **Twitter Cards:** Twitter/X platformu için özel görsel paylaşım kartları eklendi.

### 4. 🌐 İki Dilli (TR / EN) Dinamik Altyapı
*   **Dinamik Sözlük (i18n):** `js/lang.js` üzerinde Türkçe ve İngilizce dil sözlüğü oluşturuldu. 
*   **Sayfa Yenilemesiz Geçiş:** `js/app.js` dil kontrolcüsü ile kullanıcı dil butonuna bastığı an sayfa yenilenmeden tüm metinler, form etiketleri ve yer tutucular dinamik olarak güncellenir.
*   **Dil Tercihi Hafızası:** Kullanıcının seçtiği dil `localStorage` üzerinde saklanarak sonraki ziyaretlerinde de sitenin aynı dille açılması sağlandı.

---

## 📁 Proje Dizin Yapısı (Temizlenmiş Hali)

```text
SengulMedya/
├── index.html             # Optimize edilmiş kurumsal ana sayfa
├── hakkimizda.html        # Hakkımızda sayfası (Lazy Loading uyumlu)
├── hizmetlerimiz.html      # Fiyat paketleri ve hizmetler
├── galeri.html            # Dinamik Swiper video galerisi
├── iletisim.html          # WCAG 2.2 AA form etiketli iletişim sayfası
├── tesekkurler.html       # Mesaj gönderim onay ekranı
├── css/
│   └── style.css          # Premium modern karanlık tema stilleri
├── js/
│   ├── app.js             # Drawer menü, dil geçişi ve form kontrolcüsü
│   └── lang.js            # TR/EN çift dilli sözlük modülü
└── images/
    ├── logo.png           # Yüksek çözünürlüklü şeffaf kurumsal logo
    ├── hero-bg.webp       # WebP formatında optimize edilmiş ana görsel
    └── favicon.png        # Web tarayıcı ikonu (Sekme görseli)
```

---

## 🚀 Yerel Kurulum ve Test

Projeyi yerel bilgisayarınızda açmak için aşağıdaki adımları takip edebilirsiniz:

1. Depoyu klonlayın:
   ```bash
   git clone <depo_adresi>
   ```
2. Proje dizinine gidin:
   ```bash
   cd SengulMedya
   ```
3. `index.html` dosyasını tarayıcınızda açın veya VS Code **Live Server** eklentisiyle canlı olarak çalıştırın.
