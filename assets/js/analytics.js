(function (window, document) {
  "use strict";

  var measurementId = "G-50YJXSVRJ4";
  var optOutKey = "abekert_analytics_disabled";
  var isProduction = window.location.hostname === "abekert.github.io";
  var isLocalPreview = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  var allowedRoundelEvents = {
    remix_created: ["source"],
    remix_import_failed: ["format"],
    remix_imported: ["format"],
    remix_opened: ["source"],
    share_asset_ready: ["format"],
    share_downloaded: ["format"],
    share_failed: ["mechanism"],
    share_format_selected: ["format"],
    share_image_copied: ["format"],
    share_link_copied: ["mechanism"],
    share_opened: ["format"],
    share_sheet_cancelled: ["format"],
    share_sheet_completed: ["format", "mechanism"]
  };
  var allowedParameterValues = {
    format: ["card", "clean", "oversize", "png", "svg"],
    mechanism: ["clipboard", "file", "image-clipboard", "link", "link-clipboard", "native-share", "render"],
    source: ["shared-project"]
  };

  function hasBrowserPrivacySignal() {
    return window.navigator.globalPrivacyControl === true ||
      window.navigator.doNotTrack === "1" ||
      window.doNotTrack === "1";
  }

  function hasOptedOut() {
    try {
      return window.localStorage.getItem(optOutKey) === "1";
    } catch (error) {
      return true;
    }
  }

  function sanitizePageLocation(value) {
    var url;

    try {
      url = new URL(value, window.location.origin);
      return url.origin + url.pathname;
    } catch (error) {
      return window.location.origin + window.location.pathname;
    }
  }

  function sanitizeReferrer(value) {
    var url;

    if (!value) {
      return "";
    }

    try {
      url = new URL(value);
      return url.origin + (url.origin === window.location.origin ? url.pathname : "/");
    } catch (error) {
      return "";
    }
  }

  function getSafeRoundelParameters(eventName, detail) {
    var parameterNames = allowedRoundelEvents[eventName] || [];
    var parameters = {};

    parameterNames.forEach(function (parameterName) {
      var value = detail && detail[parameterName];
      var allowedValues = allowedParameterValues[parameterName] || [];

      if (allowedValues.indexOf(value) !== -1) {
        parameters[parameterName] = value;
      }
    });

    return parameters;
  }

  window["ga-disable-" + measurementId] = hasOptedOut() || hasBrowserPrivacySignal();

  if (window["ga-disable-" + measurementId] || (!isProduction && !isLocalPreview)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied"
  });
  window.gtag("set", "ads_data_redaction", true);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    page_location: sanitizePageLocation(window.location.href),
    page_referrer: sanitizeReferrer(document.referrer)
  });

  window.addEventListener("roundel:analytics", function (event) {
    var detail = event.detail || {};
    var eventName = detail.name;

    if (!Object.prototype.hasOwnProperty.call(allowedRoundelEvents, eventName)) {
      return;
    }

    window.gtag("event", eventName, getSafeRoundelParameters(eventName, detail));
  });

  if (isProduction) {
    var script = document.createElement("script");

    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }
}(window, document));
