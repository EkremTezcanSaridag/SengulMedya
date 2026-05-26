// Hamburger Menu Logic
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');

        // Change icon to X when open
        const icon = mobileMenu.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// Formspree AJAX İletişim Formu Mantığı
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Varsayılan Formspree yönlendirmesini engelle
        
        // Butonu "Gönderiliyor..." yap ve tekrar tıklanmasını engelle
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = "Gönderiliyor... <i class='fa-solid fa-spinner fa-spin' style='margin-left:8px'></i>";
        btn.disabled = true;

        const data = new FormData(contactForm);
        
        try {
            // Form verilerini Formspree'ye arkaplanda gönder
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Gönderim başarılıysa kendi tasarladığımız Onay sayfasına yönlendir
                window.location.href = "tesekkurler.html";
            } else {
                alert("Mesaj gönderilirken bir hata oluştu. Lütfen bilgileri kontrol edin.");
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            alert("Bağlantı hatası oluştu.");
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}