const ISLAMIC_KEY = "calendar_islamic_holidays";
const GERMAN_KEY = "calendar_german_holidays";
const TURKISH_KEY = "calendar_turkish_holidays";
const ARABIC_KEY = "calendar_arabic_holidays";
const APP_VERSION = "1.0.4";

const islamicToggle = document.getElementById("toggleIslamic");
const germanToggle = document.getElementById("toggleGerman");
const turkishToggle = document.getElementById("toggleTurkish");
const arabicToggle = document.getElementById("toggleArabic");
const versionLabel = document.getElementById("versionLabel");

let includeIslamic = JSON.parse(localStorage.getItem(ISLAMIC_KEY)) || false;
let includeGerman = JSON.parse(localStorage.getItem(GERMAN_KEY)) ?? true;
let includeTurkish = JSON.parse(localStorage.getItem(TURKISH_KEY)) ?? true;
let includeArabic = JSON.parse(localStorage.getItem(ARABIC_KEY)) ?? false;

loadVersion();

if (window.i18n && window.i18n.t) {
  document.title = window.i18n.t("app_settings");
}

document.addEventListener("languageChanged", () => {
  if (window.i18n && window.i18n.t) {
    document.title = window.i18n.t("app_settings");
  }
});

if (islamicToggle) {
  islamicToggle.checked = includeIslamic;
  islamicToggle.addEventListener("change", () => {
    includeIslamic = islamicToggle.checked;
    localStorage.setItem(ISLAMIC_KEY, JSON.stringify(includeIslamic));
  });
}

if (germanToggle) {
  germanToggle.checked = includeGerman;
  germanToggle.addEventListener("change", () => {
    includeGerman = germanToggle.checked;
    localStorage.setItem(GERMAN_KEY, JSON.stringify(includeGerman));
  });
}

if (turkishToggle) {
  turkishToggle.checked = includeTurkish;
  turkishToggle.addEventListener("change", () => {
    includeTurkish = turkishToggle.checked;
    localStorage.setItem(TURKISH_KEY, JSON.stringify(includeTurkish));
  });
}

if (arabicToggle) {
  arabicToggle.checked = includeArabic;
  arabicToggle.addEventListener("change", () => {
    includeArabic = arabicToggle.checked;
    localStorage.setItem(ARABIC_KEY, JSON.stringify(includeArabic));
  });
}

function loadVersion() {
  if (!versionLabel) return;
  const fallback = `v${APP_VERSION}`;
  versionLabel.textContent = fallback;
  fetch(`version.json?ts=${Date.now()}`, { cache: "no-store" })
    .then(r => (r.ok ? r.json() : null))
    .then(data => {
      const v = data?.version ? `v${data.version}` : fallback;
      versionLabel.textContent = v;
    })
    .catch(() => {
      versionLabel.textContent = fallback;
    });
}
