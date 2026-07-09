(function () {
  var presetChoice = document.getElementById("style-preset");
  var input = document.getElementById("sign-text");
  var barWidthInput = document.getElementById("bar-width");
  var barWidthOutput = document.getElementById("bar-width-output");
  var barHeightInput = document.getElementById("bar-height-adjust");
  var barHeightOutput = document.getElementById("bar-height-output");
  var fontChoice = document.getElementById("font-choice");
  var textSizeInput = document.getElementById("text-size-adjust");
  var textSizeOutput = document.getElementById("text-size-output");
  var colorChoice = document.getElementById("color-choice");
  var capitaliseToggle = document.getElementById("capitalise-text");
  var whiteCenterToggle = document.getElementById("white-center");
  var gradientsToggle = document.getElementById("use-gradients");
  var shadowToggle = document.getElementById("use-shadow");
  var blueOutlineToggle = document.getElementById("blue-outline");
  var whiteInsetToggle = document.getElementById("white-inset");
  var plaqueToggle = document.getElementById("use-plaque");
  var exportButton = document.getElementById("export-button");
  var exportSvgButton = document.getElementById("export-svg-button");
  var undoButton = document.getElementById("undo-button");
  var resetButton = document.getElementById("reset-button");
  var copyLinkButton = document.getElementById("copy-link-button");
  var exportStatus = document.getElementById("export-status");
  var svg = document.getElementById("roundel-svg");
  var form = document.getElementById("roundel-form");
  var roundelStage = document.getElementById("roundel-stage");
  var plaqueBackground = document.getElementById("plaque-background");
  var bulbLayer = document.getElementById("bulb-layer");
  var artGroup = document.getElementById("roundel-art");
  var ringCircle = document.getElementById("ring-circle");
  var ringHole = document.getElementById("ring-hole");
  var ringOuterOutline = document.getElementById("ring-outer-outline");
  var ringInnerOutline = document.getElementById("ring-inner-outline");
  var centerFill = document.getElementById("center-fill");
  var barFill = document.getElementById("bar-fill");
  var barBorder = document.getElementById("bar-border");
  var barInset = document.getElementById("bar-inset");
  var barOrnaments = document.getElementById("bar-ornaments");
  var ringStopTop = document.getElementById("ring-stop-top");
  var ringStopMid = document.getElementById("ring-stop-mid");
  var ringStopBottom = document.getElementById("ring-stop-bottom");
  var barStopTop = document.getElementById("bar-stop-top");
  var barStopMid = document.getElementById("bar-stop-mid");
  var barStopBottom = document.getElementById("bar-stop-bottom");
  var textNode = document.getElementById("roundel-text");
  var titleNode = document.getElementById("roundel-title");
  var presetButtons = Array.prototype.slice.call(document.querySelectorAll("[data-preset]"));
  var fontButtons = Array.prototype.slice.call(document.querySelectorAll("[data-font]"));
  var colorButtons = Array.prototype.slice.call(document.querySelectorAll("[data-color]"));
  var menuButtons = Array.prototype.slice.call(document.querySelectorAll("[data-menu]"));
  var menuPanels = Array.prototype.slice.call(document.querySelectorAll("[data-menu-panel]"));
  var barGrips = Array.prototype.slice.call(document.querySelectorAll(".bar-grip"));
  var leftBarGrip = document.querySelector(".bar-grip-left");
  var rightBarGrip = document.querySelector(".bar-grip-right");
  var topBarGrip = document.querySelector(".bar-grip-top");
  var bottomBarGrip = document.querySelector(".bar-grip-bottom");
  var exportTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-export]"));
  var exportSvgTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-export-svg]"));
  var copyLinkTriggers = Array.prototype.slice.call(document.querySelectorAll("[data-copy-link]"));
  var dragReadout = document.getElementById("drag-readout");
  var measureCanvas = document.createElement("canvas");
  var measureContext = measureCanvas.getContext("2d");
  var svgNamespace = "http://www.w3.org/2000/svg";
  var centerX = 600;
  var centerY = 420;
  var minFontSize = 34;
  var transitionDuration = 520;
  var activeAnimationFrame = 0;
  var hasRendered = false;
  var reducedMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var requestFrame = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (callback) {
    return window.setTimeout(function () {
      callback(Date.now());
    }, 16);
  };
  var cancelFrame = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : window.clearTimeout.bind(window);
  var now = window.performance && window.performance.now ? function () {
    return window.performance.now();
  } : Date.now;
  var activePresetKey = "enamel";
  var storageKey = "roundel-maker-state-v2";
  var introSeenKey = "roundel-maker-intro-seen-v1";
  var undoStack = [];
  var maxUndoSteps = 40;
  var isApplyingState = false;
  var activeDrag = null;
  var fontStacks = {
    gill: "'Gill Sans', 'Gill Sans MT', 'Avenir Next', 'Trebuchet MS', Arial, sans-serif",
    avenir: "'Avenir Next', Avenir, 'Gill Sans', 'Trebuchet MS', Arial, sans-serif",
    trebuchet: "'Trebuchet MS', 'Gill Sans', 'Avenir Next', Arial, sans-serif",
    system: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    rounded: "'Arial Rounded MT Bold', 'Arial Rounded MT', 'Trebuchet MS', Arial, sans-serif"
  };
  var colorSchemes = {
    underground: {
      ringSolid: "#e1251b",
      ringGradient: ["#e1251b", "#e1251b", "#e1251b"],
      ringOutlineColor: "#e1251b",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    rail: {
      ringSolid: "#001f7e",
      ringGradient: ["#001f7e", "#001f7e", "#001f7e"],
      ringOutlineColor: "#001f7e",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    elizabeth: {
      ringSolid: "#7156b8",
      ringGradient: ["#7156b8", "#7156b8", "#7156b8"],
      ringOutlineColor: "#7156b8",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    overground: {
      ringSolid: "#ef7b10",
      ringGradient: ["#ef7b10", "#ef7b10", "#ef7b10"],
      ringOutlineColor: "#ef7b10",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    dlr: {
      ringSolid: "#00a4a7",
      ringGradient: ["#00a4a7", "#00a4a7", "#00a4a7"],
      ringOutlineColor: "#00a4a7",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    river: {
      ringSolid: "#009bd8",
      ringGradient: ["#009bd8", "#009bd8", "#009bd8"],
      ringOutlineColor: "#009bd8",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    trams: {
      ringSolid: "#84bd00",
      ringGradient: ["#84bd00", "#84bd00", "#84bd00"],
      ringOutlineColor: "#84bd00",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    buses: {
      ringSolid: "#e1251b",
      ringGradient: ["#e1251b", "#e1251b", "#e1251b"],
      ringOutlineColor: "#e1251b",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#e1251b",
      barGradient: ["#e1251b", "#e1251b", "#e1251b"],
      outlineColor: "#e1251b",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    coaches: {
      ringSolid: "#fdb913",
      ringGradient: ["#fdb913", "#fdb913", "#fdb913"],
      ringOutlineColor: "#fdb913",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    cycles: {
      ringSolid: "#e1251b",
      ringGradient: ["#e1251b", "#e1251b", "#e1251b"],
      ringOutlineColor: "#e1251b",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#ffffff",
      barGradient: ["#ffffff", "#ffffff", "#ffffff"],
      outlineColor: "#e1251b",
      outlineWidth: 6,
      outlineOpacity: "1",
      insetOpacity: "0",
      textColor: "#e1251b",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    dial: {
      ringSolid: "#b23a96",
      ringGradient: ["#b23a96", "#b23a96", "#b23a96"],
      ringOutlineColor: "#b23a96",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    taxi: {
      ringSolid: "#7c8bc5",
      ringGradient: ["#7c8bc5", "#7c8bc5", "#7c8bc5"],
      ringOutlineColor: "#7c8bc5",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetOpacity: "0",
      textColor: "#ffffff",
      gradients: false,
      blueOutline: true,
      whiteInset: false
    },
    airline: {
      centerFill: "#ffffff",
      ringSolid: "transparent",
      ringGradient: ["transparent", "transparent", "transparent"],
      ringOutlineColor: "#e4002b",
      ringOutlineWidth: 4,
      ringOutlineOpacity: "1",
      barSolid: "#ffffff",
      barGradient: ["#ffffff", "#ffffff", "#ffffff"],
      outlineColor: "#e4002b",
      outlineWidth: 4,
      outlineOpacity: "1",
      insetOpacity: "0",
      textColor: "#e4002b",
      gradients: false,
      blueOutline: true,
      whiteInset: false,
      whiteCenter: true
    }
  };
  var presets = {
    enamel: {
      barWidth: 900,
      font: "gill",
      whiteCenter: true,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      outerRadius: 292,
      innerRadius: 178,
      singleBarHeight: 182,
      doubleBarHeight: 286,
      centerFill: "#ffffff",
      ringSolid: "#d61920",
      ringGradient: ["#f03b31", "#d61920", "#b50f19"],
      ringOutlineColor: "#111111",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#0019a8",
      barGradient: ["#1428bd", "#0019a8", "#000f72"],
      barRadius: 8,
      outlineColor: "#09105f",
      outlineWidth: 8,
      outlineOpacity: "0.28",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.12",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    classic: {
      barWidth: 890,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: false,
      blueOutline: false,
      whiteInset: false,
      outerRadius: 292,
      innerRadius: 178,
      singleBarHeight: 176,
      doubleBarHeight: 278,
      centerFill: "#ffffff",
      ringSolid: "#dc241f",
      ringGradient: ["#dc241f", "#dc241f", "#dc241f"],
      ringOutlineColor: "#111111",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#0019a8",
      barGradient: ["#0019a8", "#0019a8", "#0019a8"],
      barRadius: 2,
      outlineColor: "#00115f",
      outlineWidth: 8,
      outlineOpacity: "0.24",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.1",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    platform: {
      barWidth: 990,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: true,
      blueOutline: false,
      whiteInset: false,
      outerRadius: 302,
      innerRadius: 181,
      singleBarHeight: 190,
      doubleBarHeight: 294,
      centerFill: "#eef3f6",
      ringSolid: "#e94b55",
      ringGradient: ["#e94b55", "#e94b55", "#e94b55"],
      ringOutlineColor: "#2b2b2b",
      ringOutlineWidth: 6,
      ringOutlineOpacity: "0.45",
      barSolid: "#394579",
      barGradient: ["#394579", "#394579", "#394579"],
      barRadius: 0,
      outlineColor: "#252c50",
      outlineWidth: 8,
      outlineOpacity: "0.25",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.08",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    heritage: {
      barWidth: 930,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      outerRadius: 292,
      innerRadius: 180,
      singleBarHeight: 156,
      doubleBarHeight: 256,
      centerFill: "#efe8c9",
      ringSolid: "#cf130f",
      ringGradient: ["#ed2b21", "#cf130f", "#9f0c08"],
      ringOutlineColor: "#1f211a",
      ringOutlineWidth: 10,
      ringOutlineOpacity: "0.95",
      barSolid: "#071454",
      barGradient: ["#12246f", "#071454", "#050b35"],
      barRadius: 0,
      outlineColor: "#171a14",
      outlineWidth: 14,
      outlineOpacity: "0.95",
      insetColor: "#f3ecd5",
      insetWidth: 3,
      insetOpacity: "0.9",
      ornaments: "diamonds",
      ornamentColor: "#f3ecd5",
      ornamentOpacity: "0.9"
    },
    redDisc: {
      barWidth: 820,
      font: "trebuchet",
      whiteCenter: false,
      gradients: false,
      shadow: false,
      blueOutline: true,
      whiteInset: true,
      outerRadius: 286,
      innerRadius: 0,
      singleBarHeight: 132,
      doubleBarHeight: 220,
      centerFill: "#dc241f",
      ringSolid: "#dc241f",
      ringGradient: ["#e53a31", "#dc241f", "#b71317"],
      ringOutlineColor: "#111111",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#12205f",
      barGradient: ["#162a72", "#12205f", "#0a113f"],
      barRadius: 0,
      outlineColor: "#171717",
      outlineWidth: 14,
      outlineOpacity: "0.95",
      insetColor: "#f3f7ff",
      insetWidth: 3,
      insetOpacity: "0.7",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    museum: {
      barWidth: 970,
      font: "trebuchet",
      whiteCenter: true,
      gradients: false,
      shadow: true,
      blueOutline: true,
      whiteInset: false,
      outerRadius: 300,
      innerRadius: 184,
      singleBarHeight: 172,
      doubleBarHeight: 274,
      centerFill: "#f5f0de",
      ringSolid: "#b81613",
      ringGradient: ["#d72820", "#b81613", "#81100d"],
      ringOutlineColor: "#171717",
      ringOutlineWidth: 14,
      ringOutlineOpacity: "1",
      barSolid: "#10173d",
      barGradient: ["#1e2b67", "#10173d", "#080d28"],
      barRadius: 0,
      outlineColor: "#171717",
      outlineWidth: 18,
      outlineOpacity: "1",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.08",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    poster: {
      barWidth: 860,
      font: "avenir",
      whiteCenter: true,
      gradients: false,
      shadow: false,
      blueOutline: false,
      whiteInset: false,
      outerRadius: 282,
      innerRadius: 172,
      singleBarHeight: 166,
      doubleBarHeight: 264,
      centerFill: "#fffaf0",
      ringSolid: "#c92d2a",
      ringGradient: ["#c92d2a", "#c92d2a", "#c92d2a"],
      ringOutlineColor: "#111111",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      barRadius: 0,
      outlineColor: "#00115f",
      outlineWidth: 6,
      outlineOpacity: "0.18",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.1",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    night: {
      barWidth: 920,
      font: "gill",
      whiteCenter: true,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      outerRadius: 294,
      innerRadius: 178,
      singleBarHeight: 184,
      doubleBarHeight: 288,
      centerFill: "#ffffff",
      ringSolid: "#e21a23",
      ringGradient: ["#ff3a3a", "#d71920", "#7f0710"],
      ringOutlineColor: "#13151c",
      ringOutlineWidth: 4,
      ringOutlineOpacity: "0.5",
      barSolid: "#050f76",
      barGradient: ["#1d34df", "#061da9", "#020845"],
      barRadius: 8,
      outlineColor: "#020835",
      outlineWidth: 10,
      outlineOpacity: "0.48",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.16",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    halogen: {
      barWidth: 940,
      font: "gill",
      whiteCenter: true,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      plaque: true,
      bulbs: true,
      outerRadius: 294,
      innerRadius: 178,
      singleBarHeight: 174,
      doubleBarHeight: 278,
      centerFill: "#fff3d7",
      ringSolid: "#c91e17",
      ringGradient: ["#f25d3f", "#c91e17", "#76100d"],
      ringOutlineColor: "#33210f",
      ringOutlineWidth: 8,
      ringOutlineOpacity: "0.72",
      barSolid: "#071454",
      barGradient: ["#17296d", "#071454", "#02061e"],
      barRadius: 3,
      outlineColor: "#2a1d12",
      outlineWidth: 14,
      outlineOpacity: "0.82",
      insetColor: "#ffe7aa",
      insetWidth: 3,
      insetOpacity: "0.46",
      ornaments: "none",
      ornamentColor: "#fff0c4",
      ornamentOpacity: "0.65"
    },
    compact: {
      barWidth: 460,
      font: "avenir",
      whiteCenter: true,
      gradients: false,
      shadow: false,
      blueOutline: false,
      whiteInset: false,
      outerRadius: 286,
      innerRadius: 174,
      singleBarHeight: 170,
      doubleBarHeight: 264,
      centerFill: "#ffffff",
      ringSolid: "#dc241f",
      ringGradient: ["#dc241f", "#dc241f", "#dc241f"],
      ringOutlineColor: "#111111",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#0019a8",
      barGradient: ["#0019a8", "#0019a8", "#0019a8"],
      barRadius: 2,
      outlineColor: "#00115f",
      outlineWidth: 8,
      outlineOpacity: "0.24",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.1",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    twoline: {
      barWidth: 980,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: false,
      blueOutline: false,
      whiteInset: false,
      outerRadius: 302,
      innerRadius: 182,
      singleBarHeight: 182,
      doubleBarHeight: 296,
      centerFill: "#ffffff",
      ringSolid: "#dc241f",
      ringGradient: ["#dc241f", "#dc241f", "#dc241f"],
      ringOutlineColor: "#111111",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#0019a8",
      barGradient: ["#0019a8", "#0019a8", "#0019a8"],
      barRadius: 0,
      outlineColor: "#00115f",
      outlineWidth: 8,
      outlineOpacity: "0.24",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.1",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    }
  };

  function getFontStack() {
    return fontStacks[fontChoice.value] || fontStacks.gill;
  }

  function getActivePreset() {
    return presets[activePresetKey] || presets.enamel;
  }

  function getActiveColorScheme() {
    return colorSchemes[colorChoice.value] || null;
  }

  function themedValue(scheme, preset, key) {
    if (scheme && Object.prototype.hasOwnProperty.call(scheme, key)) {
      return scheme[key];
    }

    return preset[key];
  }

  function markCustom() {
    if (presetChoice.value !== "custom") {
      presetChoice.value = "custom";
    }
  }

  function setPressed(button, isPressed) {
    button.classList.toggle("is-active", isPressed);
    button.setAttribute("aria-pressed", isPressed ? "true" : "false");
  }

  function scrollPresetButtonIntoView(key) {
    var button = presetButtons.filter(function (candidate) {
      return candidate.getAttribute("data-preset") === key;
    })[0];
    var strip = button && button.parentElement;
    var targetLeft;

    if (!button || !strip || strip.scrollWidth <= strip.clientWidth) {
      return;
    }

    targetLeft = button.offsetLeft - (strip.clientWidth - button.offsetWidth) / 2;
    strip.scrollLeft = Math.max(0, Math.min(targetLeft, strip.scrollWidth - strip.clientWidth));
  }

  function syncControlStates() {
    presetButtons.forEach(function (button) {
      setPressed(button, presetChoice.value !== "custom" && button.getAttribute("data-preset") === activePresetKey);
    });

    fontButtons.forEach(function (button) {
      setPressed(button, button.getAttribute("data-font") === fontChoice.value);
    });

    colorButtons.forEach(function (button) {
      setPressed(button, button.getAttribute("data-color") === colorChoice.value);
    });
  }

  function openMenu(name) {
    menuPanels.forEach(function (panel) {
      var isOpen = panel.getAttribute("data-menu-panel") === name;

      panel.hidden = !isOpen;
    });

    menuButtons.forEach(function (button) {
      var isOpen = button.getAttribute("data-menu") === name;

      button.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    if (roundelStage) {
      roundelStage.setAttribute("data-active-menu", name || "");
    }
  }

  function closeMenus() {
    menuPanels.forEach(function (panel) {
      panel.hidden = true;
    });

    menuButtons.forEach(function (button) {
      button.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });

    if (roundelStage) {
      roundelStage.setAttribute("data-active-menu", "");
    }
  }

  function clampToControl(control, value) {
    var minimum = Number(control.getAttribute("min"));
    var maximum = Number(control.getAttribute("max"));
    var step = Number(control.getAttribute("step")) || 1;
    var number = Number(value);

    if (!Number.isFinite(number)) {
      return Number(control.value) || 0;
    }

    number = Math.max(minimum, Math.min(maximum, number));
    number = Math.round(number / step) * step;

    return number;
  }

  function setRangeControl(control, value) {
    control.value = String(clampToControl(control, value));
  }

  function getCurrentState() {
    return {
      version: 2,
      preset: presetChoice.value === "custom" ? "custom" : activePresetKey,
      activePreset: activePresetKey,
      text: input.value,
      barWidth: getBarWidth(),
      barHeight: getBarHeightAdjustment(),
      textSize: getTextSizeAdjustment(),
      font: fontChoice.value,
      color: colorChoice.value,
      capitalise: capitaliseToggle.checked,
      whiteCenter: whiteCenterToggle.checked,
      gradients: gradientsToggle.checked,
      shadow: shadowToggle.checked,
      blueOutline: blueOutlineToggle.checked,
      whiteInset: whiteInsetToggle.checked,
      plaque: plaqueToggle.checked
    };
  }

  function stateSignature(state) {
    return JSON.stringify(state);
  }

  function updateUndoButton() {
    if (undoButton) {
      undoButton.disabled = undoStack.length === 0;
    }
  }

  function recordUndoState() {
    var state;
    var signature;
    var previous;

    if (isApplyingState) {
      return;
    }

    state = getCurrentState();
    signature = stateSignature(state);
    previous = undoStack.length ? undoStack[undoStack.length - 1].signature : "";

    if (signature !== previous) {
      undoStack.push({ signature: signature, state: state });

      if (undoStack.length > maxUndoSteps) {
        undoStack.shift();
      }

      updateUndoButton();
    }
  }

  function persistState() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(getCurrentState()));
    } catch (error) {
      return;
    }
  }

  function getStoredState() {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey) || "null");
    } catch (error) {
      return null;
    }
  }

  function getBoolParam(params, key, fallback) {
    if (!params.has(key)) {
      return fallback;
    }

    return params.get(key) === "1";
  }

  function getStateFromUrl() {
    var params = new URLSearchParams(window.location.search);

    if (!params.has("text") && !params.has("preset")) {
      return null;
    }

    return {
      version: 2,
      preset: params.get("preset") || "enamel",
      activePreset: params.get("active") || params.get("preset") || "enamel",
      text: params.get("text") || "UNDERGROUND",
      barWidth: params.get("bar"),
      barHeight: params.get("thick"),
      textSize: params.get("size"),
      font: params.get("font"),
      color: params.get("color"),
      capitalise: getBoolParam(params, "caps", true),
      whiteCenter: getBoolParam(params, "center", true),
      gradients: getBoolParam(params, "grad", true),
      shadow: getBoolParam(params, "shadow", true),
      blueOutline: getBoolParam(params, "outline", true),
      whiteInset: getBoolParam(params, "inset", true),
      plaque: getBoolParam(params, "plaque", false)
    };
  }

  function appendStateParams(state) {
    var params = new URLSearchParams();

    params.set("text", state.text);
    params.set("preset", state.preset);
    params.set("active", state.activePreset);
    params.set("bar", String(state.barWidth));
    params.set("thick", String(state.barHeight));
    params.set("size", String(state.textSize));
    params.set("font", state.font);
    params.set("color", state.color);
    params.set("caps", state.capitalise ? "1" : "0");
    params.set("center", state.whiteCenter ? "1" : "0");
    params.set("grad", state.gradients ? "1" : "0");
    params.set("shadow", state.shadow ? "1" : "0");
    params.set("outline", state.blueOutline ? "1" : "0");
    params.set("inset", state.whiteInset ? "1" : "0");
    params.set("plaque", state.plaque ? "1" : "0");

    return params;
  }

  function getShareUrl() {
    var url = new URL(window.location.href);

    url.search = appendStateParams(getCurrentState()).toString();
    url.hash = "";

    return url.toString();
  }

  function fallbackCopyText(value) {
    var fallback;

    fallback = document.createElement("textarea");
    fallback.value = value;
    fallback.setAttribute("readonly", "readonly");
    fallback.style.position = "fixed";
    fallback.style.left = "-9999px";
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    document.body.removeChild(fallback);

    return Promise.resolve();
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).catch(function () {
        return fallbackCopyText(value);
      });
    }

    return fallbackCopyText(value);
  }

  function copyShareLink() {
    copyText(getShareUrl()).then(function () {
      exportStatus.textContent = "Link copied.";
    }).catch(function () {
      exportStatus.textContent = "Copy failed.";
    });
  }

  function hasSeenIntro() {
    try {
      return window.localStorage.getItem(introSeenKey) === "1";
    } catch (error) {
      return true;
    }
  }

  function markIntroSeen() {
    try {
      window.localStorage.setItem(introSeenKey, "1");
    } catch (error) {
      return;
    }
  }

  function playIntro(options) {
    options = options || {};

    if (!roundelStage || (reducedMotionQuery && reducedMotionQuery.matches)) {
      return;
    }

    roundelStage.classList.remove("is-intro", "is-guiding");
    roundelStage.offsetWidth;
    roundelStage.classList.add("is-intro");

    if (options.guide) {
      roundelStage.classList.add("is-guiding");
    }

    window.setTimeout(function () {
      roundelStage.classList.remove("is-intro", "is-guiding");
    }, options.guide ? 2300 : 1700);
  }

  function playFirstRunIntro() {
    if (hasSeenIntro()) {
      return;
    }

    window.setTimeout(function () {
      playIntro({ guide: true });
      markIntroSeen();
    }, 450);
  }

  function showDragReadout(event, label, value) {
    var stageRect;

    if (!dragReadout || !roundelStage) {
      return;
    }

    stageRect = roundelStage.getBoundingClientRect();
    dragReadout.textContent = label + " " + value;
    dragReadout.style.left = (event.clientX - stageRect.left) + "px";
    dragReadout.style.top = (event.clientY - stageRect.top) + "px";
    dragReadout.classList.add("is-visible");
  }

  function hideDragReadout() {
    if (dragReadout) {
      dragReadout.classList.remove("is-visible");
    }
  }

  function applyState(state, options) {
    var presetKey;

    if (!state) {
      return;
    }

    options = options || {};
    presetKey = presets[state.activePreset] ? state.activePreset : state.preset;
    presetKey = presets[presetKey] ? presetKey : "enamel";
    isApplyingState = true;

    try {
      activePresetKey = presetKey;
      applyPreset(presetKey, { suppressPersist: true });
      input.value = typeof state.text === "string" ? state.text : "UNDERGROUND";
      presetChoice.value = state.preset === "custom" ? "custom" : presetKey;
      setRangeControl(barWidthInput, state.barWidth || presets[presetKey].barWidth);
      setRangeControl(barHeightInput, state.barHeight || 0);
      setRangeControl(textSizeInput, state.textSize || 0);
      fontChoice.value = fontStacks[state.font] ? state.font : presets[presetKey].font;
      colorChoice.value = colorSchemes[state.color] || state.color === "preset" ? state.color : "preset";
      capitaliseToggle.checked = state.capitalise !== false;
      whiteCenterToggle.checked = state.whiteCenter !== false;
      gradientsToggle.checked = state.gradients !== false;
      shadowToggle.checked = state.shadow !== false;
      blueOutlineToggle.checked = state.blueOutline !== false;
      whiteInsetToggle.checked = state.whiteInset !== false;
      plaqueToggle.checked = Boolean(state.plaque);
    } finally {
      isApplyingState = false;
    }

    updateRoundel({ animate: options.animate, suppressPersist: options.suppressPersist });
    scrollPresetButtonIntoView(activePresetKey);

    if (!options.suppressPersist) {
      persistState();
    }
  }

  function undoLastChange() {
    var entry = undoStack.pop();

    if (!entry) {
      return;
    }

    applyState(entry.state, { animate: true });
    updateUndoButton();
  }

  function resetCurrentStyle() {
    var text = input.value;

    recordUndoState();
    applyPreset(activePresetKey, { animate: true, suppressPersist: true });
    input.value = text;
    updateRoundel({ animate: true });
  }

  function clampInputLines() {
    var lines = input.value.replace(/\r/g, "").split("\n");

    if (lines.length > 2) {
      input.value = lines[0] + "\n" + lines.slice(1).join(" ");
    }
  }

  function normalizeLines(value) {
    var lines = value.replace(/\r/g, "").split("\n").map(function (line) {
      return line.trim().replace(/\s+/g, " ");
    }).filter(Boolean);

    if (lines.length === 0) {
      return ["UNDERGROUND"];
    }

    if (lines.length > 2) {
      return [lines[0], lines.slice(1).join(" ")];
    }

    return lines;
  }

  function getDisplayLines(lines) {
    if (!capitaliseToggle.checked) {
      return lines;
    }

    return lines.map(function (line) {
      return line.toLocaleUpperCase("en-GB");
    });
  }

  function measureText(value, fontSize) {
    measureContext.font = "700 " + fontSize + "px " + getFontStack();
    return measureContext.measureText(value).width;
  }

  function getBarWidth() {
    return Number(barWidthInput.value) || 896;
  }

  function getTextSizeAdjustment() {
    return Number(textSizeInput.value) || 0;
  }

  function getBarHeightAdjustment() {
    return Number(barHeightInput.value) || 0;
  }

  function formatSigned(value) {
    if (value > 0) {
      return "+" + value;
    }

    return String(value);
  }

  function getBarHeight(lineCount) {
    var preset = getActivePreset();
    var baseHeight = lineCount > 1 ? preset.doubleBarHeight : preset.singleBarHeight;
    var adjustedHeight = baseHeight + getBarHeightAdjustment();
    var minimumHeight = lineCount > 1 ? 180 : 104;
    var maximumHeight = lineCount > 1 ? 330 : 220;

    return Math.max(minimumHeight, Math.min(maximumHeight, adjustedHeight));
  }

  function getLineHeight(fontSize, lineCount) {
    return lineCount > 1 ? fontSize * 1.08 : fontSize;
  }

  function getHorizontalPadding(lineCount, barWidth) {
    var ratio = lineCount > 1 ? 0.16 : 0.14;
    var minimum = lineCount > 1 ? 80 : 68;
    var maximum = lineCount > 1 ? 150 : 130;

    return Math.round(Math.max(minimum, Math.min(maximum, barWidth * ratio)));
  }

  function getVerticalPadding(lineCount) {
    return lineCount > 1 ? 46 : 52;
  }

  function setRect(rect, x, y, width, height, radius) {
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(width));
    rect.setAttribute("height", String(height));
    rect.setAttribute("rx", String(radius));
  }

  function updateBarGeometry(barWidth, barHeight) {
    var preset = getActivePreset();
    var barX = centerX - barWidth / 2;
    var barY = centerY - barHeight / 2;
    var inset = 22;

    setRect(barFill, barX, barY, barWidth, barHeight, preset.barRadius);
    setRect(barBorder, barX, barY, barWidth, barHeight, preset.barRadius);
    setRect(barInset, barX + inset, barY + inset, Math.max(0, barWidth - inset * 2), Math.max(0, barHeight - inset * 2), 3);
  }

  function getSvgScale() {
    var rect = svg.getBoundingClientRect();

    return {
      x: rect.width / 1200,
      y: rect.height / 840
    };
  }

  function syncLiveEditor(lines, barWidth, barHeight, fontSize) {
    var barX = centerX - barWidth / 2;
    var barY = centerY - barHeight / 2;
    var scale = getSvgScale();
    var lineHeight = getLineHeight(fontSize, lines.length) * scale.y;
    var verticalPadding = Math.max(0, (barHeight * scale.y - lineHeight * lines.length) / 2);
    var horizontalPadding = Math.max(8, getHorizontalPadding(lines.length, barWidth) * scale.x / 2);
    var textColor = textNode.getAttribute("fill") || "#ffffff";
    var gripHeight = Math.max(52, Math.min(92, barHeight * scale.y * 0.58));

    input.style.left = (barX / 1200 * 100) + "%";
    input.style.top = (barY / 840 * 100) + "%";
    input.style.width = (barWidth / 1200 * 100) + "%";
    input.style.height = (barHeight / 840 * 100) + "%";
    input.style.padding = verticalPadding + "px " + horizontalPadding + "px 0";
    input.style.fontFamily = getFontStack();
    input.style.fontSize = Math.max(18, fontSize * scale.x) + "px";
    input.style.lineHeight = lineHeight + "px";
    input.style.color = textColor;
    input.style.caretColor = textColor;
    input.style.textTransform = capitaliseToggle.checked ? "uppercase" : "none";

    if (leftBarGrip) {
      leftBarGrip.style.left = ((barX - 18) / 1200 * 100) + "%";
      leftBarGrip.style.top = (centerY / 840 * 100) + "%";
      leftBarGrip.style.height = gripHeight + "px";
    }

    if (rightBarGrip) {
      rightBarGrip.style.left = ((barX + barWidth + 18) / 1200 * 100) + "%";
      rightBarGrip.style.top = (centerY / 840 * 100) + "%";
      rightBarGrip.style.height = gripHeight + "px";
    }

    if (topBarGrip) {
      topBarGrip.style.left = (centerX / 1200 * 100) + "%";
      topBarGrip.style.top = ((barY - 18) / 840 * 100) + "%";
      topBarGrip.style.width = Math.max(92, Math.min(150, barWidth * scale.x * 0.2)) + "px";
    }

    if (bottomBarGrip) {
      bottomBarGrip.style.left = (centerX / 1200 * 100) + "%";
      bottomBarGrip.style.top = ((barY + barHeight + 18) / 840 * 100) + "%";
      bottomBarGrip.style.width = Math.max(92, Math.min(150, barWidth * scale.x * 0.2)) + "px";
    }
  }

  function getNumberAttribute(element, name, fallback) {
    var value = Number(element.getAttribute(name));

    return Number.isFinite(value) ? value : fallback;
  }

  function setNumberAttribute(element, name, value) {
    element.setAttribute(name, String(Math.round(value * 100) / 100));
  }

  function isVisible(element) {
    return element.style.display !== "none";
  }

  function captureCircle(element) {
    return {
      r: getNumberAttribute(element, "r", 0),
      fill: element.getAttribute("fill") || "#000000"
    };
  }

  function captureOutlineCircle(element) {
    return {
      r: getNumberAttribute(element, "r", 0),
      stroke: element.getAttribute("stroke") || "#000000",
      strokeOpacity: getNumberAttribute(element, "stroke-opacity", 1),
      strokeWidth: getNumberAttribute(element, "stroke-width", 0)
    };
  }

  function captureRect(element) {
    return {
      x: getNumberAttribute(element, "x", 0),
      y: getNumberAttribute(element, "y", 0),
      width: getNumberAttribute(element, "width", 0),
      height: getNumberAttribute(element, "height", 0),
      rx: getNumberAttribute(element, "rx", 0),
      fill: element.getAttribute("fill") || "#000000"
    };
  }

  function captureStrokeRect(element) {
    var visible = isVisible(element);

    return {
      x: getNumberAttribute(element, "x", 0),
      y: getNumberAttribute(element, "y", 0),
      width: getNumberAttribute(element, "width", 0),
      height: getNumberAttribute(element, "height", 0),
      rx: getNumberAttribute(element, "rx", 0),
      stroke: element.getAttribute("stroke") || "#000000",
      strokeOpacity: visible ? getNumberAttribute(element, "stroke-opacity", 1) : 0,
      strokeWidth: visible ? getNumberAttribute(element, "stroke-width", 0) : 0,
      visible: visible
    };
  }

  function captureText() {
    return {
      fill: textNode.getAttribute("fill") || "#ffffff",
      fontSize: getNumberAttribute(textNode, "font-size", 116),
      y: Array.prototype.map.call(textNode.children, function (line) {
        return getNumberAttribute(line, "y", centerY);
      })
    };
  }

  function captureVisualState() {
    var centerVisible = isVisible(centerFill);
    var plaqueVisible = isVisible(plaqueBackground);

    return {
      ringCircle: captureCircle(ringCircle),
      ringHole: {
        r: getNumberAttribute(ringHole, "r", 0)
      },
      centerFill: {
        r: getNumberAttribute(centerFill, "r", 0),
        fill: centerFill.getAttribute("fill") || "#ffffff",
        fillOpacity: centerVisible ? getNumberAttribute(centerFill, "fill-opacity", 1) : 0,
        visible: centerVisible
      },
      ringOuterOutline: captureOutlineCircle(ringOuterOutline),
      ringInnerOutline: captureOutlineCircle(ringInnerOutline),
      barFill: captureRect(barFill),
      barBorder: captureStrokeRect(barBorder),
      barInset: captureStrokeRect(barInset),
      ringStops: [
        ringStopTop.getAttribute("stop-color") || "#000000",
        ringStopMid.getAttribute("stop-color") || "#000000",
        ringStopBottom.getAttribute("stop-color") || "#000000"
      ],
      barStops: [
        barStopTop.getAttribute("stop-color") || "#000000",
        barStopMid.getAttribute("stop-color") || "#000000",
        barStopBottom.getAttribute("stop-color") || "#000000"
      ],
      plaque: {
        opacity: plaqueVisible ? getNumberAttribute(plaqueBackground, "opacity", 1) : 0,
        visible: plaqueVisible
      },
      text: captureText()
    };
  }

  function parseColor(value) {
    var hex;
    var rgb;

    if (!value) {
      return null;
    }

    if (value === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0 };
    }

    if (value.indexOf("url(") === 0) {
      return null;
    }

    hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      value = hex[1];

      if (value.length === 3) {
        return {
          r: parseInt(value[0] + value[0], 16),
          g: parseInt(value[1] + value[1], 16),
          b: parseInt(value[2] + value[2], 16),
          a: 1
        };
      }

      return {
        r: parseInt(value.slice(0, 2), 16),
        g: parseInt(value.slice(2, 4), 16),
        b: parseInt(value.slice(4, 6), 16),
        a: 1
      };
    }

    rgb = value.match(/^rgba?\(([^)]+)\)$/i);
    if (rgb) {
      rgb = rgb[1].split(",").map(function (part) {
        return Number(part.trim());
      });

      if (rgb.length >= 3) {
        return {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2],
          a: rgb.length > 3 ? rgb[3] : 1
        };
      }
    }

    return null;
  }

  function formatColor(color) {
    var r = Math.round(color.r);
    var g = Math.round(color.g);
    var b = Math.round(color.b);
    var a = Math.round(color.a * 1000) / 1000;

    if (a < 1) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  function mixNumber(start, end, progress) {
    return start + (end - start) * progress;
  }

  function mixPaint(start, end, progress) {
    var startColor = parseColor(start);
    var endColor = parseColor(end);

    if (!startColor || !endColor) {
      return progress < 1 ? start : end;
    }

    return formatColor({
      r: mixNumber(startColor.r, endColor.r, progress),
      g: mixNumber(startColor.g, endColor.g, progress),
      b: mixNumber(startColor.b, endColor.b, progress),
      a: mixNumber(startColor.a, endColor.a, progress)
    });
  }

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  function renderCircle(element, start, end, progress) {
    setNumberAttribute(element, "r", mixNumber(start.r, end.r, progress));
    element.setAttribute("fill", mixPaint(start.fill, end.fill, progress));
  }

  function renderOutlineCircle(element, start, end, progress) {
    setNumberAttribute(element, "r", mixNumber(start.r, end.r, progress));
    element.setAttribute("stroke", mixPaint(start.stroke, end.stroke, progress));
    element.setAttribute("stroke-width", String(mixNumber(start.strokeWidth, end.strokeWidth, progress)));
    element.setAttribute("stroke-opacity", String(mixNumber(start.strokeOpacity, end.strokeOpacity, progress)));
  }

  function renderRect(element, start, end, progress) {
    setNumberAttribute(element, "x", mixNumber(start.x, end.x, progress));
    setNumberAttribute(element, "y", mixNumber(start.y, end.y, progress));
    setNumberAttribute(element, "width", mixNumber(start.width, end.width, progress));
    setNumberAttribute(element, "height", mixNumber(start.height, end.height, progress));
    setNumberAttribute(element, "rx", mixNumber(start.rx, end.rx, progress));
    element.setAttribute("fill", mixPaint(start.fill, end.fill, progress));
  }

  function renderStrokeRect(element, start, end, progress, isFinished) {
    element.style.display = start.visible || end.visible ? "" : "none";
    setNumberAttribute(element, "x", mixNumber(start.x, end.x, progress));
    setNumberAttribute(element, "y", mixNumber(start.y, end.y, progress));
    setNumberAttribute(element, "width", mixNumber(start.width, end.width, progress));
    setNumberAttribute(element, "height", mixNumber(start.height, end.height, progress));
    setNumberAttribute(element, "rx", mixNumber(start.rx, end.rx, progress));
    element.setAttribute("stroke", mixPaint(start.stroke, end.stroke, progress));
    element.setAttribute("stroke-width", String(mixNumber(start.strokeWidth, end.strokeWidth, progress)));
    element.setAttribute("stroke-opacity", String(mixNumber(start.strokeOpacity, end.strokeOpacity, progress)));

    if (isFinished && !end.visible) {
      element.style.display = "none";
    }
  }

  function renderText(start, end, progress) {
    textNode.setAttribute("fill", mixPaint(start.fill, end.fill, progress));
    textNode.setAttribute("font-size", String(mixNumber(start.fontSize, end.fontSize, progress)));

    if (start.y.length !== end.y.length || textNode.children.length !== end.y.length) {
      return;
    }

    Array.prototype.forEach.call(textNode.children, function (line, index) {
      setNumberAttribute(line, "y", mixNumber(start.y[index], end.y[index], progress));
    });
  }

  function renderVisualState(start, end, progress, isFinished) {
    var centerVisible = start.centerFill.visible || end.centerFill.visible;
    var plaqueVisible = start.plaque.visible || end.plaque.visible;

    renderCircle(ringCircle, start.ringCircle, end.ringCircle, progress);
    setNumberAttribute(ringHole, "r", mixNumber(start.ringHole.r, end.ringHole.r, progress));
    centerFill.style.display = centerVisible ? "" : "none";
    setNumberAttribute(centerFill, "r", mixNumber(start.centerFill.r, end.centerFill.r, progress));
    centerFill.setAttribute("fill", mixPaint(start.centerFill.fill, end.centerFill.fill, progress));
    centerFill.setAttribute("fill-opacity", String(mixNumber(start.centerFill.fillOpacity, end.centerFill.fillOpacity, progress)));
    renderOutlineCircle(ringOuterOutline, start.ringOuterOutline, end.ringOuterOutline, progress);
    renderOutlineCircle(ringInnerOutline, start.ringInnerOutline, end.ringInnerOutline, progress);
    renderRect(barFill, start.barFill, end.barFill, progress);
    renderStrokeRect(barBorder, start.barBorder, end.barBorder, progress, isFinished);
    renderStrokeRect(barInset, start.barInset, end.barInset, progress, isFinished);
    ringStopTop.setAttribute("stop-color", mixPaint(start.ringStops[0], end.ringStops[0], progress));
    ringStopMid.setAttribute("stop-color", mixPaint(start.ringStops[1], end.ringStops[1], progress));
    ringStopBottom.setAttribute("stop-color", mixPaint(start.ringStops[2], end.ringStops[2], progress));
    barStopTop.setAttribute("stop-color", mixPaint(start.barStops[0], end.barStops[0], progress));
    barStopMid.setAttribute("stop-color", mixPaint(start.barStops[1], end.barStops[1], progress));
    barStopBottom.setAttribute("stop-color", mixPaint(start.barStops[2], end.barStops[2], progress));
    plaqueBackground.style.display = plaqueVisible ? "" : "none";
    plaqueBackground.setAttribute("opacity", String(mixNumber(start.plaque.opacity, end.plaque.opacity, progress)));
    renderText(start.text, end.text, progress);

    if (isFinished) {
      centerFill.style.display = end.centerFill.visible ? "" : "none";
      plaqueBackground.style.display = end.plaque.visible ? "" : "none";
      plaqueBackground.setAttribute("opacity", String(end.plaque.opacity));
    }
  }

  function cancelVisualAnimation() {
    if (activeAnimationFrame) {
      cancelFrame(activeAnimationFrame);
      activeAnimationFrame = 0;
    }
  }

  function animateVisualState(start, end) {
    var startedAt = now();

    cancelVisualAnimation();
    renderVisualState(start, end, 0, false);

    function tick(now) {
      var progress = Math.min(1, (now - startedAt) / transitionDuration);
      var eased = easeOutCubic(progress);

      renderVisualState(start, end, eased, progress >= 1);

      if (progress < 1) {
        activeAnimationFrame = requestFrame(tick);
      } else {
        activeAnimationFrame = 0;
      }
    }

    activeAnimationFrame = requestFrame(tick);
  }

  function updateRingGeometry() {
    var preset = getActivePreset();

    ringCircle.setAttribute("r", String(preset.outerRadius));
    ringHole.setAttribute("r", String(preset.innerRadius));
    centerFill.setAttribute("r", String(preset.innerRadius));
    ringOuterOutline.setAttribute("r", String(preset.outerRadius));
    ringInnerOutline.setAttribute("r", String(preset.innerRadius));
  }

  function centerTextToBar() {
    try {
      var box = textNode.getBBox();
      var correction = centerY - (box.y + box.height / 2);

      Array.prototype.forEach.call(textNode.children, function (line) {
        line.setAttribute("y", String(Number(line.getAttribute("y")) + correction));
      });
    } catch (error) {
      textNode.setAttribute("y", String(centerY));
    }
  }

  function updateText(lines, fontSize) {
    var lineHeight = getLineHeight(fontSize, lines.length);
    var firstLineY = centerY - lineHeight * (lines.length - 1) / 2;

    textNode.textContent = "";
    textNode.setAttribute("font-size", String(fontSize));
    textNode.setAttribute("font-family", getFontStack());

    lines.forEach(function (line, index) {
      var tspan = document.createElementNS(svgNamespace, "tspan");

      tspan.textContent = line;
      tspan.setAttribute("x", String(centerX));
      tspan.setAttribute("y", String(firstLineY + lineHeight * index));
      textNode.appendChild(tspan);
    });

    centerTextToBar();
  }

  function renderedTextFits(lines, barWidth, barHeight, fontSize) {
    var horizontalPadding = getHorizontalPadding(lines.length, barWidth);
    var verticalPadding = getVerticalPadding(lines.length);

    try {
      var box = textNode.getBBox();

      return box.width <= barWidth - horizontalPadding && box.height <= barHeight - verticalPadding;
    } catch (error) {
      return lines.every(function (line) {
        return measureText(line, fontSize) <= barWidth - horizontalPadding;
      }) && getLineHeight(fontSize, lines.length) * lines.length <= barHeight - verticalPadding;
    }
  }

  function constrainTextToBar(lines, barWidth, fontSize) {
    var availableWidth = Math.max(24, barWidth - getHorizontalPadding(lines.length, barWidth));

    Array.prototype.forEach.call(textNode.children, function (lineNode, index) {
      if (measureText(lines[index] || "", fontSize) > availableWidth) {
        lineNode.setAttribute("textLength", String(availableWidth));
        lineNode.setAttribute("lengthAdjust", "spacingAndGlyphs");
      }
    });
  }

  function fitAndUpdateText(lines, barWidth, barHeight) {
    var baseFontSize = lines.length > 1 ? 98 : 116;
    var fontSize = baseFontSize + getTextSizeAdjustment();

    while (fontSize > minFontSize) {
      updateText(lines, fontSize);

      if (renderedTextFits(lines, barWidth, barHeight, fontSize)) {
        return fontSize;
      }

      fontSize -= 2;
    }

    updateText(lines, fontSize);
    constrainTextToBar(lines, barWidth, fontSize);
    return fontSize;
  }

  function clearOrnaments() {
    while (barOrnaments.firstChild) {
      barOrnaments.removeChild(barOrnaments.firstChild);
    }
  }

  function appendDiamond(x, y, size) {
    var diamond = document.createElementNS(svgNamespace, "rect");

    diamond.setAttribute("x", String(x - size / 2));
    diamond.setAttribute("y", String(y - size / 2));
    diamond.setAttribute("width", String(size));
    diamond.setAttribute("height", String(size));
    diamond.setAttribute("transform", "rotate(45 " + x + " " + y + ")");
    barOrnaments.appendChild(diamond);
  }

  function updateOrnaments(lines, barWidth, barHeight) {
    var preset = getActivePreset();
    var barX = centerX - barWidth / 2;
    var edgePadding = Math.max(78, Math.min(118, barWidth * 0.14));
    var gap = 34;
    var size = lines.length > 1 ? 7 : 8;
    var rowOffset = lines.length > 1 ? barHeight * 0.39 : barHeight * 0.33;
    var startX = barX + edgePadding;
    var endX = barX + barWidth - edgePadding;
    var x;

    clearOrnaments();

    if (preset.ornaments !== "diamonds") {
      return;
    }

    barOrnaments.setAttribute("fill", preset.ornamentColor);
    barOrnaments.setAttribute("opacity", preset.ornamentOpacity);

    for (x = startX; x <= endX; x += gap) {
      appendDiamond(x, centerY - rowOffset, size);
      appendDiamond(x + gap / 2, centerY + rowOffset, size);
    }
  }

  function updateStyleOptions() {
    var preset = getActivePreset();
    var scheme = getActiveColorScheme();
    var bulbsVisible = Boolean(preset.bulbs && plaqueToggle.checked);
    var centerFillColor = themedValue(scheme, preset, "centerFill");
    var ringSolid = themedValue(scheme, preset, "ringSolid");
    var ringGradient = themedValue(scheme, preset, "ringGradient");
    var ringOutlineColor = themedValue(scheme, preset, "ringOutlineColor");
    var ringOutlineWidth = themedValue(scheme, preset, "ringOutlineWidth");
    var ringOutlineOpacity = themedValue(scheme, preset, "ringOutlineOpacity");
    var barSolid = themedValue(scheme, preset, "barSolid");
    var barGradient = themedValue(scheme, preset, "barGradient");
    var outlineColor = themedValue(scheme, preset, "outlineColor");
    var outlineWidth = themedValue(scheme, preset, "outlineWidth");
    var outlineOpacity = themedValue(scheme, preset, "outlineOpacity");
    var insetColor = themedValue(scheme, preset, "insetColor");
    var insetWidth = themedValue(scheme, preset, "insetWidth");
    var insetOpacity = themedValue(scheme, preset, "insetOpacity");
    var textColor = scheme && scheme.textColor ? scheme.textColor : "#ffffff";

    centerFill.style.display = whiteCenterToggle.checked ? "" : "none";
    centerFill.setAttribute("fill", centerFillColor);
    centerFill.setAttribute("fill-opacity", whiteCenterToggle.checked ? "1" : "0");
    ringOuterOutline.setAttribute("stroke", ringOutlineColor);
    ringOuterOutline.setAttribute("stroke-width", String(ringOutlineWidth));
    ringOuterOutline.setAttribute("stroke-opacity", ringOutlineOpacity);
    ringInnerOutline.setAttribute("stroke", ringOutlineColor);
    ringInnerOutline.setAttribute("stroke-width", String(ringOutlineWidth));
    ringInnerOutline.setAttribute("stroke-opacity", ringOutlineOpacity);
    barBorder.style.display = blueOutlineToggle.checked ? "" : "none";
    barInset.style.display = whiteInsetToggle.checked ? "" : "none";
    ringStopTop.setAttribute("stop-color", ringGradient[0]);
    ringStopMid.setAttribute("stop-color", ringGradient[1]);
    ringStopBottom.setAttribute("stop-color", ringGradient[2]);
    barStopTop.setAttribute("stop-color", barGradient[0]);
    barStopMid.setAttribute("stop-color", barGradient[1]);
    barStopBottom.setAttribute("stop-color", barGradient[2]);
    ringCircle.setAttribute("fill", gradientsToggle.checked ? "url(#ring-highlight)" : ringSolid);
    barFill.setAttribute("fill", gradientsToggle.checked ? "url(#bar-highlight)" : barSolid);
    barBorder.setAttribute("stroke", outlineColor);
    barBorder.setAttribute("stroke-width", String(outlineWidth));
    barBorder.setAttribute("stroke-opacity", outlineOpacity);
    barInset.setAttribute("stroke", insetColor);
    barInset.setAttribute("stroke-width", String(insetWidth));
    barInset.setAttribute("stroke-opacity", insetOpacity);
    textNode.setAttribute("fill", textColor);
    plaqueBackground.style.display = plaqueToggle.checked ? "" : "none";
    plaqueBackground.setAttribute("opacity", plaqueToggle.checked ? "1" : "0");

    if (bulbLayer) {
      bulbLayer.style.display = bulbsVisible ? "" : "none";
      bulbLayer.setAttribute("opacity", bulbsVisible ? "1" : "0");
    }

    if (shadowToggle.checked) {
      artGroup.setAttribute("filter", "url(#soft-shadow)");
    } else {
      artGroup.removeAttribute("filter");
    }
  }

  function updateRoundel(options) {
    var animateChange;
    var beforeState;
    var afterState;

    options = options || {};
    animateChange = Boolean(
      options.animate &&
      hasRendered &&
      (!reducedMotionQuery || !reducedMotionQuery.matches)
    );

    if (animateChange) {
      beforeState = captureVisualState();
    } else {
      cancelVisualAnimation();
    }

    clampInputLines();

    var sourceLines = normalizeLines(input.value);
    var lines = getDisplayLines(sourceLines);
    var barWidth = getBarWidth();
    var barHeight = getBarHeight(lines.length);
    var fontSize;
    var titleText = lines.join(" / ");

    barWidthOutput.textContent = String(barWidth);
    barHeightOutput.textContent = formatSigned(getBarHeightAdjustment());
    textSizeOutput.textContent = formatSigned(getTextSizeAdjustment());
    updateRingGeometry();
    updateBarGeometry(barWidth, barHeight);
    updateOrnaments(lines, barWidth, barHeight);
    fontSize = fitAndUpdateText(lines, barWidth, barHeight);
    updateStyleOptions();
    syncLiveEditor(lines, barWidth, barHeight, fontSize);
    syncControlStates();
    titleNode.textContent = "Roundel sign reading " + titleText;

    if (animateChange) {
      afterState = captureVisualState();
      animateVisualState(beforeState, afterState);
    }

    hasRendered = true;

    if (!options.suppressPersist && !isApplyingState) {
      persistState();
    }
  }

  function applyPreset(key, options) {
    var preset = presets[key];

    if (!preset) {
      return;
    }

    activePresetKey = key;
    presetChoice.value = key;
    colorChoice.value = "preset";
    barWidthInput.value = String(preset.barWidth);
    barHeightInput.value = "0";
    textSizeInput.value = "0";
    fontChoice.value = preset.font;
    whiteCenterToggle.checked = preset.whiteCenter;
    gradientsToggle.checked = preset.gradients;
    shadowToggle.checked = preset.shadow;
    blueOutlineToggle.checked = preset.blueOutline;
    whiteInsetToggle.checked = preset.whiteInset;
    plaqueToggle.checked = Boolean(preset.plaque);
    updateRoundel(options);
    scrollPresetButtonIntoView(activePresetKey);

    if (preset.bulbs && options && options.animate) {
      window.setTimeout(function () {
        playIntro();
      }, 40);
    }
  }

  function applyColorScheme(key, options) {
    var scheme = colorSchemes[key];

    colorChoice.value = key;

    if (scheme) {
      if (Object.prototype.hasOwnProperty.call(scheme, "gradients")) {
        gradientsToggle.checked = scheme.gradients;
      }

      if (Object.prototype.hasOwnProperty.call(scheme, "blueOutline")) {
        blueOutlineToggle.checked = scheme.blueOutline;
      }

      if (Object.prototype.hasOwnProperty.call(scheme, "whiteInset")) {
        whiteInsetToggle.checked = scheme.whiteInset;
      }

      if (Object.prototype.hasOwnProperty.call(scheme, "whiteCenter")) {
        whiteCenterToggle.checked = scheme.whiteCenter;
      }
    }

    updateRoundel(options);
  }

  function slugify(value) {
    var slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return slug || "underground";
  }

  function getExportText() {
    return getDisplayLines(normalizeLines(input.value)).join(" ");
  }

  function getSerializedSvg() {
    updateRoundel({ suppressPersist: true });

    return new XMLSerializer().serializeToString(svg);
  }

  function downloadBlob(blob, filename) {
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);

    link.download = filename;
    link.href = url;
    link.click();

    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 0);
  }

  function setExportBusy(isBusy) {
    exportButton.disabled = isBusy;

    if (exportSvgButton) {
      exportSvgButton.disabled = isBusy;
    }
  }

  function exportSvg() {
    var text = getExportText();
    var svgBlob = new Blob([getSerializedSvg()], { type: "image/svg+xml;charset=utf-8" });

    downloadBlob(svgBlob, "roundel-sign-" + slugify(text) + ".svg");
    exportStatus.textContent = "SVG exported.";
  }

  function exportPng() {
    var text = getExportText();
    var svgSource = getSerializedSvg();
    var svgBlob = new Blob([svgSource], { type: "image/svg+xml;charset=utf-8" });
    var url = URL.createObjectURL(svgBlob);
    var image = new Image();

    setExportBusy(true);
    exportStatus.textContent = "Preparing PNG...";

    image.onload = function () {
      var scale = 2;
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");

      try {
        canvas.width = 1200 * scale;
        canvas.height = 840 * scale;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        var link = document.createElement("a");
        link.download = "roundel-sign-" + slugify(text) + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        exportStatus.textContent = "PNG exported.";
      } catch (error) {
        exportStatus.textContent = "Export failed.";
      } finally {
        URL.revokeObjectURL(url);
        setExportBusy(false);
      }
    };

    image.onerror = function () {
      URL.revokeObjectURL(url);
      setExportBusy(false);
      exportStatus.textContent = "Export failed.";
    };

    image.src = url;
  }

  function updateDragValue(event) {
    var delta;
    var nextValue;

    if (!activeDrag) {
      return;
    }

    if (Math.abs(event.clientX - activeDrag.startX) > 2 || Math.abs(event.clientY - activeDrag.startY) > 2) {
      activeDrag.moved = true;
    }

    if (activeDrag.type === "width-left" || activeDrag.type === "width-right") {
      delta = activeDrag.type === "width-left" ? activeDrag.startX - event.clientX : event.clientX - activeDrag.startX;
      nextValue = activeDrag.startWidth + delta / activeDrag.scale.x * 2;
      setRangeControl(barWidthInput, nextValue);
      showDragReadout(event, "Width", barWidthInput.value);
    } else {
      delta = activeDrag.type === "height-top" ? activeDrag.startY - event.clientY : event.clientY - activeDrag.startY;
      nextValue = activeDrag.startBarHeight + delta / activeDrag.scale.y * 2;
      setRangeControl(barHeightInput, nextValue);
      showDragReadout(event, "Thickness", formatSigned(getBarHeightAdjustment()));
    }

    markCustom();
    updateRoundel();
  }

  function startBarDrag(event) {
    var dragType = event.currentTarget.getAttribute("data-drag");

    if (!dragType) {
      return;
    }

    recordUndoState();
    openMenu("bar");
    event.preventDefault();

    activeDrag = {
      button: event.currentTarget,
      type: dragType,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: getBarWidth(),
      startBarHeight: getBarHeightAdjustment(),
      scale: getSvgScale(),
      moved: false
    };

    if (roundelStage) {
      roundelStage.classList.add("is-dragging");
    }

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  }

  function moveBarDrag(event) {
    if (!activeDrag) {
      return;
    }

    event.preventDefault();
    updateDragValue(event);
  }

  function endBarDrag(event) {
    if (!activeDrag) {
      return;
    }

    if (activeDrag.moved) {
      activeDrag.button.setAttribute("data-skip-click", "true");
    }

    if (activeDrag.button.releasePointerCapture) {
      activeDrag.button.releasePointerCapture(event.pointerId);
    }

    activeDrag = null;
    hideDragReadout();

    if (roundelStage) {
      roundelStage.classList.remove("is-dragging");
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }

  presetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      recordUndoState();
      applyPreset(button.getAttribute("data-preset"), { animate: true });
    });
  });

  fontButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      recordUndoState();
      fontChoice.value = button.getAttribute("data-font");
      markCustom();
      updateRoundel({ animate: true });
      input.focus();
    });
  });

  colorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      recordUndoState();
      applyColorScheme(button.getAttribute("data-color"), { animate: true });
    });
  });

  menuButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      if (button.getAttribute("data-skip-click") === "true") {
        button.removeAttribute("data-skip-click");
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.stopPropagation();
      openMenu(button.getAttribute("data-menu"));
    });
  });

  menuPanels.forEach(function (panel) {
    panel.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", function (event) {
    if (!roundelStage || !roundelStage.contains(event.target)) {
      closeMenus();
    }
  });

  input.addEventListener("focus", function () {
    openMenu("text");
  });
  input.addEventListener("beforeinput", recordUndoState);
  input.addEventListener("click", function (event) {
    event.stopPropagation();
    openMenu("text");
  });
  input.addEventListener("input", function () {
    markCustom();
    updateRoundel();
  });
  barWidthInput.addEventListener("input", function () {
    markCustom();
    updateRoundel();
  });
  barHeightInput.addEventListener("input", function () {
    markCustom();
    updateRoundel();
  });
  fontChoice.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  textSizeInput.addEventListener("input", function () {
    markCustom();
    updateRoundel();
  });
  capitaliseToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  colorChoice.addEventListener("change", function () {
    applyColorScheme(colorChoice.value, { animate: true });
  });
  whiteCenterToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  gradientsToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  shadowToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  blueOutlineToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  whiteInsetToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  plaqueToggle.addEventListener("change", function () {
    updateRoundel({ animate: true });
  });
  exportButton.addEventListener("click", exportPng);
  exportSvgButton.addEventListener("click", exportSvg);
  undoButton.addEventListener("click", undoLastChange);
  resetButton.addEventListener("click", resetCurrentStyle);
  copyLinkButton.addEventListener("click", copyShareLink);
  exportTriggers.forEach(function (button) {
    button.addEventListener("click", exportPng);
  });
  exportSvgTriggers.forEach(function (button) {
    button.addEventListener("click", exportSvg);
  });
  copyLinkTriggers.forEach(function (button) {
    button.addEventListener("click", copyShareLink);
  });

  [barWidthInput, barHeightInput, textSizeInput].forEach(function (control) {
    control.addEventListener("pointerdown", recordUndoState);
    control.addEventListener("keydown", function (event) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].indexOf(event.key) !== -1) {
        recordUndoState();
      }
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll([
    "#capitalise-text",
    "#white-center",
    "#use-gradients",
    "#use-shadow",
    "#blue-outline",
    "#white-inset",
    "#use-plaque",
    "label[for='capitalise-text']",
    "label[for='white-center']",
    "label[for='use-gradients']",
    "label[for='use-shadow']",
    "label[for='blue-outline']",
    "label[for='white-inset']",
    "label[for='use-plaque']"
  ].join(",")), function (control) {
    control.addEventListener("pointerdown", recordUndoState);
    control.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "Enter") {
        recordUndoState();
      }
    });
  });

  barGrips.forEach(function (grip) {
    grip.addEventListener("pointerdown", startBarDrag);
  });

  document.addEventListener("pointermove", moveBarDrag);
  document.addEventListener("pointerup", endBarDrag);
  document.addEventListener("pointercancel", endBarDrag);

  window.addEventListener("resize", function () {
    updateRoundel({ suppressPersist: true });
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      updateRoundel({ suppressPersist: true });
    }).catch(function () {
      updateRoundel({ suppressPersist: true });
    });
  }

  applyPreset(activePresetKey, { suppressPersist: true });
  applyState(getStateFromUrl() || getStoredState(), { suppressPersist: true });
  persistState();
  updateUndoButton();
  playFirstRunIntro();
}());
