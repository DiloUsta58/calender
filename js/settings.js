const ISLAMIC_KEY = "calendar_islamic_holidays";
const GERMAN_KEY = "calendar_german_holidays";
const TURKISH_KEY = "calendar_turkish_holidays";
const ARABIC_KEY = "calendar_arabic_holidays";
const SCHOOL_HOLIDAYS_KEY = "calendar_school_holidays";
const GERMAN_REGION_KEY = "calendar_german_region";
const SCHOOL_COLOR_WINTER_KEY = "calendar_school_color_winter";
const SCHOOL_COLOR_EASTER_KEY = "calendar_school_color_easter";
const SCHOOL_COLOR_PENTECOST_KEY = "calendar_school_color_pentecost";
const SCHOOL_COLOR_SUMMER_KEY = "calendar_school_color_summer";
const SCHOOL_COLOR_AUTUMN_KEY = "calendar_school_color_autumn";
const SCHOOL_COLOR_CHRISTMAS_KEY = "calendar_school_color_christmas";
const CALENDAR_FONT_SIZE_KEY = "calendar_font_size";
const POPUP_FONT_SIZE_KEY = "calendar_popup_font_size";
const WEEK_START_KEY = "calendar_week_start";
const SHOW_WEEK_NUMBERS_KEY = "calendar_show_week_numbers";
const SHOW_VACATION_COUNTDOWN_KEY = "calendar_show_vacation_countdown";
const SHOW_BIRTHDAY_COUNTDOWN_KEY = "calendar_show_birthday_countdown";
const VACATION_COUNTDOWN_MODE_KEY = "calendar_vacation_countdown_mode";
const APP_VERSION = "1.0.4";

const islamicToggle = document.getElementById("toggleIslamic");
const germanToggle = document.getElementById("toggleGerman");
const turkishToggle = document.getElementById("toggleTurkish");
const arabicToggle = document.getElementById("toggleArabic");
const schoolHolidaysToggle = document.getElementById("toggleSchoolHolidays");
const germanRegionSelect = document.getElementById("germanRegionSelect");
const colorWinterHoliday = document.getElementById("colorWinterHoliday");
const colorEasterHoliday = document.getElementById("colorEasterHoliday");
const colorPentecostHoliday = document.getElementById("colorPentecostHoliday");
const colorSummerHoliday = document.getElementById("colorSummerHoliday");
const colorAutumnHoliday = document.getElementById("colorAutumnHoliday");
const colorChristmasHoliday = document.getElementById("colorChristmasHoliday");
const calendarFontSizeSelect = document.getElementById("calendarFontSizeSelect");
const popupFontSizeSelect = document.getElementById("popupFontSizeSelect");
const weekStartSelect = document.getElementById("weekStartSelect");
const weekNumbersToggle = document.getElementById("toggleWeekNumbers");
const vacationCountdownToggle = document.getElementById("toggleVacationCountdown");
const vacationCountdownModeSelect = document.getElementById("vacationCountdownModeSelect");
const birthdayCountdownToggle = document.getElementById("toggleBirthdayCountdown");
const versionLabel = document.getElementById("versionLabel");

let includeIslamic = JSON.parse(localStorage.getItem(ISLAMIC_KEY)) || false;
let includeGerman = JSON.parse(localStorage.getItem(GERMAN_KEY)) ?? true;
let includeTurkish = JSON.parse(localStorage.getItem(TURKISH_KEY)) ?? true;
let includeArabic = JSON.parse(localStorage.getItem(ARABIC_KEY)) ?? false;
let includeSchoolHolidays = JSON.parse(localStorage.getItem(SCHOOL_HOLIDAYS_KEY)) ?? false;
let germanRegion = localStorage.getItem(GERMAN_REGION_KEY) || "Nordrhein-Westfalen";
let schoolColorWinter = localStorage.getItem(SCHOOL_COLOR_WINTER_KEY) || "#60a5fa";
let schoolColorEaster = localStorage.getItem(SCHOOL_COLOR_EASTER_KEY) || "#34d399";
let schoolColorPentecost = localStorage.getItem(SCHOOL_COLOR_PENTECOST_KEY) || "#fbbf24";
let schoolColorSummer = localStorage.getItem(SCHOOL_COLOR_SUMMER_KEY) || "#f97316";
let schoolColorAutumn = localStorage.getItem(SCHOOL_COLOR_AUTUMN_KEY) || "#a78bfa";
let schoolColorChristmas = localStorage.getItem(SCHOOL_COLOR_CHRISTMAS_KEY) || "#ef4444";
let calendarFontSize = Number(localStorage.getItem(CALENDAR_FONT_SIZE_KEY) || 12);
let popupFontSize = Number(localStorage.getItem(POPUP_FONT_SIZE_KEY) || 17);
let weekStart = Number(localStorage.getItem(WEEK_START_KEY) || 1);
let showWeekNumbers = JSON.parse(localStorage.getItem(SHOW_WEEK_NUMBERS_KEY));
if (showWeekNumbers === null) showWeekNumbers = true;
let showVacationCountdown = JSON.parse(localStorage.getItem(SHOW_VACATION_COUNTDOWN_KEY));
if (showVacationCountdown === null) showVacationCountdown = true;
let showBirthdayCountdown = JSON.parse(localStorage.getItem(SHOW_BIRTHDAY_COUNTDOWN_KEY));
if (showBirthdayCountdown === null) showBirthdayCountdown = true;
let vacationCountdownMode = localStorage.getItem(VACATION_COUNTDOWN_MODE_KEY) || "queue";

