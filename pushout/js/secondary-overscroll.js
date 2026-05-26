(function () {
    var themeColor = document.querySelector('meta[name="theme-color"]');
    var seaThemeColor = "#dfeaf6";
    var islandThemeColor = "#f9f399";
    var activeThemeColor = null;
    var activeOverscrollZone = null;
    var frame = null;
    var lastTouchY = null;

    function setThemeColor(color) {
        if (!themeColor || activeThemeColor === color) {
            return;
        }

        themeColor.setAttribute("content", color);
        activeThemeColor = color;
    }

    function setOverscrollZone(zone) {
        if (activeOverscrollZone === zone) {
            return;
        }

        document.documentElement.setAttribute("data-overscroll-zone", zone);
        setThemeColor(zone === "island" ? islandThemeColor : seaThemeColor);
        activeOverscrollZone = zone;
    }

    function getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    function getMaxScroll() {
        return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function updateOverscrollZone() {
        frame = null;

        var scrollTop = getScrollTop();
        var maxScroll = getMaxScroll();

        if (maxScroll <= 2) {
            return;
        }

        setOverscrollZone(maxScroll - scrollTop <= 2 ? "island" : "sea");
    }

    function requestOverscrollUpdate() {
        if (frame === null) {
            frame = window.requestAnimationFrame(updateOverscrollZone);
        }
    }

    function handleWheel(event) {
        if (getMaxScroll() > 2) {
            requestOverscrollUpdate();
            return;
        }

        if (event.deltaY > 0) {
            setOverscrollZone("island");
        } else if (event.deltaY < 0) {
            setOverscrollZone("sea");
        }
    }

    function handleTouchStart(event) {
        if (event.touches && event.touches.length > 0) {
            lastTouchY = event.touches[0].clientY;
        }
    }

    function handleTouchMove(event) {
        if (!event.touches || event.touches.length === 0 || lastTouchY === null) {
            return;
        }

        var currentTouchY = event.touches[0].clientY;
        var deltaY = currentTouchY - lastTouchY;
        var maxScroll = getMaxScroll();
        var scrollTop = getScrollTop();

        lastTouchY = currentTouchY;

        if (scrollTop <= 2 && deltaY > 0) {
            setOverscrollZone("sea");
        } else if (maxScroll - scrollTop <= 2 && deltaY < 0) {
            setOverscrollZone("island");
        }
    }

    function handleTouchEnd() {
        lastTouchY = null;
        requestOverscrollUpdate();
    }

    setOverscrollZone("sea");
    updateOverscrollZone();

    window.addEventListener("load", updateOverscrollZone);
    window.addEventListener("resize", requestOverscrollUpdate, { passive: true });
    window.addEventListener("scroll", requestOverscrollUpdate, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });
}());
