# 🌐 Şengül Medya — Web Sitesi Yayınlama ve Dağıtım Rehberi

Merhaba Ekrem! Projeni yayına almak ve internette profesyonelce sergilemek için harika bir adımdasın. Bu rehberde, kısıtlı bütçeni (**400 TL**) en akıllıca şekilde nasıl kullanacağını, web siteni **ömür boyu tamamen ücretsiz** nasıl barındıracağını ve az önce yaptığımız Git/GitHub temizliğinin detaylarını bulabilirsin.

---

## 🔒 1. Git ve GitHub Kimlik Temizliği (Tamamlandı)

Arkadaşın **Arda Berk**'in hesayla terminale giriş yapılması nedeniyle commit atarken veya push yaparken kimlik çakışması yaşamaman için gerekli tüm adımları uyguladım:

1. **Eski Kimlik Bilgileri Temizlendi:** Terminaldeki Git kimlik yöneticisinde kayıtlı olan eski GitHub kimlik ve erişim bilgileri şu komutla tamamen sistemden silindi:
   ```bash
   echo "url=https://github.com" | git credential reject
   ```
   *Bu sayede bir sonraki `git push` işleminde terminal senden kendi GitHub kullanıcı adını ve şifreni (veya Personal Access Token - PAT) girmeni isteyecektir.*

2. **Kişisel Git Bilgilerin Doğrulandı:** Sistemde global ve yerel olarak yalnızca senin bilgilerin tanımlı. Yapacağın tüm commit'ler senin adına kaydedilecek:
   * **Kullanıcı Adı:** `ekremTezcanSaridag`
   * **E-posta:** `ekremtezcansaridag@anadolu.edu.tr`

3. **Geçmiş Temizliği:** Mevcut projenin git geçmişi (`git log`) incelenmiş olup, tüm commit'lerin zaten senin adına kayıtlı olduğu ve **Arda Berk** ismine dair hiçbir iz bulunmadığı onaylanmıştır. Projen tamamen senin adına temiz bir geçmişe sahiptir.

---

## 💸 2. Bütçe Stratejisi: 400 TL Nasıl Kullanılmalı?

Şengül Medya web sitesi **statik bir web sitesidir** (HTML, CSS ve JavaScript dosyalardan oluşur). Statik siteler için **hosting (barındırma) hizmetine para ödemene GEREK YOKTUR.** Vercel, Netlify veya GitHub Pages gibi dünya devi platformlar statik siteleri **tamamen ücretsiz ve sınırsız trafikle** barındırır.

Bu yüzden 400 TL bütçenin tamamını profesyonel bir **Alan Adı (Domain)** almak için kullanmalısın.

### 🎯 Alan Adı (Domain) Tavsiyesi:
* **`.com.tr` (Şiddetle Tavsiye Edilir):** Türkiye'deki resmi tescil kuruluşu (METUnic vb.) veya popüler tescil firmalarından (Turhost, IHS, Güzel Hosting) yıllık **~100 TL ile 150 TL** arasına satın alabilirsin. Hem çok resmidir, hem bütçeni yormaz.
* **`.com` (Alternatif):** Yıllık **~250 TL ile 350 TL** arasına satın alabilirsin. 400 TL limitini aşmaz.

> [!TIP]
> **Yıllık Tasarruf:** Hosting ücretsiz olacağı için yıllık tek giderin sadece domain yenileme ücreti (yılda ~150 TL) olacaktır!

---

## 🚀 3. Ücretsiz Yayınlama (Hosting) Seçenekleri

Web siteni yayınlamak için en popüler ve kullanımı en kolay 3 yöntemi aşağıda sıraladım. Senin için **Vercel** veya **Netlify** seçeneğini öneririm.

### Yöntem A: Vercel ile Yayınlama (En Popüler & En Kolay) 🌟
Vercel, modern web geliştiricilerinin 1 numaralı tercihidir. GitHub hesabını bağlayıp tek tıkla siteni yayına alabilirsin.