function updateVacationModeState() {
  if (!vacationCountdownModeSelect) return;
  vacationCountdownModeSelect.disabled = !showVacationCountdown;
}

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

if (schoolHolidaysToggle) {
  schoolHolidaysToggle.checked = includeSchoolHolidays;
  schoolHolidaysToggle.addEventListener("change", () => {
    includeSchoolHolidays = schoolHolidaysToggle.checked;
    localStorage.setItem(SCHOOL_HOLIDAYS_KEY, JSON.stringify(includeSchoolHolidays));
  });
}

if (germanRegionSelect) {
  germanRegionSelect.value = germanRegion;
  germanRegionSelect.addEventListener("change", () => {
    germanRegion = germanRegionSelect.value || "Nordrhein-Westfalen";
    localStorage.setItem(GERMAN_REGION_KEY, germanRegion);
  });
}

if (colorWinterHoliday) {
  colorWinterHoliday.value = schoolColorWinter;
  colorWinterHoliday.addEventListener("input", () => {
    schoolColorWinter = colorWinterHoliday.value || "#60a5fa";
    localStorage.setItem(SCHOOL_COLOR_WINTER_KEY, schoolColorWinter);
  });
}
if (colorEasterHoliday) {
  colorEasterHoliday.value = schoolColorEaster;
  colorEasterHoliday.addEventListener("input", () => {
    schoolColorEaster = colorEasterHoliday.value || "#34d399";
    localStorage.setItem(SCHOOL_COLOR_EASTER_KEY, schoolColorEaster);
  });
}
if (colorPentecostHoliday) {
  colorPentecostHoliday.value = schoolColorPentecost;
  colorPentecostHoliday.addEventListener("input", () => {
    schoolColorPentecost = colorPentecostHoliday.value || "#fbbf24";
    localStorage.setItem(SCHOOL_COLOR_PENTECOST_KEY, schoolColorPentecost);
  });
}
if (colorSummerHoliday) {
  colorSummerHoliday.value = schoolColorSummer;
  colorSummerHoliday.addEventListener("input", () => {
    schoolColorSummer = colorSummerHoliday.value || "#f97316";
    localStorage.setItem(SCHOOL_COLOR_SUMMER_KEY, schoolColorSummer);
  });
}
if (colorAutumnHoliday) {
  colorAutumnHoliday.value = schoolColorAutumn;
  colorAutumnHoliday.addEventListener("input", () => {
    schoolColorAutumn = colorAutumnHoliday.value || "#a78bfa";
    localStorage.setItem(SCHOOL_COLOR_AUTUMN_KEY, schoolColorAutumn);
  });
}
if (colorChristmasHoliday) {
  colorChristmasHoliday.value = schoolColorChristmas;
  colorChristmasHoliday.addEventListener("input", () => {
    schoolColorChristmas = colorChristmasHoliday.value || "#ef4444";
    localStorage.setItem(SCHOOL_COLOR_CHRISTMAS_KEY, schoolColorChristmas);
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

if (vacationCountdownToggle) {
  vacationCountdownToggle.checked = !!showVacationCountdown;
  updateVacationModeState();
  vacationCountdownToggle.addEventListener("change", () => {
    showVacationCountdown = vacationCountdownToggle.checked;
    localStorage.setItem(SHOW_VACATION_COUNTDOWN_KEY, JSON.stringify(showVacationCountdown));
    updateVacationModeState();
  });
}

if (vacationCountdownModeSelect) {
  if (!["queue", "all"].includes(vacationCountdownMode)) {
    vacationCountdownMode = "queue";
  }
  vacationCountdownModeSelect.value = vacationCountdownMode;
  vacationCountdownModeSelect.addEventListener("change", () => {
    vacationCountdownMode = vacationCountdownModeSelect.value === "all" ? "all" : "queue";
    localStorage.setItem(VACATION_COUNTDOWN_MODE_KEY, vacationCountdownMode);
  });
  updateVacationModeState();
}

if (birthdayCountdownToggle) {
  birthdayCountdownToggle.checked = !!showBirthdayCountdown;
  birthdayCountdownToggle.addEventListener("change", () => {
    showBirthdayCountdown = birthdayCountdownToggle.checked;
    localStorage.setItem(SHOW_BIRTHDAY_COUNTDOWN_KEY, JSON.stringify(showBirthdayCountdown));
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
