function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        const icons = document.querySelectorAll('#theme-toggle-btn i, #theme-toggle-btn-drawer i');
        icons.forEach(i => {
            i.className = 'fa-solid fa-moon';
        });
    } else {
        document.body.classList.remove('light-theme');
        const icons = document.querySelectorAll('#theme-toggle-btn i, #theme-toggle-btn-drawer i');
        icons.forEach(i => {
            i.className = 'fa-solid fa-sun';
        });
    }
}

function toggleTheme() {
    const current = localStorage.getItem('sengul-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('sengul-theme', next);
    applyTheme(next);
}

const initialTheme = localStorage.getItem('sengul-theme') || 'dark';
applyTheme(initialTheme);

const mobileMenu = document.getElementById('mobile-menu');
const navbar     = document.querySelector('.navbar');

document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    document.body.appendChild(overlay);

    if (navbar) {
        const drawerHeader = document.createElement('div');
        drawerHeader.className = 'drawer-header';
        drawerHeader.innerHTML = `
            <span class="drawer-brand" data-i18n="drawer.title">MENÜ</span>
            <div class="drawer-actions">
                <button id="theme-toggle-btn-drawer" aria-label="Tema Değiştir">
                    <i class="fa-solid fa-sun"></i>
                </button>
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

        const drawerThemeBtn = document.getElementById('theme-toggle-btn-drawer');
        if (drawerThemeBtn) {
            drawerThemeBtn.addEventListener('click', toggleTheme);
        }

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

    applyTheme(localStorage.getItem('sengul-theme') || 'dark');

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

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

    document.getElementById('nav-overlay').addEventListener('click', closeDrawer);

    const closeBtn = document.getElementById('drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDrawer();
    });

    if (navbar) {
        navbar.querySelectorAll('.navlist a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });
    }

    const drawerLangBtn = document.getElementById('lang-toggle-btn-drawer');
    if (drawerLangBtn) {

        updateDrawerLangBtn();

        drawerLangBtn.addEventListener('click', () => {

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
