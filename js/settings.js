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
const SCHOOL_SHOW_WINTER_KEY = "calendar_school_show_winter";
const SCHOOL_SHOW_EASTER_KEY = "calendar_school_show_easter";
const SCHOOL_SHOW_PENTECOST_KEY = "calendar_school_show_pentecost";
const SCHOOL_SHOW_SUMMER_KEY = "calendar_school_show_summer";
const SCHOOL_SHOW_AUTUMN_KEY = "calendar_school_show_autumn";
const SCHOOL_SHOW_CHRISTMAS_KEY = "calendar_school_show_christmas";
const CALENDAR_FONT_SIZE_KEY = "calendar_font_size";
const POPUP_FONT_SIZE_KEY = "calendar_popup_font_size";
const WEEK_START_KEY = "calendar_week_start";
const SHOW_WEEK_NUMBERS_KEY = "calendar_show_week_numbers";
const SHOW_VACATION_COUNTDOWN_KEY = "calendar_show_vacation_countdown";
const SHOW_BIRTHDAY_COUNTDOWN_KEY = "calendar_show_birthday_countdown";
const VACATION_COUNTDOWN_MODE_KEY = "calendar_vacation_countdown_mode";
const VACATION_SHIFT_DEFAULT_KEY = "calendar_vacation_shift_default";
const CONSIDER_PUBLIC_HOLIDAY_KEY = "calendar_consider_public_holiday";
const SHOW_EVENT_INFO_BOX_KEY = "calendar_show_event_info_box";
const APP_VERSION = "1.0.12";

const islamicToggle = document.getElementById("toggleIslamic");
const germanToggle = document.getElementById("toggleGerman");
const turkishToggle = document.getElementById("toggleTurkish");
const arabicToggle = document.getElementById("toggleArabic");
const schoolHolidaysToggle = document.getElementById("toggleSchoolHolidays");
const winterHolidayTypeToggle = document.getElementById("toggleWinterHolidayType");
const easterHolidayTypeToggle = document.getElementById("toggleEasterHolidayType");
const pentecostHolidayTypeToggle = document.getElementById("togglePentecostHolidayType");
const summerHolidayTypeToggle = document.getElementById("toggleSummerHolidayType");
const autumnHolidayTypeToggle = document.getElementById("toggleAutumnHolidayType");
const christmasHolidayTypeToggle = document.getElementById("toggleChristmasHolidayType");
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
const vacationShiftDefaultSelect = document.getElementById("vacationShiftDefaultSelect");
const considerPublicHolidayToggle = document.getElementById("toggleExcludePublicHolidayVacations");
const eventInfoBoxToggle = document.getElementById("toggleEventInfoBox");
const versionLabel = document.getElementById("versionLabel");

function initPanelState(panelEl, storageKey) {
  if (!panelEl || !storageKey) return;
  const saved = localStorage.getItem(storageKey);
  if (saved === "open") panelEl.open = true;
  if (saved === "closed") panelEl.open = false;
  panelEl.addEventListener("toggle", () => {
    localStorage.setItem(storageKey, panelEl.open ? "open" : "closed");
  });
}

document.querySelectorAll(".settings-disclosure").forEach(panel => {
  const key = panel.dataset.settingsKey;
  if (key) initPanelState(panel, key);
});

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
let schoolShowWinter = JSON.parse(localStorage.getItem(SCHOOL_SHOW_WINTER_KEY));
let schoolShowEaster = JSON.parse(localStorage.getItem(SCHOOL_SHOW_EASTER_KEY));
let schoolShowPentecost = JSON.parse(localStorage.getItem(SCHOOL_SHOW_PENTECOST_KEY));
let schoolShowSummer = JSON.parse(localStorage.getItem(SCHOOL_SHOW_SUMMER_KEY));
let schoolShowAutumn = JSON.parse(localStorage.getItem(SCHOOL_SHOW_AUTUMN_KEY));
let schoolShowChristmas = JSON.parse(localStorage.getItem(SCHOOL_SHOW_CHRISTMAS_KEY));
if (schoolShowWinter === null) schoolShowWinter = true;
if (schoolShowEaster === null) schoolShowEaster = true;
if (schoolShowPentecost === null) schoolShowPentecost = true;
if (schoolShowSummer === null) schoolShowSummer = true;
if (schoolShowAutumn === null) schoolShowAutumn = true;
if (schoolShowChristmas === null) schoolShowChristmas = true;
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
let vacationShiftDefault = localStorage.getItem(VACATION_SHIFT_DEFAULT_KEY) || "default";
let considerPublicHoliday = JSON.parse(localStorage.getItem(CONSIDER_PUBLIC_HOLIDAY_KEY));
if (considerPublicHoliday === null) considerPublicHoliday = true;
let showEventInfoBox = JSON.parse(localStorage.getItem(SHOW_EVENT_INFO_BOX_KEY));
if (showEventInfoBox === null) showEventInfoBox = true;

function updateGermanHolidayDependentsState() {
  const disabled = !includeGerman;
  if (considerPublicHolidayToggle) {
    considerPublicHolidayToggle.disabled = disabled;
  }
}

