(function () {
    "use strict";

    document.querySelectorAll("a[data-youtube-id]").forEach(function (preview) {
        preview.addEventListener("click", function (event) {
            // Keep normal links, including opening in another tab, available.
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }

            var videoId = preview.getAttribute("data-youtube-id");
            if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
                return;
            }

            var source = new URL("https://www.youtube-nocookie.com/embed/" + videoId);
            source.searchParams.set("autoplay", "1");
            source.searchParams.set("playsinline", "1");
            if (/^https?:$/.test(window.location.protocol)) {
                source.searchParams.set("origin", window.location.origin);
                source.searchParams.set("widget_referrer", window.location.origin + window.location.pathname);
            }

            var player = document.createElement("iframe");
            player.id = preview.id;
            player.title = preview.getAttribute("data-video-title");
            player.src = source.href;
            player.referrerPolicy = "strict-origin-when-cross-origin";
            player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            player.allowFullscreen = true;
            event.preventDefault();
            preview.replaceWith(player);
            player.focus();
        });
    });
}());
