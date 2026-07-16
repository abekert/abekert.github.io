const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("assets/js/analytics.js", "utf8");
const measurementId = "G-50YJXSVRJ4";

function runAnalytics(options = {}) {
  const listeners = {};
  const appendedScripts = [];
  const storage = new Map(Object.entries(options.storage || {}));
  const location = {
    hash: "#private-fragment",
    href: options.href || "http://localhost:8000/roundel/?text=PRIVATE&ref=share#private-fragment",
    hostname: options.hostname || "localhost",
    origin: options.origin || "http://localhost:8000",
    pathname: options.pathname || "/roundel/",
    search: "?text=PRIVATE&ref=share"
  };
  const document = {
    head: {
      appendChild(element) {
        appendedScripts.push(element);
      }
    },
    referrer: options.referrer || "http://localhost:8000/?source=PRIVATE",
    createElement(tagName) {
      return { tagName };
    }
  };
  const window = {
    URL,
    addEventListener(name, handler) {
      listeners[name] = handler;
    },
    dispatchEvent(event) {
      if (listeners[event.type]) {
        listeners[event.type](event);
      }
    },
    doNotTrack: options.doNotTrack,
    localStorage: {
      getItem(key) {
        if (options.storageThrows) {
          throw new Error("Storage unavailable");
        }
        return storage.has(key) ? storage.get(key) : null;
      }
    },
    location,
    navigator: {
      doNotTrack: options.doNotTrack,
      globalPrivacyControl: options.globalPrivacyControl === true
    }
  };
  const context = vm.createContext({
    Date,
    Object,
    URL,
    console,
    document,
    encodeURIComponent,
    window
  });

  vm.runInContext(source, context, { filename: "assets/js/analytics.js" });

  return { appendedScripts, listeners, storage, window };
}

function commandArguments(entry) {
  return Array.from(entry);
}

const normal = runAnalytics();
const commands = normal.window.dataLayer.map(commandArguments);
const consent = commands.find((entry) => entry[0] === "consent");
const config = commands.find((entry) => entry[0] === "config");

assert.deepEqual(consent.slice(0, 2), ["consent", "default"]);
assert.deepEqual({ ...consent[2] }, {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied"
});
assert.equal(config[1], measurementId);
assert.equal(config[2].page_location, "http://localhost:8000/roundel/");
assert.equal(config[2].page_referrer, "http://localhost:8000/");
assert.equal(config[2].allow_google_signals, false);
assert.equal(config[2].allow_ad_personalization_signals, false);
assert.equal(normal.appendedScripts.length, 0, "Local previews must not load Google");

normal.window.dispatchEvent({
  type: "roundel:analytics",
  detail: {
    name: "share_sheet_completed",
    format: "clean",
    mechanism: "file",
    text: "PRIVATE",
    url: "https://example.com/private"
  }
});
const roundelEvent = normal.window.dataLayer.map(commandArguments).at(-1);
assert.equal(roundelEvent[0], "event");
assert.equal(roundelEvent[1], "share_sheet_completed");
assert.deepEqual({ ...roundelEvent[2] }, { format: "clean", mechanism: "file" });

normal.window.dispatchEvent({
  type: "roundel:analytics",
  detail: { name: "unknown_event", text: "PRIVATE" }
});
assert.equal(normal.window.dataLayer.length, commands.length + 1, "Unknown events must be ignored");

const optedOut = runAnalytics({ storage: { abekert_analytics_disabled: "1" } });
assert.equal(optedOut.window["ga-disable-" + measurementId], true);
assert.equal(optedOut.window.dataLayer, undefined);

const privacySignal = runAnalytics({ globalPrivacyControl: true });
assert.equal(privacySignal.window["ga-disable-" + measurementId], true);
assert.equal(privacySignal.window.dataLayer, undefined);

const unavailableStorage = runAnalytics({ storageThrows: true });
assert.equal(unavailableStorage.window["ga-disable-" + measurementId], true);
assert.equal(unavailableStorage.window.dataLayer, undefined);

const production = runAnalytics({
  hostname: "abekert.github.io",
  origin: "https://abekert.github.io",
  href: "https://abekert.github.io/roundel/?text=PRIVATE#private-fragment",
  referrer: "https://search.example/results?q=PRIVATE"
});
assert.equal(production.appendedScripts.length, 1);
assert.equal(
  production.appendedScripts[0].src,
  "https://www.googletagmanager.com/gtag/js?id=G-50YJXSVRJ4"
);
assert.equal(source.includes("document.cookie"), false);

console.log("analytics tests passed");