function updateVacationModeState() {
  if (!vacationCountdownModeSelect) return;
  vacationCountdownModeSelect.disabled = !showVacationCountdown;
}

function updateSchoolHolidayControlsState() {
  const disabled = !includeSchoolHolidays;
  [
    winterHolidayTypeToggle,
    easterHolidayTypeToggle,
    pentecostHolidayTypeToggle,
    summerHolidayTypeToggle,
    autumnHolidayTypeToggle,
    christmasHolidayTypeToggle,
    colorWinterHoliday,
    colorEasterHoliday,
    colorPentecostHoliday,
    colorSummerHoliday,
    colorAutumnHoliday,
    colorChristmasHoliday
  ].forEach(el => {
    if (el) el.disabled = disabled;
  });
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
  updateGermanHolidayDependentsState();
  germanToggle.addEventListener("change", () => {
    includeGerman = germanToggle.checked;
    localStorage.setItem(GERMAN_KEY, JSON.stringify(includeGerman));
    updateGermanHolidayDependentsState();
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
  updateSchoolHolidayControlsState();
  schoolHolidaysToggle.addEventListener("change", () => {
    includeSchoolHolidays = schoolHolidaysToggle.checked;
    localStorage.setItem(SCHOOL_HOLIDAYS_KEY, JSON.stringify(includeSchoolHolidays));
    updateSchoolHolidayControlsState();
  });
}

if (winterHolidayTypeToggle) {
  winterHolidayTypeToggle.checked = !!schoolShowWinter;
  winterHolidayTypeToggle.addEventListener("change", () => {
    schoolShowWinter = winterHolidayTypeToggle.checked;
    localStorage.setItem(SCHOOL_SHOW_WINTER_KEY, JSON.stringify(schoolShowWinter));
  });
}
if (easterHolidayTypeToggle) {
  easterHolidayTypeToggle.checked = !!schoolShowEaster;
  easterHolidayTypeToggle.addEventListener("change", () => {
    schoolShowEaster = easterHolidayTypeToggle.checked;
    localStorage.setItem(SCHOOL_SHOW_EASTER_KEY, JSON.stringify(schoolShowEaster));
  });
}
if (pentecostHolidayTypeToggle) {
  pentecostHolidayTypeToggle.checked = !!schoolShowPentecost;
  pentecostHolidayTypeToggle.addEventListener("change", () => {
    schoolShowPentecost = pentecostHolidayTypeToggle.checked;
    localStorage.setItem(SCHOOL_SHOW_PENTECOST_KEY, JSON.stringify(schoolShowPentecost));
  });
}
if (summerHolidayTypeToggle) {
  summerHolidayTypeToggle.checked = !!schoolShowSummer;
  summerHolidayTypeToggle.addEventListener("change", () => {
    schoolShowSummer = summerHolidayTypeToggle.checked;
    localStorage.setItem(SCHOOL_SHOW_SUMMER_KEY, JSON.stringify(schoolShowSummer));
  });
}
if (autumnHolidayTypeToggle) {
  autumnHolidayTypeToggle.checked = !!schoolShowAutumn;
  autumnHolidayTypeToggle.addEventListener("change", () => {
    schoolShowAutumn = autumnHolidayTypeToggle.checked;
    localStorage.setItem(SCHOOL_SHOW_AUTUMN_KEY, JSON.stringify(schoolShowAutumn));
  });
}
if (christmasHolidayTypeToggle) {
  christmasHolidayTypeToggle.checked = !!schoolShowChristmas;
  christmasHolidayTypeToggle.addEventListener("change", () => {
    schoolShowChristmas = christmasHolidayTypeToggle.checked;
    localStorage.setItem(SCHOOL_SHOW_CHRISTMAS_KEY, JSON.stringify(schoolShowChristmas));
  });
}

updateSchoolHolidayControlsState();

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

if (considerPublicHolidayToggle) {
  considerPublicHolidayToggle.checked = !!considerPublicHoliday;
  considerPublicHolidayToggle.addEventListener("change", () => {
    considerPublicHoliday = considerPublicHolidayToggle.checked;
    localStorage.setItem(CONSIDER_PUBLIC_HOLIDAY_KEY, JSON.stringify(considerPublicHoliday));
  });
  updateGermanHolidayDependentsState();
}

if (eventInfoBoxToggle) {
  eventInfoBoxToggle.checked = !!showEventInfoBox;
  eventInfoBoxToggle.addEventListener("change", () => {
    showEventInfoBox = eventInfoBoxToggle.checked;
    localStorage.setItem(SHOW_EVENT_INFO_BOX_KEY, JSON.stringify(showEventInfoBox));
  });
}

if (vacationShiftDefaultSelect) {
  if (!["default", "exclude_we_1shift"].includes(vacationShiftDefault)) {
    vacationShiftDefault = "default";
  }
  vacationShiftDefaultSelect.value = vacationShiftDefault;
  vacationShiftDefaultSelect.addEventListener("change", () => {
    vacationShiftDefault = vacationShiftDefaultSelect.value === "exclude_we_1shift"
      ? "exclude_we_1shift"
      : "default";
    localStorage.setItem(VACATION_SHIFT_DEFAULT_KEY, vacationShiftDefault);
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