1. [Vercel sitesine gidip](https://vercel.com/signup) **"Sign Up with GitHub"** seçeneğiyle ücretsiz üye ol.
2. Panelde **"Add New" > "Project"** butonuna tıkla.
3. GitHub depolarından **SengulMedya** reposunu seçip **"Import"** et.
4. Çıkan ekranda hiçbir ayarı değiştirmeden direkt **"Deploy"** butonuna bas.
5. **10 saniye içinde siten yayında!** Sana otomatik olarak `sengulmedya.vercel.app` şeklinde ücretsiz, SSL sertifikalı (https://) bir URL verecektir.
6. İleride domain satın aldığında, Vercel panelinden "Domains" kısmına girip alan adını yazarak kolayca bağlayabilirsin.

### Yöntem B: Netlify ile Yayınlama
Kodundaki `og:url` meta etiketinde de hazır tanımlandığı üzere Netlify harika bir alternatiftir.

1. [Netlify sitesine gidip](https://app.netlify.com/signup) GitHub ile üye ol.
2. **"Import from Git"** diyerek GitHub'daki **SengulMedya** reposunu seç.
3. **"Deploy Site"** butonuna tıkla. Siten `sengulmedya.netlify.app` olarak yayına girecektir.

### Yöntem C: GitHub Pages ile Yayınlama (Ekstra Araç Gerekmez)
Zaten kodların GitHub'da olduğu için hiçbir üçüncü parti siteye üye olmadan direkt GitHub üzerinden de siteni açabilirsin.

1. Tarayıcından GitHub'da `EkremTezcanSaridag/SengulMedya` deposuna git.
2. **"Settings" (Ayarlar)** sekmesine tıkla.
3. Sol menüden **"Pages"** seçeneğini seç.
4. *Build and deployment* kısmında **Source** olarak `Deploy from a branch` seçili olsun.
5. **Branch** kısmında `main` ve yanındaki klasörü `/root` olarak seçip **"Save" (Kaydet)** butonuna tıkla.
6. Birkaç dakika içinde siten `https://ekremtezcansaridag.github.io/SengulMedya/` adresinde yayına girecektir.

---

## 🛠️ 4. Projeyi GitHub'a Yükleme ve Güncelleme Adımları

Temizlediğimiz yeni kimliğinle projedeki değişiklikleri GitHub'a göndermek için terminalde şu adımları takip edebilirsin:

```bash
# 1. Proje dizininde olduğundan emin ol
cd /home/ekotezo/Masaüstü/SengulMedya

# 2. Yapılan değişiklikleri kontrol et
git status

# 3. Tüm güncel dosyaları sahneye ekle
git add .

# 4. Değişiklikleri kendi adınla commit et
git commit -m "style: yayına hazırlık, optimizasyonlar ve yayınlama rehberi eklendi"

# 5. Kendi GitHub hesabınla uzak sunucuya gönder
git push -u origin main
```

> [!IMPORTANT]
> `git push` yaptıktan sonra terminal senden kullanıcı adı ve şifre isteyecektir. Şifre kısmına GitHub şifreni değil, **GitHub Settings > Developer Settings > Personal Access Tokens (Classic)** bölümünden oluşturacağın **Token'ı** yapıştırmalısın. GitHub artık şifreyle push yapılmasına izin vermemektedir.

---

## 💎 Sonuç ve Yol Haritası
1. 💸 **Bütçeni koru:** Hosting için kimseye para ödeme.
2. 🏷️ **Domain al:** Güvenilir bir yerli firmadan `sengulmedya.com.tr` alan adını satın al (Yıllık ~100-150 TL).
3. 🚀 **Vercel'e yükle:** GitHub reposunu Vercel'e bağla ve domainini yönlendir.

Tebrikler Ekrem, siten artık dünya standartlarında, hızlı, güvenli ve tamamen senin kontrolünde yayınlanmaya hazır! Yolun açık olsun. 🚀
