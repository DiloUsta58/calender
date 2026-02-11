const ISLAMIC_KEY = "calendar_islamic_holidays";
const GERMAN_KEY = "calendar_german_holidays";
const TURKISH_KEY = "calendar_turkish_holidays";
const ARABIC_KEY = "calendar_arabic_holidays";
const CALENDAR_FONT_SIZE_KEY = "calendar_font_size";
const POPUP_FONT_SIZE_KEY = "calendar_popup_font_size";
const WEEK_START_KEY = "calendar_week_start";
const SHOW_WEEK_NUMBERS_KEY = "calendar_show_week_numbers";
const APP_VERSION = "1.0.4";

const islamicToggle = document.getElementById("toggleIslamic");
const germanToggle = document.getElementById("toggleGerman");
const turkishToggle = document.getElementById("toggleTurkish");
const arabicToggle = document.getElementById("toggleArabic");
const calendarFontSizeSelect = document.getElementById("calendarFontSizeSelect");
const popupFontSizeSelect = document.getElementById("popupFontSizeSelect");
const weekStartSelect = document.getElementById("weekStartSelect");
const weekNumbersToggle = document.getElementById("toggleWeekNumbers");
const versionLabel = document.getElementById("versionLabel");

let includeIslamic = JSON.parse(localStorage.getItem(ISLAMIC_KEY)) || false;
let includeGerman = JSON.parse(localStorage.getItem(GERMAN_KEY)) ?? true;
let includeTurkish = JSON.parse(localStorage.getItem(TURKISH_KEY)) ?? true;
let includeArabic = JSON.parse(localStorage.getItem(ARABIC_KEY)) ?? false;
let calendarFontSize = Number(localStorage.getItem(CALENDAR_FONT_SIZE_KEY) || 12);
let popupFontSize = Number(localStorage.getItem(POPUP_FONT_SIZE_KEY) || 17);
let weekStart = Number(localStorage.getItem(WEEK_START_KEY) || 1);
let showWeekNumbers = JSON.parse(localStorage.getItem(SHOW_WEEK_NUMBERS_KEY));
if (showWeekNumbers === null) showWeekNumbers = true;

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

if (calendarFontSizeSelect) {
  if (!Number.isFinite(calendarFontSize) || calendarFontSize < 6 || calendarFontSize > 25) {
    calendarFontSize = 12;
  }
  calendarFontSizeSelect.value = String(calendarFontSize);
  calendarFontSizeSelect.addEventListener("change", () => {
    calendarFontSize = Number(calendarFontSizeSelect.value || 12);
    localStorage.setItem(CALENDAR_FONT_SIZE_KEY, String(calendarFontSize));
  });
}

if (popupFontSizeSelect) {
  if (!Number.isFinite(popupFontSize) || popupFontSize < 14 || popupFontSize > 20) {
    popupFontSize = 17;
  }
  popupFontSizeSelect.value = String(popupFontSize);
  popupFontSizeSelect.addEventListener("change", () => {
    popupFontSize = Number(popupFontSizeSelect.value || 17);
    localStorage.setItem(POPUP_FONT_SIZE_KEY, String(popupFontSize));
  });
}

if (weekStartSelect) {
  if (!Number.isInteger(weekStart) || weekStart < 0 || weekStart > 6) {
    weekStart = 1;
  }
  weekStartSelect.value = String(weekStart);
  weekStartSelect.addEventListener("change", () => {
    weekStart = Number(weekStartSelect.value || 1);
    localStorage.setItem(WEEK_START_KEY, String(weekStart));
  });
}

if (weekNumbersToggle) {
  weekNumbersToggle.checked = !!showWeekNumbers;
  weekNumbersToggle.addEventListener("change", () => {
    showWeekNumbers = weekNumbersToggle.checked;
    localStorage.setItem(SHOW_WEEK_NUMBERS_KEY, JSON.stringify(showWeekNumbers));
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
