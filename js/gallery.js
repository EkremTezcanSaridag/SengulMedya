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

    // Dynamic video loader helper
    function bindCoverClick(cover) {
        cover.addEventListener('click', function (e) {
            e.preventDefault();
            var wrapper = this.parentElement;
            var slide = wrapper.parentElement;
            var videoUrl = slide.getAttribute('data-video-url');

            var videoId = "";
            var isGoogleDrive = videoUrl.includes("drive.google.com");
            if (isGoogleDrive) {
                var match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    videoId = match[1];
                }
            }

            if (isGoogleDrive && videoId) {
                // Create HTML5 video element with muted, autoplay, loop and no controls
                var videoEl = document.createElement('video');
                videoEl.setAttribute('autoplay', 'true');
                videoEl.setAttribute('muted', 'true');
                videoEl.setAttribute('loop', 'true');
                videoEl.setAttribute('playsinline', 'true');
                videoEl.style.width = '100%';
                videoEl.style.height = '100%';
                videoEl.style.position = 'absolute';
                videoEl.style.top = '0';
                videoEl.style.left = '0';
                videoEl.style.objectFit = 'cover';
                videoEl.style.pointerEvents = 'none'; // Absolutely no clicks/touches can interact with it

                // Make sure DOM muted property is set programmatically (required by browsers)
                videoEl.muted = true;

                var sourceEl = document.createElement('source');
                sourceEl.setAttribute('src', 'https://drive.google.com/uc?export=download&id=' + videoId);
                sourceEl.setAttribute('type', 'video/mp4');
                videoEl.appendChild(sourceEl);

                wrapper.innerHTML = '';
                wrapper.appendChild(videoEl);
                videoEl.play().catch(function(err) {
                    console.log("Autoplay blocked or error: ", err);
                });
            } else {
                // Fallback to iframe if it's not Google Drive
                var iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoUrl + "?autoplay=1&mute=1&muted=1");
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; encrypted-media');
                iframe.setAttribute('allowfullscreen', 'true');
                iframe.style.pointerEvents = 'none';

                wrapper.innerHTML = '';
                wrapper.appendChild(iframe);
            }
        });
    }

    // Bind click listeners on initial page load
    document.querySelectorAll('.video-cover').forEach(bindCoverClick);

    // Audio & visual cleanup: When slide changes, unload any active iframes or video tags
    swiper.on('slideChange', function () {
        document.querySelectorAll('.swiper-slide').forEach(function (slide) {
            var wrapper = slide.querySelector('.video-wrapper');
            if (wrapper && (wrapper.querySelector('iframe') || wrapper.querySelector('video'))) {
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
