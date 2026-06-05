document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: { rotate: 15, stretch: 0, depth: 150, modifier: 1, slideShadows: true },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        keyboard: { enabled: true }
    });

    var videoKeys = ['1FcMQ', '15uFH', 'Vi9ph', '8jtx8'];
    var videoInfo = [
        { id: 'gallery.video1', title: 'Şengül Medya — Sinematik Düğün Hikayesi' },
        { id: 'gallery.video2', title: 'Şengül Medya — Profesyonel Dış Çekim' },
        { id: 'gallery.video3', title: 'Şengül Medya — Gelin Çıkarma & Eğlence' },
        { id: 'gallery.video4', title: 'Şengül Medya — Drone ile Havadan Çekimler' },
        { id: 'gallery.video5', title: 'Şengül Medya — Reklam & Mekan Tanıtımı' }
    ];

    function getVideoData(url) {
        var idx = videoKeys.findIndex(function (k) { return url.includes(k); });
        var num = idx !== -1 ? idx + 1 : 5;
        return { index: num, info: videoInfo[num - 1] };
    }

    function initCoverBackground(cover, videoUrl) {
        var match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            cover.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.65)), url('https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w1000')";
            cover.style.backgroundSize = "cover";
            cover.style.backgroundPosition = "center";
            cover.style.backgroundRepeat = "no-repeat";
        }
    }

    function fadeOutCover(elToShow, cover, wrapper) {
        elToShow.style.opacity = '1';
        cover.style.transition = 'opacity 0.4s ease';
        cover.style.opacity = '0';
        setTimeout(function() {
            if (cover && cover.parentNode === wrapper) wrapper.removeChild(cover);
        }, 400);
    }

    function createVideo(src, useCrossOrigin) {
        var video = document.createElement('video');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('muted', 'true');
        video.setAttribute('loop', 'true');
        video.setAttribute('playsinline', 'true');
        video.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;object-fit:cover;opacity:0;transition:opacity 0.4s ease;';
        if (useCrossOrigin) video.setAttribute('crossorigin', 'anonymous');

        var source = document.createElement('source');
        source.setAttribute('src', src);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
        video.muted = true;
        return video;
    }

    function bindCoverClick(cover) {
        cover.addEventListener('click', function (e) {
            e.preventDefault();
            var wrapper = this.parentElement;
            var videoUrl = wrapper.parentElement.getAttribute('data-video-url');
            var isGoogleDrive = videoUrl.includes("drive.google.com");
            var match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
            var fileId = (isGoogleDrive && match) ? match[1] : "";
            
            var vData = getVideoData(videoUrl);
            var localSrc = 'videos/video' + vData.index + '.mp4';
            var videoLoaded = false;
            var hasFailed = false;

            var videoEl = createVideo(localSrc, false);
            wrapper.appendChild(videoEl);

            videoEl.addEventListener('playing', function() {
                videoLoaded = true;
                fadeOutCover(videoEl, cover, wrapper);
            });

            var sourceEl = videoEl.querySelector('source');
            sourceEl.addEventListener('error', function() {
                if (!hasFailed) { hasFailed = true; fallback(); }
            });

            var timeoutId = setTimeout(function() {
                if (!videoLoaded && !hasFailed) { hasFailed = true; fallback(); }
            }, 1200);

            function fallback() {
                clearTimeout(timeoutId);
                if (videoEl && videoEl.parentNode === wrapper) wrapper.removeChild(videoEl);

                if (isGoogleDrive && fileId) {
                    var driveVideo = createVideo('https://drive.google.com/uc?export=download&id=' + fileId, true);
                    wrapper.appendChild(driveVideo);

                    driveVideo.addEventListener('playing', function() {
                        videoLoaded = true;
                        fadeOutCover(driveVideo, cover, wrapper);
                    });

                    setTimeout(function() {
                        if (!videoLoaded) {
                            if (driveVideo && driveVideo.parentNode === wrapper) wrapper.removeChild(driveVideo);
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
        iframe.src = videoUrl + "?autoplay=1";
        iframe.frameBorder = "0";
        iframe.allow = "autoplay; encrypted-media";
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'opacity:0;transition:opacity 0.4s ease;';
        wrapper.appendChild(iframe);

        var fallbackTimeout = setTimeout(function() {
            if (iframe.style.opacity !== '1') fadeOutCover(iframe, cover, wrapper);
        }, 3000);

        iframe.onload = function () {
            clearTimeout(fallbackTimeout);
            fadeOutCover(iframe, cover, wrapper);
        };
    }

    document.querySelectorAll('.swiper-slide').forEach(function (slide) {
        var url = slide.getAttribute('data-video-url');
        var cover = slide.querySelector('.video-cover');
        if (cover && url) {
            initCoverBackground(cover, url);
            bindCoverClick(cover);
        }
    });

    swiper.on('slideChange', function () {
        document.querySelectorAll('.swiper-slide').forEach(function (slide) {
            var wrapper = slide.querySelector('.video-wrapper');
            if (wrapper && (wrapper.querySelector('iframe') || wrapper.querySelector('video'))) {
                var url = slide.getAttribute('data-video-url');
                var vData = getVideoData(url);

                wrapper.innerHTML = `
                    <div class="video-cover">
                        <div class="play-btn-circle"><i class="fa-solid fa-play"></i></div>
                        <span class="video-cover-title" data-i18n="${vData.info.id}">${vData.info.title}</span>
                    </div>
                `;

                var newCover = wrapper.querySelector('.video-cover');
                initCoverBackground(newCover, url);
                bindCoverClick(newCover);
            }
        });

        if (typeof applyTranslations === 'function' && typeof getCurrentLang === 'function') {
            applyTranslations(getCurrentLang());
        }
    });
});
