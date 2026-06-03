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

    function initCoverBackground(cover, videoUrl) {
        var match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            var fileId = match[1];
            // Use a dark gradient overlay on the background image for premium styling and text readability
            cover.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.65)), url('https://drive.google.com/thumbnail?id=" + fileId + "&sz=w1000')";
            cover.style.backgroundSize = "cover";
            cover.style.backgroundPosition = "center";
            cover.style.backgroundRepeat = "no-repeat";
        }
    }

    // Dynamic video loader helper
    function bindCoverClick(cover) {
        cover.addEventListener('click', function (e) {
            e.preventDefault();
            var wrapper = this.parentElement;
            var slide = wrapper.parentElement;
            var videoUrl = slide.getAttribute('data-video-url');

            var fileId = "";
            var isGoogleDrive = videoUrl.includes("drive.google.com");
            if (isGoogleDrive) {
                var match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (match && match[1]) {
                    fileId = match[1];
                }
            }

            var videoIndex = videoUrl.includes('1FcMQ') ? 1 :
                videoUrl.includes('15uFH') ? 2 :
                videoUrl.includes('Vi9ph') ? 3 :
                videoUrl.includes('8jtx8') ? 4 : 5;
            
            var localSrc = 'videos/video' + videoIndex + '.mp4';
            var videoLoaded = false;

            // Step 1: Try playing local video first (100% muted autoplay without network blocks)
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
            videoEl.style.opacity = '0';
            videoEl.style.transition = 'opacity 0.4s ease';
            
            // Programmatically force mute
            videoEl.muted = true;

            var localSource = document.createElement('source');
            localSource.setAttribute('src', localSrc);
            localSource.setAttribute('type', 'video/mp4');
            videoEl.appendChild(localSource);

            wrapper.appendChild(videoEl);

            // On successful local video load and play
            videoEl.addEventListener('playing', function() {
                videoLoaded = true;
                videoEl.style.opacity = '1';
                cover.style.transition = 'opacity 0.4s ease';
                cover.style.opacity = '0';
                setTimeout(function() {
                    if (cover && cover.parentNode === wrapper) {
                        wrapper.removeChild(cover);
                    }
                }, 400);
            });

            // Handle local file not found or load error
            var hasFailed = false;
            localSource.addEventListener('error', function() {
                if (!hasFailed) {
                    hasFailed = true;
                    fallbackToGoogleDriveDirect();
                }
            });

            // Fallback timer: if local video doesn't play in 1.2 seconds, fallback
            var timeoutId = setTimeout(function() {
                if (!videoLoaded && !hasFailed) {
                    hasFailed = true;
                    fallbackToGoogleDriveDirect();
                }
            }, 1200);

            function fallbackToGoogleDriveDirect() {
                clearTimeout(timeoutId);
                // Remove local video element
                if (videoEl && videoEl.parentNode === wrapper) {
                    wrapper.removeChild(videoEl);
                }

                if (isGoogleDrive && fileId) {
                    // Step 2: Try playing Google Drive direct stream (muted)
                    var driveVideoEl = document.createElement('video');
                    driveVideoEl.setAttribute('autoplay', 'true');
                    driveVideoEl.setAttribute('muted', 'true');
                    driveVideoEl.setAttribute('loop', 'true');
                    driveVideoEl.setAttribute('playsinline', 'true');
                    driveVideoEl.setAttribute('crossorigin', 'anonymous');
                    driveVideoEl.style.width = '100%';
                    driveVideoEl.style.height = '100%';
                    driveVideoEl.style.position = 'absolute';
                    driveVideoEl.style.top = '0';
                    driveVideoEl.style.left = '0';
                    driveVideoEl.style.objectFit = 'cover';
                    driveVideoEl.style.opacity = '0';
                    driveVideoEl.style.transition = 'opacity 0.4s ease';
                    driveVideoEl.muted = true;

                    var driveSource = document.createElement('source');
                    driveSource.setAttribute('src', 'https://drive.google.com/uc?export=download&id=' + fileId);
                    driveSource.setAttribute('type', 'video/mp4');
                    driveVideoEl.appendChild(driveSource);
                    wrapper.appendChild(driveVideoEl);

                    driveVideoEl.addEventListener('playing', function() {
                        videoLoaded = true;
                        driveVideoEl.style.opacity = '1';
                        cover.style.transition = 'opacity 0.4s ease';
                        cover.style.opacity = '0';
                        setTimeout(function() {
                            if (cover && cover.parentNode === wrapper) {
                                wrapper.removeChild(cover);
                            }
                        }, 400);
                    });

                    // Step 3: If direct stream also fails or gets blocked in 2 seconds, fall back to iframe preview
                    setTimeout(function() {
                        if (!videoLoaded) {
                            if (driveVideoEl && driveVideoEl.parentNode === wrapper) {
                                wrapper.removeChild(driveVideoEl);
                            }
                            loadIframeFallback(wrapper, cover, videoUrl);
                        }
                    }, 2000);
                } else {
                    loadIframeFallback(wrapper, cover, videoUrl);
                }
            }
        });
    }

    function loadIframeFallback(wrapper, cover, videoUrl) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', videoUrl + "?autoplay=1");
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.4s ease';

        wrapper.appendChild(iframe);

        var fallbackTimeout = setTimeout(function() {
            if (iframe.style.opacity !== '1') {
                iframe.style.opacity = '1';
                cover.style.transition = 'opacity 0.4s ease';
                cover.style.opacity = '0';
                setTimeout(function() {
                    if (cover && cover.parentNode === wrapper) {
                        wrapper.removeChild(cover);
                    }
                }, 400);
            }
        }, 3000);

        iframe.onload = function () {
            clearTimeout(fallbackTimeout);
            iframe.style.opacity = '1';
            cover.style.transition = 'opacity 0.4s ease';
            cover.style.opacity = '0';
            setTimeout(function () {
                if (cover && cover.parentNode === wrapper) {
                    wrapper.removeChild(cover);
                }
            }, 400);
        };
    }

    // Bind click listeners and load background thumbnails on initial page load
    document.querySelectorAll('.swiper-slide').forEach(function (slide) {
        var videoUrl = slide.getAttribute('data-video-url');
        var cover = slide.querySelector('.video-cover');
        if (cover && videoUrl) {
            initCoverBackground(cover, videoUrl);
            bindCoverClick(cover);
        }
    });

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

                // Re-bind click event and dynamic thumbnail to the newly generated cover
                var newCover = wrapper.querySelector('.video-cover');
                initCoverBackground(newCover, videoUrl);
                bindCoverClick(newCover);
            }
        });

        // Re-apply translations to ensure language stays consistent on dynamic recreation
        if (typeof applyTranslations === 'function' && typeof getCurrentLang === 'function') {
            applyTranslations(getCurrentLang());
        }
    });
});
