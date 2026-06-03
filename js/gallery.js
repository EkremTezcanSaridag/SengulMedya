document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        keyboard: {
            enabled: true,
        }
    });

    // Dynamic video iframe loader helper
    function bindCoverClick(cover) {
        cover.addEventListener('click', function (e) {
            e.preventDefault();
            var wrapper = this.parentElement;
            var slide = wrapper.parentElement;
            var videoUrl = slide.getAttribute('data-video-url');

            // Recreate iframe and play automatically
            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', videoUrl + "?autoplay=1&mute=1&muted=1");
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
            iframe.setAttribute('allowfullscreen', 'true');

            // Clear placeholder cover and append iframe
            wrapper.innerHTML = '';
            wrapper.appendChild(iframe);
        });
    }

    // Bind click listeners on initial page load
    document.querySelectorAll('.video-cover').forEach(bindCoverClick);

    // Audio & visual cleanup: When slide changes, unload any active iframes to prevent overlapping audio
    swiper.on('slideChange', function () {
        document.querySelectorAll('.swiper-slide').forEach(function (slide) {
            var wrapper = slide.querySelector('.video-wrapper');
            if (wrapper && wrapper.querySelector('iframe')) {
                var videoUrl = slide.getAttribute('data-video-url');
                var videoId = videoUrl.includes('1FcMQ') ? 'gallery.video1' :
                    videoUrl.includes('15uFH') ? 'gallery.video2' :
                        videoUrl.includes('Vi9ph') ? 'gallery.video3' :
                            videoUrl.includes('8jtx8') ? 'gallery.video4' : 'gallery.video5';

                var titleText = videoId === 'gallery.video1' ? 'Şengül Medya — Sinematik Düğün Hikayesi' :
                    videoId === 'gallery.video2' ? 'Şengül Medya — Profesyonel Dış Çekim' :
                        videoId === 'gallery.video3' ? 'Şengül Medya — Gelin Çıkarma & Eğlence' :
                            videoId === 'gallery.video4' ? 'Şengül Medya — Drone ile Havadan Çekimler' : 'Şengül Medya — Reklam & Mekan Tanıtımı';

                // Restore cover overlay dynamically
                wrapper.innerHTML = `
                    <div class="video-cover">
                        <div class="play-btn-circle">
                            <i class="fa-solid fa-play"></i>
                        </div>
                        <span class="video-cover-title" data-i18n="${videoId}">${titleText}</span>
                    </div>
                `;

                // Re-bind the click event to the newly generated cover
                bindCoverClick(wrapper.querySelector('.video-cover'));
            }
        });

        // Re-apply translations to ensure language stays consistent on dynamic recreation
        if (typeof applyTranslations === 'function' && typeof getCurrentLang === 'function') {
            applyTranslations(getCurrentLang());
        }
    });
});
