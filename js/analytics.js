const MEASUREMENT_ID = "G-8SV2XYRRH7";
const COOKIE_PATH = "/Portfolio_Maximiliano_Sa/";
const CONSENT_KEY = "portfolio-analytics-consent-v1";
const SESSION_REVOKED_KEY = "portfolio-analytics-session-revoked-v1";
const DENIED = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
const GRANTED = { ...DENIED, analytics_storage: "granted" };

function readChoice() {
  try {
    if (sessionStorage.getItem(SESSION_REVOKED_KEY) === "true") return "rejected";
  } catch {}
  try {
    const record = JSON.parse(localStorage.getItem(CONSENT_KEY));
    const validTimestamp = typeof record?.updatedAt === "string" && Number.isFinite(Date.parse(record.updatedAt));
    return record?.version === 1 && validTimestamp && (record.choice === "accepted" || record.choice === "rejected")
      ? record.choice : null;
  } catch { return null; }
}

function saveChoice(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ version: 1, choice, updatedAt: new Date().toISOString() }));
    return true;
  } catch { return false; }
}

let loaded = false;
let scriptLoaded = false;
let configured = false;
let pageViewPending = false;
let pageViewSent = false;
let accepted = false;
let dataLayer;

function flushPendingPageView() {
  if (!accepted || !scriptLoaded || !configured || !pageViewPending || pageViewSent) return;
  pageViewPending = false;
  pageViewSent = true;
  window.gtag("event", "page_view");
}

function queuePageView() {
  if (pageViewSent) return;
  pageViewPending = true;
  if (!scriptLoaded) return;
  if (document.readyState === "complete") flushPendingPageView();
  else window.addEventListener("load", flushPendingPageView, { once: true });
}

function configureAnalytics() {
  if (!accepted || !scriptLoaded) return;
  window[`ga-disable-${MEASUREMENT_ID}`] = false;
  window.gtag("consent", "update", GRANTED);
  if (!configured) {
    window.gtag("config", MEASUREMENT_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: false,
      cookie_domain: "none",
      cookie_path: COOKIE_PATH
    });
    configured = true;
  }
  queuePageView();
}

function loadAnalytics() {
  if (!accepted) return;
  if (loaded) {
    try {
      if (scriptLoaded) configureAnalytics();
      else pageViewPending = true;
    } catch {}
    return;
  }

  try {
    window[`ga-disable-${MEASUREMENT_ID}`] = false;
    dataLayer = window.dataLayer = window.dataLayer || [];
    // Keep a permission gate around app-originated calls, including after GA's
    // script has loaded. Consent updates must still pass through on withdrawal.
    window.gtag = function gtag() {
      const command = arguments[0];
      if (command !== "consent" && !accepted) return;
      dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("consent", "default", DENIED);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.onload = () => {
      scriptLoaded = true;
      if (accepted) configureAnalytics();
    };
    script.onerror = () => { /* Analytics is optional; the portfolio remains usable. */ };
    document.head.append(script);
    loaded = true;
  } catch { /* A blocked Google service must not affect the site. */ }
}

function removeAnalyticsCookies() {
  try {
    const names = document.cookie.split(";").map(cookie => cookie.trim().split("=")[0]).filter(name => /^_ga(?:_|$)/.test(name));
    const paths = new Set([COOKIE_PATH, "/", location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1) || "/"]);
    // Clear both host-only cookies created by cookie_domain: "none" and
    // domain cookies created by the previous automatic-domain setting.
    const domains = ["", `; domain=${location.hostname}`];
    names.forEach(name => paths.forEach(path => domains.forEach(domain => {
      document.cookie = `${name}=; Max-Age=0; path=${path}; SameSite=Lax${domain}`;
    })));
  } catch {}
}

function applyChoice(choice) {
  const notice = document.querySelector("#consent-storage-warning");
  if (choice === "accepted") {
    // Require a durable explicit choice before loading Google. Storage failure
    // is fail-closed: the page stays usable, but analytics remains disabled.
    if (!saveChoice("accepted")) {
      accepted = false;
      if (notice) { notice.textContent = "Your choice could not be saved. Analytics remains off; check your browser's storage settings and try again."; notice.hidden = false; }
      return false;
    }
    try { sessionStorage.removeItem(SESSION_REVOKED_KEY); } catch {}
    accepted = true;
    if (notice) notice.hidden = true;
    loadAnalytics();
    return true;
  }

  // Flip the in-memory gate before persistence or any subsequent navigation.
  accepted = false;
  if (loaded) {
    try {
      window[`ga-disable-${MEASUREMENT_ID}`] = true;
      window.gtag("consent", "update", DENIED);
      pageViewPending = false;
      if (!configured && Array.isArray(dataLayer)) {
        for (let index = dataLayer.length - 1; index >= 0; index -= 1) {
          const item = dataLayer[index];
          if (item?.[0] === "event" && item?.[1] === "page_view") dataLayer.splice(index, 1);
        }
      }
    } catch {}
  }
  try { sessionStorage.setItem(SESSION_REVOKED_KEY, "true"); } catch {}
  if (!saveChoice("rejected")) {
    try { localStorage.removeItem(CONSENT_KEY); } catch {}
    if (notice) { notice.textContent = "Your rejection could not be saved. Analytics remains off for this tab; the banner may appear again later."; notice.hidden = false; }
  } else if (notice) notice.hidden = true;

  if (loaded) removeAnalyticsCookies();
  return true;
}

const banner = document.querySelector("#consent-banner");
const showBanner = () => { banner.hidden = false; };
const hideBanner = () => { banner.hidden = true; };
const storedChoice = readChoice();
if (storedChoice) {
  accepted = storedChoice === "accepted";
  if (accepted) loadAnalytics();
} else showBanner();

document.querySelector("#accept-analytics").addEventListener("click", () => {
  if (applyChoice("accepted")) hideBanner();
});
document.querySelector("#reject-analytics").addEventListener("click", () => {
  applyChoice("rejected");
  hideBanner();
});
document.querySelector("#privacy-settings").addEventListener("click", event => {
  event.preventDefault();
  showBanner();
  document.querySelector("#accept-analytics").focus();
});
