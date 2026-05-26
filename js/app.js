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