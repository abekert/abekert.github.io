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
  var textHeightInput = document.getElementById("text-height-adjust");
  var textHeightOutput = document.getElementById("text-height-output");
  var textWidthInput = document.getElementById("text-width-adjust");
  var textWidthOutput = document.getElementById("text-width-output");
  var capitaliseToggle = document.getElementById("capitalise-text");
  var spaceDotsToggle = document.getElementById("space-dots");
  var largeSpaceDotsToggle = document.getElementById("large-space-dots");
  var spaceDotsOptions = document.getElementById("space-dots-options");
  var letterRulesToggle = document.getElementById("letter-rules");
  var outerLetterRulesToggle = document.getElementById("outer-letter-rules");
  var hexagonalLetterRulesToggle = document.getElementById("hexagonal-letter-rules");
  var joinLetterRuleSpacesToggle = document.getElementById("join-letter-rule-spaces");
  var letterRulesOptions = document.getElementById("letter-rules-options");
  var whiteCenterToggle = document.getElementById("white-center");
  var gradientsToggle = document.getElementById("use-gradients");
  var shadowToggle = document.getElementById("use-shadow");
  var blueOutlineToggle = document.getElementById("blue-outline");
  var whiteInsetToggle = document.getElementById("white-inset");
  var backgroundChoice = document.getElementById("background-choice");
  var exportButton = document.getElementById("export-button");
  var exportSvgButton = document.getElementById("export-svg-button");
  var undoButton = document.getElementById("undo-button");
  var copyLinkButton = document.getElementById("copy-link-button");
  var nativeShareButton = document.getElementById("native-share-button");
  var copyImageButton = document.getElementById("copy-image-button");
  var importButton = document.getElementById("import-button");
  var importFileInput = document.getElementById("import-file-input");
  var shareFormatHint = document.getElementById("share-format-hint");
  var shareFormatButtons = Array.prototype.slice.call(document.querySelectorAll("[data-share-format]"));
  var shareButton = document.getElementById("share-button");
  var shareMenu = document.getElementById("share-menu");
  var exportStatus = document.getElementById("export-status");
  var svg = document.getElementById("roundel-svg");
  var form = document.getElementById("roundel-form");
  var roundelStage = document.getElementById("roundel-stage");
  var heritageLiveText = null;
  var heritageInputCaret = null;
  var nightBackground = document.getElementById("night-background");
  var streetBackground = document.getElementById("street-background");
  var streetSignRig = document.getElementById("street-sign-rig");
  var streetSignDepth = document.getElementById("street-sign-depth");
  var streetDepthArt = document.getElementById("street-depth-art");
  var streetDepthRingEdge = document.getElementById("street-depth-ring-edge");
  var streetDepthRingBack = document.getElementById("street-depth-ring-back");
  var streetDepthRingOuterRim = document.getElementById("street-depth-ring-outer-rim");
  var streetDepthRingInnerRim = document.getElementById("street-depth-ring-inner-rim");
  var streetDepthRingSheen = document.getElementById("street-depth-ring-sheen");
  var streetDepthBarBack = document.getElementById("street-depth-bar-back");
  var streetDepthBarTop = document.getElementById("street-depth-bar-top");
  var streetDepthBarBottom = document.getElementById("street-depth-bar-bottom");
  var streetDepthBarLeft = document.getElementById("street-depth-bar-left");
  var streetDepthBarRight = document.getElementById("street-depth-bar-right");
  var brickBackground = document.getElementById("brick-background");
  var brickWallFill = document.getElementById("brick-wall-fill");
  var electricBackground = document.getElementById("electric-background");
  var electricReflection = document.getElementById("electric-reflection");
  var stationFloorBackground = document.getElementById("station-floor-background");
  var stationFloorReflection = document.getElementById("station-floor-reflection");
  var stoneWallBackground = document.getElementById("stone-wall-background");
  var wallMountShadow = document.getElementById("wall-mount-shadow");
  var wallDepthArt = document.getElementById("wall-depth-art");
  var wallDepthRingCast = document.getElementById("wall-depth-ring-cast");
  var wallDepthBarCast = document.getElementById("wall-depth-bar-cast");
  var plaqueBackground = document.getElementById("plaque-background");
  var neonLayer = document.getElementById("neon-layer");
  var neonBackdrop = document.getElementById("neon-backdrop");
  var neonFlags = document.getElementById("neon-flags");
  var neonTubeLayer = document.getElementById("neon-tube-layer");
  var neonOuterTube = document.getElementById("neon-outer-tube");
  var neonDiscTube = document.getElementById("neon-disc-tube");
  var neonBarTube = document.getElementById("neon-bar-tube");
  var neonBarInnerTube = document.getElementById("neon-bar-inner-tube");
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
  var presetButtons = [];
  var fontButtons = Array.prototype.slice.call(document.querySelectorAll("[data-font]"));
  var backgroundButtons = Array.prototype.slice.call(document.querySelectorAll("[data-background]"));
  var rangeResetButtons = Array.prototype.slice.call(document.querySelectorAll("[data-reset-control]"));
  var rangeControls = [barWidthInput, barHeightInput, textSizeInput, textHeightInput, textWidthInput];
  var menuButtons = Array.prototype.slice.call(document.querySelectorAll("[data-menu]"));
  var hudPanelTriggers = Array.prototype.slice.call(document.querySelectorAll(".hud-panel-trigger"));
  var menuPanels = Array.prototype.slice.call(document.querySelectorAll("[data-menu-panel]"));
  var menuCloseButtons = Array.prototype.slice.call(document.querySelectorAll("[data-close-menu]"));
  var barGrips = Array.prototype.slice.call(document.querySelectorAll(".bar-grip"));
  var leftBarGrip = document.querySelector(".bar-grip-left");
  var rightBarGrip = document.querySelector(".bar-grip-right");
  var topBarGrip = document.querySelector(".bar-grip-top");
  var bottomBarGrip = document.querySelector(".bar-grip-bottom");
  var dragReadout = document.getElementById("drag-readout");
  var styleStrip = document.querySelector(".style-strip");
  var measureCanvas = document.createElement("canvas");
  var measureContext = measureCanvas.getContext("2d");
  var svgNamespace = "http://www.w3.org/2000/svg";
  var centerX = 600;
  var centerY = 420;
  var sceneFrame = { x: 54, y: 60, width: 1092, height: 720 };
  var minFontSize = 34;
  var barWidthFloor = Number(barWidthInput.getAttribute("min")) || 280;
  var barHeightAdjustmentFloor = Number(barHeightInput.getAttribute("min")) || -72;
  var textWidthMaximum = Number(textWidthInput.getAttribute("max")) || 140;
  var transitionDuration = 520;
  var activeAnimationFrame = 0;
  var rangeUpdateFrame = 0;
  var activeRangeAdjustment = null;
  var fittedFontSizeCacheKey = "";
  var fittedFontSizeCacheValue = 0;
  var hasRendered = false;
  var reducedMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  var mobileTextEditingQuery = window.matchMedia ? window.matchMedia("(max-width: 640px), (pointer: coarse)") : null;
  var desktopMenuQuery = window.matchMedia ? window.matchMedia("(hover: hover) and (pointer: fine)") : null;
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
  var roundelMetadataNamespace = "https://abekert.github.io/roundel/metadata/1.0/";
  var shareFormat = "clean";
  var shareAssetCache = { key: "", promise: null, blob: null };
  var isSharedRemixSession = new URLSearchParams(window.location.search).get("ref") === "share";
  var hasEmittedRemixCreated = false;
  var undoStack = [];
  var maxUndoSteps = 40;
  var isApplyingState = false;
  var activeDrag = null;
  var previewState = null;
  var previewPresetKey = "";
  var styleStripGesture = null;
  var suppressStyleClickUntil = 0;
  var introTextTimers = [];
  var introSequence = [
    { preset: "classic", text: "MAKE" },
    { preset: "redDisc", text: "YOUR OWN" },
    { preset: "heritage", text: "UNDERGROUND" },
    { preset: "poster", text: "TAP TO START" }
  ];
  var introStepDurations = [560, 700, 820];
  var introTransitionDurations = [430, 480, 520];
  var introOutroDelay = 560;
  var hudIdleTimer = 0;
  var hudActivityFrame = 0;
  var hudIdleDelay = 2200;
  var mobileMenuIdleTimer = 0;
  var mobileMenuIdleDelay = 3000;
  var desktopMenuCloseTimer = 0;
  var desktopMenuCloseDelay = 360;
  var desktopMenuSafeInset = 10;
  var desktopMenuBridgeInset = 6;
  var activeMenuName = "";
  var activeMenuAnchor = null;
  var suppressedMenuHoverAnchor = null;
  var fontStacks = {
    gill: "'Gill Sans', 'Gill Sans MT', 'Avenir Next', 'Trebuchet MS', Arial, sans-serif",
    avenir: "'Avenir Next', Avenir, 'Gill Sans', 'Trebuchet MS', Arial, sans-serif",
    trebuchet: "'Trebuchet MS', 'Gill Sans', 'Avenir Next', Arial, sans-serif",
    system: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    rounded: "'Arial Rounded MT Bold', 'Arial Rounded MT', 'Trebuchet MS', Arial, sans-serif"
  };
  var backgroundFills = {
    "brick-white": "url(#brick-white-pattern)",
    "brick-red": "url(#brick-red-pattern)",
    "brick-yellow": "url(#brick-yellow-pattern)"
  };
  var identityArtLayout = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
  var stationArtLayout = { x: 144, y: 136, scaleX: 0.76, scaleY: 0.76 };
  var wallArtLayout = { x: 54, y: 8, scaleX: 0.91, scaleY: 0.91 };
  var streetDepthOffset = { x: 12, y: 14 };
  var wallShadowOffset = { x: 56, y: 56 };
  var streetArtTransform = "";
  var stationArtTransform = "translate(" + stationArtLayout.x + " " + stationArtLayout.y + ") scale(" + stationArtLayout.scaleX + ")";
  var wallArtTransform = "translate(" + wallArtLayout.x + " " + wallArtLayout.y + ") scale(" + wallArtLayout.scaleX + ")";
  var backgroundScenes = {
    "night": {
      layers: [nightBackground]
    },
    "street-post": {
      transform: streetArtTransform,
      layers: [streetBackground, streetSignRig, streetSignDepth]
    },
    "electric-exhibit": {
      stageClass: "is-electric",
      artFilter: "url(#electric-art-glow)",
      textFilter: "url(#electric-text-glow)",
      layers: [electricBackground, electricReflection]
    },
    "station-floor": {
      transform: stationArtTransform,
      stageClass: "is-station-floor",
      artFilter: "url(#station-sign-shadow)",
      layers: [stationFloorBackground, stationFloorReflection]
    },
    "stone-wall": {
      transform: wallArtTransform,
      stageClass: "is-wall-mount",
      artFilter: "none",
      layers: [stoneWallBackground, wallMountShadow]
    }
  };
  var sceneTransitionLayers = [
    nightBackground,
    streetBackground,
    streetSignRig,
    streetSignDepth,
    brickBackground,
    electricBackground,
    electricReflection,
    stationFloorBackground,
    stationFloorReflection,
    stoneWallBackground,
    wallMountShadow,
    neonLayer,
    neonBackdrop,
    neonFlags
  ].filter(function (element) {
    return Boolean(element);
  });
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
      outlineWidth: 10,
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
      ringOutlineWidth: 7,
      ringOutlineOpacity: "1",
      barSolid: "#ffffff",
      barGradient: ["#ffffff", "#ffffff", "#ffffff"],
      outlineColor: "#e4002b",
      outlineWidth: 7,
      outlineOpacity: "1",
      insetOpacity: "0",
      textColor: "#e4002b",
      gradients: false,
      blueOutline: true,
      whiteInset: false,
      whiteCenter: true
    }
  };

  function createTransportPreset(scheme, overrides) {
    var preset = {
      barWidth: 570,
      textSize: 0,
      transport: true,
      transportVerticalPadding: 24,
      spaceDots: false,
      largeSpaceDots: false,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: false,
      blueOutline: true,
      whiteInset: false,
      background: "none",
      outerRadius: 230,
      innerRadius: 145,
      singleBarHeight: 96,
      doubleBarHeight: 156,
      centerFill: "#ffffff",
      ringSolid: "#e1251b",
      ringGradient: ["#e1251b", "#e1251b", "#e1251b"],
      ringOutlineColor: "#e1251b",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      barRadius: 0,
      outlineColor: "#003688",
      outlineWidth: 0,
      outlineOpacity: "0",
      insetColor: "#ffffff",
      insetWidth: 0,
      insetOpacity: "0",
      textColor: "#ffffff",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    };

    Object.keys(scheme).forEach(function (key) {
      preset[key] = scheme[key];
    });

    Object.keys(overrides || {}).forEach(function (key) {
      preset[key] = overrides[key];
    });

    return preset;
  }

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
      barWidth: 840,
      textSize: 30,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: true,
      blueOutline: true,
      whiteInset: false,
      hexagonalLetterRules: true,
      outerRadius: 292,
      innerRadius: 180,
      singleBarHeight: 138,
      doubleBarHeight: 220,
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
      ornaments: "letter-rules",
      ornamentColor: "#f3ecd5",
      ornamentOpacity: "0.9"
    },
    modernRules: {
      barWidth: 900,
      textSize: 16,
      font: "gill",
      whiteCenter: true,
      gradients: false,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      outerLetterRules: true,
      hexagonalLetterRules: false,
      joinLetterRuleSpaces: true,
      outerRulesOutsideInset: true,
      outerRadius: 292,
      innerRadius: 178,
      singleBarHeight: 172,
      doubleBarHeight: 272,
      centerFill: "#ffffff",
      ringSolid: "#dc241f",
      ringGradient: ["#dc241f", "#dc241f", "#dc241f"],
      ringOutlineColor: "#dc241f",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#003688",
      barGradient: ["#003688", "#003688", "#003688"],
      barRadius: 2,
      outlineColor: "#001b5e",
      outlineWidth: 8,
      outlineOpacity: "0.32",
      insetColor: "#ffffff",
      insetWidth: 3,
      insetOpacity: "0.92",
      ornaments: "letter-rules",
      ornamentColor: "#ffffff",
      ornamentOpacity: "1"
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
    signboard: {
      barWidth: 860,
      font: "gill",
      whiteCenter: false,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "plaque",
      outerRadius: 258,
      innerRadius: 0,
      singleBarHeight: 132,
      doubleBarHeight: 222,
      centerFill: "#d71920",
      ringSolid: "#d71920",
      ringGradient: ["#f33a32", "#d71920", "#9f0c12"],
      ringOutlineColor: "#742018",
      ringOutlineWidth: 0,
      ringOutlineOpacity: "0",
      barSolid: "#071454",
      barGradient: ["#172b7d", "#071454", "#030727"],
      barRadius: 2,
      outlineColor: "#8b2518",
      outlineWidth: 14,
      outlineOpacity: "0.88",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0.55",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    whiteTiles: {
      barWidth: 930,
      font: "gill",
      whiteCenter: true,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "brick-white",
      outerRadius: 294,
      innerRadius: 176,
      singleBarHeight: 166,
      doubleBarHeight: 266,
      centerFill: "#ffffff",
      ringSolid: "#dc241f",
      ringGradient: ["#f3342c", "#dc241f", "#a10c14"],
      ringOutlineColor: "#bfc4c8",
      ringOutlineWidth: 10,
      ringOutlineOpacity: "0.96",
      barSolid: "#0019a8",
      barGradient: ["#1533c7", "#0019a8", "#000c5c"],
      barRadius: 2,
      outlineColor: "#7b838a",
      outlineWidth: 14,
      outlineOpacity: "0.86",
      insetColor: "#f7ffff",
      insetWidth: 3,
      insetOpacity: "0.62",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    redTiles: {
      barWidth: 900,
      font: "gill",
      whiteCenter: true,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "brick-red",
      outerRadius: 286,
      innerRadius: 172,
      singleBarHeight: 156,
      doubleBarHeight: 254,
      centerFill: "#fff4e4",
      ringSolid: "#f12a20",
      ringGradient: ["#ff4f36", "#e1251b", "#9c0b10"],
      ringOutlineColor: "#30231d",
      ringOutlineWidth: 6,
      ringOutlineOpacity: "0.62",
      barSolid: "#071454",
      barGradient: ["#15276f", "#071454", "#02061f"],
      barRadius: 1,
      outlineColor: "#251b17",
      outlineWidth: 12,
      outlineOpacity: "0.82",
      insetColor: "#f6fbff",
      insetWidth: 3,
      insetOpacity: "0.44",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    yellowBrick: {
      barWidth: 980,
      font: "gill",
      whiteCenter: false,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "brick-yellow",
      outerRadius: 302,
      innerRadius: 182,
      singleBarHeight: 176,
      doubleBarHeight: 278,
      centerFill: "#efe4c9",
      ringSolid: "#e4251b",
      ringGradient: ["#ff3d2e", "#e4251b", "#a81012"],
      ringOutlineColor: "#c8cdd0",
      ringOutlineWidth: 12,
      ringOutlineOpacity: "0.94",
      barSolid: "#001b7c",
      barGradient: ["#102fae", "#001b7c", "#050b3a"],
      barRadius: 1,
      outlineColor: "#c8cdd0",
      outlineWidth: 18,
      outlineOpacity: "0.9",
      insetColor: "#ffffff",
      insetWidth: 3,
      insetOpacity: "0.46",
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
      background: "night",
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
    streetSign: {
      barWidth: 900,
      font: "gill",
      whiteCenter: false,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "street-post",
      outerRadius: 278,
      innerRadius: 166,
      singleBarHeight: 154,
      doubleBarHeight: 248,
      centerFill: "#ffffff",
      ringSolid: "#df241e",
      ringGradient: ["#ff4930", "#df241e", "#a50e12"],
      ringOutlineColor: "#c7ccd2",
      ringOutlineWidth: 8,
      ringOutlineOpacity: "0.8",
      barSolid: "#083282",
      barGradient: ["#19479f", "#083282", "#031546"],
      barRadius: 1,
      outlineColor: "#262b31",
      outlineWidth: 12,
      outlineOpacity: "0.86",
      insetColor: "#ffffff",
      insetWidth: 3,
      insetOpacity: "0.42",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    neon: {
      barWidth: 880,
      font: "avenir",
      whiteCenter: false,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "plaque",
      neon: true,
      outerRadius: 286,
      innerRadius: 170,
      singleBarHeight: 168,
      doubleBarHeight: 268,
      centerFill: "#ffffff",
      ringSolid: "#ed351e",
      ringGradient: ["#ff7d46", "#ef351f", "#8f130d"],
      ringOutlineColor: "#ffd5b0",
      ringOutlineWidth: 7,
      ringOutlineOpacity: "0.92",
      barSolid: "#0a168f",
      barGradient: ["#2636ff", "#101fc6", "#060b48"],
      barRadius: 8,
      outlineColor: "#66f7ff",
      outlineWidth: 12,
      outlineOpacity: "0.8",
      insetColor: "#f7ffff",
      insetWidth: 4,
      insetOpacity: "0.64",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    electric: {
      barWidth: 800,
      font: "gill",
      whiteCenter: false,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: true,
      background: "electric-exhibit",
      electric: true,
      outerRadius: 244,
      innerRadius: 142,
      singleBarHeight: 116,
      doubleBarHeight: 198,
      centerFill: "#ff5a18",
      ringSolid: "#ff5a18",
      ringGradient: ["#ff8b1f", "#ff5a18", "#f1360c"],
      ringOutlineColor: "#ff8a22",
      ringOutlineWidth: 6,
      ringOutlineOpacity: "0.88",
      barSolid: "#001b87",
      barGradient: ["#0737ca", "#001f94", "#00095a"],
      barRadius: 3,
      outlineColor: "#0a0b18",
      outlineWidth: 10,
      outlineOpacity: "0.74",
      insetColor: "#66f7ff",
      insetWidth: 3,
      insetOpacity: "0.74",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    stationFloor: {
      barWidth: 900,
      font: "gill",
      whiteCenter: true,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: false,
      background: "station-floor",
      outerRadius: 286,
      innerRadius: 168,
      singleBarHeight: 134,
      doubleBarHeight: 224,
      centerFill: "#ffffff",
      ringSolid: "#f52418",
      ringGradient: ["#ff3a23", "#f52418", "#c40d12"],
      ringOutlineColor: "#090b10",
      ringOutlineWidth: 10,
      ringOutlineOpacity: "0.98",
      barSolid: "#0033b8",
      barGradient: ["#1552ec", "#0033b8", "#001463"],
      barRadius: 1,
      outlineColor: "#090b10",
      outlineWidth: 12,
      outlineOpacity: "0.98",
      insetColor: "#ffffff",
      insetWidth: 3,
      insetOpacity: "0.18",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    },
    // Wall Style has strict custom-shadow invariants. Read AGENTS.md before
    // changing this preset, its scene, or the related SVG geometry.
    wallMount: {
      barWidth: 860,
      font: "gill",
      whiteCenter: false,
      gradients: true,
      shadow: true,
      blueOutline: true,
      whiteInset: false,
      background: "stone-wall",
      outerRadius: 276,
      innerRadius: 164,
      singleBarHeight: 140,
      doubleBarHeight: 230,
      centerFill: "#d8d0c5",
      ringSolid: "#f90000",
      ringGradient: ["#f70000", "#f90000", "#fb0101"],
      ringOutlineColor: "#aeb7bf",
      ringOutlineWidth: 9,
      ringOutlineOpacity: "0.96",
      barSolid: "#10058a",
      barGradient: ["#16058c", "#10058a", "#0b047f"],
      barRadius: 1,
      outlineColor: "#aeb7bf",
      outlineWidth: 13,
      outlineOpacity: "1",
      insetColor: "#ffffff",
      insetWidth: 4,
      insetOpacity: "0",
      ornaments: "none",
      ornamentColor: "#ffffff",
      ornamentOpacity: "0.65"
    }
  };

  Object.keys(colorSchemes).forEach(function (key) {
    if (presets[key]) {
      return;
    }

    presets[key] = createTransportPreset(colorSchemes[key], {
      singleBarHeight: key === "airline" || key === "cycles" ? 90 : 96,
      doubleBarHeight: key === "airline" || key === "cycles" ? 150 : 156,
      transportVerticalPadding: key === "airline" || key === "cycles" ? 16 : 24,
      spaceDots: key === "airline" || key === "dial" || key === "rail",
      largeSpaceDots: key === "airline"
    });
  });

  var styleCatalog = [
    { group: "Popular", id: "classic", label: "Classic" },
    { group: "Popular", id: "platform", label: "Platform" },
    { group: "Popular", id: "poster", label: "Poster" },
    { group: "Popular", id: "heritage", label: "Heritage", miniClass: "style-mini-heritage" },
    { group: "Popular", id: "wallMount", label: "Wall", miniClass: "style-mini-bg style-mini-wall" },
    {
      group: "Popular",
      id: "whiteTiles",
      label: "White tiles",
      miniClass: "style-mini-bg style-mini-brick",
      preview: { "--mini-bg": "#f5f3ec", "--mini-brick": "#ffffff", "--mini-brick-alt": "#e5e1d8", "--mini-line": "#2d2b27" }
    },
    {
      group: "Popular",
      id: "redTiles",
      label: "Red tiles",
      miniClass: "style-mini-bg style-mini-brick",
      preview: { "--mini-bg": "#8f2b25", "--mini-brick": "#bd493d", "--mini-brick-alt": "#7d241f", "--mini-line": "#d3a196" }
    },
    {
      group: "Popular",
      id: "yellowBrick",
      label: "Yellow brick",
      miniClass: "style-mini-bg style-mini-brick",
      preview: { "--mini-bg": "#a48d5d", "--mini-brick": "#c7b075", "--mini-brick-alt": "#806b44", "--mini-line": "#6f624f" }
    },
    { group: "Styles", id: "enamel", label: "Enamel" },
    { group: "Styles", id: "modernRules", label: "Modern rules", miniClass: "style-mini-heritage style-mini-modern-rules" },
    { group: "Styles", id: "museum", label: "Museum" },
    { group: "Styles", id: "redDisc", label: "Red disc" },
    { group: "Scenes", id: "signboard", label: "Signboard", miniClass: "style-mini-bg style-mini-board" },
    { group: "Scenes", id: "night", label: "Night", miniClass: "style-mini-bg style-mini-night" },
    { group: "Scenes", id: "streetSign", label: "Street", miniClass: "style-mini-bg style-mini-street" },
    { group: "Scenes", id: "stationFloor", label: "Station", miniClass: "style-mini-bg style-mini-station" },
    { group: "Scenes", id: "neon", label: "Neon", miniClass: "style-mini-bg style-mini-neon", preview: { "--mini-glow": "#68f8ff" } },
    { group: "Scenes", id: "electric", label: "Electric", miniClass: "style-mini-bg style-mini-electric", preview: { "--mini-glow": "#2f6fff" } },
    { group: "Transport", id: "underground", label: "Underground" },
    { group: "Transport", id: "rail", label: "TfL Rail" },
    { group: "Transport", id: "elizabeth", label: "Elizabeth" },
    { group: "Transport", id: "overground", label: "Overground" },
    { group: "Transport", id: "dlr", label: "DLR" },
    { group: "Transport", id: "river", label: "River" },
    { group: "Transport", id: "trams", label: "Trams" },
    { group: "Transport", id: "buses", label: "Buses" },
    { group: "Transport", id: "coaches", label: "Coaches" },
    { group: "Transport", id: "cycles", label: "Cycles", miniClass: "style-mini-outline" },
    { group: "Transport", id: "dial", label: "Dial" },
    { group: "Transport", id: "taxi", label: "Taxi" },
    { group: "Transport", id: "airline", label: "Airline", miniClass: "style-mini-outline", preview: { "--mini-ring": "#e4002b" } }
  ];

  function getStylePreviewVariables(preset, overrides) {
    var centerColor = preset.whiteCenter ? preset.centerFill : preset.centerFill === "#ffffff" ? preset.ringSolid : preset.centerFill;
    var variables = {
      "--mini-ring": preset.ringSolid,
      "--mini-bar": preset.barSolid,
      "--mini-hole": centerColor || "#ffffff"
    };

    Object.keys(overrides || {}).forEach(function (property) {
      variables[property] = overrides[property];
    });

    return variables;
  }

  function createStyleButton(entry) {
    var preset = presets[entry.id];
    var button;
    var mini;
    var miniBar;
    var label;
    var previewVariables;

    if (!preset) {
      return null;
    }

    button = document.createElement("button");
    button.className = "style-button";
    button.setAttribute("data-preset", entry.id);
    button.setAttribute("type", "button");

    mini = document.createElement("span");
    mini.className = "style-mini" + (entry.miniClass ? " " + entry.miniClass : "");
    mini.setAttribute("aria-hidden", "true");
    previewVariables = getStylePreviewVariables(preset, entry.preview);
    Object.keys(previewVariables).forEach(function (property) {
      mini.style.setProperty(property, previewVariables[property]);
    });

    miniBar = document.createElement("span");
    mini.appendChild(miniBar);

    label = document.createElement("span");
    label.textContent = entry.label;
    button.appendChild(mini);
    button.appendChild(label);

    return button;
  }

  function syncStyleStripHint() {
    var maxScroll;

    if (!styleStrip) {
      return;
    }

    maxScroll = Math.max(0, styleStrip.scrollWidth - styleStrip.clientWidth);
    styleStrip.classList.toggle("is-scrollable", maxScroll > 1);
    styleStrip.classList.toggle("is-at-start", styleStrip.scrollLeft <= 1);
    styleStrip.classList.toggle("is-at-end", styleStrip.scrollLeft >= maxScroll - 1);
  }

  function renderStyleStrip() {
    var fragment;
    var currentGroupName = "";
    var currentGroup;
    var groupLabel;

    if (!styleStrip) {
      return;
    }

    fragment = document.createDocumentFragment();
    styleCatalog.forEach(function (entry) {
      var button;

      if (entry.group !== currentGroupName) {
        currentGroupName = entry.group;
        currentGroup = document.createElement("div");
        currentGroup.className = "style-group";
        currentGroup.setAttribute("role", "group");
        currentGroup.setAttribute("aria-label", entry.group + " presets");

        groupLabel = document.createElement("span");
        groupLabel.className = "style-group-label";
        groupLabel.setAttribute("aria-hidden", "true");
        groupLabel.textContent = entry.group;
        currentGroup.appendChild(groupLabel);
        fragment.appendChild(currentGroup);
      }

      button = createStyleButton(entry);
      if (button) {
        currentGroup.appendChild(button);
      }
    });

    styleStrip.replaceChildren(fragment);
    presetButtons = Array.prototype.slice.call(styleStrip.querySelectorAll("[data-preset]"));
    requestFrame(syncStyleStripHint);
  }

  renderStyleStrip();

  function getFontStack() {
    return fontStacks[fontChoice.value] || fontStacks.gill;
  }

  function getActivePreset() {
    return presets[activePresetKey] || presets.enamel;
  }

  function noteRemixCreation() {
    if (isSharedRemixSession && !hasEmittedRemixCreated) {
      hasEmittedRemixCreated = true;
      emitRoundelEvent("remix_created", { source: "shared-project" });
    }
  }

  function markCustom() {
    noteRemixCreation();
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
    var strip = styleStrip;
    var stripRect;
    var targetLeft;

    if (!button || !strip || strip.scrollWidth <= strip.clientWidth) {
      return;
    }

    stripRect = strip.getBoundingClientRect();
    targetLeft = button.getBoundingClientRect().left - stripRect.left + strip.scrollLeft - (strip.clientWidth - button.offsetWidth) / 2;
    strip.scrollLeft = Math.max(0, Math.min(targetLeft, strip.scrollWidth - strip.clientWidth));
    syncStyleStripHint();
  }

  function syncControlStates() {
    var letterRulesEnabled = Boolean(letterRulesToggle && letterRulesToggle.checked);
    var hexagonalRulesEnabled = Boolean(hexagonalLetterRulesToggle && hexagonalLetterRulesToggle.checked);
    var spaceDotsEnabled = Boolean(spaceDotsToggle && spaceDotsToggle.checked);

    presetButtons.forEach(function (button) {
      setPressed(button, presetChoice.value !== "custom" && button.getAttribute("data-preset") === activePresetKey);
    });

    fontButtons.forEach(function (button) {
      setPressed(button, button.getAttribute("data-font") === fontChoice.value);
    });

    backgroundButtons.forEach(function (button) {
      setPressed(button, button.getAttribute("data-background") === getBackgroundChoice());
    });

    [outerLetterRulesToggle, hexagonalLetterRulesToggle].forEach(function (control) {
      var label;

      if (!control) {
        return;
      }

      control.disabled = !letterRulesEnabled;
      label = control.closest("label");

      if (label) {
        label.setAttribute("aria-disabled", letterRulesEnabled ? "false" : "true");
      }
    });

    if (joinLetterRuleSpacesToggle) {
      var joinSpacesEnabled = letterRulesEnabled && !hexagonalRulesEnabled;
      var joinSpacesLabel = joinLetterRuleSpacesToggle.closest("label");

      joinLetterRuleSpacesToggle.disabled = !joinSpacesEnabled;

      if (joinSpacesLabel) {
        joinSpacesLabel.setAttribute("aria-disabled", joinSpacesEnabled ? "false" : "true");
      }
    }

    if (letterRulesOptions) {
      letterRulesOptions.classList.toggle("is-enabled", letterRulesEnabled);
    }

    if (largeSpaceDotsToggle) {
      var largeDotsLabel = largeSpaceDotsToggle.closest("label");

      largeSpaceDotsToggle.disabled = !spaceDotsEnabled;

      if (largeDotsLabel) {
        largeDotsLabel.setAttribute("aria-disabled", spaceDotsEnabled ? "false" : "true");
      }
    }

    if (spaceDotsOptions) {
      spaceDotsOptions.classList.toggle("is-enabled", spaceDotsEnabled);
    }
  }

  function isDesktopMenuMode() {
    return !!(desktopMenuQuery && desktopMenuQuery.matches);
  }

  function getMenuPanel(name) {
    return menuPanels.filter(function (panel) {
      return panel.getAttribute("data-menu-panel") === name;
    })[0] || null;
  }

  function getMenuAnchor(name) {
    if (activeMenuName === name && activeMenuAnchor && document.documentElement.contains(activeMenuAnchor)) {
      return activeMenuAnchor;
    }

    return hudPanelTriggers.filter(function (button) {
      return button.getAttribute("data-menu") === name;
    })[0] || menuButtons.filter(function (button) {
      return button.getAttribute("data-menu") === name;
    })[0] || null;
  }

  function clampNumber(value, min, max) {
    if (max < min) {
      return min;
    }

    return Math.min(Math.max(value, min), max);
  }

  function resetMenuPanelPosition(panel) {
    panel.style.removeProperty("left");
    panel.style.removeProperty("right");
    panel.style.removeProperty("top");
    panel.style.removeProperty("bottom");
    panel.style.removeProperty("--menu-origin");
    panel.style.removeProperty("--menu-shift-x");
  }

  function positionMenuPanel(panel, anchor) {
    var dock = anchor && anchor.closest ? anchor.closest(".hud-panel-triggers") : null;
    var dockRect;
    var panelWidth;
    var panelHeight;
    var viewportWidth;
    var viewportHeight;
    var gap;
    var margin;
    var left;
    var top;

    dock = dock || document.querySelector(".hud-panel-triggers");

    if (!panel || !dock || !isDesktopMenuMode()) {
      if (panel) {
        resetMenuPanelPosition(panel);
      }
      return;
    }

    dockRect = dock.getBoundingClientRect();
    panelWidth = panel.offsetWidth;
    panelHeight = panel.offsetHeight;
    viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
    gap = 12;
    margin = 14;
    left = clampNumber(dockRect.left + dockRect.width / 2 - panelWidth / 2, margin, viewportWidth - panelWidth - margin);
    top = clampNumber(dockRect.top - gap - panelHeight, margin, viewportHeight - panelHeight - margin);

    panel.style.left = Math.round(left) + "px";
    panel.style.right = "auto";
    panel.style.top = Math.round(top) + "px";
    panel.style.bottom = "auto";
    panel.style.setProperty("--menu-origin", "50% 100%");
    panel.style.setProperty("--menu-shift-x", "0%");
  }

  function positionActiveMenu() {
    var panel;

    if (!activeMenuName) {
      return;
    }

    panel = getMenuPanel(activeMenuName);
    positionMenuPanel(panel, getMenuAnchor(activeMenuName));
  }

  function clearDesktopMenuClose() {
    window.clearTimeout(desktopMenuCloseTimer);
    desktopMenuCloseTimer = 0;
  }

  function scheduleDesktopMenuClose() {
    if (!isDesktopMenuMode() || !activeMenuName || desktopMenuCloseTimer) {
      return;
    }

    desktopMenuCloseTimer = window.setTimeout(function () {
      desktopMenuCloseTimer = 0;

      if (isDesktopMenuMode() && activeMenuName && !activeDrag) {
        closeMenus();
      }
    }, desktopMenuCloseDelay);
  }

  function isPointInExpandedRect(x, y, rect, inset) {
    return (
      x >= rect.left - inset &&
      x <= rect.right + inset &&
      y >= rect.top - inset &&
      y <= rect.bottom + inset
    );
  }

  function isPointerInActiveMenuZone(x, y) {
    var panel;
    var anchor;
    var panelRect;
    var anchorRect;
    var bridgeRect;
    var safeInset = desktopMenuSafeInset;

    if (!activeMenuName) {
      return false;
    }

    panel = getMenuPanel(activeMenuName);
    anchor = getMenuAnchor(activeMenuName);

    if (!panel || panel.hidden || !anchor) {
      return false;
    }

    panelRect = panel.getBoundingClientRect();
    anchorRect = anchor.getBoundingClientRect();

    if (isPointInExpandedRect(x, y, panelRect, safeInset) || isPointInExpandedRect(x, y, anchorRect, safeInset)) {
      return true;
    }

    bridgeRect = {
      left: Math.min(panelRect.left, anchorRect.left),
      right: Math.max(panelRect.right, anchorRect.right),
      top: Math.min(panelRect.top, anchorRect.top),
      bottom: Math.max(panelRect.bottom, anchorRect.bottom)
    };

    return isPointInExpandedRect(x, y, bridgeRect, desktopMenuBridgeInset);
  }

  function handleDesktopMenuPointerMove(event) {
    if (!isDesktopMenuMode() || !activeMenuName || activeDrag) {
      clearDesktopMenuClose();
      return;
    }

    if (isPointerInActiveMenuZone(event.clientX, event.clientY)) {
      clearDesktopMenuClose();
      return;
    }

    scheduleDesktopMenuClose();
  }

  function handleMenuPanelPointerLeave(event) {
    if (!isDesktopMenuMode() || !activeMenuName) {
      return;
    }

    if (isPointerInActiveMenuZone(event.clientX, event.clientY)) {
      clearDesktopMenuClose();
      return;
    }

    scheduleDesktopMenuClose();
  }

  function suppressMenuHoverUntilLeave(anchor) {
    suppressedMenuHoverAnchor = anchor || null;
  }

  function clearMenuHoverSuppression(anchor) {
    if (!anchor || suppressedMenuHoverAnchor === anchor) {
      suppressedMenuHoverAnchor = null;
    }
  }

  function isMenuHoverSuppressed(anchor) {
    return Boolean(anchor && suppressedMenuHoverAnchor === anchor);
  }

  function openMenu(name, anchor) {
    var menuAnchor = anchor || getMenuAnchor(name);

    if (!name) {
      closeMenus();
      return;
    }

    activeMenuName = name;
    activeMenuAnchor = menuAnchor;
    clearDesktopMenuClose();
    showHudChrome();

    menuPanels.forEach(function (panel) {
      var isOpen = panel.getAttribute("data-menu-panel") === name;

      panel.hidden = !isOpen;

      if (isOpen) {
        positionMenuPanel(panel, menuAnchor);
      }
    });

    menuButtons.forEach(function (button) {
      var isOpen = button.getAttribute("data-menu") === name;

      button.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    if (roundelStage) {
      roundelStage.setAttribute("data-active-menu", name || "");
    }

    scheduleMobileMenuIdle();
  }

  function closeMenus() {
    finishRangeAdjustment();
    clearDesktopMenuClose();
    activeMenuName = "";
    activeMenuAnchor = null;

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

    if (!hasOpenShareMenu()) {
      clearMobileMenuIdle();
    }
  }

  function isHudIdleBlocked() {
    return Boolean(
      activeDrag ||
      document.body.classList.contains("is-booting") ||
      document.body.classList.contains("is-sharing") ||
      document.body.classList.contains("is-mobile-text-editing")
    );
  }

  function setHudIdle(isIdle) {
    document.body.classList.toggle("is-hud-idle", Boolean(isIdle));
  }

  function scheduleHudIdle() {
    window.clearTimeout(hudIdleTimer);

    hudIdleTimer = window.setTimeout(function () {
      if (!isHudIdleBlocked()) {
        setHudIdle(true);
      }
    }, hudIdleDelay);
  }

  function isMobileMenuAutoHideEnabled() {
    return Boolean(mobileTextEditingQuery && mobileTextEditingQuery.matches);
  }

  function hasOpenFloatingMenu() {
    return menuPanels.some(function (panel) {
      return !panel.hidden;
    });
  }

  function hasOpenShareMenu() {
    return Boolean(shareMenu && !shareMenu.hidden);
  }

  function hasOpenMobileMenu() {
    return hasOpenFloatingMenu() || hasOpenShareMenu();
  }

  function isMobileMenuIdleBlocked() {
    return Boolean(
      activeDrag ||
      document.body.classList.contains("is-booting") ||
      document.body.classList.contains("is-mobile-text-editing")
    );
  }

  function clearMobileMenuIdle() {
    window.clearTimeout(mobileMenuIdleTimer);
    mobileMenuIdleTimer = 0;
  }

  function scheduleMobileMenuIdle() {
    clearMobileMenuIdle();

    if (!isMobileMenuAutoHideEnabled() || !hasOpenMobileMenu() || isMobileMenuIdleBlocked()) {
      return;
    }

    mobileMenuIdleTimer = window.setTimeout(function () {
      mobileMenuIdleTimer = 0;

      if (!isMobileMenuAutoHideEnabled() || !hasOpenMobileMenu() || isMobileMenuIdleBlocked()) {
        return;
      }

      closeMenus();
      closeShareMenu();
    }, mobileMenuIdleDelay);
  }

  function showHudChrome() {
    setHudIdle(false);
    scheduleHudIdle();
  }

  function noteHudActivity() {
    if (hudActivityFrame) {
      return;
    }

    hudActivityFrame = requestFrame(function () {
      hudActivityFrame = 0;
      showHudChrome();
      scheduleMobileMenuIdle();
    });
  }

  function isMobileTextEditing() {
    return !!(mobileTextEditingQuery && mobileTextEditingQuery.matches);
  }

  function centerTextEditorInViewport() {
    if (!isMobileTextEditing() || document.activeElement !== input) {
      return;
    }

    if (roundelStage && roundelStage.scrollIntoView) {
      roundelStage.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }

    if (input.scrollIntoView) {
      input.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }

  function enterMobileTextEditing() {
    closeMenus();

    if (!isMobileTextEditing()) {
      return;
    }

    document.body.classList.add("is-mobile-text-editing");
    centerTextEditorInViewport();
    window.setTimeout(centerTextEditorInViewport, 120);
    window.setTimeout(centerTextEditorInViewport, 320);
  }

  function exitMobileTextEditing() {
    document.body.classList.remove("is-mobile-text-editing");
  }

  function openShareMenu() {
    if (!shareButton || !shareMenu) {
      return;
    }

    setHudIdle(false);
    document.body.classList.add("is-sharing");
    closeMenus();
    shareMenu.hidden = false;
    shareButton.setAttribute("aria-expanded", "true");
    emitRoundelEvent("share_opened", { format: shareFormat });
    prepareShareAsset().catch(function () {});
    scheduleMobileMenuIdle();
  }

  function closeShareMenu() {
    if (!shareButton || !shareMenu) {
      return;
    }

    shareMenu.hidden = true;
    shareButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-sharing");
    if (!hasOpenFloatingMenu()) {
      clearMobileMenuIdle();
    }
    scheduleHudIdle();
  }

  function toggleShareMenu(event) {
    event.stopPropagation();

    if (!shareMenu || shareMenu.hidden) {
      openShareMenu();
    } else {
      closeShareMenu();
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

  function writeRoundelControls(values) {
    if (Object.prototype.hasOwnProperty.call(values, "barWidth")) {
      setRangeControl(barWidthInput, values.barWidth);
    }
    if (Object.prototype.hasOwnProperty.call(values, "barHeight")) {
      setRangeControl(barHeightInput, values.barHeight);
    }
    if (Object.prototype.hasOwnProperty.call(values, "textSize")) {
      setRangeControl(textSizeInput, values.textSize);
    }
    if (Object.prototype.hasOwnProperty.call(values, "textHeight")) {
      setRangeControl(textHeightInput, values.textHeight);
    }
    if (Object.prototype.hasOwnProperty.call(values, "textWidth")) {
      setRangeControl(textWidthInput, values.textWidth);
    }
    if (Object.prototype.hasOwnProperty.call(values, "font")) {
      fontChoice.value = fontStacks[values.font] ? values.font : fontChoice.value;
    }
    if (Object.prototype.hasOwnProperty.call(values, "capitalise")) {
      capitaliseToggle.checked = Boolean(values.capitalise);
    }
    if (Object.prototype.hasOwnProperty.call(values, "spaceDots")) {
      spaceDotsToggle.checked = Boolean(values.spaceDots);
    }
    if (Object.prototype.hasOwnProperty.call(values, "largeSpaceDots")) {
      largeSpaceDotsToggle.checked = Boolean(values.largeSpaceDots);
    }
    if (Object.prototype.hasOwnProperty.call(values, "letterRules")) {
      letterRulesToggle.checked = Boolean(values.letterRules);
    }
    if (Object.prototype.hasOwnProperty.call(values, "outerLetterRules")) {
      outerLetterRulesToggle.checked = Boolean(values.outerLetterRules);
    }
    if (Object.prototype.hasOwnProperty.call(values, "hexagonalLetterRules")) {
      hexagonalLetterRulesToggle.checked = Boolean(values.hexagonalLetterRules);
    }
    if (Object.prototype.hasOwnProperty.call(values, "joinLetterRuleSpaces")) {
      joinLetterRuleSpacesToggle.checked = Boolean(values.joinLetterRuleSpaces);
    }
    if (Object.prototype.hasOwnProperty.call(values, "whiteCenter")) {
      whiteCenterToggle.checked = Boolean(values.whiteCenter);
    }
    if (Object.prototype.hasOwnProperty.call(values, "gradients")) {
      gradientsToggle.checked = Boolean(values.gradients);
    }
    if (Object.prototype.hasOwnProperty.call(values, "shadow")) {
      shadowToggle.checked = Boolean(values.shadow);
    }
    if (Object.prototype.hasOwnProperty.call(values, "blueOutline")) {
      blueOutlineToggle.checked = Boolean(values.blueOutline);
    }
    if (Object.prototype.hasOwnProperty.call(values, "whiteInset")) {
      whiteInsetToggle.checked = Boolean(values.whiteInset);
    }
    if (Object.prototype.hasOwnProperty.call(values, "background")) {
      backgroundChoice.value = normalizeBackgroundChoice(values.background, Boolean(values.plaque));
    }
  }

  function getPresetControlValues(preset) {
    var background = normalizeBackgroundChoice(preset.background, Boolean(preset.plaque));

    return {
      barWidth: preset.barWidth,
      barHeight: 0,
      textSize: preset.textSize || 0,
      textHeight: preset.textHeight || 100,
      textWidth: preset.textWidth || 100,
      font: preset.font,
      spaceDots: Boolean(preset.spaceDots),
      largeSpaceDots: Boolean(preset.largeSpaceDots),
      letterRules: preset.ornaments === "letter-rules",
      outerLetterRules: Boolean(preset.outerLetterRules),
      hexagonalLetterRules: Boolean(preset.hexagonalLetterRules),
      joinLetterRuleSpaces: Boolean(preset.joinLetterRuleSpaces),
      whiteCenter: preset.whiteCenter,
      gradients: preset.gradients,
      shadow: preset.shadow,
      blueOutline: preset.blueOutline,
      whiteInset: preset.whiteInset,
      background: background,
      plaque: background === "plaque"
    };
  }

  function getRangeResetDefaults() {
    var preset = getActivePreset();

    return {
      "bar-width": preset.barWidth,
      "bar-height-adjust": 0,
      "text-size-adjust": preset.textSize || 0,
      "text-height-adjust": preset.textHeight || 100,
      "text-width-adjust": preset.textWidth || 100
    };
  }

  function syncRangeResetButtons() {
    var defaults = getRangeResetDefaults();

    rangeResetButtons.forEach(function (button) {
      var controlId = button.getAttribute("data-reset-control");
      var control = document.getElementById(controlId);
      var isDefault = control && Number(control.value) === Number(defaults[controlId]);

      button.disabled = Boolean(isDefault);
    });
  }

  function normalizeBackgroundChoice(value, legacyPlaque) {
    if (value === "none" || value === "plaque" || Object.prototype.hasOwnProperty.call(backgroundScenes, value) || Object.prototype.hasOwnProperty.call(backgroundFills, value)) {
      return value;
    }

    return legacyPlaque ? "plaque" : "none";
  }

  function getBackgroundChoice() {
    return normalizeBackgroundChoice(backgroundChoice && backgroundChoice.value, false);
  }

  function getCurrentState() {
    var background = getBackgroundChoice();

    return {
      version: 2,
      preset: presetChoice.value === "custom" ? "custom" : activePresetKey,
      activePreset: activePresetKey,
      text: input.value,
      barWidth: getBarWidth(),
      barHeight: getBarHeightAdjustment(),
      textSize: getTextSizeAdjustment(),
      textHeight: getTextHeightPercent(),
      textWidth: getTextWidthPercent(),
      font: fontChoice.value,
      capitalise: capitaliseToggle.checked,
      spaceDots: spaceDotsToggle.checked,
      largeSpaceDots: largeSpaceDotsToggle.checked,
      letterRules: letterRulesToggle.checked,
      outerLetterRules: outerLetterRulesToggle.checked,
      hexagonalLetterRules: hexagonalLetterRulesToggle.checked,
      joinLetterRuleSpaces: joinLetterRuleSpacesToggle.checked,
      whiteCenter: whiteCenterToggle.checked,
      gradients: gradientsToggle.checked,
      shadow: shadowToggle.checked,
      blueOutline: blueOutlineToggle.checked,
      whiteInset: whiteInsetToggle.checked,
      background: background,
      plaque: background === "plaque"
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

  function pushUndoState(state) {
    var signature = stateSignature(state);
    var previous = undoStack.length ? undoStack[undoStack.length - 1].signature : "";

    if (signature !== previous) {
      undoStack.push({ signature: signature, state: state });

      if (undoStack.length > maxUndoSteps) {
        undoStack.shift();
      }

      updateUndoButton();
    }
  }

  function recordUndoState() {
    var state;

    if (isApplyingState) {
      return;
    }

    state = getCurrentState();
    pushUndoState(state);
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
    var legacyColorPreset = colorSchemes[params.get("color")] ? params.get("color") : "";
    var requestedPreset = legacyColorPreset || params.get("preset") || "enamel";
    var requestedActivePreset = legacyColorPreset || params.get("active") || requestedPreset;

    if (!params.has("text") && !params.has("preset")) {
      return null;
    }

    return {
      version: 2,
      preset: requestedPreset,
      activePreset: requestedActivePreset,
      text: params.get("text") || "UNDERGROUND",
      barWidth: params.get("bar"),
      barHeight: params.get("thick"),
      textSize: params.get("size"),
      textHeight: params.get("textheight") || 100,
      textWidth: params.get("textwidth") || 100,
      font: params.get("font"),
      capitalise: getBoolParam(params, "caps", true),
      spaceDots: params.has("dots") ? getBoolParam(params, "dots", false) : null,
      largeSpaceDots: params.has("largedots") ? getBoolParam(params, "largedots", false) : null,
      letterRules: params.has("rules") ? getBoolParam(params, "rules", false) : null,
      outerLetterRules: params.has("outerrules") ? getBoolParam(params, "outerrules", false) : null,
      hexagonalLetterRules: params.has("hexrules") ? getBoolParam(params, "hexrules", false) : null,
      joinLetterRuleSpaces: params.has("joinspaces") ? getBoolParam(params, "joinspaces", false) : null,
      whiteCenter: getBoolParam(params, "center", true),
      gradients: getBoolParam(params, "grad", true),
      shadow: getBoolParam(params, "shadow", true),
      blueOutline: getBoolParam(params, "outline", true),
      whiteInset: getBoolParam(params, "inset", true),
      background: params.has("bg") || params.has("plaque") ? normalizeBackgroundChoice(params.get("bg"), getBoolParam(params, "plaque", false)) : null,
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
    params.set("textheight", String(state.textHeight));
    params.set("textwidth", String(state.textWidth));
    params.set("font", state.font);
    params.set("caps", state.capitalise ? "1" : "0");
    params.set("dots", state.spaceDots ? "1" : "0");
    params.set("largedots", state.largeSpaceDots ? "1" : "0");
    params.set("rules", state.letterRules ? "1" : "0");
    params.set("outerrules", state.outerLetterRules ? "1" : "0");
    params.set("hexrules", state.hexagonalLetterRules ? "1" : "0");
    params.set("joinspaces", state.joinLetterRuleSpaces ? "1" : "0");
    params.set("center", state.whiteCenter ? "1" : "0");
    params.set("grad", state.gradients ? "1" : "0");
    params.set("shadow", state.shadow ? "1" : "0");
    params.set("outline", state.blueOutline ? "1" : "0");
    params.set("inset", state.whiteInset ? "1" : "0");
    params.set("bg", normalizeBackgroundChoice(state.background, state.plaque));
    params.set("plaque", state.background === "plaque" ? "1" : "0");

    return params;
  }

  function getShareUrl() {
    var url = new URL(window.location.href);

    url.search = appendStateParams(getCurrentState()).toString();
    url.searchParams.set("ref", "share");
    url.hash = "";

    return url.toString();
  }

  function emitRoundelEvent(name, detail) {
    var eventDetail = detail || {};
    var event;

    // This intentionally does not transmit data. Analytics integrations can
    // listen for this privacy-safe event without receiving sign text or URLs.
    if (typeof window.CustomEvent === "function") {
      event = new CustomEvent("roundel:analytics", {
        detail: Object.assign({ name: name }, eventDetail)
      });
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent("roundel:analytics", false, false, Object.assign({ name: name }, eventDetail));
    }

    window.dispatchEvent(event);
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
    return copyText(getShareUrl()).then(function () {
      exportStatus.textContent = "Link copied.";
      emitRoundelEvent("share_link_copied", { mechanism: "clipboard" });
    }).catch(function () {
      exportStatus.textContent = "Copy failed.";
      emitRoundelEvent("share_failed", { mechanism: "link-clipboard" });
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

  function clearIntroTextTimers() {
    introTextTimers.forEach(function (timer) {
      window.clearTimeout(timer);
    });
    introTextTimers = [];
  }

  function getPresetState(key, text) {
    var preset = presets[key] || presets.enamel;
    var state = getPresetControlValues(preset);

    state.version = 2;
    state.preset = key;
    state.activePreset = key;
    state.text = text;
    state.capitalise = true;
    return state;
  }

  function getIntroSequenceDuration() {
    return introStepDurations.reduce(function (total, stepDuration) {
      return total + stepDuration;
    }, introOutroDelay);
  }

  function applyIntroFrame(frame, animate, transitionDurationOverride) {
    applyState(getPresetState(frame.preset, frame.text), {
      animate: animate,
      suppressPersist: true,
      skipStripScroll: true,
      transitionDuration: transitionDurationOverride
    });
  }

  function scheduleFirstRunGuide() {
    if (!roundelStage) {
      return;
    }

    roundelStage.classList.add("is-guiding");
    introTextTimers.push(window.setTimeout(function () {
      roundelStage.classList.remove("is-guiding");
    }, 2600));
  }

  function finishIntro(options) {
    roundelStage.classList.remove("is-intro", "is-intro-sequence");

    if (options.boot) {
      document.body.classList.remove("is-booting");
    }

    showHudChrome();

    if (options.guide) {
      scheduleFirstRunGuide();
    }
  }

  function playIntroSequence(options) {
    var elapsed = 0;
    var duration = getIntroSequenceDuration();

    clearIntroTextTimers();
    applyIntroFrame(introSequence[0], false);

    introSequence.slice(1).forEach(function (frame, index) {
      elapsed += introStepDurations[index] || introStepDurations[introStepDurations.length - 1];

      introTextTimers.push(window.setTimeout(function () {
        applyIntroFrame(frame, true, introTransitionDurations[index] || transitionDuration);
      }, elapsed));
    });

    introTextTimers.push(window.setTimeout(function () {
      clearIntroTextTimers();
      finishIntro(options);
    }, duration));
  }

  function playIntro(options) {
    var duration;

    options = options || {};
    duration = options.sequence ? getIntroSequenceDuration() : options.guide ? 2600 : 2300;

    if (!roundelStage || (reducedMotionQuery && reducedMotionQuery.matches)) {
      if (options.sequence) {
        applyIntroFrame(introSequence[introSequence.length - 1], false);
      }

      document.body.classList.remove("is-booting");
      showHudChrome();
      return;
    }

    if (options.boot) {
      document.body.classList.add("is-booting");
    }

    roundelStage.classList.remove("is-intro", "is-intro-sequence", "is-guiding");
    roundelStage.offsetWidth;
    roundelStage.classList.add("is-intro");
    roundelStage.classList.toggle("is-intro-sequence", Boolean(options.sequence));

    if (options.guide && !options.sequence) {
      roundelStage.classList.add("is-guiding");
    }

    if (options.sequence) {
      playIntroSequence(options);
      return;
    }

    window.setTimeout(function () {
      roundelStage.classList.remove("is-guiding");
      finishIntro(options);
    }, duration);
  }

  function playFirstRunIntro() {
    var shouldGuide = !hasSeenIntro();

    playIntro({ boot: true, sequence: true, guide: shouldGuide });
    markIntroSeen();
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

  function clearGripProximity() {
    barGrips.forEach(function (grip) {
      grip.classList.remove("is-near");
    });
  }

  function getDistanceToRect(x, y, rect) {
    var dx = Math.max(rect.left - x, 0, x - rect.right);
    var dy = Math.max(rect.top - y, 0, y - rect.bottom);

    return Math.sqrt(dx * dx + dy * dy);
  }

  function updateGripProximity(event) {
    var threshold = 44;

    if (activeDrag || (event.pointerType && event.pointerType === "touch")) {
      return;
    }

    barGrips.forEach(function (grip) {
      var distance = getDistanceToRect(event.clientX, event.clientY, grip.getBoundingClientRect());

      grip.classList.toggle("is-near", distance <= threshold);
    });
  }

  function handleGripPointerMove(event) {
    if (!roundelStage || activeDrag) {
      return;
    }

    if (!roundelStage.contains(event.target)) {
      clearGripProximity();
      return;
    }

    updateGripProximity(event);
  }

  function handleDocumentPointerMove(event) {
    moveBarDrag(event);
    handleStylePreviewGlobalMove(event);
    handleGripPointerMove(event);
    handleDesktopMenuPointerMove(event);
    noteHudActivity();
  }

  function applyState(state, options) {
    var legacyColorPreset;
    var presetKey;

    if (!state) {
      return;
    }

    options = options || {};
    legacyColorPreset = presets[state.color] ? state.color : "";
    presetKey = legacyColorPreset || (presets[state.activePreset] ? state.activePreset : state.preset);
    presetKey = presets[presetKey] ? presetKey : "enamel";
    isApplyingState = true;

    try {
      activePresetKey = presetKey;
      applyPreset(presetKey, { suppressPersist: true, skipStripScroll: true, deferRender: true });
      input.value = typeof state.text === "string" ? state.text : "UNDERGROUND";
      presetChoice.value = state.preset === "custom" ? "custom" : presetKey;
      writeRoundelControls({
        barWidth: state.barWidth || presets[presetKey].barWidth,
        barHeight: state.barHeight || 0,
        textSize: state.textSize || 0,
        textHeight: state.textHeight || 100,
        textWidth: state.textWidth || 100,
        font: fontStacks[state.font] ? state.font : presets[presetKey].font,
        capitalise: state.capitalise !== false,
        whiteCenter: state.whiteCenter !== false,
        gradients: state.gradients !== false,
        shadow: state.shadow !== false,
        blueOutline: state.blueOutline !== false,
        whiteInset: state.whiteInset !== false
      });

      if (state.letterRules !== null && typeof state.letterRules !== "undefined") {
        writeRoundelControls({ letterRules: state.letterRules });
      }
      if (state.outerLetterRules !== null && typeof state.outerLetterRules !== "undefined") {
        writeRoundelControls({ outerLetterRules: state.outerLetterRules });
      }
      if (state.hexagonalLetterRules !== null && typeof state.hexagonalLetterRules !== "undefined") {
        writeRoundelControls({ hexagonalLetterRules: state.hexagonalLetterRules });
      }
      if (state.joinLetterRuleSpaces !== null && typeof state.joinLetterRuleSpaces !== "undefined") {
        writeRoundelControls({ joinLetterRuleSpaces: state.joinLetterRuleSpaces });
      }
      if (state.spaceDots !== null && typeof state.spaceDots !== "undefined") {
        writeRoundelControls({ spaceDots: state.spaceDots });
      }
      if (state.largeSpaceDots !== null && typeof state.largeSpaceDots !== "undefined") {
        writeRoundelControls({ largeSpaceDots: state.largeSpaceDots });
      }
      if (state.background !== null && typeof state.background !== "undefined") {
        writeRoundelControls({ background: state.background, plaque: state.plaque });
      }
    } finally {
      isApplyingState = false;
    }

    updateRoundel({
      animate: options.animate,
      suppressPersist: options.suppressPersist,
      transitionDuration: options.transitionDuration
    });

    if (!options.skipStripScroll) {
      scrollPresetButtonIntoView(activePresetKey);
    }

    if (!options.suppressPersist) {
      persistState();
    }
  }

  function clearStylePreviewState() {
    presetButtons.forEach(function (button) {
      button.classList.remove("is-preview");
    });
  }

  function previewStyle(key) {
    if (!presets[key] || activePresetKey === key && !previewState) {
      return;
    }

    if (previewState && previewPresetKey === key) {
      return;
    }

    if (!previewState) {
      previewState = getCurrentState();
    } else if (key === previewState.activePreset) {
      previewPresetKey = key;
      applyState(previewState, { animate: true, suppressPersist: true, skipStripScroll: true });
      clearStylePreviewState();
      return;
    }

    previewPresetKey = key;
    applyPreset(key, { animate: true, suppressPersist: true, skipStripScroll: true });
    clearStylePreviewState();

    presetButtons.forEach(function (button) {
      button.classList.toggle("is-preview", button.getAttribute("data-preset") === key);
    });
  }

  function cancelStylePreview() {
    if (!previewState) {
      clearStylePreviewState();
      return;
    }

    applyState(previewState, { animate: true, suppressPersist: true, skipStripScroll: true });
    previewState = null;
    previewPresetKey = "";
    clearStylePreviewState();
  }

  function commitStylePreview(key) {
    if (previewState) {
      pushUndoState(previewState);
      previewState = null;
      previewPresetKey = "";
      clearStylePreviewState();

      if (activePresetKey !== key) {
        applyPreset(key, { animate: true, suppressPersist: true });
      }

      persistState();
      return;
    }

    recordUndoState();
    applyPreset(key, { animate: true });
  }

  function handleStylePreviewMove(event) {
    var button = event.target.closest("[data-preset]");

    if (event.pointerType && event.pointerType !== "mouse") {
      return;
    }

    if (!button || !styleStrip || !styleStrip.contains(button)) {
      if (previewState) {
        cancelStylePreview();
      }

      return;
    }

    previewStyle(button.getAttribute("data-preset"));
  }

  function beginStyleStripGesture(event) {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      return;
    }

    suppressStyleClickUntil = 0;
    styleStripGesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false
    };
  }

  function trackStyleStripGesture(event) {
    var deltaX;
    var deltaY;

    if (!styleStripGesture || styleStripGesture.pointerId !== event.pointerId) {
      return;
    }

    deltaX = Math.abs(event.clientX - styleStripGesture.startX);
    deltaY = Math.abs(event.clientY - styleStripGesture.startY);

    if (!styleStripGesture.moved && Math.max(deltaX, deltaY) > 8) {
      styleStripGesture.moved = true;
      cancelStylePreview();
    }
  }

  function endStyleStripGesture(event) {
    if (!styleStripGesture || styleStripGesture.pointerId !== event.pointerId) {
      return;
    }

    if (styleStripGesture.moved || event.type === "pointercancel") {
      suppressStyleClickUntil = now() + 450;
      cancelStylePreview();
    }

    styleStripGesture = null;
  }

  function handleStylePreviewGlobalMove(event) {
    if (!previewState || !styleStrip || styleStrip.contains(event.target)) {
      return;
    }

    cancelStylePreview();
  }

  function undoLastChange() {
    var entry = undoStack.pop();

    if (!entry) {
      return;
    }

    applyState(entry.state, { animate: true });
    updateUndoButton();
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
    var displayLines = capitaliseToggle.checked ? lines.map(function (line) {
      return line.toLocaleUpperCase("en-GB");
    }) : lines.slice();
    var spaceDot = getSpaceDotGlyph();

    if (spaceDotsToggle && spaceDotsToggle.checked) {
      displayLines = displayLines.map(function (line) {
        return line.replace(/ /g, spaceDot);
      });
    }

    return displayLines;
  }

  function getSpaceDotGlyph() {
    return largeSpaceDotsToggle && largeSpaceDotsToggle.checked ? "•" : "·";
  }

  function getSpaceDotSpacing(value, fontSize) {
    value = String(value || "");

    var offsets = new Array(value.length).fill(0);
    var extraAdvance = 0;
    var dot;
    var sidePadding;
    var index;

    if (!spaceDotsToggle || !spaceDotsToggle.checked || !value) {
      return { offsets: offsets, extraAdvance: extraAdvance };
    }

    dot = getSpaceDotGlyph();
    sidePadding = Math.max(1.5, fontSize * 0.065);

    for (index = 0; index < value.length; index += 1) {
      if (value.charAt(index) !== dot) {
        continue;
      }

      offsets[index] += sidePadding;
      extraAdvance += sidePadding;

      if (index + 1 < value.length) {
        offsets[index + 1] += sidePadding;
        extraAdvance += sidePadding;
      }
    }

    return { offsets: offsets, extraAdvance: extraAdvance };
  }

  function applySpaceDotSpacing(node, value, fontSize) {
    var spacing = getSpaceDotSpacing(value, fontSize);

    if (!spacing.extraAdvance) {
      node.removeAttribute("dx");
      return;
    }

    node.setAttribute("dx", spacing.offsets.map(function (offset) {
      return formatSvgNumber(offset);
    }).join(" "));
  }

  function measureText(value, fontSize) {
    measureContext.font = "700 " + fontSize + "px " + getFontStack();
    return measureContext.measureText(value).width + getSpaceDotSpacing(value, fontSize).extraAdvance;
  }

  function measureTextWithWeight(value, fontSize, weight) {
    measureContext.font = String(weight || 700) + " " + fontSize + "px " + getFontStack();
    return measureContext.measureText(value).width + getSpaceDotSpacing(value, fontSize).extraAdvance;
  }

  function isHeritageTypography() {
    return Boolean(letterRulesToggle && letterRulesToggle.checked);
  }

  function usesSvgInputCaret() {
    return isHeritageTypography() ||
      Boolean(spaceDotsToggle && spaceDotsToggle.checked) ||
      getTextWidthPercent() !== 100 ||
      getTextHeightPercent() !== 100;
  }

  function getHeritageTextParts(line) {
    if (line.length < 3) {
      return {
        first: "",
        inner: line,
        last: ""
      };
    }

    return {
      first: line.slice(0, 1),
      inner: line.slice(1, -1),
      last: line.slice(-1)
    };
  }

  function getHeritageSizing(fontSize, lineCount) {
    var hexagonalScale = hexagonalLetterRulesToggle && hexagonalLetterRulesToggle.checked ? 0.84 : 1;

    return {
      edgeSize: fontSize * (lineCount > 1 ? 1.1 : 1.22),
      innerSize: fontSize * (lineCount > 1 ? 0.78 : 0.84) * hexagonalScale,
      innerSpacing: Math.max(1.2, fontSize * (lineCount > 1 ? 0.014 : 0.018)),
      gap: Math.max(2, fontSize * 0.018)
    };
  }

  function measureHeritagePart(value, fontSize, weight, spacing) {
    if (!value) {
      return 0;
    }

    return measureTextWithWeight(value, fontSize, weight) + Math.max(0, value.length - 1) * (spacing || 0);
  }

  function measureHeritageLine(line, fontSize, lineCount) {
    var parts = getHeritageTextParts(line);
    var sizing = getHeritageSizing(fontSize, lineCount);
    var hasEdgeLetters = Boolean(parts.first && parts.last);

    if (!hasEdgeLetters) {
      return measureHeritagePart(parts.inner, sizing.innerSize, 500, sizing.innerSpacing);
    }

    return measureHeritagePart(parts.first, sizing.edgeSize, 400, 0) +
      sizing.gap +
      measureHeritagePart(parts.inner, sizing.innerSize, 500, sizing.innerSpacing) +
      sizing.gap +
      measureHeritagePart(parts.last, sizing.edgeSize, 400, 0);
  }

  function getBarWidth() {
    return Number(barWidthInput.value) || 896;
  }

  function getBaseBarWidth() {
    return getActivePreset().barWidth;
  }

  function getTextSizeAdjustment() {
    return Number(textSizeInput.value) || 0;
  }

  function getTextHeightPercent() {
    return Number(textHeightInput.value) || 100;
  }

  function getTextWidthPercent() {
    return Number(textWidthInput.value) || 100;
  }

  function getTextHeightScale() {
    return getTextHeightPercent() / 100;
  }

  function getTextWidthScale() {
    return getTextWidthPercent() / 100;
  }

  function formatPercent(value) {
    return Math.round(value) + "%";
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

  function getBaseBarHeight(lineCount) {
    var preset = getActivePreset();
    return lineCount > 1 ? preset.doubleBarHeight : preset.singleBarHeight;
  }

  function getBarHeight(lineCount) {
    var baseHeight = getBaseBarHeight(lineCount);
    var adjustedHeight = baseHeight + getBarHeightAdjustment();
    var minimumHeight = lineCount > 1 ? 120 : 64;
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

    if (getActivePreset().transport) {
      return lineCount > 1 ? 32 : 24;
    }

    if (isHeritageTypography()) {
      ratio = lineCount > 1 ? 0.12 : 0.1;
      minimum = lineCount > 1 ? 58 : 44;
      maximum = lineCount > 1 ? 108 : 92;
    }

    return Math.round(Math.max(minimum, Math.min(maximum, barWidth * ratio)));
  }

  function getVerticalPadding(lineCount) {
    var preset = getActivePreset();

    if (preset.transport) {
      return lineCount > 1 ? 20 : preset.transportVerticalPadding;
    }

    return isHeritageTypography() ?
      (lineCount > 1 ? 28 : 18) :
      (lineCount > 1 ? 46 : 52);
  }

  function getMinimumHorizontalPadding(lineCount) {
    return lineCount > 1 ? 32 : 24;
  }

  function getMinimumVerticalPadding(lineCount) {
    return lineCount > 1 ? 10 : 8;
  }

  function getMinimumBarHeight(lines, fontSize) {
    var layoutMinimum = lines.length > 1 ? 120 : 64;
    var renderedHeight = getLineHeight(fontSize, lines.length) * lines.length;
    var inkBounds = getRenderedTextInkBounds();
    var box;

    if (inkBounds) {
      renderedHeight = inkBounds.height;
    } else {
      try {
        box = textNode.getBBox();
        renderedHeight = box.height;
      } catch (error) {
        // Keep the line-height estimate when SVG metrics are unavailable.
      }
    }

    return Math.ceil(Math.max(
      layoutMinimum,
      renderedHeight * getTextHeightScale() + getMinimumVerticalPadding(lines.length)
    ));
  }

  function clampBarWidthToText(lines) {
    var step = Number(barWidthInput.getAttribute("step")) || 1;
    var maximumWidth = Number(barWidthInput.getAttribute("max")) || 1040;
    var renderedWidth;
    var requiredWidth;
    var minimumWidth;

    try {
      renderedWidth = textNode.getBBox().width * getTextWidthScale();
    } catch (error) {
      renderedWidth = 0;
    }

    requiredWidth = renderedWidth + getMinimumHorizontalPadding(lines.length);
    minimumWidth = barWidthFloor + Math.ceil((requiredWidth - barWidthFloor) / step) * step;
    minimumWidth = Math.max(barWidthFloor, minimumWidth);
    minimumWidth = Math.min(maximumWidth, minimumWidth);
    barWidthInput.setAttribute("min", String(minimumWidth));

    if (getBarWidth() < minimumWidth) {
      barWidthInput.value = String(minimumWidth);
    }
  }

  function applyTextProportions() {
    var transform = [
      "translate(" + centerX + " " + centerY + ")",
      "scale(" + getTextWidthScale() + " " + getTextHeightScale() + ")",
      "translate(" + (-centerX) + " " + (-centerY) + ")"
    ].join(" ");

    textNode.setAttribute("transform", transform);

    if (isHeritageTypography()) {
      barOrnaments.setAttribute("transform", transform);
    } else {
      barOrnaments.removeAttribute("transform");
    }
  }

  function clampBarHeightToText(lines, fontSize) {
    var baseHeight = getBaseBarHeight(lines.length);
    var step = Number(barHeightInput.getAttribute("step")) || 1;
    var maximumAdjustment = Number(barHeightInput.getAttribute("max"));
    var minimumHeight = getMinimumBarHeight(lines, fontSize);
    var minimumAdjustment = Math.ceil((minimumHeight - baseHeight) / step) * step;
    var currentAdjustment;

    minimumAdjustment = Math.max(barHeightAdjustmentFloor, minimumAdjustment);
    minimumAdjustment = Math.min(maximumAdjustment, minimumAdjustment);
    barHeightInput.setAttribute("min", String(minimumAdjustment));
    currentAdjustment = getBarHeightAdjustment();

    if (currentAdjustment < minimumAdjustment) {
      barHeightInput.value = String(minimumAdjustment);
    }
  }

  function setRect(rect, x, y, width, height, radius) {
    rect.setAttribute("x", String(x));
    rect.setAttribute("y", String(y));
    rect.setAttribute("width", String(width));
    rect.setAttribute("height", String(height));
    rect.setAttribute("rx", String(radius));
  }

  function readNumberAttribute(element, attribute, fallback) {
    var rawValue = element ? element.getAttribute(attribute) : null;
    var value = rawValue === null ? NaN : Number(rawValue);

    return isFinite(value) ? value : fallback;
  }

  function formatSvgNumber(value) {
    return String(Math.round(value * 10) / 10);
  }

  function setPolygonPath(element, points) {
    var path = points.map(function (point, index) {
      return (index === 0 ? "M" : "L") + formatSvgNumber(point.x) + " " + formatSvgNumber(point.y);
    }).join("");

    element.setAttribute("d", path + "Z");
  }

  function getRoundedRectPath(x, y, width, height, radius) {
    var safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));
    var right = x + width;
    var bottom = y + height;

    if (safeRadius === 0) {
      return [
        "M" + formatSvgNumber(x) + " " + formatSvgNumber(y),
        "H" + formatSvgNumber(right),
        "V" + formatSvgNumber(bottom),
        "H" + formatSvgNumber(x),
        "Z"
      ].join("");
    }

    return [
      "M" + formatSvgNumber(x + safeRadius) + " " + formatSvgNumber(y),
      "H" + formatSvgNumber(right - safeRadius),
      "A" + formatSvgNumber(safeRadius) + " " + formatSvgNumber(safeRadius) + " 0 0 1 " + formatSvgNumber(right) + " " + formatSvgNumber(y + safeRadius),
      "V" + formatSvgNumber(bottom - safeRadius),
      "A" + formatSvgNumber(safeRadius) + " " + formatSvgNumber(safeRadius) + " 0 0 1 " + formatSvgNumber(right - safeRadius) + " " + formatSvgNumber(bottom),
      "H" + formatSvgNumber(x + safeRadius),
      "A" + formatSvgNumber(safeRadius) + " " + formatSvgNumber(safeRadius) + " 0 0 1 " + formatSvgNumber(x) + " " + formatSvgNumber(bottom - safeRadius),
      "V" + formatSvgNumber(y + safeRadius),
      "A" + formatSvgNumber(safeRadius) + " " + formatSvgNumber(safeRadius) + " 0 0 1 " + formatSvgNumber(x + safeRadius) + " " + formatSvgNumber(y),
      "Z"
    ].join("");
  }

  function setRoundedRectSweepPath(element, x, y, width, height, radius, offsetX, offsetY) {
    var distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    var safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2));

    if (!element || distance <= 0) {
      return;
    }

    var tangentX = offsetY / distance;
    var tangentY = -offsetX / distance;
    var upperTangent = {
      x: x + width - safeRadius + tangentX * safeRadius,
      y: y + safeRadius + tangentY * safeRadius
    };
    var lowerTangent = {
      x: x + safeRadius - tangentX * safeRadius,
      y: y + height - safeRadius - tangentY * safeRadius
    };
    var shiftedRectPath = getRoundedRectPath(
      x + offsetX,
      y + offsetY,
      width,
      height,
      safeRadius
    );
    var tangentBridgePath = [
      "M" + formatSvgNumber(upperTangent.x) + " " + formatSvgNumber(upperTangent.y),
      "L" + formatSvgNumber(upperTangent.x + offsetX) + " " + formatSvgNumber(upperTangent.y + offsetY),
      "L" + formatSvgNumber(lowerTangent.x + offsetX) + " " + formatSvgNumber(lowerTangent.y + offsetY),
      "L" + formatSvgNumber(lowerTangent.x) + " " + formatSvgNumber(lowerTangent.y),
      "Z"
    ].join("");

    element.setAttribute("d", shiftedRectPath + tangentBridgePath);
  }

  function setSweptRingShadowPath(element, cx, cy, innerRadius, outerRadius, offsetX, offsetY) {
    var distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

    if (!element || distance <= 0) {
      return;
    }

    var perpendicularX = -offsetY / distance;
    var perpendicularY = offsetX / distance;
    var frontOuterA = {
      x: cx + perpendicularX * outerRadius,
      y: cy + perpendicularY * outerRadius
    };
    var backOuterA = {
      x: frontOuterA.x + offsetX,
      y: frontOuterA.y + offsetY
    };
    var backOuterB = {
      x: cx + offsetX - perpendicularX * outerRadius,
      y: cy + offsetY - perpendicularY * outerRadius
    };
    var frontOuterB = {
      x: cx - perpendicularX * outerRadius,
      y: cy - perpendicularY * outerRadius
    };
    var path = [
      "M" + formatSvgNumber(frontOuterA.x) + " " + formatSvgNumber(frontOuterA.y),
      "L" + formatSvgNumber(backOuterA.x) + " " + formatSvgNumber(backOuterA.y),
      "A" + formatSvgNumber(outerRadius) + " " + formatSvgNumber(outerRadius) + " 0 0 0 " + formatSvgNumber(backOuterB.x) + " " + formatSvgNumber(backOuterB.y),
      "L" + formatSvgNumber(frontOuterB.x) + " " + formatSvgNumber(frontOuterB.y),
      "A" + formatSvgNumber(outerRadius) + " " + formatSvgNumber(outerRadius) + " 0 0 0 " + formatSvgNumber(frontOuterA.x) + " " + formatSvgNumber(frontOuterA.y),
      "Z"
    ];

    if (innerRadius > distance / 2) {
      var lensHalfHeight = Math.sqrt(innerRadius * innerRadius - distance * distance / 4);
      var lensMidX = cx + offsetX / 2;
      var lensMidY = cy + offsetY / 2;
      var innerA = {
        x: lensMidX + perpendicularX * lensHalfHeight,
        y: lensMidY + perpendicularY * lensHalfHeight
      };
      var innerB = {
        x: lensMidX - perpendicularX * lensHalfHeight,
        y: lensMidY - perpendicularY * lensHalfHeight
      };

      path.push(
        "M" + formatSvgNumber(innerA.x) + " " + formatSvgNumber(innerA.y),
        "A" + formatSvgNumber(innerRadius) + " " + formatSvgNumber(innerRadius) + " 0 0 0 " + formatSvgNumber(innerB.x) + " " + formatSvgNumber(innerB.y),
        "A" + formatSvgNumber(innerRadius) + " " + formatSvgNumber(innerRadius) + " 0 0 0 " + formatSvgNumber(innerA.x) + " " + formatSvgNumber(innerA.y),
        "Z"
      );
    }

    element.setAttribute("d", path.join(""));
  }

  function syncStreetDepthGeometry() {
    var preset = getActivePreset();
    var outerRadius = readNumberAttribute(ringCircle, "r", preset.outerRadius);
    var innerRadius = readNumberAttribute(ringHole, "r", preset.innerRadius);
    var ringWidth = Math.max(0, outerRadius - innerRadius);
    var ringRadius = innerRadius + ringWidth / 2;
    var backCenterX = centerX + streetDepthOffset.x;
    var backCenterY = centerY + streetDepthOffset.y;
    var barX = readNumberAttribute(barFill, "x", centerX - getBarWidth() / 2);
    var barY = readNumberAttribute(barFill, "y", centerY - preset.singleBarHeight / 2);
    var barWidth = readNumberAttribute(barFill, "width", getBarWidth());
    var barHeight = readNumberAttribute(barFill, "height", preset.singleBarHeight);
    var barRadius = readNumberAttribute(barFill, "rx", preset.barRadius);
    var backBarX = barX + streetDepthOffset.x;
    var backBarY = barY + streetDepthOffset.y;
    var frontTopLeft = { x: barX, y: barY };
    var frontTopRight = { x: barX + barWidth, y: barY };
    var frontBottomRight = { x: barX + barWidth, y: barY + barHeight };
    var frontBottomLeft = { x: barX, y: barY + barHeight };
    var backTopLeft = { x: backBarX, y: backBarY };
    var backTopRight = { x: backBarX + barWidth, y: backBarY };
    var backBottomRight = { x: backBarX + barWidth, y: backBarY + barHeight };
    var backBottomLeft = { x: backBarX, y: backBarY + barHeight };

    if (!streetSignDepth) {
      return;
    }

    if (streetDepthArt) {
      streetDepthArt.setAttribute("transform", streetArtTransform);
    }

    [streetDepthRingEdge, streetDepthRingBack, streetDepthRingOuterRim, streetDepthRingInnerRim].forEach(function (circle) {
      if (!circle) {
        return;
      }

      circle.setAttribute("cx", String(backCenterX));
      circle.setAttribute("cy", String(backCenterY));
    });

    if (streetDepthRingEdge) {
      streetDepthRingEdge.setAttribute("r", String(ringRadius));
      streetDepthRingEdge.setAttribute("stroke-width", String(ringWidth + 18));
    }

    if (streetDepthRingBack) {
      streetDepthRingBack.setAttribute("r", String(ringRadius));
      streetDepthRingBack.setAttribute("stroke-width", String(ringWidth));
    }

    if (streetDepthRingOuterRim) {
      streetDepthRingOuterRim.setAttribute("r", String(outerRadius));
    }

    if (streetDepthRingInnerRim) {
      streetDepthRingInnerRim.setAttribute("r", String(innerRadius));
    }

    if (streetDepthRingSheen) {
      streetDepthRingSheen.setAttribute("d", [
        "M" + formatSvgNumber(backCenterX + outerRadius * 0.42) + " " + formatSvgNumber(backCenterY - outerRadius * 0.86),
        "C" + formatSvgNumber(backCenterX + outerRadius * 0.66) + " " + formatSvgNumber(backCenterY - outerRadius * 0.76),
        formatSvgNumber(backCenterX + outerRadius * 0.88) + " " + formatSvgNumber(backCenterY - outerRadius * 0.5),
        formatSvgNumber(backCenterX + outerRadius * 0.97) + " " + formatSvgNumber(backCenterY - outerRadius * 0.24)
      ].join(""));
    }

    if (streetDepthBarBack) {
      setRect(streetDepthBarBack, backBarX, backBarY, barWidth, barHeight, barRadius + 3);
    }

    if (streetDepthBarTop) {
      setPolygonPath(streetDepthBarTop, [frontTopLeft, frontTopRight, backTopRight, backTopLeft]);
    }

    if (streetDepthBarBottom) {
      setPolygonPath(streetDepthBarBottom, [frontBottomLeft, frontBottomRight, backBottomRight, backBottomLeft]);
    }

    if (streetDepthBarLeft) {
      setPolygonPath(streetDepthBarLeft, [frontTopLeft, backTopLeft, backBottomLeft, frontBottomLeft]);
    }

    if (streetDepthBarRight) {
      setPolygonPath(streetDepthBarRight, [frontTopRight, backTopRight, backBottomRight, frontBottomRight]);
    }
  }

  // Wall Style shadow geometry and past failure modes are documented in
  // AGENTS.md. Keep the ring and bar as one composited swept shadow.
  function syncWallMountGeometry() {
    var preset = getActivePreset();
    var outerRadius = readNumberAttribute(ringCircle, "r", preset.outerRadius);
    var innerRadius = readNumberAttribute(ringHole, "r", preset.innerRadius);
    var outerOutlineWidth = readNumberAttribute(ringOuterOutline, "stroke-width", preset.ringOutlineWidth);
    var innerOutlineWidth = readNumberAttribute(ringInnerOutline, "stroke-width", preset.ringOutlineWidth);
    var shadowOuterRadius = outerRadius + outerOutlineWidth / 2;
    var shadowInnerRadius = Math.max(0, innerRadius - innerOutlineWidth / 2);
    var barX = readNumberAttribute(barFill, "x", centerX - getBarWidth() / 2);
    var barY = readNumberAttribute(barFill, "y", centerY - preset.singleBarHeight / 2);
    var barWidth = readNumberAttribute(barFill, "width", getBarWidth());
    var barHeight = readNumberAttribute(barFill, "height", preset.singleBarHeight);
    var barRadius = readNumberAttribute(barFill, "rx", preset.barRadius);
    var barOutlineWidth = readNumberAttribute(barBorder, "stroke-width", preset.outlineWidth);
    var barOutlineHalf = barOutlineWidth / 2;
    var faceBarX = barX - barOutlineHalf;
    var faceBarY = barY - barOutlineHalf;
    var faceBarWidth = barWidth + barOutlineWidth;
    var faceBarHeight = barHeight + barOutlineWidth;
    var faceBarRadius = barRadius + barOutlineHalf;

    if (!wallMountShadow) {
      return;
    }

    if (wallDepthArt) {
      wallDepthArt.setAttribute("transform", wallArtTransform);
    }

    if (wallDepthRingCast) {
      setSweptRingShadowPath(
        wallDepthRingCast,
        centerX,
        centerY,
        shadowInnerRadius,
        shadowOuterRadius,
        wallShadowOffset.x,
        wallShadowOffset.y
      );
    }

    if (wallDepthBarCast) {
      setRoundedRectSweepPath(
        wallDepthBarCast,
        faceBarX,
        faceBarY,
        faceBarWidth,
        faceBarHeight,
        faceBarRadius,
        wallShadowOffset.x,
        wallShadowOffset.y
      );
    }
  }

  function updateBarGeometry(barWidth, barHeight) {
    var preset = getActivePreset();
    var barX = centerX - barWidth / 2;
    var barY = centerY - barHeight / 2;
    var inset = 22;
    var neonInset = 34;

    setRect(barFill, barX, barY, barWidth, barHeight, preset.barRadius);
    setRect(barBorder, barX, barY, barWidth, barHeight, preset.barRadius);
    setRect(barInset, barX + inset, barY + inset, Math.max(0, barWidth - inset * 2), Math.max(0, barHeight - inset * 2), 3);

    if (neonBarTube) {
      setRect(neonBarTube, barX - 6, barY - 6, barWidth + 12, barHeight + 12, preset.barRadius + 10);
    }

    if (neonBarInnerTube) {
      setRect(
        neonBarInnerTube,
        barX + neonInset,
        barY + neonInset,
        Math.max(0, barWidth - neonInset * 2),
        Math.max(0, barHeight - neonInset * 2),
        Math.max(3, preset.barRadius)
      );
    }
  }

  function getSvgScale() {
    var rect = svg.getBoundingClientRect();

    return {
      x: rect.width / 1200,
      y: rect.height / 840
    };
  }

  function getControlArtLayout() {
    var background = getBackgroundChoice();

    if (background === "station-floor") {
      return stationArtLayout;
    }

    if (background === "stone-wall") {
      return wallArtLayout;
    }

    return identityArtLayout;
  }

  function getInteractiveScale() {
    var scale = getSvgScale();
    var layout = getControlArtLayout();

    return {
      x: scale.x * layout.scaleX,
      y: scale.y * layout.scaleY
    };
  }

  function ensureHeritageLiveText() {
    if (!heritageLiveText) {
      heritageLiveText = document.createElement("div");
      heritageLiveText.className = "heritage-live-text";
      heritageLiveText.setAttribute("aria-hidden", "true");
      roundelStage.appendChild(heritageLiveText);
    }

    return heritageLiveText;
  }

  function ensureHeritageInputCaret() {
    if (!heritageInputCaret) {
      heritageInputCaret = document.createElement("span");
      heritageInputCaret.className = "heritage-input-caret";
      heritageInputCaret.setAttribute("aria-hidden", "true");
      heritageInputCaret.hidden = true;
      roundelStage.appendChild(heritageInputCaret);
    }

    return heritageInputCaret;
  }

  function hideHeritageInputCaret() {
    if (heritageInputCaret) {
      heritageInputCaret.hidden = true;
    }
  }

  function getInputCaretLinePosition() {
    var value = input.value.replace(/\r/g, "");
    var selection = Math.max(0, Math.min(value.length, input.selectionStart || 0));
    var beforeCaret = value.slice(0, selection);
    var rawLines = value.split("\n");
    var lineIndex = Math.min(1, beforeCaret.split("\n").length - 1);
    var lineStart = lineIndex === 0 ? 0 : value.indexOf("\n") + 1;
    var rawLine = rawLines[lineIndex] || "";
    var rawOffset = Math.max(0, selection - lineStart);
    var normalizedBefore = rawLine.slice(0, rawOffset).trimStart().replace(/\s+/g, " ");
    var displayedLines = getDisplayLines(normalizeLines(value));
    var displayedLine = displayedLines[lineIndex] || displayedLines[0] || "";

    return {
      lineIndex: Math.min(lineIndex, displayedLines.length - 1),
      offset: Math.min(displayedLine.length, normalizedBefore.length),
      length: displayedLine.length
    };
  }

  function getHeritageCaretCharacter(lineIndex, characterIndex) {
    var nodes = Array.prototype.slice.call(textNode.querySelectorAll("[data-line-index='" + lineIndex + "']"));
    var remaining = characterIndex;
    var node;
    var length;
    var index;

    for (index = 0; index < nodes.length; index += 1) {
      node = nodes[index];
      length = (node.textContent || "").length;

      if (remaining < length) {
        return { node: node, index: remaining };
      }

      remaining -= length;
    }

    return null;
  }

  function getSvgCharacterBoundary(character, useEnd) {
    var point;

    if (!character || !character.node) {
      return null;
    }

    try {
      point = useEnd ?
        character.node.getEndPositionOfChar(character.index) :
        character.node.getStartPositionOfChar(character.index);

      return { x: point.x, node: character.node };
    } catch (error) {
      return null;
    }
  }

  function transformSvgPoint(matrix, x, y) {
    return {
      x: matrix.a * x + matrix.c * y + matrix.e,
      y: matrix.b * x + matrix.d * y + matrix.f
    };
  }

  function getHeritageCaretGeometry(lineIndex, offset, length) {
    var previousBoundary = offset > 0 ? getSvgCharacterBoundary(
      getHeritageCaretCharacter(lineIndex, offset - 1),
      true
    ) : null;
    var nextBoundary = offset < length ? getSvgCharacterBoundary(
      getHeritageCaretCharacter(lineIndex, offset),
      false
    ) : null;
    var reference = nextBoundary || previousBoundary;
    var box;
    var matrix;
    var localX;
    var screenTop;
    var screenBottom;

    if (!reference || !reference.node || !reference.node.getScreenCTM) {
      return null;
    }

    try {
      box = reference.node.getBBox();
      matrix = reference.node.getScreenCTM();
      localX = previousBoundary && nextBoundary ?
        (previousBoundary.x + nextBoundary.x) / 2 :
        reference.x;
      screenTop = transformSvgPoint(matrix, localX, box.y + box.height * 0.08);
      screenBottom = transformSvgPoint(matrix, localX, box.y + box.height * 0.92);

      return {
        x: screenTop.x,
        top: Math.min(screenTop.y, screenBottom.y),
        bottom: Math.max(screenTop.y, screenBottom.y)
      };
    } catch (error) {
      return null;
    }
  }

  function getRawSelectionForDisplayedPosition(lineIndex, offset) {
    var value = input.value.replace(/\r/g, "");
    var rawLines = value.split("\n");
    var rawLine = rawLines[lineIndex] || "";
    var lineStart = 0;
    var firstContentIndex = rawLine.search(/\S/);
    var lastContentIndex = rawLine.search(/\s+$/);
    var contentEnd;
    var normalizedOffset = 0;
    var index;

    for (index = 0; index < lineIndex; index += 1) {
      lineStart += (rawLines[index] || "").length + 1;
    }

    if (firstContentIndex < 0) {
      return lineStart;
    }

    contentEnd = lastContentIndex < 0 ? rawLine.length : lastContentIndex;

    if (offset <= 0) {
      return lineStart + firstContentIndex;
    }

    index = firstContentIndex;
    while (index < contentEnd) {
      if (/\s/.test(rawLine.charAt(index))) {
        while (index < contentEnd && /\s/.test(rawLine.charAt(index))) {
          index += 1;
        }
      } else {
        index += 1;
      }

      normalizedOffset += 1;
      if (normalizedOffset >= offset) {
        return lineStart + index;
      }
    }

    return lineStart + contentEnd;
  }

  function setHeritageCaretFromPoint(clientX, clientY) {
    var lines;
    var best = null;

    if (!usesSvgInputCaret()) {
      return;
    }

    lines = getDisplayLines(normalizeLines(input.value));
    lines.forEach(function (line, lineIndex) {
      var offset;

      for (offset = 0; offset <= line.length; offset += 1) {
        var geometry = getHeritageCaretGeometry(lineIndex, offset, line.length);
        var score;

        if (!geometry) {
          continue;
        }

        score = Math.abs(clientX - geometry.x) +
          Math.abs(clientY - (geometry.top + geometry.bottom) / 2) * 3;

        if (!best || score < best.score) {
          best = { lineIndex: lineIndex, offset: offset, score: score };
        }
      }
    });

    if (best) {
      var selection = getRawSelectionForDisplayedPosition(best.lineIndex, best.offset);
      input.setSelectionRange(selection, selection);
    }
  }

  function syncHeritageInputCaret() {
    var caret = ensureHeritageInputCaret();
    var position;
    var geometry;
    var stageBox;
    var textColor;

    if (
      !usesSvgInputCaret() ||
      document.activeElement !== input ||
      input.selectionStart !== input.selectionEnd
    ) {
      hideHeritageInputCaret();
      return;
    }

    position = getInputCaretLinePosition();
    geometry = getHeritageCaretGeometry(position.lineIndex, position.offset, position.length);

    if (!geometry) {
      hideHeritageInputCaret();
      return;
    }

    try {
      stageBox = roundelStage.getBoundingClientRect();
      textColor = textNode.getAttribute("fill") || "#ffffff";

      caret.style.left = (geometry.x - stageBox.left) + "px";
      caret.style.top = (geometry.top - stageBox.top) + "px";
      caret.style.height = Math.max(12, geometry.bottom - geometry.top) + "px";
      caret.style.backgroundColor = textColor;
      caret.hidden = false;
    } catch (error) {
      hideHeritageInputCaret();
    }
  }

  function scheduleHeritageInputCaretSync() {
    requestFrame(syncHeritageInputCaret);
  }

  function appendHeritageLiveLine(container, line, fontSize, lineCount, scale, textColor) {
    var parts = getHeritageTextParts(line);
    var sizing = getHeritageSizing(fontSize, lineCount);
    var lineNode = document.createElement("div");
    var firstNode;
    var innerNode;
    var lastNode;

    lineNode.className = "heritage-live-line";
    lineNode.style.color = textColor;

    if (!parts.first || !parts.last) {
      innerNode = document.createElement("span");
      innerNode.className = "heritage-live-inner heritage-live-inner-short";
      innerNode.textContent = parts.inner;
      innerNode.style.fontSize = Math.max(18, sizing.innerSize * scale.x) + "px";
      innerNode.style.letterSpacing = Math.max(0.5, sizing.innerSpacing * scale.x) + "px";
      lineNode.appendChild(innerNode);
      container.appendChild(lineNode);
      return;
    }

    firstNode = document.createElement("span");
    firstNode.className = "heritage-live-edge";
    firstNode.textContent = parts.first;
    firstNode.style.fontSize = Math.max(22, sizing.edgeSize * scale.x) + "px";

    innerNode = document.createElement("span");
    innerNode.className = "heritage-live-inner";
    innerNode.textContent = parts.inner;
    innerNode.style.fontSize = Math.max(18, sizing.innerSize * scale.x) + "px";
    innerNode.style.letterSpacing = Math.max(0.5, sizing.innerSpacing * scale.x) + "px";
    innerNode.style.borderTopWidth = Math.max(1, 3.2 * scale.y) + "px";
    innerNode.style.borderBottomWidth = Math.max(1, 3.2 * scale.y) + "px";

    lastNode = document.createElement("span");
    lastNode.className = "heritage-live-edge";
    lastNode.textContent = parts.last;
    lastNode.style.fontSize = Math.max(22, sizing.edgeSize * scale.x) + "px";

    lineNode.appendChild(firstNode);
    lineNode.appendChild(innerNode);
    lineNode.appendChild(lastNode);
    container.appendChild(lineNode);
  }

  function syncHeritageLiveText(lines, barX, barY, barWidth, barHeight, fontSize, scale, textColor) {
    var overlay = ensureHeritageLiveText();
    var lineHeight = getLineHeight(fontSize, lines.length) * scale.y;

    overlay.textContent = "";
    overlay.hidden = false;
    overlay.style.left = (barX / 1200 * 100) + "%";
    overlay.style.top = (barY / 840 * 100) + "%";
    overlay.style.width = (barWidth / 1200 * 100) + "%";
    overlay.style.height = (barHeight / 840 * 100) + "%";
    overlay.style.fontFamily = getFontStack();
    overlay.style.gap = Math.max(0, lineHeight * 0.02) + "px";

    lines.forEach(function (line) {
      appendHeritageLiveLine(overlay, line, fontSize, lines.length, scale, textColor);
    });
  }

  function hideHeritageLiveText() {
    if (heritageLiveText) {
      heritageLiveText.hidden = true;
      heritageLiveText.textContent = "";
    }
  }

  function syncLiveEditor(lines, barWidth, barHeight, fontSize) {
    var barX = centerX - barWidth / 2;
    var barY = centerY - barHeight / 2;
    var scale = getSvgScale();
    var layout = getControlArtLayout();
    var editorX = layout.x + barX * layout.scaleX;
    var editorY = layout.y + barY * layout.scaleY;
    var editorWidth = barWidth * layout.scaleX;
    var editorHeight = barHeight * layout.scaleY;
    var editorCenterX = layout.x + centerX * layout.scaleX;
    var editorCenterY = layout.y + centerY * layout.scaleY;
    var editorScale = {
      x: scale.x * layout.scaleX,
      y: scale.y * layout.scaleY
    };
    var lineHeight = getLineHeight(fontSize, lines.length) * editorScale.y * getTextHeightScale();
    var verticalPadding = Math.max(0, (editorHeight * scale.y - lineHeight * lines.length) / 2);
    var horizontalPadding = Math.max(8, getHorizontalPadding(lines.length, barWidth) * editorScale.x / 2);
    var textColor = textNode.getAttribute("fill") || "#ffffff";
    var gripHeight = Math.max(42, Math.min(92, editorHeight * scale.y * 0.58));
    var heritageTypography = isHeritageTypography();
    var svgInputCaret = usesSvgInputCaret();

    input.style.left = (editorX / 1200 * 100) + "%";
    input.style.top = (editorY / 840 * 100) + "%";
    input.style.width = (editorWidth / 1200 * 100) + "%";
    input.style.height = (editorHeight / 840 * 100) + "%";
    input.style.padding = verticalPadding + "px " + horizontalPadding + "px 0";
    input.style.fontFamily = getFontStack();
    input.style.fontSize = Math.max(18, fontSize * editorScale.x) + "px";
    input.style.lineHeight = lineHeight + "px";
    input.style.color = "transparent";
    input.style.caretColor = svgInputCaret ? "transparent" : textColor;
    input.style.textTransform = capitaliseToggle.checked ? "uppercase" : "none";
    input.style.fontWeight = heritageTypography ? "500" : "700";
    input.style.textShadow = "none";
    roundelStage.classList.toggle("is-heritage-live", heritageTypography);

    if (heritageTypography) {
      syncHeritageLiveText(lines, editorX, editorY, editorWidth, editorHeight, fontSize, editorScale, textColor);
    } else {
      hideHeritageLiveText();
    }

    if (svgInputCaret) {
      syncHeritageInputCaret();
    } else {
      hideHeritageInputCaret();
    }

    // Keep the editor's hit area anchored to the Bar. The visible SVG text is
    // scaled independently; widening this transparent textarea used to expand
    // its focus outline and let it cover the Bar resize grips.
    input.style.transform = "none";
    input.style.transformOrigin = "50% 50%";

    if (leftBarGrip) {
      leftBarGrip.style.left = ((editorX - 18) / 1200 * 100) + "%";
      leftBarGrip.style.top = (editorCenterY / 840 * 100) + "%";
      leftBarGrip.style.height = gripHeight + "px";
    }

    if (rightBarGrip) {
      rightBarGrip.style.left = ((editorX + editorWidth + 18) / 1200 * 100) + "%";
      rightBarGrip.style.top = (editorCenterY / 840 * 100) + "%";
      rightBarGrip.style.height = gripHeight + "px";
    }

    if (topBarGrip) {
      topBarGrip.style.left = (editorCenterX / 1200 * 100) + "%";
      topBarGrip.style.top = ((editorY - 18) / 840 * 100) + "%";
      topBarGrip.style.width = Math.max(82, Math.min(150, editorWidth * scale.x * 0.2)) + "px";
    }

    if (bottomBarGrip) {
      bottomBarGrip.style.left = (editorCenterX / 1200 * 100) + "%";
      bottomBarGrip.style.top = ((editorY + editorHeight + 18) / 840 * 100) + "%";
      bottomBarGrip.style.width = Math.max(82, Math.min(150, editorWidth * scale.x * 0.2)) + "px";
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

  function resolveGradientPaint(fill, stops) {
    if (fill !== "url(#ring-highlight)" && fill !== "url(#bar-highlight)") {
      return fill;
    }

    return stops[1] || stops[0] || "#000000";
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

  function captureSceneLayers() {
    return sceneTransitionLayers.map(function (element) {
      var visible = isVisible(element);

      return {
        opacity: visible ? getNumberAttribute(element, "opacity", 1) : 0,
        visible: visible
      };
    });
  }

  function captureVisualState() {
    var centerVisible = isVisible(centerFill);
    var plaqueVisible = isVisible(plaqueBackground);
    var ringStops = [
      ringStopTop.getAttribute("stop-color") || "#000000",
      ringStopMid.getAttribute("stop-color") || "#000000",
      ringStopBottom.getAttribute("stop-color") || "#000000"
    ];
    var barStops = [
      barStopTop.getAttribute("stop-color") || "#000000",
      barStopMid.getAttribute("stop-color") || "#000000",
      barStopBottom.getAttribute("stop-color") || "#000000"
    ];
    var capturedRingCircle = captureCircle(ringCircle);
    var capturedBarFill = captureRect(barFill);

    capturedRingCircle.resolvedFill = resolveGradientPaint(capturedRingCircle.fill, ringStops);
    capturedBarFill.resolvedFill = resolveGradientPaint(capturedBarFill.fill, barStops);

    return {
      ringCircle: capturedRingCircle,
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
      barFill: capturedBarFill,
      barBorder: captureStrokeRect(barBorder),
      barInset: captureStrokeRect(barInset),
      ringStops: ringStops,
      barStops: barStops,
      plaque: {
        opacity: plaqueVisible ? getNumberAttribute(plaqueBackground, "opacity", 1) : 0,
        visible: plaqueVisible
      },
      sceneLayers: captureSceneLayers(),
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

  function usesGradientPaint(start, end, gradientUrl) {
    return start.fill === gradientUrl || end.fill === gradientUrl;
  }

  function renderFilledCircle(element, start, end, progress, isFinished, gradientUrl) {
    setNumberAttribute(element, "r", mixNumber(start.r, end.r, progress));

    if (!isFinished && usesGradientPaint(start, end, gradientUrl)) {
      element.setAttribute("fill", gradientUrl);
      return;
    }

    element.setAttribute("fill", isFinished ? end.fill : mixPaint(start.resolvedFill || start.fill, end.resolvedFill || end.fill, progress));
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

  function renderFilledRect(element, start, end, progress, isFinished, gradientUrl) {
    setNumberAttribute(element, "x", mixNumber(start.x, end.x, progress));
    setNumberAttribute(element, "y", mixNumber(start.y, end.y, progress));
    setNumberAttribute(element, "width", mixNumber(start.width, end.width, progress));
    setNumberAttribute(element, "height", mixNumber(start.height, end.height, progress));
    setNumberAttribute(element, "rx", mixNumber(start.rx, end.rx, progress));

    if (!isFinished && usesGradientPaint(start, end, gradientUrl)) {
      element.setAttribute("fill", gradientUrl);
      return;
    }

    element.setAttribute("fill", isFinished ? end.fill : mixPaint(start.resolvedFill || start.fill, end.resolvedFill || end.fill, progress));
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

  function renderSceneLayers(start, end, progress, isFinished) {
    sceneTransitionLayers.forEach(function (element, index) {
      var startLayer = start[index];
      var endLayer = end[index];
      var visible = startLayer.visible || endLayer.visible;

      element.style.display = visible ? "" : "none";
      element.setAttribute("opacity", String(mixNumber(startLayer.opacity, endLayer.opacity, progress)));

      if (isFinished) {
        element.style.display = endLayer.visible ? "" : "none";
        element.setAttribute("opacity", String(endLayer.opacity));
      }
    });
  }

  function renderVisualState(start, end, progress, isFinished) {
    var centerVisible = start.centerFill.visible || end.centerFill.visible;
    var plaqueVisible = start.plaque.visible || end.plaque.visible;

    renderFilledCircle(ringCircle, start.ringCircle, end.ringCircle, progress, isFinished, "url(#ring-highlight)");
    setNumberAttribute(ringHole, "r", mixNumber(start.ringHole.r, end.ringHole.r, progress));
    centerFill.style.display = centerVisible ? "" : "none";
    setNumberAttribute(centerFill, "r", mixNumber(start.centerFill.r, end.centerFill.r, progress));
    centerFill.setAttribute("fill", mixPaint(start.centerFill.fill, end.centerFill.fill, progress));
    centerFill.setAttribute("fill-opacity", String(mixNumber(start.centerFill.fillOpacity, end.centerFill.fillOpacity, progress)));
    renderOutlineCircle(ringOuterOutline, start.ringOuterOutline, end.ringOuterOutline, progress);
    renderOutlineCircle(ringInnerOutline, start.ringInnerOutline, end.ringInnerOutline, progress);
    renderFilledRect(barFill, start.barFill, end.barFill, progress, isFinished, "url(#bar-highlight)");
    renderStrokeRect(barBorder, start.barBorder, end.barBorder, progress, isFinished);
    renderStrokeRect(barInset, start.barInset, end.barInset, progress, isFinished);
    syncStreetDepthGeometry();
    syncWallMountGeometry();
    ringStopTop.setAttribute("stop-color", mixPaint(start.ringStops[0], end.ringStops[0], progress));
    ringStopMid.setAttribute("stop-color", mixPaint(start.ringStops[1], end.ringStops[1], progress));
    ringStopBottom.setAttribute("stop-color", mixPaint(start.ringStops[2], end.ringStops[2], progress));
    barStopTop.setAttribute("stop-color", mixPaint(start.barStops[0], end.barStops[0], progress));
    barStopMid.setAttribute("stop-color", mixPaint(start.barStops[1], end.barStops[1], progress));
    barStopBottom.setAttribute("stop-color", mixPaint(start.barStops[2], end.barStops[2], progress));
    plaqueBackground.style.display = plaqueVisible ? "" : "none";
    plaqueBackground.setAttribute("opacity", String(mixNumber(start.plaque.opacity, end.plaque.opacity, progress)));
    renderSceneLayers(start.sceneLayers, end.sceneLayers, progress, isFinished);
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

  function animateVisualState(start, end, duration) {
    var startedAt = now();
    var animationDuration = duration || transitionDuration;

    cancelVisualAnimation();
    renderVisualState(start, end, 0, false);

    function tick(now) {
      var progress = Math.min(1, (now - startedAt) / animationDuration);
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

    if (neonOuterTube) {
      neonOuterTube.setAttribute("r", String(preset.outerRadius + 18));
    }

    if (neonDiscTube) {
      neonDiscTube.setAttribute("r", String(preset.innerRadius > 0 ? preset.innerRadius + 42 : Math.round(preset.outerRadius * 0.74)));
    }
  }

  function getTextPartInkBounds(node) {
    var box;
    var value;
    var fontSize;
    var fontWeight;
    var metrics;
    var fontAscent;
    var fontDescent;
    var fontHeight;
    var scale;

    if (!node || !node.getBBox) {
      return null;
    }

    try {
      box = node.getBBox();
      value = node.textContent || "";
      fontSize = Number(node.getAttribute("font-size") || textNode.getAttribute("font-size")) || 0;
      fontWeight = Number(node.getAttribute("font-weight") || textNode.getAttribute("font-weight")) || 700;
      measureContext.font = fontWeight + " " + fontSize + "px " + getFontStack();
      metrics = measureContext.measureText(value);
      fontAscent = Number(metrics.fontBoundingBoxAscent || metrics.emHeightAscent);
      fontDescent = Number(metrics.fontBoundingBoxDescent || metrics.emHeightDescent);
      fontHeight = fontAscent + fontDescent;

      if (
        fontHeight > 0 &&
        isFinite(metrics.actualBoundingBoxAscent) &&
        isFinite(metrics.actualBoundingBoxDescent)
      ) {
        scale = box.height / fontHeight;

        return {
          top: box.y + (fontAscent - metrics.actualBoundingBoxAscent) * scale,
          bottom: box.y + box.height - (fontDescent - metrics.actualBoundingBoxDescent) * scale
        };
      }

      return { top: box.y, bottom: box.y + box.height };
    } catch (error) {
      return null;
    }
  }

  function getRenderedTextInkBounds() {
    var top = Infinity;
    var bottom = -Infinity;

    Array.prototype.forEach.call(textNode.children, function (node) {
      var bounds = getTextPartInkBounds(node);

      if (bounds) {
        top = Math.min(top, bounds.top);
        bottom = Math.max(bottom, bounds.bottom);
      }
    });

    return isFinite(top) && isFinite(bottom) && bottom > top ? {
      top: top,
      bottom: bottom,
      height: bottom - top
    } : null;
  }

  function centerTextToBar() {
    try {
      var box = textNode.getBBox();
      var correction = centerY - (box.y + box.height / 2);

      Array.prototype.forEach.call(textNode.children, function (line) {
        line.setAttribute("y", String(Number(line.getAttribute("y")) + correction));
      });

      if (getBarHeightAdjustment() < 0) {
        var inkBounds = getRenderedTextInkBounds();
        var inkCorrection = inkBounds ? centerY - (inkBounds.top + inkBounds.bottom) / 2 : 0;

        if (inkCorrection) {
          Array.prototype.forEach.call(textNode.children, function (line) {
            line.setAttribute("y", String(Number(line.getAttribute("y")) + inkCorrection));
          });
        }
      }
    } catch (error) {
      textNode.setAttribute("y", String(centerY));
    }
  }

  function balanceHeritageLineSpacing(index) {
    var firstNode = textNode.querySelector("[data-line-index='" + index + "'][data-heritage-part='first']");
    var innerNode = textNode.querySelector("[data-line-index='" + index + "'][data-heritage-part='inner']");
    var lastNode = textNode.querySelector("[data-line-index='" + index + "'][data-heritage-part='last']");
    var firstBox;
    var innerBox;
    var lastBox;
    var firstExpectedWidth;
    var innerExpectedWidth;
    var lastExpectedWidth;
    var innerFontSize;
    var innerSpacing;
    var targetGap;
    var trailingGap;
    var gapCorrection;
    var maximumCorrection;
    var originalLastX;
    var lineStart;
    var lineEnd;
    var centeringCorrection;

    if (!firstNode || !innerNode || !lastNode) {
      return;
    }

    try {
      firstBox = firstNode.getBBox();
      innerBox = innerNode.getBBox();
      lastBox = lastNode.getBBox();
      innerFontSize = Number(innerNode.getAttribute("font-size")) || 0;
      innerSpacing = Number(innerNode.getAttribute("letter-spacing")) || 0;
      firstExpectedWidth = measureHeritagePart(
        firstNode.textContent || "",
        Number(firstNode.getAttribute("font-size")) || innerFontSize,
        Number(firstNode.getAttribute("font-weight")) || 400,
        0
      );
      innerExpectedWidth = measureHeritagePart(
        innerNode.textContent || "",
        innerFontSize,
        Number(innerNode.getAttribute("font-weight")) || 500,
        innerSpacing
      );
      lastExpectedWidth = measureHeritagePart(
        lastNode.textContent || "",
        Number(lastNode.getAttribute("font-size")) || innerFontSize,
        Number(lastNode.getAttribute("font-weight")) || 400,
        0
      );

      // Some engines can briefly expose stale SVG text bounds while a font or
      // style transition is settling. Never turn that transient measurement
      // into a permanent horizontal offset.
      if (
        !isFinite(firstBox.x) || !isFinite(innerBox.x) || !isFinite(lastBox.x) ||
        !isFinite(firstBox.width) || !isFinite(innerBox.width) || !isFinite(lastBox.width) ||
        firstBox.width < firstExpectedWidth * 0.55 || firstBox.width > firstExpectedWidth * 1.55 ||
        innerBox.width < innerExpectedWidth * 0.55 || innerBox.width > innerExpectedWidth * 1.55 ||
        lastBox.width < lastExpectedWidth * 0.55 || lastBox.width > lastExpectedWidth * 1.55
      ) {
        return;
      }

      targetGap = Math.max(0, innerBox.x - (firstBox.x + firstBox.width));
      trailingGap = lastBox.x - (innerBox.x + innerBox.width);
      gapCorrection = targetGap - trailingGap;
      maximumCorrection = Math.max(8, innerFontSize * 0.2);

      if (!isFinite(gapCorrection) || Math.abs(gapCorrection) > maximumCorrection) {
        return;
      }

      originalLastX = Number(lastNode.getAttribute("x"));
      lastNode.setAttribute("x", String(originalLastX + gapCorrection));

      firstBox = firstNode.getBBox();
      innerBox = innerNode.getBBox();
      lastBox = lastNode.getBBox();
      lineStart = Math.min(firstBox.x, innerBox.x, lastBox.x);
      lineEnd = Math.max(
        firstBox.x + firstBox.width,
        innerBox.x + innerBox.width,
        lastBox.x + lastBox.width
      );
      centeringCorrection = centerX - (lineStart + lineEnd) / 2;

      if (!isFinite(centeringCorrection) || Math.abs(centeringCorrection) > maximumCorrection) {
        lastNode.setAttribute("x", String(originalLastX));
        return;
      }

      [firstNode, innerNode, lastNode].forEach(function (node) {
        node.setAttribute("x", String(Number(node.getAttribute("x")) + centeringCorrection));
      });
    } catch (error) {
      return;
    }
  }

  function updateText(lines, fontSize) {
    var lineHeight = getLineHeight(fontSize, lines.length);
    var firstLineY = centerY - lineHeight * (lines.length - 1) / 2;
    var heritageSizing = getHeritageSizing(fontSize, lines.length);

    textNode.textContent = "";
    textNode.setAttribute("font-size", String(fontSize));
    textNode.setAttribute("font-family", getFontStack());

    lines.forEach(function (line, index) {
      var y = firstLineY + lineHeight * index;
      var parts;
      var lineWidth;
      var x;
      var firstWidth;
      var innerWidth;
      var tspan;

      if (isHeritageTypography()) {
        parts = getHeritageTextParts(line);

        if (parts.first && parts.last) {
          lineWidth = measureHeritageLine(line, fontSize, lines.length);
          firstWidth = measureHeritagePart(parts.first, heritageSizing.edgeSize, 400, 0);
          innerWidth = measureHeritagePart(parts.inner, heritageSizing.innerSize, 500, heritageSizing.innerSpacing);
          x = centerX - lineWidth / 2;

          tspan = document.createElementNS(svgNamespace, "tspan");
          tspan.textContent = parts.first;
          tspan.setAttribute("x", String(x));
          tspan.setAttribute("y", String(y));
          tspan.setAttribute("font-size", String(heritageSizing.edgeSize));
          tspan.setAttribute("font-weight", "400");
          tspan.setAttribute("text-anchor", "start");
          tspan.setAttribute("dominant-baseline", "central");
          tspan.setAttribute("data-line-index", String(index));
          tspan.setAttribute("data-heritage-part", "first");
          textNode.appendChild(tspan);

          tspan = document.createElementNS(svgNamespace, "tspan");
          tspan.textContent = parts.inner;
          tspan.setAttribute("x", String(x + firstWidth + heritageSizing.gap));
          tspan.setAttribute("y", String(y));
          tspan.setAttribute("font-size", String(heritageSizing.innerSize));
          tspan.setAttribute("font-weight", "500");
          tspan.setAttribute("letter-spacing", String(heritageSizing.innerSpacing));
          tspan.setAttribute("text-anchor", "start");
          tspan.setAttribute("dominant-baseline", "central");
          tspan.setAttribute("data-line-index", String(index));
          tspan.setAttribute("data-heritage-part", "inner");
          applySpaceDotSpacing(tspan, parts.inner, heritageSizing.innerSize);
          textNode.appendChild(tspan);

          tspan = document.createElementNS(svgNamespace, "tspan");
          tspan.textContent = parts.last;
          tspan.setAttribute("x", String(x + firstWidth + innerWidth + heritageSizing.gap * 2));
          tspan.setAttribute("y", String(y));
          tspan.setAttribute("font-size", String(heritageSizing.edgeSize));
          tspan.setAttribute("font-weight", "400");
          tspan.setAttribute("text-anchor", "start");
          tspan.setAttribute("dominant-baseline", "central");
          tspan.setAttribute("data-line-index", String(index));
          tspan.setAttribute("data-heritage-part", "last");
          textNode.appendChild(tspan);
          balanceHeritageLineSpacing(index);
          return;
        }
      }

      tspan = document.createElementNS(svgNamespace, "tspan");

      tspan.textContent = line;
      tspan.setAttribute("x", String(centerX));
      tspan.setAttribute("y", String(y));
      tspan.setAttribute("data-line-index", String(index));
      applySpaceDotSpacing(tspan, line, fontSize);
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

  function getAutoFitFontSize(lines, barWidth, barHeight, maximumFontSize) {
    var cacheKey = [
      lines.join("\n"),
      barWidth,
      barHeight,
      maximumFontSize,
      fontChoice.value,
      getHorizontalPadding(lines.length, barWidth),
      getVerticalPadding(lines.length),
      isHeritageTypography() ? "heritage:" + (hexagonalLetterRulesToggle.checked ? "hexagons" : "lines") : "standard",
      spaceDotsToggle && spaceDotsToggle.checked ? "space-dots" : "spaces"
    ].join("|");
    var low;
    var high;
    var best;
    var candidate;

    if (cacheKey === fittedFontSizeCacheKey) {
      return fittedFontSizeCacheValue;
    }

    low = minFontSize;
    high = maximumFontSize;
    best = minFontSize;

    while (low <= high) {
      candidate = Math.floor((low + high) / 2);
      updateText(lines, candidate);

      if (renderedTextFits(lines, barWidth, barHeight, candidate)) {
        best = candidate;
        low = candidate + 1;
      } else {
        high = candidate - 1;
      }
    }

    fittedFontSizeCacheKey = cacheKey;
    fittedFontSizeCacheValue = best;
    return best;
  }

  function fitAndUpdateText(lines, barWidth, barHeight) {
    var baseFontSize = lines.length > 1 ? 98 : 116;
    var autoFitFontSize = getAutoFitFontSize(lines, barWidth, barHeight, baseFontSize);
    var fontSize = Math.max(minFontSize, autoFitFontSize + getTextSizeAdjustment());

    updateText(lines, fontSize);

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

  function appendRuleLine(x1, x2, y, strokeWidth) {
    var line = document.createElementNS(svgNamespace, "line");

    if (x2 <= x1) {
      return;
    }

    line.setAttribute("x1", String(x1));
    line.setAttribute("x2", String(x2));
    line.setAttribute("y1", String(y));
    line.setAttribute("y2", String(y));
    line.setAttribute("stroke-linecap", "butt");
    line.setAttribute("stroke-width", String(strokeWidth));
    barOrnaments.appendChild(line);
  }

  function appendRuleHexagon(x1, x2, y, height) {
    var width = x2 - x1;
    var halfHeight = height / 2;
    var chamfer = Math.min(height * 0.62, width * 0.24);
    var hexagon;

    if (width <= Math.max(2, height * 0.7)) {
      return;
    }

    hexagon = document.createElementNS(svgNamespace, "path");
    hexagon.setAttribute("d", [
      "M" + formatSvgNumber(x1 + chamfer) + " " + formatSvgNumber(y),
      "L" + formatSvgNumber(x1) + " " + formatSvgNumber(y - halfHeight),
      "H" + formatSvgNumber(x2),
      "L" + formatSvgNumber(x2 - chamfer) + " " + formatSvgNumber(y),
      "L" + formatSvgNumber(x2) + " " + formatSvgNumber(y + halfHeight),
      "H" + formatSvgNumber(x1),
      "Z"
    ].join(""));
    hexagon.setAttribute("stroke", "none");
    barOrnaments.appendChild(hexagon);
  }

  function getInteriorRuleBounds(lineNode, line, fontSize) {
    var charCount = lineNode && lineNode.getNumberOfChars ? lineNode.getNumberOfChars() : line.length;
    var totalWidth;
    var firstWidth;
    var lastWidth;
    var left;

    if (!lineNode || charCount < 3) {
      return null;
    }

    try {
      return {
        start: lineNode.getEndPositionOfChar(0).x + fontSize * 0.06,
        end: lineNode.getStartPositionOfChar(charCount - 1).x - fontSize * 0.06
      };
    } catch (error) {
      totalWidth = lineNode.getComputedTextLength ? lineNode.getComputedTextLength() : measureText(line, fontSize);
      firstWidth = measureText(line.slice(0, 1), fontSize);
      lastWidth = measureText(line.slice(-1), fontSize);
      left = centerX - totalWidth / 2;

      return {
        start: left + firstWidth + fontSize * 0.06,
        end: left + totalWidth - lastWidth - fontSize * 0.06
      };
    }
  }

  function getHeritageRuleBounds(index, fontSize) {
    var innerNode = textNode.querySelector("[data-line-index='" + index + "'][data-heritage-part='inner']");
    var box;
    var nodeX;
    var nodeY;
    var innerFontSize;
    var innerSpacing;
    var expectedWidth;
    var verticalInset;
    var fallbackBounds;

    if (!innerNode || !innerNode.getBBox) {
      return null;
    }

    nodeX = Number(innerNode.getAttribute("x"));
    nodeY = Number(innerNode.getAttribute("y"));
    innerFontSize = Number(innerNode.getAttribute("font-size")) || fontSize;
    innerSpacing = Number(innerNode.getAttribute("letter-spacing")) || 0;
    expectedWidth = measureHeritagePart(
      innerNode.textContent || "",
      innerFontSize,
      Number(innerNode.getAttribute("font-weight")) || 500,
      innerSpacing
    );
    verticalInset = Math.max(2, fontSize * 0.02);
    nodeX = isFinite(nodeX) ? nodeX : centerX - expectedWidth / 2;
    nodeY = isFinite(nodeY) ? nodeY : centerY;
    fallbackBounds = {
      start: nodeX,
      end: nodeX + expectedWidth,
      top: nodeY - innerFontSize * 0.5 + verticalInset,
      bottom: nodeY + innerFontSize * 0.5 - verticalInset
    };

    try {
      box = innerNode.getBBox();

      if (
        !isFinite(box.x) || !isFinite(box.y) || !isFinite(box.width) || !isFinite(box.height) ||
        box.width < expectedWidth * 0.55 || box.width > expectedWidth * 1.55 ||
        Math.abs(box.x - nodeX) > Math.max(8, innerFontSize * 0.2)
      ) {
        return fallbackBounds;
      }

      return {
        start: box.x,
        end: box.x + box.width,
        top: box.y + verticalInset,
        bottom: box.y + box.height - verticalInset
      };
    } catch (error) {
      return fallbackBounds;
    }
  }

  function getFullLineRuleBounds(index, lineNode, line, fontSize, lineCount) {
    var lineParts = Array.prototype.slice.call(textNode.querySelectorAll("[data-line-index='" + index + "']"));
    var start = Infinity;
    var end = -Infinity;
    var width;

    lineParts.forEach(function (part) {
      var box;

      if (!part.getBBox) {
        return;
      }

      try {
        box = part.getBBox();
        start = Math.min(start, box.x);
        end = Math.max(end, box.x + box.width);
      } catch (error) {
        return;
      }
    });

    if (isFinite(start) && isFinite(end) && end > start) {
      return { start: start, end: end };
    }

    width = isHeritageTypography() ? measureHeritageLine(line, fontSize, lineCount) : measureText(line, fontSize);

    if (!width && lineNode && lineNode.getComputedTextLength) {
      try {
        width = lineNode.getComputedTextLength();
      } catch (error) {
        width = 0;
      }
    }

    return width > 0 ? {
      start: centerX - width / 2,
      end: centerX + width / 2
    } : null;
  }

  function getHeritageEdgeInkBounds(index, fallbackTop, fallbackBottom) {
    var firstNode = textNode.querySelector("[data-line-index='" + index + "'][data-heritage-part='first']");
    var character;
    var fontSize;
    var fontWeight;
    var box;
    var metrics;
    var fontAscent;
    var fontDescent;
    var fontHeight;
    var scale;

    if (!firstNode || !firstNode.getBBox) {
      return { top: fallbackTop, bottom: fallbackBottom };
    }

    try {
      box = firstNode.getBBox();
      character = (firstNode.textContent || "").slice(0, 1);
      fontSize = Number(firstNode.getAttribute("font-size")) || 0;
      fontWeight = Number(firstNode.getAttribute("font-weight")) || 400;
      measureContext.font = fontWeight + " " + fontSize + "px " + getFontStack();
      metrics = measureContext.measureText(character);
      fontAscent = Number(metrics.fontBoundingBoxAscent || metrics.emHeightAscent);
      fontDescent = Number(metrics.fontBoundingBoxDescent || metrics.emHeightDescent);
      fontHeight = fontAscent + fontDescent;

      if (
        fontHeight > 0 &&
        isFinite(metrics.actualBoundingBoxAscent) &&
        isFinite(metrics.actualBoundingBoxDescent)
      ) {
        scale = box.height / fontHeight;

        return {
          top: box.y + (fontAscent - metrics.actualBoundingBoxAscent) * scale,
          bottom: box.y + box.height - (fontDescent - metrics.actualBoundingBoxDescent) * scale
        };
      }

      return { top: fallbackTop, bottom: fallbackBottom };
    } catch (error) {
      return { top: fallbackTop, bottom: fallbackBottom };
    }
  }

  function getHeritageCharacterRuleBounds(index, fontSize, lineCount, bounds) {
    var innerNode = textNode.querySelector("[data-line-index='" + index + "'][data-heritage-part='inner']");
    var value = innerNode ? innerNode.textContent || "" : "";
    var charCount = innerNode && innerNode.getNumberOfChars ? innerNode.getNumberOfChars() : value.length;
    var cells = [];
    var sizing;
    var advances;
    var totalAdvance;
    var scale;
    var cursor;
    var indexInLine;
    var characters = [];
    var tolerance = Math.max(2, fontSize * 0.08);

    if (!innerNode || !value || charCount === 0) {
      return cells;
    }

    try {
      for (indexInLine = 0; indexInLine < charCount; indexInLine += 1) {
        var startPoint = innerNode.getStartPositionOfChar(indexInLine);
        var endPoint = innerNode.getEndPositionOfChar(indexInLine);

        characters.push({
          index: indexInLine,
          isSpace: /\s/.test(value.charAt(indexInLine)),
          start: Math.min(startPoint.x, endPoint.x),
          end: Math.max(startPoint.x, endPoint.x)
        });
      }

      if (characters.some(function (character, characterIndex) {
        var previous = characters[characterIndex - 1];

        return !isFinite(character.start) || !isFinite(character.end) ||
          character.end < character.start ||
          character.start < bounds.start - tolerance ||
          character.end > bounds.end + tolerance ||
          previous && character.start < previous.start;
      })) {
        throw new Error("Unstable SVG character metrics");
      }

      characters.forEach(function (character, characterIndex) {
        var previous = characters[characterIndex - 1];
        var next = characters[characterIndex + 1];
        var cellStart;
        var cellEnd;

        if (character.isSpace) {
          return;
        }

        cellStart = previous && !previous.isSpace ? (previous.end + character.start) / 2 : character.start;
        cellEnd = next && !next.isSpace ? (character.end + next.start) / 2 : character.end;

        if (characterIndex === 0) {
          cellStart = bounds.start;
        }

        if (characterIndex === characters.length - 1) {
          cellEnd = bounds.end;
        }

        cellStart = Math.max(bounds.start, Math.min(bounds.end, cellStart));
        cellEnd = Math.max(bounds.start, Math.min(bounds.end, cellEnd));

        if (cellEnd > cellStart) {
          cells.push({ index: character.index, start: cellStart, end: cellEnd });
        }
      });

      if (cells.length) {
        return cells;
      }
    } catch (error) {
      cells = [];
      characters = [];
    }

    try {
      sizing = getHeritageSizing(fontSize, lineCount);
      advances = value.split("").map(function (character) {
        return measureTextWithWeight(character, sizing.innerSize, 500) + sizing.innerSpacing;
      });
      totalAdvance = advances.reduce(function (total, advance) {
        return total + advance;
      }, 0);
      scale = totalAdvance > 0 ? (bounds.end - bounds.start) / totalAdvance : 1;
      cursor = bounds.start;

      advances.forEach(function (advance, characterIndex) {
        var scaledAdvance = advance * scale;

        if (!/\s/.test(value.charAt(characterIndex)) && scaledAdvance > 0) {
          cells.push({
            index: characterIndex,
            start: cursor,
            end: characterIndex === advances.length - 1 ? bounds.end : cursor + scaledAdvance
          });
        }

        cursor += scaledAdvance;
      });
    } catch (error) {
      return [];
    }

    return cells;
  }

  function getHeritageRuleRuns(index, bounds, fontSize, lineCount) {
    var cells = getHeritageCharacterRuleBounds(index, fontSize, lineCount, bounds);
    var runs = [];

    cells.forEach(function (cell) {
      var current = runs[runs.length - 1];

      if (current && cell.index === current.lastIndex + 1) {
        current.end = cell.end;
        current.lastIndex = cell.index;
        return;
      }

      runs.push({
        start: cell.start,
        end: cell.end,
        lastIndex: cell.index
      });
    });

    return runs;
  }

  function appendHexagonalLetterRules(index, bounds, fontSize, lineCount) {
    var cells = getHeritageCharacterRuleBounds(index, fontSize, lineCount, bounds);
    var height = Math.max(lineCount > 1 ? 6.5 : 8, fontSize * (lineCount > 1 ? 0.085 : 0.09));
    var edgeInkBounds = getHeritageEdgeInkBounds(
      index,
      bounds.top - height / 2,
      bounds.bottom + height / 2
    );
    var top = edgeInkBounds.top + height / 2;
    var bottom = edgeInkBounds.bottom - height / 2;

    cells.forEach(function (cell) {
      appendRuleHexagon(cell.start, cell.end, top, height);
      appendRuleHexagon(cell.start, cell.end, bottom, height);
    });

    return cells.length > 0;
  }

  function appendLetterRules(lines, fontSize) {
    var preset = getActivePreset();
    var strokeWidth = lines.length > 1 ? 2.6 : 3.2;
    var outerRulesEnabled = Boolean(outerLetterRulesToggle && outerLetterRulesToggle.checked);
    var hexagonalRulesEnabled = Boolean(hexagonalLetterRulesToggle && hexagonalLetterRulesToggle.checked);
    var joinSpacesEnabled = Boolean(joinLetterRuleSpacesToggle && joinLetterRuleSpacesToggle.checked);

    lines.forEach(function (line, index) {
      var lineNode = textNode.querySelector("[data-line-index='" + index + "']");
      var heritageBounds = getHeritageRuleBounds(index, fontSize);
      var bounds = heritageBounds || getInteriorRuleBounds(lineNode, line || "", fontSize);
      var outerBounds = outerRulesEnabled ? getFullLineRuleBounds(index, lineNode, line || "", fontSize, lines.length) : null;
      var y = lineNode ? Number(lineNode.getAttribute("y")) || centerY : centerY;
      var offset = fontSize * (lines.length > 1 ? 0.31 : 0.42);

      if (!bounds) {
        return;
      }

      var top = heritageBounds ? bounds.top : y - offset;
      var bottom = heritageBounds ? bounds.bottom : y + offset;
      var renderedHexagons = hexagonalRulesEnabled && heritageBounds ? appendHexagonalLetterRules(index, bounds, fontSize, lines.length) : false;

      if (!renderedHexagons) {
        var ruleRuns = heritageBounds && !joinSpacesEnabled ? getHeritageRuleRuns(index, bounds, fontSize, lines.length) : [];
        var edgeInkBounds = heritageBounds ? getHeritageEdgeInkBounds(
          index,
          top - strokeWidth / 2,
          bottom + strokeWidth / 2
        ) : null;
        var lineTop = edgeInkBounds ? edgeInkBounds.top + strokeWidth / 2 : top;
        var lineBottom = edgeInkBounds ? edgeInkBounds.bottom - strokeWidth / 2 : bottom;

        if (!ruleRuns.length) {
          ruleRuns.push(bounds);
        }

        ruleRuns.forEach(function (run) {
          appendRuleLine(run.start, run.end, lineTop, strokeWidth);
          appendRuleLine(run.start, run.end, lineBottom, strokeWidth);
        });
      }

      if (outerRulesEnabled) {
        var outerOffset = Math.max(strokeWidth * 2.2, fontSize * (lines.length > 1 ? 0.065 : 0.06));
        var outerStrokeWidth = Math.max(1.8, strokeWidth * 0.78);
        var outerStart = outerBounds ? outerBounds.start : bounds.start;
        var outerEnd = outerBounds ? outerBounds.end : bounds.end;
        var outerTop = top - outerOffset;
        var outerBottom = bottom + outerOffset;

        if (preset.outerRulesOutsideInset && whiteInsetToggle.checked && !renderedHexagons) {
          var barTop = readNumberAttribute(barFill, "y", outerTop);
          var barHeight = readNumberAttribute(barFill, "height", 0);
          var barBottom = barTop + barHeight;
          var outlineStrokeWidth = blueOutlineToggle.checked ? readNumberAttribute(barBorder, "stroke-width", preset.outlineWidth || 0) : 0;
          var insetTop = readNumberAttribute(barInset, "y", outerTop);
          var insetHeight = readNumberAttribute(barInset, "height", 0);
          var insetBottom = insetTop + insetHeight;
          var insetStrokeWidth = readNumberAttribute(barInset, "stroke-width", preset.insetWidth || 0);

          // Place the outer rules in the gutters outside White inset, centred
          // between the visible inset and Bar outline edges.
          outerTop = (barTop + outlineStrokeWidth / 2 + insetTop - insetStrokeWidth / 2) / 2;
          outerBottom = (insetBottom + insetStrokeWidth / 2 + barBottom - outlineStrokeWidth / 2) / 2;
        }

        appendRuleLine(outerStart, outerEnd, outerTop, outerStrokeWidth);
        appendRuleLine(outerStart, outerEnd, outerBottom, outerStrokeWidth);
      }
    });
  }

  function updateOrnaments(lines, barWidth, barHeight, fontSize) {
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

    if (isHeritageTypography()) {
      var letterRuleColor = textNode.getAttribute("fill") || preset.ornamentColor;

      barOrnaments.setAttribute("fill", letterRuleColor);
      barOrnaments.setAttribute("stroke", letterRuleColor);
      barOrnaments.setAttribute("opacity", "1");
      appendLetterRules(lines, fontSize);
      return;
    }

    if (preset.ornaments !== "diamonds" || preset.ornaments === "letter-rules") {
      return;
    }

    barOrnaments.setAttribute("fill", preset.ornamentColor);
    barOrnaments.setAttribute("stroke", "none");
    barOrnaments.setAttribute("opacity", preset.ornamentOpacity);

    for (x = startX; x <= endX; x += gap) {
      appendDiamond(x, centerY - rowOffset, size);
      appendDiamond(x + gap / 2, centerY + rowOffset, size);
    }
  }

  function setSceneLayerVisibility(element, isVisible) {
    if (!element) {
      return;
    }

    element.style.display = isVisible ? "" : "none";
    element.setAttribute("opacity", isVisible ? "1" : "0");
  }

  function syncBackgroundScene(backgroundKey) {
    var activeScene = backgroundScenes[backgroundKey] || null;

    Object.keys(backgroundScenes).forEach(function (key) {
      var scene = backgroundScenes[key];
      var isVisible = key === backgroundKey;

      scene.layers.forEach(function (layer) {
        setSceneLayerVisibility(layer, isVisible);
      });

      if (roundelStage && scene.stageClass) {
        roundelStage.classList.toggle(scene.stageClass, isVisible);
      }
    });

    artGroup.setAttribute("transform", activeScene && activeScene.transform ? activeScene.transform : "");
    return activeScene;
  }

  function updateStyleOptions() {
    var preset = getActivePreset();
    var backgroundKey = getBackgroundChoice();
    var brickVisible = Boolean(Object.prototype.hasOwnProperty.call(backgroundFills, backgroundKey));
    var scene = syncBackgroundScene(backgroundKey);
    var neonVisible = Boolean(preset.neon);
    var neonBackdropVisible = Boolean(neonVisible && backgroundKey === "plaque");
    var plaqueVisible = Boolean(backgroundKey === "plaque" && !neonVisible);
    var centerFillColor = preset.centerFill;
    var ringSolid = preset.ringSolid;
    var ringGradient = preset.ringGradient;
    var ringOutlineColor = preset.ringOutlineColor;
    var ringOutlineWidth = preset.ringOutlineWidth;
    var ringOutlineOpacity = preset.ringOutlineOpacity;
    var barSolid = preset.barSolid;
    var barGradient = preset.barGradient;
    var outlineColor = preset.outlineColor;
    var outlineWidth = preset.outlineWidth;
    var outlineOpacity = preset.outlineOpacity;
    var insetColor = preset.insetColor;
    var insetWidth = preset.insetWidth;
    var insetOpacity = preset.insetOpacity;
    var textColor = preset.textColor || "#ffffff";

    if (roundelStage) {
      roundelStage.classList.toggle("is-neon", neonVisible);
    }

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
    textNode.setAttribute("font-style", neonVisible ? "italic" : "normal");
    brickBackground.style.display = brickVisible ? "" : "none";
    brickBackground.setAttribute("opacity", brickVisible ? "1" : "0");
    brickWallFill.setAttribute("fill", brickVisible ? backgroundFills[backgroundKey] : backgroundFills["brick-white"]);
    plaqueBackground.style.display = plaqueVisible ? "" : "none";
    plaqueBackground.setAttribute("opacity", plaqueVisible ? "1" : "0");

    if (neonLayer) {
      neonLayer.style.display = neonVisible ? "" : "none";
      neonLayer.setAttribute("opacity", neonVisible ? "1" : "0");
    }

    if (neonTubeLayer) {
      neonTubeLayer.style.display = neonVisible ? "" : "none";
      neonTubeLayer.setAttribute("opacity", neonVisible ? "1" : "0");
    }

    if (neonBackdrop) {
      neonBackdrop.style.display = neonBackdropVisible ? "" : "none";
    }

    if (neonFlags) {
      neonFlags.style.display = neonBackdropVisible ? "" : "none";
    }

    if (shadowToggle.checked) {
      artGroup.setAttribute("filter", neonVisible ? "url(#neon-art-glow)" : scene && scene.artFilter ? scene.artFilter : "url(#soft-shadow)");
    } else {
      artGroup.removeAttribute("filter");
    }

    if ((neonVisible || scene && scene.textFilter) && shadowToggle.checked) {
      textNode.setAttribute("filter", neonVisible ? "url(#neon-text-glow)" : scene.textFilter);
    } else {
      textNode.removeAttribute("filter");
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
    var barWidth;
    var barHeight;
    var fontSize;
    var titleText = lines.join(" / ");

    // Bar dimensions only change the Bar geometry. Type is fitted against the
    // preset's default dimensions, then each dimension slider is stopped
    // before the selected type proportions would no longer fit.
    fontSize = fitAndUpdateText(lines, getBaseBarWidth(), getBaseBarHeight(lines.length));
    clampBarWidthToText(lines);
    clampBarHeightToText(lines, fontSize);
    barWidth = getBarWidth();
    barHeight = getBarHeight(lines.length);

    barWidthOutput.textContent = String(barWidth);
    barHeightOutput.textContent = formatSigned(getBarHeightAdjustment());
    textSizeOutput.textContent = formatSigned(getTextSizeAdjustment());
    textHeightOutput.textContent = formatPercent(getTextHeightPercent());
    textWidthOutput.textContent = formatPercent(getTextWidthPercent());
    updateRingGeometry();
    updateBarGeometry(barWidth, barHeight);
    syncStreetDepthGeometry();
    syncWallMountGeometry();
    updateOrnaments(lines, barWidth, barHeight, fontSize);
    applyTextProportions();
    updateStyleOptions();
    syncLiveEditor(lines, barWidth, barHeight, fontSize);
    syncControlStates();
    syncRangeResetButtons();
    titleNode.textContent = "Roundel sign reading " + titleText;

    if (animateChange) {
      afterState = captureVisualState();
      animateVisualState(beforeState, afterState, options.transitionDuration);
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
    barWidthInput.setAttribute("min", String(barWidthFloor));
    barHeightInput.setAttribute("min", String(barHeightAdjustmentFloor));
    textWidthInput.setAttribute("max", String(textWidthMaximum));
    writeRoundelControls(getPresetControlValues(preset));

    if (!options || !options.deferRender) {
      updateRoundel(options);
    }

    if (!options || !options.skipStripScroll) {
      scrollPresetButtonIntoView(activePresetKey);
    }

    if ((preset.neon || preset.electric) && options && options.animate && !options.deferRender) {
      window.setTimeout(function () {
        playIntro();
      }, 40);
    }
  }

  function slugify(value) {
    var slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return slug || "underground";
  }

  function getExportText() {
    return getDisplayLines(normalizeLines(input.value)).join(" ");
  }

  function getExportFilename(extension) {
    return "roundel-sign-" + slugify(getExportText()) + "." + extension;
  }

  function getProjectMetadata(format) {
    var text = getExportText();
    var editUrl = getShareUrl();
    var stateJson = JSON.stringify(getCurrentState());

    return {
      schema: "1",
      title: "Roundel sign — \"" + text + "\"",
      description: "Unofficial transport-inspired artwork created with Roundel Sign Maker, an application by Alexander Bekert. Remix this sign: " + editUrl,
      software: "Roundel Sign Maker",
      applicationAuthor: "Alexander Bekert",
      creationTime: new Date().toISOString(),
      editUrl: editUrl,
      stateJson: stateJson,
      format: format || "clean"
    };
  }

  function addSvgMetadataText(parent, name, value) {
    var node = document.createElementNS(roundelMetadataNamespace, "roundel:" + name);
    node.textContent = value;
    parent.appendChild(node);
  }

  function decorateExportSvg(exportSvg, metadata) {
    var exportTitle = exportSvg.querySelector("#roundel-title");
    var descriptionNode = exportSvg.querySelector("#roundel-description");
    var metadataNode = exportSvg.querySelector("#roundel-metadata");
    var projectNode;

    if (exportTitle) {
      exportTitle.textContent = metadata.title;
    }

    if (!descriptionNode) {
      descriptionNode = document.createElementNS(svgNamespace, "desc");
      descriptionNode.setAttribute("id", "roundel-description");
      exportSvg.insertBefore(descriptionNode, exportTitle ? exportTitle.nextSibling : exportSvg.firstChild);
    }
    descriptionNode.textContent = metadata.description;

    if (metadataNode) {
      metadataNode.parentNode.removeChild(metadataNode);
    }

    metadataNode = document.createElementNS(svgNamespace, "metadata");
    metadataNode.setAttribute("id", "roundel-metadata");
    metadataNode.setAttribute("data-schema", metadata.schema);
    projectNode = document.createElementNS(roundelMetadataNamespace, "roundel:project");
    projectNode.setAttribute("schema", metadata.schema);
    addSvgMetadataText(projectNode, "title", metadata.title);
    addSvgMetadataText(projectNode, "description", metadata.description);
    addSvgMetadataText(projectNode, "software", metadata.software);
    addSvgMetadataText(projectNode, "applicationAuthor", metadata.applicationAuthor);
    addSvgMetadataText(projectNode, "creationTime", metadata.creationTime);
    addSvgMetadataText(projectNode, "editUrl", metadata.editUrl);
    addSvgMetadataText(projectNode, "format", metadata.format);
    addSvgMetadataText(projectNode, "state", metadata.stateJson);
    metadataNode.appendChild(projectNode);
    exportSvg.insertBefore(metadataNode, descriptionNode.nextSibling);
  }

  function getSerializedSvg(metadata) {
    var exportSvg;

    metadata = metadata || getProjectMetadata("svg");
    updateRoundel({ suppressPersist: true });
    exportSvg = svg.cloneNode(true);
    exportSvg.setAttribute("viewBox", [sceneFrame.x, sceneFrame.y, sceneFrame.width, sceneFrame.height].join(" "));
    exportSvg.setAttribute("width", String(sceneFrame.width));
    exportSvg.setAttribute("height", String(sceneFrame.height));
    decorateExportSvg(exportSvg, metadata);

    return new XMLSerializer().serializeToString(exportSvg);
  }

  function encodeUtf8(value) {
    var encoded;
    var bytes;
    var index;

    if (window.TextEncoder) {
      return new TextEncoder().encode(value);
    }

    encoded = unescape(encodeURIComponent(value));
    bytes = new Uint8Array(encoded.length);
    for (index = 0; index < encoded.length; index += 1) {
      bytes[index] = encoded.charCodeAt(index);
    }
    return bytes;
  }

  function decodeUtf8(bytes) {
    var value = "";
    var index;

    if (window.TextDecoder) {
      return new TextDecoder("utf-8").decode(bytes);
    }

    for (index = 0; index < bytes.length; index += 1) {
      value += String.fromCharCode(bytes[index]);
    }
    return decodeURIComponent(escape(value));
  }

  function concatenateBytes(parts) {
    var length = parts.reduce(function (total, part) {
      return total + part.length;
    }, 0);
    var bytes = new Uint8Array(length);
    var offset = 0;

    parts.forEach(function (part) {
      bytes.set(part, offset);
      offset += part.length;
    });
    return bytes;
  }

  var pngCrcTable = null;

  function getPngCrcTable() {
    var table;
    var value;
    var index;
    var bit;

    if (pngCrcTable) {
      return pngCrcTable;
    }

    table = new Uint32Array(256);
    for (index = 0; index < 256; index += 1) {
      value = index;
      for (bit = 0; bit < 8; bit += 1) {
        value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
      }
      table[index] = value >>> 0;
    }
    pngCrcTable = table;
    return pngCrcTable;
  }

  function getPngCrc(bytes) {
    var table = getPngCrcTable();
    var crc = 0xffffffff;
    var index;

    for (index = 0; index < bytes.length; index += 1) {
      crc = table[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function createPngChunk(type, data) {
    var typeBytes = encodeUtf8(type);
    var chunk = new Uint8Array(12 + data.length);
    var view = new DataView(chunk.buffer);

    view.setUint32(0, data.length, false);
    chunk.set(typeBytes, 4);
    chunk.set(data, 8);
    view.setUint32(8 + data.length, getPngCrc(concatenateBytes([typeBytes, data])), false);
    return chunk;
  }

  function createPngInternationalTextChunk(keyword, value) {
    return createPngChunk("iTXt", concatenateBytes([
      encodeUtf8(keyword),
      new Uint8Array([0, 0, 0, 0, 0]),
      encodeUtf8(value)
    ]));
  }

  function escapeXml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function getXmpPacket(metadata) {
    return [
      "<x:xmpmeta xmlns:x=\"adobe:ns:meta/\">",
      "<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">",
      "<rdf:Description rdf:about=\"\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:roundel=\"" + roundelMetadataNamespace + "\" xmp:CreatorTool=\"" + escapeXml(metadata.software) + "\" roundel:ApplicationAuthor=\"" + escapeXml(metadata.applicationAuthor) + "\" roundel:EditURL=\"" + escapeXml(metadata.editUrl) + "\" roundel:Format=\"" + escapeXml(metadata.format) + "\">",
      "<dc:title><rdf:Alt><rdf:li xml:lang=\"x-default\">" + escapeXml(metadata.title) + "</rdf:li></rdf:Alt></dc:title>",
      "<dc:description><rdf:Alt><rdf:li xml:lang=\"x-default\">" + escapeXml(metadata.description) + "</rdf:li></rdf:Alt></dc:description>",
      "<roundel:State>" + escapeXml(metadata.stateJson) + "</roundel:State>",
      "</rdf:Description></rdf:RDF></x:xmpmeta>"
    ].join("");
  }

  function getPngMetadataChunks(metadata) {
    return [
      ["Title", metadata.title],
      ["Description", metadata.description],
      ["Software", metadata.software],
      ["Creation Time", metadata.creationTime],
      ["Comment", "Edit or remix this sign at " + metadata.editUrl],
      ["Roundel:URL", metadata.editUrl],
      ["Roundel:State", metadata.stateJson],
      ["Roundel:Format", metadata.format],
      ["XML:com.adobe.xmp", getXmpPacket(metadata)]
    ].map(function (entry) {
      return createPngInternationalTextChunk(entry[0], entry[1]);
    });
  }

  function readBlobAsArrayBuffer(blob) {
    if (blob.arrayBuffer) {
      return blob.arrayBuffer();
    }

    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  }

  function readBlobAsText(blob) {
    if (blob.text) {
      return blob.text();
    }

    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  function addPngMetadata(blob, metadata) {
    return readBlobAsArrayBuffer(blob).then(function (buffer) {
      var bytes = new Uint8Array(buffer);
      var signature = [137, 80, 78, 71, 13, 10, 26, 10];
      var view = new DataView(buffer);
      var offset = 8;
      var insertOffset = -1;
      var index;
      var length;
      var type;
      var chunks;

      for (index = 0; index < signature.length; index += 1) {
        if (bytes[index] !== signature[index]) {
          throw new Error("Canvas returned an invalid PNG.");
        }
      }

      while (offset + 12 <= bytes.length) {
        length = view.getUint32(offset, false);
        type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);
        if (type === "IEND") {
          insertOffset = offset;
          break;
        }
        offset += length + 12;
      }

      if (insertOffset < 0) {
        throw new Error("PNG is missing its end marker.");
      }

      chunks = getPngMetadataChunks(metadata);
      return new Blob([
        bytes.slice(0, insertOffset),
        concatenateBytes(chunks),
        bytes.slice(insertOffset)
      ], { type: "image/png" });
    });
  }

  function drawShareCardFooter(context, width, top, height) {
    var iconX = 82;
    var iconY = top + height / 2;
    var radius = 42;

    context.fillStyle = "#11151c";
    context.fillRect(0, top, width, height);
    context.fillStyle = "#dc241f";
    context.fillRect(0, top, width, 8);

    context.strokeStyle = "#dc241f";
    context.lineWidth = 19;
    context.beginPath();
    context.arc(iconX, iconY, radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#003688";
    context.fillRect(iconX - 57, iconY - 16, 114, 32);

    context.fillStyle = "#f7f5ef";
    context.font = "700 38px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    context.fillText("Made with Roundel", 154, top + 83);
    context.fillStyle = "#b7bec9";
    context.font = "500 26px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    context.fillText("Remix yours → abekert.github.io/roundel", 154, top + 132);
  }

  function renderPngCanvas(svgSource, format) {
    return new Promise(function (resolve, reject) {
      var svgBlob = new Blob([svgSource], { type: "image/svg+xml;charset=utf-8" });
      var url = URL.createObjectURL(svgBlob);
      var image = new Image();

      image.onload = function () {
        var scale = 2;
        var imageWidth = Math.round(sceneFrame.width * scale);
        var imageHeight = Math.round(sceneFrame.height * scale);
        var footerHeight = format === "card" ? 190 : 0;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        try {
          canvas.width = imageWidth;
          canvas.height = imageHeight + footerHeight;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, imageWidth, imageHeight);
          if (footerHeight) {
            drawShareCardFooter(context, imageWidth, imageHeight, footerHeight);
          }
          resolve(canvas);
        } catch (error) {
          reject(error);
        } finally {
          URL.revokeObjectURL(url);
        }
      };

      image.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("Could not render the SVG artwork."));
      };
      image.src = url;
    });
  }

  function canvasToPngBlob(canvas) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not create a PNG."));
        }
      }, "image/png");
    });
  }

  function createPngAsset(format) {
    var metadata = getProjectMetadata(format);
    var svgSource = getSerializedSvg(metadata);

    return renderPngCanvas(svgSource, format)
      .then(canvasToPngBlob)
      .then(function (blob) {
        return addPngMetadata(blob, metadata);
      });
  }

  function downloadBlob(blob, filename) {
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);

    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 0);
  }

  function setExportBusy(isBusy) {
    exportButton.disabled = isBusy;

    if (exportSvgButton) {
      exportSvgButton.disabled = isBusy;
    }
    if (nativeShareButton) {
      nativeShareButton.disabled = isBusy;
    }
    if (copyImageButton) {
      copyImageButton.disabled = isBusy;
    }
  }

  function prepareShareAsset() {
    var key = stateSignature(getCurrentState()) + "|" + shareFormat;
    var promise;

    if (shareAssetCache.key === key && shareAssetCache.promise) {
      return shareAssetCache.promise;
    }

    setExportBusy(true);
    exportStatus.textContent = "Preparing image…";
    promise = createPngAsset(shareFormat);
    shareAssetCache = { key: key, promise: promise, blob: null };
    promise.then(function (blob) {
      if (shareAssetCache.key === key) {
        shareAssetCache.blob = blob;
        setExportBusy(false);
        exportStatus.textContent = "Image ready. The editable project is embedded.";
        emitRoundelEvent("share_asset_ready", { format: shareFormat });
      }
    }, function () {
      if (shareAssetCache.key === key) {
        setExportBusy(false);
        exportStatus.textContent = "Image preparation failed.";
        emitRoundelEvent("share_failed", { mechanism: "render" });
      }
    });
    return promise;
  }

  function canCopyImage() {
    return Boolean(navigator.clipboard && navigator.clipboard.write && window.ClipboardItem);
  }

  function canShareFiles() {
    var testFile;

    if (!navigator.share || !navigator.canShare || !window.File) {
      return false;
    }

    try {
      testFile = new File([new Uint8Array(0)], "roundel.png", { type: "image/png" });
      return navigator.canShare({ files: [testFile] });
    } catch (error) {
      return false;
    }
  }

  function updateShareCapabilities() {
    var imageClipboard = canCopyImage();

    if (!nativeShareButton || !copyImageButton) {
      return;
    }

    if (navigator.share && canShareFiles()) {
      nativeShareButton.textContent = "Share image";
    } else if (navigator.share) {
      nativeShareButton.textContent = "Share edit link";
    } else if (imageClipboard) {
      nativeShareButton.textContent = "Copy image";
    } else {
      nativeShareButton.textContent = "Download image";
    }

    copyImageButton.hidden = !imageClipboard || !navigator.share;
  }

  function copyPngToClipboard() {
    var blob = shareAssetCache.blob;
    var item;

    if (!blob || !canCopyImage()) {
      exportStatus.textContent = "Image clipboard is not available here.";
      return Promise.reject(new Error("Image clipboard unavailable."));
    }

    item = new ClipboardItem({ "image/png": blob });
    return navigator.clipboard.write([item]).then(function () {
      exportStatus.textContent = "Image copied. Paste it into a message or post.";
      emitRoundelEvent("share_image_copied", { format: shareFormat });
    }).catch(function (error) {
      exportStatus.textContent = "Couldn’t copy the image. Try downloading it.";
      emitRoundelEvent("share_failed", { mechanism: "image-clipboard" });
      throw error;
    });
  }

  function runPrimaryShare() {
    var blob = shareAssetCache.blob;
    var editUrl = getShareUrl();
    var title = "My " + getExportText() + " roundel";
    var shareText = "I made this with Roundel Sign Maker, an application by Alexander Bekert. Remix it: " + editUrl;
    var file;
    var data;

    if (!blob) {
      exportStatus.textContent = "The image is still preparing…";
      prepareShareAsset().catch(function () {});
      return;
    }

    if (navigator.share && canShareFiles()) {
      file = new File([blob], getExportFilename("png"), { type: "image/png", lastModified: Date.now() });
      data = { title: title, text: shareText, files: [file] };
    } else if (navigator.share) {
      data = { title: title, text: "Made with Roundel Sign Maker by Alexander Bekert.", url: editUrl };
    } else if (canCopyImage()) {
      copyPngToClipboard().catch(function () {});
      return;
    } else {
      downloadBlob(blob, getExportFilename("png"));
      exportStatus.textContent = "PNG downloaded.";
      emitRoundelEvent("share_downloaded", { format: shareFormat });
      return;
    }

    navigator.share(data).then(function () {
      exportStatus.textContent = "Shared. Your edit link travels with it.";
      emitRoundelEvent("share_sheet_completed", {
        format: shareFormat,
        mechanism: data.files ? "file" : "link"
      });
    }).catch(function (error) {
      if (error && error.name === "AbortError") {
        exportStatus.textContent = "Share cancelled.";
        emitRoundelEvent("share_sheet_cancelled", { format: shareFormat });
        return;
      }
      exportStatus.textContent = "Couldn’t open sharing. Try Copy image or Download PNG.";
      emitRoundelEvent("share_failed", { mechanism: "native-share" });
    });
  }

  function selectShareFormat(format) {
    shareFormat = format === "card" ? "card" : "clean";
    shareFormatButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-share-format") === shareFormat;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
    if (shareFormatHint) {
      shareFormatHint.textContent = shareFormat === "card" ?
        "Adds a visible Made with Roundel footer that survives screenshots and reposts." :
        "A clean PNG with an embedded editable project.";
    }
    emitRoundelEvent("share_format_selected", { format: shareFormat });
    prepareShareAsset().catch(function () {});
  }

  function exportSvg() {
    var metadata = getProjectMetadata("svg");
    var svgBlob = new Blob([getSerializedSvg(metadata)], { type: "image/svg+xml;charset=utf-8" });

    downloadBlob(svgBlob, getExportFilename("svg"));
    exportStatus.textContent = "Editable SVG downloaded.";
    emitRoundelEvent("share_downloaded", { format: "svg" });
  }

  function exportPng() {
    prepareShareAsset().then(function (blob) {
      downloadBlob(blob, getExportFilename("png"));
      exportStatus.textContent = shareFormat === "card" ? "Share card downloaded." : "PNG downloaded.";
      emitRoundelEvent("share_downloaded", { format: shareFormat });
    }).catch(function () {
      exportStatus.textContent = "Export failed.";
    });
  }

  function getPngTextMetadata(buffer) {
    var bytes = new Uint8Array(buffer);
    var signature = [137, 80, 78, 71, 13, 10, 26, 10];
    var view = new DataView(buffer);
    var values = {};
    var offset = 8;
    var length;
    var type;
    var dataStart;
    var dataEnd;
    var cursor;
    var keywordEnd;
    var languageEnd;
    var translatedKeywordEnd;
    var compressionFlag;
    var keyword;
    var index;

    if (bytes.length < signature.length) {
      throw new Error("This is not a PNG file.");
    }
    for (index = 0; index < signature.length; index += 1) {
      if (bytes[index] !== signature[index]) {
        throw new Error("This is not a PNG file.");
      }
    }

    while (offset + 12 <= bytes.length) {
      length = view.getUint32(offset, false);
      dataStart = offset + 8;
      dataEnd = dataStart + length;
      if (dataEnd + 4 > bytes.length) {
        throw new Error("The PNG file is incomplete.");
      }
      type = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);

      if (type === "iTXt") {
        keywordEnd = dataStart;
        while (keywordEnd < dataEnd && bytes[keywordEnd] !== 0) {
          keywordEnd += 1;
        }
        cursor = keywordEnd + 1;
        if (cursor + 4 <= dataEnd) {
          keyword = decodeUtf8(bytes.slice(dataStart, keywordEnd));
          compressionFlag = bytes[cursor];
          cursor += 2;
          languageEnd = cursor;
          while (languageEnd < dataEnd && bytes[languageEnd] !== 0) {
            languageEnd += 1;
          }
          cursor = languageEnd + 1;
          translatedKeywordEnd = cursor;
          while (translatedKeywordEnd < dataEnd && bytes[translatedKeywordEnd] !== 0) {
            translatedKeywordEnd += 1;
          }
          cursor = translatedKeywordEnd + 1;
          if (compressionFlag === 0 && cursor <= dataEnd) {
            values[keyword] = decodeUtf8(bytes.slice(cursor, dataEnd));
          }
        }
      }

      offset = dataEnd + 4;
      if (type === "IEND") {
        break;
      }
    }
    return values;
  }

  function getImportedSvgState(source) {
    var documentNode = new DOMParser().parseFromString(source, "image/svg+xml");
    var parserErrors = documentNode.getElementsByTagName("parsererror");
    var stateNodes;

    if (parserErrors.length) {
      throw new Error("The SVG file is not valid XML.");
    }

    stateNodes = documentNode.getElementsByTagNameNS(roundelMetadataNamespace, "state");
    if (!stateNodes.length) {
      throw new Error("No editable Roundel project was found in this SVG.");
    }
    return JSON.parse(stateNodes[0].textContent);
  }

  function validateImportedState(state) {
    if (!state || typeof state !== "object" || Array.isArray(state) || typeof state.text !== "string") {
      throw new Error("The embedded Roundel project is not valid.");
    }
    return state;
  }

  function getImportedFileState(file) {
    var isSvg = file.type === "image/svg+xml" || /\.svg$/i.test(file.name);

    if (isSvg) {
      return readBlobAsText(file).then(function (source) {
        return validateImportedState(getImportedSvgState(source));
      });
    }

    return readBlobAsArrayBuffer(file).then(function (buffer) {
      var metadata = getPngTextMetadata(buffer);

      if (!metadata["Roundel:State"]) {
        throw new Error("No editable Roundel project was found. The app that reposted this PNG may have removed its metadata.");
      }
      return validateImportedState(JSON.parse(metadata["Roundel:State"]));
    });
  }

  function importRoundelFile(file) {
    if (!file) {
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      exportStatus.textContent = "Choose a PNG or SVG smaller than 25 MB.";
      emitRoundelEvent("remix_import_failed", { format: "oversize" });
      return;
    }

    exportStatus.textContent = "Reading embedded project…";
    getImportedFileState(file).then(function (state) {
      recordUndoState();
      applyState(state, { animate: true });
      exportStatus.textContent = "Project restored. You can edit and share your remix.";
      emitRoundelEvent("remix_imported", {
        format: file.type === "image/svg+xml" || /\.svg$/i.test(file.name) ? "svg" : "png"
      });
      prepareShareAsset().catch(function () {});
    }).catch(function (error) {
      exportStatus.textContent = error && error.message ? error.message : "Couldn’t restore this project.";
      emitRoundelEvent("remix_import_failed", {
        format: file.type === "image/svg+xml" || /\.svg$/i.test(file.name) ? "svg" : "png"
      });
    });
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
    closeMenus();
    event.preventDefault();

    activeDrag = {
      button: event.currentTarget,
      type: dragType,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: getBarWidth(),
      startBarHeight: getBarHeightAdjustment(),
      scale: getInteractiveScale(),
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

    updateGripProximity(event);
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }

  presetButtons.forEach(function (button) {
    button.addEventListener("pointerenter", function (event) {
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      previewStyle(button.getAttribute("data-preset"));
    });
    button.addEventListener("focus", function () {
      if (styleStripGesture) {
        return;
      }

      previewStyle(button.getAttribute("data-preset"));
    });
    button.addEventListener("click", function (event) {
      if (event.detail !== 0 && now() < suppressStyleClickUntil) {
        event.preventDefault();
        event.stopPropagation();
        cancelStylePreview();
        return;
      }

      commitStylePreview(button.getAttribute("data-preset"));
    });
  });

  if (styleStrip) {
    styleStrip.addEventListener("pointerdown", beginStyleStripGesture, { passive: true });
    styleStrip.addEventListener("pointermove", handleStylePreviewMove);
    styleStrip.addEventListener("pointermove", trackStyleStripGesture, { passive: true });
    styleStrip.addEventListener("pointerup", endStyleStripGesture, { passive: true });
    styleStrip.addEventListener("pointercancel", endStyleStripGesture, { passive: true });
    styleStrip.addEventListener("pointerleave", cancelStylePreview);
    styleStrip.addEventListener("scroll", syncStyleStripHint, { passive: true });
  }

  fontButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      recordUndoState();
      fontChoice.value = button.getAttribute("data-font");
      markCustom();
      updateRoundel({ animate: true });
      openMenu("font");
    });
  });

  backgroundButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      recordUndoState();
      backgroundChoice.value = normalizeBackgroundChoice(button.getAttribute("data-background"), false);
      markCustom();
      updateRoundel({ animate: true });
    });
  });

  menuButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var menuName = button.getAttribute("data-menu");

      if (button.getAttribute("data-skip-click") === "true") {
        button.removeAttribute("data-skip-click");
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.stopPropagation();

      if (activeMenuName === menuName) {
        closeMenus();

        if (
          isDesktopMenuMode() &&
          button.classList.contains("hud-panel-trigger") &&
          event.detail > 0 &&
          button.matches(":hover")
        ) {
          suppressMenuHoverUntilLeave(button);
        }

        return;
      }

      clearMenuHoverSuppression(button);
      openMenu(menuName, button);
    });
  });

  hudPanelTriggers.forEach(function (button) {
    button.addEventListener("pointerenter", function () {
      if (!isDesktopMenuMode() || isMenuHoverSuppressed(button)) {
        return;
      }

      openMenu(button.getAttribute("data-menu"), button);
    });

    button.addEventListener("pointerleave", function () {
      clearMenuHoverSuppression(button);
    });

    button.addEventListener("focus", function () {
      if (!button.matches(":focus-visible")) {
        return;
      }

      openMenu(button.getAttribute("data-menu"), button);
    });
  });

  menuPanels.forEach(function (panel) {
    panel.addEventListener("pointerenter", clearDesktopMenuClose);
    panel.addEventListener("pointerleave", handleMenuPanelPointerLeave);

    panel.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  menuCloseButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeMenus();
    });
  });

  document.addEventListener("click", function (event) {
    if (!roundelStage || !roundelStage.contains(event.target)) {
      closeMenus();
    }

    if (shareMenu && shareButton && !shareMenu.contains(event.target) && !shareButton.contains(event.target)) {
      closeShareMenu();
    }
  });

  input.addEventListener("focus", function () {
    enterMobileTextEditing();
    scheduleHeritageInputCaretSync();
  });
  input.addEventListener("blur", function () {
    exitMobileTextEditing();
    hideHeritageInputCaret();
  });
  input.addEventListener("beforeinput", recordUndoState);
  input.addEventListener("click", function (event) {
    event.stopPropagation();
    enterMobileTextEditing();
    setHeritageCaretFromPoint(event.clientX, event.clientY);
    scheduleHeritageInputCaretSync();
  });
  input.addEventListener("keyup", scheduleHeritageInputCaretSync);
  input.addEventListener("select", scheduleHeritageInputCaretSync);
  input.addEventListener("input", function () {
    markCustom();
    updateRoundel();
  });
  document.addEventListener("selectionchange", function () {
    if (document.activeElement === input) {
      scheduleHeritageInputCaretSync();
    }
  });

  function scheduleRangeUpdate() {
    if (rangeUpdateFrame) {
      return;
    }

    rangeUpdateFrame = requestFrame(function () {
      rangeUpdateFrame = 0;
      updateRoundel();
    });
  }

  function finishRangeAdjustment(event) {
    var eventControl;
    var eventPointerId;

    if (!activeRangeAdjustment) {
      return;
    }

    eventControl = event && event.currentTarget;
    eventPointerId = event && typeof event.pointerId === "number" ? event.pointerId : null;

    // When moving directly to another slider, its pointerdown runs before the
    // previous control's delayed blur. Ignore that stale blur (and any stale
    // pointer-capture event) so it cannot cancel the newly active slider.
    if (
      eventControl &&
      eventControl !== document &&
      eventControl !== activeRangeAdjustment.control
    ) {
      return;
    }

    if (
      eventPointerId !== null &&
      activeRangeAdjustment.pointerId !== null &&
      eventPointerId !== activeRangeAdjustment.pointerId
    ) {
      return;
    }

    activeRangeAdjustment.menu.classList.remove("is-range-adjusting");
    activeRangeAdjustment.field.classList.remove("is-range-adjusting");
    activeRangeAdjustment = null;
  }

  function startRangeAdjustment(event) {
    var control = event.currentTarget;
    var menu = control.closest(".floating-menu");
    var field = control.closest(".range-field");

    finishRangeAdjustment();

    if (!menu || !field) {
      return;
    }

    activeRangeAdjustment = {
      control: control,
      menu: menu,
      field: field,
      pointerId: typeof event.pointerId === "number" ? event.pointerId : null
    };
    menu.classList.add("is-range-adjusting");
    field.classList.add("is-range-adjusting");
  }

  barWidthInput.addEventListener("input", function () {
    markCustom();
    scheduleRangeUpdate();
  });
  barHeightInput.addEventListener("input", function () {
    markCustom();
    scheduleRangeUpdate();
  });
  fontChoice.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  textSizeInput.addEventListener("input", function () {
    markCustom();
    scheduleRangeUpdate();
  });
  textHeightInput.addEventListener("input", function () {
    markCustom();
    scheduleRangeUpdate();
  });
  textWidthInput.addEventListener("input", function () {
    markCustom();
    scheduleRangeUpdate();
  });
  rangeResetButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      var controlId = button.getAttribute("data-reset-control");
      var control = document.getElementById(controlId);
      var defaults = getRangeResetDefaults();

      event.preventDefault();
      event.stopPropagation();

      if (!control || !Object.prototype.hasOwnProperty.call(defaults, controlId)) {
        return;
      }

      recordUndoState();
      setRangeControl(control, defaults[controlId]);
      markCustom();
      updateRoundel({ animate: true });
    });
  });
  capitaliseToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  spaceDotsToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  largeSpaceDotsToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  letterRulesToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  outerLetterRulesToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  hexagonalLetterRulesToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
  });
  joinLetterRuleSpacesToggle.addEventListener("change", function () {
    markCustom();
    updateRoundel({ animate: true });
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
  exportButton.addEventListener("click", exportPng);
  exportSvgButton.addEventListener("click", exportSvg);
  undoButton.addEventListener("click", undoLastChange);
  copyLinkButton.addEventListener("click", copyShareLink);
  nativeShareButton.addEventListener("click", runPrimaryShare);
  copyImageButton.addEventListener("click", function () {
    copyPngToClipboard().catch(function () {});
  });
  importButton.addEventListener("click", function () {
    importFileInput.click();
  });
  importFileInput.addEventListener("change", function () {
    importRoundelFile(importFileInput.files && importFileInput.files[0]);
    importFileInput.value = "";
  });
  shareFormatButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectShareFormat(button.getAttribute("data-share-format"));
    });
  });
  if (shareButton) {
    shareButton.addEventListener("click", toggleShareMenu);
  }

  rangeControls.forEach(function (control) {
    control.addEventListener("pointerdown", function (event) {
      recordUndoState();
      startRangeAdjustment(event);
    });
    control.addEventListener("lostpointercapture", finishRangeAdjustment);
    control.addEventListener("blur", finishRangeAdjustment);
    control.addEventListener("keydown", function (event) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].indexOf(event.key) !== -1) {
        recordUndoState();
      }
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll([
    "#capitalise-text",
    "#space-dots",
    "#large-space-dots",
    "#letter-rules",
    "#outer-letter-rules",
    "#hexagonal-letter-rules",
    "#join-letter-rule-spaces",
    "#white-center",
    "#use-gradients",
    "#use-shadow",
    "#blue-outline",
    "#white-inset",
    "label[for='capitalise-text']",
    "label[for='space-dots']",
    "label[for='large-space-dots']",
    "label[for='letter-rules']",
    "label[for='outer-letter-rules']",
    "label[for='hexagonal-letter-rules']",
    "label[for='join-letter-rule-spaces']",
    "label[for='white-center']",
    "label[for='use-gradients']",
    "label[for='use-shadow']",
    "label[for='blue-outline']",
    "label[for='white-inset']",
    "[data-background]"
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

  document.addEventListener("pointermove", handleDocumentPointerMove);
  document.addEventListener("pointerdown", noteHudActivity, { passive: true });
  document.addEventListener("keydown", noteHudActivity);
  document.addEventListener("focusin", noteHudActivity);
  document.addEventListener("input", noteHudActivity);
  document.addEventListener("change", noteHudActivity);
  document.addEventListener("pointerup", function (event) {
    endBarDrag(event);
    finishRangeAdjustment(event);
  });
  document.addEventListener("pointercancel", function (event) {
    endBarDrag(event);
    finishRangeAdjustment(event);
  });
  document.addEventListener("wheel", noteHudActivity, { passive: true });
  document.addEventListener("touchmove", noteHudActivity, { passive: true });

  if (roundelStage) {
    roundelStage.addEventListener("pointerleave", clearGripProximity);
  }

  window.addEventListener("resize", function () {
    updateRoundel({ suppressPersist: true });
    positionActiveMenu();
    syncStyleStripHint();
  });
  window.addEventListener("scroll", function () {
    noteHudActivity();
    positionActiveMenu();
  }, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", function () {
      noteHudActivity();
      positionActiveMenu();
    });
    window.visualViewport.addEventListener("scroll", function () {
      noteHudActivity();
      positionActiveMenu();
    });
    window.visualViewport.addEventListener("resize", centerTextEditorInViewport);
    window.visualViewport.addEventListener("scroll", centerTextEditorInViewport);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      updateRoundel({ suppressPersist: true });
    }).catch(function () {
      updateRoundel({ suppressPersist: true });
    });
  }

  var initialStateFromUrl = getStateFromUrl();
  var shouldPlayIntro = !window.location.search;

  updateShareCapabilities();
  applyPreset(activePresetKey, { suppressPersist: true });
  applyState(initialStateFromUrl || getStoredState(), { suppressPersist: true });
  persistState();
  updateUndoButton();
  showHudChrome();

  if (isSharedRemixSession) {
    emitRoundelEvent("remix_opened", { source: "shared-project" });
  }

  if (shouldPlayIntro) {
    playFirstRunIntro();
  } else {
    document.body.classList.remove("is-booting");
  }
}());
