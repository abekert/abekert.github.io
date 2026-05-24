(function () {
    var hero = document.querySelector(".hero");
    var themeColor = document.querySelector('meta[name="theme-color"]');
    var islandBand = document.querySelector(".island-band");
    var seaThemeColor = "#dfeaf6";
    var islandThemeColor = "#f9f399";
    var activeThemeColor = null;
    var themeFrame = null;
    var activeOverscrollZone = null;

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
        activeOverscrollZone = zone;
    }

    function updateThemeColor() {
        themeFrame = null;

        if (!islandBand) {
            setThemeColor(seaThemeColor);
            setOverscrollZone("sea");
            return;
        }

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        var maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        var islandTop = islandBand.getBoundingClientRect().top;
        var switchOffset = Math.min(180, window.innerHeight * 0.24);

        setThemeColor(islandTop <= -switchOffset ? islandThemeColor : seaThemeColor);
        setOverscrollZone(maxScroll - scrollTop <= 2 ? "island" : "sea");
    }

    function requestThemeColorUpdate() {
        if (themeFrame === null) {
            themeFrame = window.requestAnimationFrame(updateThemeColor);
        }
    }

    updateThemeColor();
    window.addEventListener("load", updateThemeColor);
    window.addEventListener("resize", requestThemeColorUpdate, { passive: true });
    window.addEventListener("scroll", requestThemeColorUpdate, { passive: true });

    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    var currentX = 0;
    var currentY = 0;
    var targetX = 0;
    var targetY = 0;
    var frame = null;
    var scrollFrame = null;
    var orientationPermissionRequested = false;
    var heroContent = document.querySelector(".hero__content");
    var videoBoard = document.querySelector(".video-board");

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function setTarget(x, y) {
        targetX = clamp(x, -34, 34);
        targetY = clamp(y, -28, 28);

        if (frame === null) {
            frame = window.requestAnimationFrame(update);
        }
    }

    function update() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        var backgroundX = currentX * 0.18;
        var backgroundY = currentY * 0.16;
        var foregroundX = currentX * -0.46;
        var foregroundY = currentY * -0.38;
        var shadowX = 18 + (currentX * 0.64);
        var shadowY = 20 + (currentY * 0.54);

        hero.style.setProperty("--parallax-x", currentX.toFixed(2) + "px");
        hero.style.setProperty("--parallax-y", currentY.toFixed(2) + "px");
        hero.style.setProperty("--parallax-bg-x", backgroundX.toFixed(2) + "px");
        hero.style.setProperty("--parallax-bg-y", backgroundY.toFixed(2) + "px");
        hero.style.setProperty("--parallax-fg-x", foregroundX.toFixed(2) + "px");
        hero.style.setProperty("--parallax-fg-y", foregroundY.toFixed(2) + "px");
        hero.style.setProperty("--parallax-shadow-x", shadowX.toFixed(2) + "px");
        hero.style.setProperty("--parallax-shadow-y", shadowY.toFixed(2) + "px");

        if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
            frame = window.requestAnimationFrame(update);
        } else {
            frame = null;
        }
    }

    function handlePointerMove(event) {
        if (event.pointerType === "touch") {
            return;
        }

        var centerX = window.innerWidth / 2;
        var centerY = window.innerHeight / 2;

        setTarget((event.clientX - centerX) / centerX * 30, (event.clientY - centerY) / centerY * 24);
    }

    function handleTouchMove(event) {
        if (!event.touches || event.touches.length === 0) {
            return;
        }

        var touch = event.touches[0];
        var centerX = window.innerWidth / 2;
        var centerY = window.innerHeight / 2;

        setTarget((touch.clientX - centerX) / centerX * 30, (touch.clientY - centerY) / centerY * 24);
    }

    function handlePointerLeave() {
        setTarget(0, 0);
    }

    function requestOrientationPermission() {
        if (orientationPermissionRequested) {
            return;
        }

        orientationPermissionRequested = true;

        if (
            typeof window.DeviceOrientationEvent !== "undefined" &&
            typeof window.DeviceOrientationEvent.requestPermission === "function"
        ) {
            var permissionRequest = window.DeviceOrientationEvent.requestPermission();

            if (permissionRequest && typeof permissionRequest.catch === "function") {
                permissionRequest.catch(function () {
                    orientationPermissionRequested = false;
                });
            }
        }
    }

    function handleDeviceOrientation(event) {
        if (event.beta === null || event.gamma === null) {
            return;
        }

        setTarget(event.gamma * -0.85, event.beta * -0.45);
    }

    function updateRopeHeight() {
        if (!heroContent || !videoBoard) {
            return;
        }

        var contentTop = heroContent.getBoundingClientRect().top;
        var boardTop = videoBoard.getBoundingClientRect().top;
        var boardOverlap = Math.max(36, videoBoard.getBoundingClientRect().height * 0.11);
        var ropeHeight = Math.max(120, boardTop - contentTop + boardOverlap);

        hero.style.setProperty("--board-rope-height", ropeHeight.toFixed(0) + "px");
    }

    function updateScrollParallax() {
        scrollFrame = null;

        var heroRect = hero.getBoundingClientRect();
        var scrollInsideHero = clamp(-heroRect.top, 0, heroRect.height);

        hero.style.setProperty("--scroll-bg-y", (scrollInsideHero * 0.12).toFixed(2) + "px");
        hero.style.setProperty("--scroll-logo-y", (scrollInsideHero * 0.24).toFixed(2) + "px");
        hero.style.setProperty("--scroll-board-y", (scrollInsideHero * 0.10).toFixed(2) + "px");
    }

    function requestScrollParallax() {
        if (scrollFrame === null) {
            scrollFrame = window.requestAnimationFrame(updateScrollParallax);
        }
    }

    updateRopeHeight();
    updateScrollParallax();
    window.addEventListener("load", updateRopeHeight);
    window.addEventListener("resize", function () {
        updateRopeHeight();
        requestScrollParallax();
    }, { passive: true });
    window.addEventListener("scroll", requestScrollParallax, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("pointerdown", requestOrientationPermission, { passive: true });
    window.addEventListener("touchstart", requestOrientationPermission, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handlePointerLeave, { passive: true });
    window.addEventListener("touchcancel", handlePointerLeave, { passive: true });
    window.addEventListener("click", requestOrientationPermission, { passive: true });
    window.addEventListener("deviceorientation", handleDeviceOrientation, { passive: true });
}());
