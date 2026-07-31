(function () {
    'use strict';

    const selector = 'iframe.youtube-trim[data-start][data-end]';

    function loadYouTubeAPI(callback) {
        if (window.YT && window.YT.Player) {
            callback();
            return;
        }

        const previousCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = function () {
            if (typeof previousCallback === 'function') previousCallback();
            callback();
        };

        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(script);
        }
    }

    function initializeVideos() {
        document.querySelectorAll(selector).forEach(function (iframe) {
            if (iframe.dataset.youtubeTrimInitialized === 'true') return;

            const startTime = Number(iframe.dataset.start);
            const endTime = Number(iframe.dataset.end);
            const shouldLoop = iframe.dataset.loop !== 'false';

            if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime <= startTime) {
                console.warn('Invalid YouTube trim range:', iframe);
                return;
            }

            iframe.dataset.youtubeTrimInitialized = 'true';

            let player;
            let monitor;

            function returnToStart(continuePlaying) {
                player.seekTo(startTime, true);
                if (continuePlaying) player.playVideo();
            }

            player = new YT.Player(iframe, {
                events: {
                    onReady: function () {
                        monitor = window.setInterval(function () {
                            if (player.getPlayerState() !== YT.PlayerState.PLAYING) return;
                            if (player.getCurrentTime() < endTime) return;

                            if (shouldLoop) {
                                returnToStart(true);
                            } else {
                                player.pauseVideo();
                            }
                        }, 200);
                    },
                    onStateChange: function (event) {
                        if (shouldLoop && event.data === YT.PlayerState.ENDED) {
                            returnToStart(true);
                        }
                    }
                }
            });

            window.addEventListener('pagehide', function () {
                window.clearInterval(monitor);
            }, { once: true });
        });
    }

    function start() {
        if (!document.querySelector(selector)) return;
        loadYouTubeAPI(initializeVideos);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
