// =====================================================
// Şengül Medya — App JS
// =====================================================

// ─── Mobil Drawer Menü ────────────────────────────────
const mobileMenu = document.getElementById('mobile-menu');
const navbar     = document.querySelector('.navbar');

// Sayfa yüklendiğinde overlay + drawer header enjekte et
document.addEventListener('DOMContentLoaded', () => {

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    document.body.appendChild(overlay);

    // Drawer içine başlık + dil butonu + kapat butonu ekle
    if (navbar) {
        const drawerHeader = document.createElement('div');
        drawerHeader.className = 'drawer-header';
        drawerHeader.innerHTML = `
            <span class="drawer-brand" data-i18n="drawer.title">MENÜ</span>
            <div class="drawer-actions">
                <button id="lang-toggle-btn-drawer" aria-label="Dil Değiştir">
                    <i class="fa-solid fa-globe"></i>
                    <span class="drawer-lang-label">EN</span>
                </button>
                <button id="drawer-close" aria-label="Kapat">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
        navbar.insertBefore(drawerHeader, navbar.firstChild);

        // Drawer footer — sosyal ikonlar
        const drawerFooter = document.createElement('div');
        drawerFooter.className = 'drawer-footer';
        drawerFooter.innerHTML = `
            <p class="drawer-footer-label" data-i18n="drawer.follow">Bizi takip edin</p>
            <div class="drawer-socials">
                <a href="https://www.instagram.com/sengulmedya/" target="_blank" aria-label="Instagram">
                    <i class="fa-brands fa-instagram"></i>
                </a>
            </div>
        `;
        navbar.appendChild(drawerFooter);
    }

    // ─── Açma / Kapama ─────────────────────────────────
    function openDrawer() {
        navbar.classList.add('active');
        document.getElementById('nav-overlay').classList.add('active');
        document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
        navbar.classList.remove('active');
        document.getElementById('nav-overlay').classList.remove('active');
        document.body.classList.remove('drawer-open');
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    // Overlay tıklaması
    document.getElementById('nav-overlay').addEventListener('click', closeDrawer);

    // X butonu
    const closeBtn = document.getElementById('drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Escape tuşu
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDrawer();
    });

    // Nav link tıklamasında drawer kapat
    if (navbar) {
        navbar.querySelectorAll('.navlist a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    // ─── Drawer içi dil butonu ─────────────────────────
    const drawerLangBtn = document.getElementById('lang-toggle-btn-drawer');
    if (drawerLangBtn) {
        // Başlangıç durumunu ayarla
        updateDrawerLangBtn();

        drawerLangBtn.addEventListener('click', () => {
            // lang.js'deki toggleLanguage fonksiyonunu çağır
            if (typeof toggleLanguage === 'function') {
                toggleLanguage();
            }
            updateDrawerLangBtn();
        });
    }
});

function updateDrawerLangBtn() {
    const drawerLangBtn = document.getElementById('lang-toggle-btn-drawer');
    if (!drawerLangBtn) return;
    const current = localStorage.getItem('sengul-lang') || 'tr';
    const label = drawerLangBtn.querySelector('.drawer-lang-label');
    if (label) label.textContent = current === 'tr' ? 'EN' : 'TR';
    drawerLangBtn.title = current === 'tr' ? 'Switch to English' : 'Türkçeye geç';
}

// ─── İletişim Formu AJAX ──────────────────────────────
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = "Gönderiliyor... <i class='fa-solid fa-spinner fa-spin' style='margin-left:8px'></i>";
        btn.disabled = true;

        const data = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
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

// ─── Harita Lazy Loading (IntersectionObserver) ─────────────────
document.addEventListener('DOMContentLoaded', () => {
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (mapPlaceholder) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const src = mapPlaceholder.getAttribute('data-src');
                    if (src) {
                        const iframe = document.createElement('iframe');
                        iframe.src = src;
                        iframe.setAttribute('allowfullscreen', '');
                        iframe.setAttribute('loading', 'lazy');
                        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
                        mapPlaceholder.appendChild(iframe);
                    }
                    observer.disconnect();
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        observer.observe(mapPlaceholder);
    }
});