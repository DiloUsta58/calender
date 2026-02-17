const HOLIDAYS = {
  DE: (year) => [
    { date: `${year}-01-01`, name: "Neujahr" },
    { date: `${year}-05-01`, name: "Tag der Arbeit" },
    { date: `${year}-10-03`, name: "Tag der Einheit" },
    { date: `${year}-12-25`, name: "1. Weihnachtstag" },
    { date: `${year}-12-26`, name: "2. Weihnachtstag" }
  ],
  TR: (year) => [
    { date: `${year}-04-23`, name: "Ulusal Egemenlik" },
    { date: `${year}-05-19`, name: "Atatürk Günü" },
    { date: `${year}-08-30`, name: "Zafer Bayramı" },
    { date: `${year}-10-29`, name: "Cumhuriyet Bayramı" }
  ],
  MA: (year) => [
    { date: `${year}-01-11`, name: "Unabhängigkeitstag" },
    { date: `${year}-01-11`, name: "Tag des Unabhängigkeitsmanifests" },
    { date: `${year}-01-14`, name: "Amazigh-Neujahr" },
    { date: `${year}-05-01`, name: "Tag der Arbeit" },
    { date: `${year}-07-30`, name: "Thronfest" },
    { date: `${year}-08-14`, name: "Oued Eddahab Tag" },
    { date: `${year}-08-20`, name: "Revolution des Königs und des Volkes" },
    { date: `${year}-08-21`, name: "Jugendtag" },
    { date: `${year}-11-06`, name: "Jahrestag des Grünen Marsches" },
    { date: `${year}-11-18`, name: "Unabhängigkeitstag" }
  ]
};


const EVENTS_KEY = "calendar_events";
const ISLAMIC_KEY = "calendar_islamic_holidays";
const GERMAN_KEY = "calendar_german_holidays";
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
const TURKISH_KEY = "calendar_turkish_holidays";
const ARABIC_KEY = "calendar_arabic_holidays";
const SHIFT_KEY = "calendar_shift_plan";
const CALENDAR_FONT_SIZE_KEY = "calendar_font_size";
const POPUP_FONT_SIZE_KEY = "calendar_popup_font_size";
const WEEK_START_KEY = "calendar_week_start";
const SHOW_WEEK_NUMBERS_KEY = "calendar_show_week_numbers";
const SHOW_VACATION_COUNTDOWN_KEY = "calendar_show_vacation_countdown";
const SHOW_BIRTHDAY_COUNTDOWN_KEY = "calendar_show_birthday_countdown";
const VACATION_COUNTDOWN_MODE_KEY = "calendar_vacation_countdown_mode";
const VACATION_SHIFT_DEFAULT_KEY = "calendar_vacation_shift_default";
const VIEW_DATE_SESSION_KEY = "calendar_view_date";
const APP_VERSION = "1.0.9";

let events = JSON.parse(localStorage.getItem(EVENTS_KEY)) || [
/*  { date: "2026-02-10", type: "appointment", title: "Arzt 10:00" },
  { date: "2026-02-14", type: "birthday", title: "Mama 🎂" }*/
];


function saveEvents() {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

function getInitialCalendarDate() {
  try {
    const raw = sessionStorage.getItem(VIEW_DATE_SESSION_KEY);
    if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const d = parseDateSafe(raw);
      if (d) return new Date(d.getFullYear(), d.getMonth(), 1);
    }
  } catch (_) {
    // ignore
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

function persistCalendarViewDate(date) {
  try {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    sessionStorage.setItem(VIEW_DATE_SESSION_KEY, `${y}-${m}-01`);
  } catch (_) {
    // ignore
  }
}

// Initialisierung
const grid = document.querySelector(".calendar-grid");
const monthLabel = document.getElementById("monthLabel");
const monthSelect = document.getElementById("monthSelect");
const monthSelectWrap = document.getElementById("monthSelectWrap");
const monthSelectBtn = document.getElementById("monthSelectBtn");
const monthSelectList = document.getElementById("monthSelectList");
const yearInput = document.getElementById("yearInput");
const yearSelectWrap = document.getElementById("yearSelectWrap");
const yearInputCustom = document.getElementById("yearInputCustom");
const yearSelectBtn = document.getElementById("yearSelectBtn");
const yearSelectList = document.getElementById("yearSelectList");
const yearApply = document.getElementById("yearApply");
const toggleMonthPicker = document.getElementById("toggleMonthPicker");
const calendarRoot = document.querySelector(".calendar");
const entryOverlay = document.getElementById("entryOverlay");
const overlayBody = document.getElementById("overlayBody");
const overlayClose = document.getElementById("overlayClose");
const overlayTitle = document.getElementById("overlayTitle");
const overlayAdd = document.getElementById("overlayAdd");
const overlayAddMenu = document.getElementById("overlayAddMenu");
const overlayCard = entryOverlay?.querySelector(".overlay-card");
const versionLabel = document.getElementById("versionLabel");
const todayDisplay = document.getElementById("todayDisplay");
const clockPanel = document.getElementById("clockPanel");

let currentDate = getInitialCalendarDate();
let includeIslamic = JSON.parse(localStorage.getItem(ISLAMIC_KEY)) || false;
let includeGerman = JSON.parse(localStorage.getItem(GERMAN_KEY)) ?? true;
let includeSchoolHolidays = JSON.parse(localStorage.getItem(SCHOOL_HOLIDAYS_KEY)) ?? false;
let germanRegion = localStorage.getItem(GERMAN_REGION_KEY) || "Nordrhein-Westfalen";
let schoolHolidayColors = {
  winter: localStorage.getItem(SCHOOL_COLOR_WINTER_KEY) || "#60a5fa",
  easter: localStorage.getItem(SCHOOL_COLOR_EASTER_KEY) || "#34d399",
  pentecost: localStorage.getItem(SCHOOL_COLOR_PENTECOST_KEY) || "#fbbf24",
  summer: localStorage.getItem(SCHOOL_COLOR_SUMMER_KEY) || "#f97316",
  autumn: localStorage.getItem(SCHOOL_COLOR_AUTUMN_KEY) || "#a78bfa",
  christmas: localStorage.getItem(SCHOOL_COLOR_CHRISTMAS_KEY) || "#ef4444"
};
let schoolHolidayVisible = {
  winter: JSON.parse(localStorage.getItem(SCHOOL_SHOW_WINTER_KEY)),
  easter: JSON.parse(localStorage.getItem(SCHOOL_SHOW_EASTER_KEY)),
  pentecost: JSON.parse(localStorage.getItem(SCHOOL_SHOW_PENTECOST_KEY)),
  summer: JSON.parse(localStorage.getItem(SCHOOL_SHOW_SUMMER_KEY)),
  autumn: JSON.parse(localStorage.getItem(SCHOOL_SHOW_AUTUMN_KEY)),
  christmas: JSON.parse(localStorage.getItem(SCHOOL_SHOW_CHRISTMAS_KEY))
};
Object.keys(schoolHolidayVisible).forEach(k => {
  if (schoolHolidayVisible[k] === null) schoolHolidayVisible[k] = true;
});
let includeTurkish = JSON.parse(localStorage.getItem(TURKISH_KEY)) ?? true;
let includeArabic = JSON.parse(localStorage.getItem(ARABIC_KEY)) ?? false;
let shiftPlan = JSON.parse(localStorage.getItem(SHIFT_KEY)) || null;
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
let monthPickerReady = false;
let headerTimerId = null;

const DEFAULT_MONTHS = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

if (!Number.isFinite(calendarFontSize) || calendarFontSize < 6 || calendarFontSize > 25) {
  calendarFontSize = 12;
}
if (!Number.isFinite(popupFontSize) || popupFontSize < 14 || popupFontSize > 20) {
  popupFontSize = 17;
}
if (!Number.isInteger(weekStart) || weekStart < 0 || weekStart > 6) {
  weekStart = 1;
}

function applyDisplaySettings() {
  if (calendarRoot) {
    calendarRoot.style.setProperty("--calendar-font-size", `${calendarFontSize}px`);
    calendarRoot.style.setProperty("--entry-font-size", `${calendarFontSize}px`);
    calendarRoot.style.setProperty("--overlay-font-size", `${popupFontSize}px`);
  }
  if (grid) {
    grid.classList.toggle("hide-week-numbers", !showWeekNumbers);
  }
}

function closeCustomMonthSelect() {
  if (!monthSelectWrap || !monthSelectBtn) return;
  monthSelectWrap.classList.remove("open");
  monthSelectBtn.setAttribute("aria-expanded", "false");
}

function closeCustomYearSelect() {
  if (!yearSelectWrap || !yearSelectBtn) return;
  yearSelectWrap.classList.remove("open");
  yearSelectBtn.setAttribute("aria-expanded", "false");
}

function syncCustomMonthSelect() {
  if (!monthSelect || !monthSelectBtn || !monthSelectList) return;
  const selected = monthSelect.options[monthSelect.selectedIndex];
  monthSelectBtn.textContent = selected ? selected.textContent : "";

  monthSelectList.querySelectorAll(".custom-month-option").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.value === monthSelect.value);
  });
}

function buildCustomMonthSelect() {
  if (!monthSelect || !monthSelectWrap || !monthSelectBtn || !monthSelectList) return;

  monthSelectList.innerHTML = "";
  Array.from(monthSelect.options).forEach(option => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "custom-month-option";
    item.dataset.value = option.value;
    item.textContent = option.textContent || "";
    item.addEventListener("click", () => {
      monthSelect.value = option.value;
      monthSelect.dispatchEvent(new Event("change", { bubbles: true }));
      closeCustomMonthSelect();
    });
    monthSelectList.appendChild(item);
  });
  syncCustomMonthSelect();

  if (monthSelectWrap.dataset.ready === "1") return;

  monthSelectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = monthSelectWrap.classList.toggle("open");
    monthSelectBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  monthSelectList.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!monthSelectWrap.contains(e.target)) {
      closeCustomMonthSelect();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCustomMonthSelect();
    }
  });

  monthSelectWrap.dataset.ready = "1";
}

function getEnteredYear() {
  const source = yearInputCustom?.value || yearInput?.value || "";
  const y = Number(source);
  return Number.isFinite(y) ? y : NaN;
}

function syncCustomYearInput() {
  if (!yearInput || !yearInputCustom) return;
  yearInputCustom.value = String(yearInput.value || "");
}

function syncCustomYearOptions() {
  if (!yearSelectList || !yearInput) return;
  yearSelectList.querySelectorAll(".custom-year-option").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.value === yearInput.value);
  });
}

function buildCustomYearOptions(centerYear) {
  if (!yearSelectList || !yearInput) return;
  const base = Number.isFinite(centerYear) ? centerYear : currentDate.getFullYear();
  const from = Math.max(1900, base - 60);
  const to = Math.min(2100, base + 40);
  yearSelectList.innerHTML = "";
  for (let y = to; y >= from; y--) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "custom-year-option";
    item.dataset.value = String(y);
    item.textContent = String(y);
    item.addEventListener("click", () => {
      yearInput.value = String(y);
      syncCustomYearInput();
      syncCustomYearOptions();
      closeCustomYearSelect();
      const m = Number(monthSelect?.value || currentDate.getMonth());
      currentDate = new Date(y, m, 1);
      renderCalendar(currentDate);
    });
    yearSelectList.appendChild(item);
  }
  syncCustomYearOptions();
}

function setupCustomYearInput() {
  if (!yearInput || !yearInputCustom || !yearSelectWrap || !yearSelectBtn || !yearSelectList) return;
  syncCustomYearInput();
  buildCustomYearOptions(Number(yearInput.value));

  if (yearSelectWrap.dataset.ready === "1") return;

  yearInputCustom.addEventListener("input", () => {
    const digitsOnly = yearInputCustom.value.replace(/[^\d]/g, "").slice(0, 4);
    yearInputCustom.value = digitsOnly;
    yearInput.value = digitsOnly;
    syncCustomYearOptions();
  });

  yearInputCustom.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      yearApply?.click();
    }
  });

  yearSelectBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    buildCustomYearOptions(Number(yearInput.value));
    const isOpen = yearSelectWrap.classList.toggle("open");
    yearSelectBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  yearSelectList.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (!yearSelectWrap.contains(e.target)) {
      closeCustomYearSelect();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCustomYearSelect();
    }
  });

  yearSelectWrap.dataset.ready = "1";
}

function setupMonthPicker() {
  if (!monthSelect || !yearInput) return;
  const months = (window.i18n && window.i18n.getLangData)
    ? window.i18n.getLangData("month_names", DEFAULT_MONTHS)
    : DEFAULT_MONTHS;
  monthSelect.innerHTML = months
    .map((name, i) => `<option value="${i}">${name}</option>`)
    .join("");

  yearInput.value = String(currentDate.getFullYear());
  monthSelect.value = String(currentDate.getMonth());
  buildCustomMonthSelect();
  setupCustomYearInput();
  syncCustomYearInput();
  syncCustomYearOptions();

  if (!monthPickerReady) {
    monthSelect.addEventListener("change", () => {
      const m = Number(monthSelect.value);
      const yRaw = getEnteredYear();
      const y = Number.isFinite(yRaw) ? yRaw : currentDate.getFullYear();
      currentDate = new Date(y, m, 1);
      renderCalendar(currentDate);
      syncCustomMonthSelect();
    });

    const applyYear = () => {
      const y = getEnteredYear();
      if (!Number.isFinite(y) || y < 1900 || y > 2100) return;
      yearInput.value = String(y);
      syncCustomYearInput();
      syncCustomYearOptions();
      const m = Number(monthSelect.value);
      currentDate = new Date(y, m, 1);
      renderCalendar(currentDate);
    };

    yearInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyYear();
      }
    });

    yearApply?.addEventListener("click", applyYear);
    monthPickerReady = true;
  }
}

function renderCalendar(date) {

  // alte Tage/Platzhalter/Kopfzeile löschen
  grid.querySelectorAll(".day, .pad, .week-number, .week-corner, .weekday-head").forEach(d => d.remove());

  const year = date.getFullYear();
  const month = date.getMonth();
  persistCalendarViewDate(new Date(year, month, 1));

  const locale = (window.i18n && window.i18n.getLangData)
    ? window.i18n.getLangData("locale", "de-DE")
    : "de-DE";
  monthLabel.textContent =
    date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  if (monthSelect && yearInput) {
    monthSelect.value = String(month);
    yearInput.value = String(year);
    syncCustomMonthSelect();
    syncCustomYearInput();
    syncCustomYearOptions();
  }

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const startOffset = (firstDay.getDay() - weekStart + 7) % 7;

  const totalDays = lastDay.getDate();
  const totalCells = startOffset + totalDays;
  const endPad = (7 - (totalCells % 7)) % 7;
  const weeks = (totalCells + endPad) / 7;

  const weekdayNames = (window.i18n && window.i18n.getLangData)
    ? window.i18n.getLangData("weekday_short", ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"])
    : ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  if (showWeekNumbers) {
    const cornerCell = document.createElement("div");
    cornerCell.className = "week-corner";
    cornerCell.textContent = "KW";
    grid.appendChild(cornerCell);
  }

  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStart + i) % 7; // 0=So ... 6=Sa
    const weekdayIdxMondayFirst = (dayIndex + 6) % 7; // Mo=0 ... So=6
    const head = document.createElement("div");
    head.className = "weekday-head";
    if (dayIndex === 6) head.classList.add("saturday");
    if (dayIndex === 0) head.classList.add("sunday");
    const label = weekdayNames[weekdayIdxMondayFirst] || "";
    head.textContent = label.endsWith(".") ? label : `${label}.`;
    grid.appendChild(head);
  }

  let currentDay = 1;
  let nextMonthDay = 1;

  for (let w = 0; w < weeks; w++) {
    const weekStartDate = new Date(year, month, 1 - startOffset + (w * 7));
    if (showWeekNumbers) {
      const weekNumber = getWeekNumber(weekStartDate, weekStart);
      const weekCell = document.createElement("div");
      weekCell.className = "week-number";
      weekCell.textContent = weekNumber;
      grid.appendChild(weekCell);
    }

    for (let d = 0; d < 7; d++) {
      const cellIndex = w * 7 + d;
      let cellDate;
      let inCurrentMonth = true;

      if (cellIndex < startOffset) {
        const dayNum = prevLastDay.getDate() - (startOffset - 1 - cellIndex);
        cellDate = new Date(year, month - 1, dayNum);
        inCurrentMonth = false;
      } else if (currentDay <= totalDays) {
        cellDate = new Date(year, month, currentDay);
        currentDay++;
      } else {
        cellDate = new Date(year, month + 1, nextMonthDay);
        nextMonthDay++;
        inCurrentMonth = false;
      }

      const cell = buildDayCell(cellDate, inCurrentMonth);
      grid.appendChild(cell);
    }
  }
}

const GERMAN_REGIONS = new Set([
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen",
  "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen", "Rheinland-Pfalz",
  "Saarland", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
]);

const SCHOOL_REGION_OFFSETS = {
  "Baden-Württemberg": { winter: 0, easter: 0, summer: 3, autumn: 1, xmas: 0 },
  "Bayern": { winter: 1, easter: 1, summer: 4, autumn: 2, xmas: 1 },
  "Berlin": { winter: 2, easter: 2, summer: 0, autumn: 0, xmas: 0 },
  "Brandenburg": { winter: 3, easter: 2, summer: 1, autumn: 0, xmas: 1 },
  "Bremen": { winter: 1, easter: 0, summer: 2, autumn: 1, xmas: 0 },
  "Hamburg": { winter: 2, easter: 1, summer: 2, autumn: 1, xmas: 0 },
  "Hessen": { winter: 1, easter: 0, summer: 5, autumn: 1, xmas: 0 },
  "Mecklenburg-Vorpommern": { winter: 4, easter: 3, summer: 0, autumn: 2, xmas: 1 },
  "Niedersachsen": { winter: 0, easter: 1, summer: 1, autumn: 2, xmas: 0 },
  "Nordrhein-Westfalen": { winter: 0, easter: 0, summer: 2, autumn: 1, xmas: 0 },
  "Rheinland-Pfalz": { winter: 1, easter: 1, summer: 3, autumn: 1, xmas: 0 },
  "Saarland": { winter: 2, easter: 1, summer: 4, autumn: 1, xmas: 1 },
  "Sachsen": { winter: 3, easter: 3, summer: 5, autumn: 2, xmas: 1 },
  "Sachsen-Anhalt": { winter: 3, easter: 2, summer: 1, autumn: 2, xmas: 1 },
  "Schleswig-Holstein": { winter: 0, easter: 1, summer: 0, autumn: 0, xmas: 0 },
  "Thüringen": { winter: 2, easter: 2, summer: 5, autumn: 2, xmas: 1 }
};

const EXACT_SCHOOL_CACHE_KEY = "calendar_school_holidays_exact_v1";

const EXACT_SCHOOL_HOLIDAYS = {
  2026: {
    "Baden-Württemberg": {
      easter: [["2026-03-30", "2026-04-11"]],
      pentecost: [["2026-05-26", "2026-06-05"]],
      summer: [["2026-07-30", "2026-09-12"]],
      autumn: [["2026-10-26", "2026-10-31"]],
      christmas: [["2026-12-23", "2027-01-09"]]
    },
    "Bayern": {
      winter: [["2026-02-16", "2026-02-20"]],
      easter: [["2026-03-30", "2026-04-10"]],
      pentecost: [["2026-05-26", "2026-06-05"]],
      summer: [["2026-08-03", "2026-09-14"]],
      autumn: [["2026-11-02", "2026-11-06"], ["2026-11-18", "2026-11-18"]],
      christmas: [["2026-12-24", "2027-01-08"]]
    },
    "Berlin": {
      winter: [["2026-02-02", "2026-02-07"]],
      easter: [["2026-03-30", "2026-04-10"], ["2026-05-15", "2026-05-15"]],
      pentecost: [["2026-05-26", "2026-05-26"]],
      summer: [["2026-07-09", "2026-08-22"]],
      autumn: [["2026-10-19", "2026-10-31"]],
      christmas: [["2026-12-23", "2027-01-02"]]
    },
    "Brandenburg": {
      winter: [["2026-02-02", "2026-02-07"]],
      easter: [["2026-03-30", "2026-04-10"], ["2026-05-15", "2026-05-15"]],
      pentecost: [["2026-05-26", "2026-05-26"]],
      summer: [["2026-07-09", "2026-08-22"]],
      autumn: [["2026-10-19", "2026-10-30"]],
      christmas: [["2026-12-23", "2027-01-02"]]
    },
    "Bremen": {
      winter: [["2026-02-02", "2026-02-03"]],
      easter: [["2026-03-23", "2026-04-07"]],
      pentecost: [["2026-05-15", "2026-05-15"], ["2026-05-26", "2026-05-26"]],
      summer: [["2026-07-02", "2026-08-12"]],
      autumn: [["2026-10-12", "2026-10-24"]],
      christmas: [["2026-12-23", "2027-01-09"]]
    },
    "Hamburg": {
      winter: [["2026-01-30", "2026-01-30"]],
      easter: [["2026-03-02", "2026-03-13"]],
      pentecost: [["2026-05-11", "2026-05-15"]],
      summer: [["2026-07-09", "2026-08-19"]],
      autumn: [["2026-10-19", "2026-10-30"]],
      christmas: [["2026-12-21", "2027-01-01"]]
    },
    "Hessen": {
      easter: [["2026-03-30", "2026-04-10"]],
      summer: [["2026-06-29", "2026-08-07"]],
      autumn: [["2026-10-05", "2026-10-17"]],
      christmas: [["2026-12-23", "2027-01-12"]]
    },
    "Mecklenburg-Vorpommern": {
      winter: [["2026-02-09", "2026-02-20"]],
      easter: [["2026-03-30", "2026-04-08"]],
      pentecost: [["2026-05-15", "2026-05-15"], ["2026-05-22", "2026-05-26"]],
      summer: [["2026-07-13", "2026-08-22"]],
      autumn: [["2026-10-15", "2026-10-24"]],
      christmas: [["2026-12-21", "2027-01-02"]]
    },
    "Niedersachsen": {
      winter: [["2026-02-02", "2026-02-03"]],
      easter: [["2026-03-23", "2026-04-07"]],
      pentecost: [["2026-05-15", "2026-05-15"], ["2026-05-26", "2026-05-26"]],
      summer: [["2026-07-02", "2026-08-12"]],
      autumn: [["2026-10-12", "2026-10-24"]],
      christmas: [["2026-12-23", "2027-01-09"]]
    },
    "Nordrhein-Westfalen": {
      easter: [["2026-03-30", "2026-04-11"]],
      pentecost: [["2026-05-26", "2026-05-26"]],
      summer: [["2026-07-20", "2026-09-01"]],
      autumn: [["2026-10-17", "2026-10-31"]],
      christmas: [["2026-12-23", "2027-01-06"]]
    },
    "Rheinland-Pfalz": {
      easter: [["2026-03-30", "2026-04-10"]],
      summer: [["2026-06-29", "2026-08-07"]],
      autumn: [["2026-10-05", "2026-10-16"]],
      christmas: [["2026-12-23", "2027-01-08"]]
    },
    "Saarland": {
      winter: [["2026-02-16", "2026-02-20"]],
      easter: [["2026-04-07", "2026-04-17"]],
      summer: [["2026-06-29", "2026-08-07"]],
      autumn: [["2026-10-05", "2026-10-16"]],
      christmas: [["2026-12-21", "2026-12-31"]]
    },
    "Sachsen": {
      winter: [["2026-02-09", "2026-02-21"]],
      easter: [["2026-04-03", "2026-04-10"], ["2026-05-15", "2026-05-15"]],
      summer: [["2026-07-04", "2026-08-14"]],
      autumn: [["2026-10-12", "2026-10-24"]],
      christmas: [["2026-12-23", "2027-01-02"]]
    },
    "Sachsen-Anhalt": {
      winter: [["2026-01-31", "2026-02-06"]],
      easter: [["2026-03-30", "2026-04-04"]],
      pentecost: [["2026-05-26", "2026-05-29"]],
      summer: [["2026-07-04", "2026-08-14"]],
      autumn: [["2026-10-19", "2026-10-30"]],
      christmas: [["2026-12-23", "2027-01-02"]]
    },
    "Schleswig-Holstein": {
      winter: [["2026-02-02", "2026-02-03"]],
      easter: [["2026-03-26", "2026-04-10"]],
      pentecost: [["2026-05-15", "2026-05-15"]],
      summer: [["2026-07-04", "2026-08-15"]],
      autumn: [["2026-10-12", "2026-10-24"]],
      christmas: [["2026-12-21", "2027-01-06"]]
    },
    "Thüringen": {
      winter: [["2026-02-16", "2026-02-21"]],
      easter: [["2026-04-07", "2026-04-17"]],
      pentecost: [["2026-05-15", "2026-05-15"]],
      summer: [["2026-07-04", "2026-08-14"]],
      autumn: [["2026-10-12", "2026-10-24"]],
      christmas: [["2026-12-23", "2027-01-02"]]
    }
  }
};

const holidayCache = new Map();
const schoolHolidayFetchInFlight = new Map();
let exactSchoolHolidayCache = loadExactSchoolHolidayCache();

function normalizeGermanRegion(region) {
  return GERMAN_REGIONS.has(region) ? region : "Nordrhein-Westfalen";
}

function pad2(num) {
  return String(num).padStart(2, "0");
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function shiftDate(date, days) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

function getMondayOnOrAfter(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
  return d;
}

function addHolidayIfSameYear(list, date, year, name) {
  if (date.getFullYear() !== year) return;
  list.push({ date: toIsoDate(date), name });
}

function addHolidayRange(list, startDate, endDate, year, name) {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  if (end < start) return;
  const cursor = new Date(start);
  while (cursor <= end) {
    if (cursor.getFullYear() === year) {
      list.push({ date: toIsoDate(cursor), name });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
}

function addHolidayRangesIso(list, ranges, year, name) {
  if (!Array.isArray(ranges)) return;
  ranges.forEach(range => {
    if (!Array.isArray(range) || range.length !== 2) return;
    const start = parseDateSafe(range[0]);
    const end = parseDateSafe(range[1]);
    if (!start || !end) return;
    addHolidayRange(list, start, end, year, name);
  });
}

function loadExactSchoolHolidayCache() {
  const out = JSON.parse(JSON.stringify(EXACT_SCHOOL_HOLIDAYS || {}));
  try {
    const raw = localStorage.getItem(EXACT_SCHOOL_CACHE_KEY);
    if (!raw) return out;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return out;
    Object.keys(saved).forEach(y => {
      if (!out[y]) out[y] = {};
      Object.keys(saved[y] || {}).forEach(region => {
        out[y][region] = saved[y][region];
      });
    });
  } catch (_) {
    // Ignore cache parse errors.
  }
  return out;
}

function persistExactSchoolHolidayCache() {
  try {
    localStorage.setItem(EXACT_SCHOOL_CACHE_KEY, JSON.stringify(exactSchoolHolidayCache));
  } catch (_) {
    // Ignore storage quota errors.
  }
}

function getExactSchoolHolidayData(year, region) {
  const y = String(year);
  return exactSchoolHolidayCache?.[y]?.[region] || null;
}

function addRangeUnique(targetList, startIso, endIso) {
  if (!Array.isArray(targetList)) return;
  if (!targetList.some(r => Array.isArray(r) && r[0] === startIso && r[1] === endIso)) {
    targetList.push([startIso, endIso]);
  }
}

function ensureExactSchoolHolidaysFromApi(year, region) {
  if (year < 2026) return;
  const y = String(year);
  if (getExactSchoolHolidayData(year, region)) return;
  const key = `${y}|${region}`;
  if (schoolHolidayFetchInFlight.has(key)) return;

  const url = `api/school_holidays.php?year=${encodeURIComponent(y)}&region=${encodeURIComponent(region)}`;
  const p = fetch(url, { cache: "no-store" })
    .then(r => (r.ok ? r.json() : []))
    .then(payload => {
      const mapped = {
        winter: [],
        easter: [],
        pentecost: [],
        summer: [],
        autumn: [],
        christmas: []
      };
      const rows = payload?.data || {};
      Object.keys(mapped).forEach(type => {
        const ranges = Array.isArray(rows[type]) ? rows[type] : [];
        ranges.forEach(range => {
          if (!Array.isArray(range) || range.length !== 2) return;
          const startIso = range[0];
          const endIso = range[1];
          if (!startIso || !endIso) return;
          addRangeUnique(mapped[type], startIso, endIso);
        });
      });

      if (!exactSchoolHolidayCache[y]) exactSchoolHolidayCache[y] = {};
      exactSchoolHolidayCache[y][region] = mapped;
      persistExactSchoolHolidayCache();
      holidayCache.clear();
      renderCalendar(currentDate);
    })
    .catch(() => {})
    .finally(() => {
      schoolHolidayFetchInFlight.delete(key);
    });

  schoolHolidayFetchInFlight.set(key, p);
}

function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getBussUndBettag(year) {
  const d = new Date(year, 10, 23); // 23. November
  while (d.getDay() !== 3) d.setDate(d.getDate() - 1); // Mittwoch
  return d;
}

function getGermanPublicHolidaysByRegion(year, regionName) {
  const region = normalizeGermanRegion(regionName);
  const list = [];
  const easter = getEasterSunday(year);

  // Bundeseinheitliche Feiertage
  list.push({ date: `${year}-01-01`, name: "Neujahr" });
  list.push({ date: `${year}-05-01`, name: "Tag der Arbeit" });
  list.push({ date: `${year}-10-03`, name: "Tag der Einheit" });
  list.push({ date: `${year}-12-25`, name: "1. Weihnachtstag" });
  list.push({ date: `${year}-12-26`, name: "2. Weihnachtstag" });
  addHolidayIfSameYear(list, shiftDate(easter, -2), year, "Karfreitag");
  addHolidayIfSameYear(list, shiftDate(easter, 1), year, "Ostermontag");
  addHolidayIfSameYear(list, shiftDate(easter, 39), year, "Christi Himmelfahrt");
  addHolidayIfSameYear(list, shiftDate(easter, 50), year, "Pfingstmontag");

  if (["Baden-Württemberg", "Bayern", "Sachsen-Anhalt"].includes(region)) {
    list.push({ date: `${year}-01-06`, name: "Heilige Drei Könige" });
  }
  if (["Baden-Württemberg", "Bayern", "Hessen", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland"].includes(region)) {
    addHolidayIfSameYear(list, shiftDate(easter, 60), year, "Fronleichnam");
  }
  if (["Baden-Württemberg", "Bayern", "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland"].includes(region)) {
    list.push({ date: `${year}-11-01`, name: "Allerheiligen" });
  }
  if (["Bayern", "Saarland"].includes(region)) {
    list.push({ date: `${year}-08-15`, name: "Mariä Himmelfahrt" });
  }
  if ((region === "Berlin" && year >= 2019) || (region === "Mecklenburg-Vorpommern" && year >= 2023)) {
    list.push({ date: `${year}-03-08`, name: "Internationaler Frauentag" });
  }
  if (region === "Thüringen" && year >= 2019) {
    list.push({ date: `${year}-09-20`, name: "Weltkindertag" });
  }
  if (["Brandenburg", "Bremen", "Hamburg", "Mecklenburg-Vorpommern", "Niedersachsen", "Sachsen", "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"].includes(region)) {
    list.push({ date: `${year}-10-31`, name: "Reformationstag" });
  }
  if (region === "Sachsen") {
    addHolidayIfSameYear(list, getBussUndBettag(year), year, "Buß- und Bettag");
  }
  if (region === "Brandenburg") {
    addHolidayIfSameYear(list, easter, year, "Ostersonntag");
    addHolidayIfSameYear(list, shiftDate(easter, 49), year, "Pfingstsonntag");
  }

  const dedupe = new Map();
  list.forEach(h => {
    dedupe.set(`${h.date}|${h.name}`, h);
  });
  return Array.from(dedupe.values());
}

function getGermanSchoolHolidaysByRegion(year, regionName) {
  const region = normalizeGermanRegion(regionName);
  const exact = getExactSchoolHolidayData(year, region);
  if (exact) {
    const list = [];
    if (isSchoolHolidayTypeVisible("winter")) addHolidayRangesIso(list, exact.winter, year, `Winterferien (${region})`);
    if (isSchoolHolidayTypeVisible("easter")) addHolidayRangesIso(list, exact.easter, year, `Osterferien (${region})`);
    if (isSchoolHolidayTypeVisible("pentecost")) addHolidayRangesIso(list, exact.pentecost, year, `Pfingstferien (${region})`);
    if (isSchoolHolidayTypeVisible("summer")) addHolidayRangesIso(list, exact.summer, year, `Sommerferien (${region})`);
    if (isSchoolHolidayTypeVisible("autumn")) addHolidayRangesIso(list, exact.autumn, year, `Herbstferien (${region})`);
    if (isSchoolHolidayTypeVisible("christmas")) addHolidayRangesIso(list, exact.christmas, year, `Weihnachtsferien (${region})`);
    return list;
  }

  if (year >= 2026) {
    ensureExactSchoolHolidaysFromApi(year, region);
    return [];
  }

  const cfg = SCHOOL_REGION_OFFSETS[region] || SCHOOL_REGION_OFFSETS["Nordrhein-Westfalen"];
  const list = [];
  const easter = getEasterSunday(year);

  // NRW has no fixed winter holiday block; avoid incorrect February week rendering.
  if (region !== "Nordrhein-Westfalen" && isSchoolHolidayTypeVisible("winter")) {
    const winterStart = shiftDate(getMondayOnOrAfter(new Date(year, 0, 27)), cfg.winter * 7);
    const winterEnd = shiftDate(winterStart, 6);
    addHolidayRange(list, winterStart, winterEnd, year, `Winterferien (${region})`);
  }

  if (isSchoolHolidayTypeVisible("easter")) {
    const easterStart = shiftDate(easter, -12 + (cfg.easter * 2));
    const easterEnd = shiftDate(easterStart, 13);
    addHolidayRange(list, easterStart, easterEnd, year, `Osterferien (${region})`);
  }

  if (isSchoolHolidayTypeVisible("summer")) {
    const summerStart = shiftDate(getMondayOnOrAfter(new Date(year, 5, 20)), cfg.summer * 7);
    const summerEnd = shiftDate(summerStart, 41);
    addHolidayRange(list, summerStart, summerEnd, year, `Sommerferien (${region})`);
  }

  if (isSchoolHolidayTypeVisible("autumn")) {
    const autumnStart = shiftDate(getMondayOnOrAfter(new Date(year, 9, 6)), cfg.autumn * 7);
    const autumnEnd = shiftDate(autumnStart, 9);
    addHolidayRange(list, autumnStart, autumnEnd, year, `Herbstferien (${region})`);
  }

  if (isSchoolHolidayTypeVisible("christmas")) {
    const christmasStart = shiftDate(new Date(year, 11, 22), cfg.xmas);
    const christmasEnd = shiftDate(new Date(year + 1, 0, 6), cfg.xmas);
    addHolidayRange(list, christmasStart, christmasEnd, year, `Weihnachtsferien (${region})`);
  }

  return list;
}

function getCalendarHolidayList(year) {
  const region = normalizeGermanRegion(germanRegion);
  const key = [
    year,
    includeGerman ? 1 : 0,
    includeSchoolHolidays ? 1 : 0,
    schoolHolidayVisible.winter ? 1 : 0,
    schoolHolidayVisible.easter ? 1 : 0,
    schoolHolidayVisible.pentecost ? 1 : 0,
    schoolHolidayVisible.summer ? 1 : 0,
    schoolHolidayVisible.autumn ? 1 : 0,
    schoolHolidayVisible.christmas ? 1 : 0,
    includeTurkish ? 1 : 0,
    includeArabic ? 1 : 0,
    region
  ].join("|");
  if (holidayCache.has(key)) {
    return holidayCache.get(key);
  }

  const list = [];
  if (includeGerman) list.push(...getGermanPublicHolidaysByRegion(year, region));
  if (includeSchoolHolidays) list.push(...getGermanSchoolHolidaysByRegion(year, region));
  if (includeTurkish) list.push(...HOLIDAYS.TR(year));
  if (includeArabic) list.push(...HOLIDAYS.MA(year));

  const dedupe = new Map();
  list.forEach(h => dedupe.set(`${h.date}|${h.name}`, h));
  const result = Array.from(dedupe.values());
  holidayCache.set(key, result);
  return result;
}

function getSchoolHolidayType(name) {
  const n = String(name || "");
  if (n.startsWith("Winterferien")) return "winter";
  if (n.startsWith("Osterferien")) return "easter";
  if (n.startsWith("Pfingstferien")) return "pentecost";
  if (n.startsWith("Sommerferien")) return "summer";
  if (n.startsWith("Herbstferien")) return "autumn";
  if (n.startsWith("Weihnachtsferien")) return "christmas";
  return "";
}

function getSchoolHolidayColor(name) {
  const t = getSchoolHolidayType(name);
  return t ? (schoolHolidayColors[t] || "") : "";
}

function isSchoolHolidayTypeVisible(type) {
  if (!type) return true;
  return schoolHolidayVisible[type] !== false;
}

function buildDayCell(cellDate, inCurrentMonth) {
  const year = cellDate.getFullYear();
  const month = cellDate.getMonth();
  const day = cellDate.getDate();
  const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const cell = document.createElement("div");
  cell.className = "day";
  cell.dataset.date = iso;
  if (!inCurrentMonth) cell.classList.add("other-month");
  if (iso === new Date().toISOString().slice(0, 10)) {
    cell.classList.add("today");
  }
  const dayOfWeek = cellDate.getDay(); // 0=So, 6=Sa
  if (dayOfWeek === 6) cell.classList.add("saturday");
  if (dayOfWeek === 0) cell.classList.add("sunday");

  const entries = document.createElement("div");
  entries.className = "entries";

  let isHoliday = false;

  const shiftEntry = getShiftEntryForDate(year, month + 1, day);
  if (shiftEntry) {
    const bg = shiftEntry.color || "";
    const fg = bg ? getContrastColor(bg) : "";
    const colorStyle = bg ? ` style="background:${bg};color:${fg};"` : "";
    entries.innerHTML += `<div class="entry shift" data-date="${iso}" data-shift-plan="1"${colorStyle}>${shiftEntry.label}</div>`;
  }

  events
    .filter(e => eventMatchesDate(e, year, month + 1, day, iso))
    .forEach(e => {
      const eventIndex = events.indexOf(e);
      const eventType = normalizeEventType(e.type);
      const timeLabel = eventType === "birthday"
        ? ""
        : (e.startTime && e.endTime ? `${e.startTime}–${e.endTime} ` : (e.startTime ? `${e.startTime} ` : ""));
      const titleLabel = eventType === "birthday"
        ? formatBirthdayTitle(e, year)
        : formatRangeTitle(e);
      const bg = e.color || "";
      const fg = bg ? getContrastColor(bg) : "";
      const colorStyle = bg ? ` style="background:${bg};color:${fg};"` : "";
      const fullText = `${timeLabel}${titleLabel}`;
      const editTitle = (window.i18n && window.i18n.t) ? window.i18n.t("click_edit") : "Klicken zum Bearbeiten";
      entries.innerHTML += `<div class="entry ${eventType}" data-date="${iso}" data-index="${eventIndex}" data-full-text="${fullText.replace(/"/g, "&quot;")}" title="${editTitle}"${colorStyle}>${fullText}</div>`;
    });

  const holidayList = getCalendarHolidayList(year);

  holidayList
    .filter(h => h.date === iso)
    .forEach(h => {
      isHoliday = true;
      const schoolBg = getSchoolHolidayColor(h.name);
      if (schoolBg) {
        const schoolFg = getContrastColor(schoolBg);
        entries.innerHTML += `<div class="entry holiday school-holiday" style="background:${schoolBg};color:${schoolFg};">${h.name}</div>`;
      } else {
        entries.innerHTML += `<div class="entry holiday">${h.name}</div>`;
      }
    });

  if (includeIslamic) {
    const islamicEntries = getIslamicHolidaysForDate(year, month + 1, day);
    if (islamicEntries.length) {
      isHoliday = true;
      cell.classList.add("islamic-day");
      islamicEntries.forEach(name => {
        entries.innerHTML += `<div class="entry holiday islamic-holiday">${name}</div>`;
      });
    }
  }

  if (isHoliday) cell.classList.add("holiday-day");

  cell.innerHTML = `
    <div class="day-head">
      <div class="day-number">${day}</div>
    </div>
  `;
  cell.appendChild(entries);
  return cell;
}

// Navigation
document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
};

document.getElementById("todayBtn").onclick = () => {
  const today = new Date();
  currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
  renderCalendar(today);
};

grid.addEventListener("click", (e) => {
  const entry = e.target.closest(".entry");
  if (entry) {
    if (window.matchMedia("(max-width: 520px)").matches) {
      const iso = entry.dataset.date;
      showEntryOverlayForDate(iso);
      return;
    }
    if (!entry.classList.contains("holiday")) {
      if (entry.dataset.shiftPlan === "1") {
        window.location.href = "schicht-editor.html";
        return;
      }
      const index = entry.dataset.index;
      window.location.href = `day-editor.html?index=${index}`;
      return;
    }
  }

  const cell = e.target.closest(".day");
  if (!cell) return;

  const iso = cell.dataset.date;
  if (iso) {
    showEntryOverlayForDate(iso);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".day")) return;
  grid.querySelectorAll(".day.menu-open").forEach(d => d.classList.remove("menu-open"));
});

applyDisplaySettings();
renderCalendar(currentDate);
setupMonthPicker();
loadVersion();
renderTodayDisplay();
startHeaderTimer();

if (window.i18n && window.i18n.t) {
  document.title = window.i18n.t("app_title");
}

document.addEventListener("languageChanged", () => {
  applyDisplaySettings();
  setupMonthPicker();
  renderCalendar(currentDate);
  renderTodayDisplay();
  updateHeaderClockAndCountdown();
  if (window.i18n && window.i18n.t) {
    document.title = window.i18n.t("app_title");
  }
});

function renderTodayDisplay() {
  if (!todayDisplay) return;
  const locale = (window.i18n && window.i18n.getLangData)
    ? window.i18n.getLangData("locale", "de-DE")
    : "de-DE";
  const now = new Date();
  const day = now.toLocaleDateString(locale, { day: "numeric" });
  const month = now.toLocaleDateString(locale, { month: "long" });
  const year = now.toLocaleDateString(locale, { year: "numeric" });
  todayDisplay.innerHTML = `
    <span class="today-day">${day}.</span>
    <span class="today-month">${month}</span>
    <span class="today-year">${year}</span>
  `;
}

function startHeaderTimer() {
  updateHeaderClockAndCountdown();
  if (headerTimerId) clearInterval(headerTimerId);
  headerTimerId = setInterval(updateHeaderClockAndCountdown, 1000);
}

function updateHeaderClockAndCountdown() {
  if (!clockPanel) return;
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const lines = [`<div class="clock-now">${time}</div>`];
  const upcoming = getUpcomingCountdownsForCurrentMonth(now);
  let lastVacationLineIndex = -1;
  upcoming.forEach(item => {
    const kindText = item.kindDetail || item.kind;
    const lineIndex = lines.length;
    lines.push(
      `<div class="clock-countdown">` +
      `<span class="clock-left">${item.timeLeft}</span>` +
      `<span class="clock-sep">-</span>` +
      `<span class="clock-name">${escapeHtml(item.name)} (${escapeHtml(kindText)})</span>` +
      `</div>`
    );
    if (item.kind === ((window.i18n && window.i18n.t) ? window.i18n.t("vacation") : "Urlaub")) {
      lastVacationLineIndex = lineIndex;
    }
  });
  const vacationStats = getTotalVacationDaysFromEntries();
  if (vacationStats.total > 0 && lastVacationLineIndex >= 0) {
    const entriesLabel = (window.i18n && window.i18n.t) ? window.i18n.t("entries_label") : "Einträge";
    const vacationLabel = (window.i18n && window.i18n.t) ? window.i18n.t("vacation") : "Urlaub";
    const daysLabel = (window.i18n && window.i18n.t) ? window.i18n.t("days") : "Tage";
    const withoutWeLabel = (window.i18n && window.i18n.t) ? window.i18n.t("without_weekend_short") : "Ohne WE";
    const withWeLabel = (window.i18n && window.i18n.t) ? window.i18n.t("with_weekend_short") : "mit WE";
    const summaryText = vacationStats.withoutWeekendApplied
      ? `${escapeHtml(entriesLabel)}: ${escapeHtml(vacationLabel)} ${vacationStats.total} ${escapeHtml(daysLabel)} (${escapeHtml(withoutWeLabel)}) - ${vacationStats.totalWithWeekend} ${escapeHtml(daysLabel)} (${escapeHtml(withWeLabel)})`
      : `${escapeHtml(entriesLabel)}: ${escapeHtml(vacationLabel)} ${vacationStats.total} ${escapeHtml(daysLabel)}`;
    const summaryLine = `<div class="clock-countdown clock-summary"><span class="clock-name">${summaryText}</span></div>`;
    lines.splice(lastVacationLineIndex + 1, 0, `<div class="clock-divider" aria-hidden="true"></div>`, summaryLine);
  }
  clockPanel.innerHTML = lines.join("");
}

function getTotalVacationDaysFromEntries() {
  let total = 0;
  let totalWithWeekend = 0;
  let withoutWeekendApplied = false;
  events.forEach(e => {
    if (!e || normalizeEventType(e.type) !== "vacation" || !e.date) return;
    const start = parseDateSafe(e.date);
    const end = parseDateSafe(e.endDate || e.date);
    if (!start || !end) return;
    const days = getInclusiveDaysInRange(start, end);
    const applyWithoutWeekend = getShiftSettingAffectsVacation(e);
    const effectiveDays = applyWithoutWeekend ? countWeekdaysInRange(start, end) : days;
    if (applyWithoutWeekend) withoutWeekendApplied = true;
    total += effectiveDays;
    totalWithWeekend += days;
  });
  return { total, totalWithWeekend, withoutWeekendApplied };
}

function getInclusiveDaysInRange(start, end) {
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(1, Math.floor((Math.max(startUtc, endUtc) - Math.min(startUtc, endUtc)) / 86400000) + 1);
}

function normalizeEventType(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "appointment";
  const map = {
    appointment: "appointment",
    termin: "appointment",
    birthday: "birthday",
    geburtstag: "birthday",
    shift: "shift",
    schicht: "shift",
    vacation: "vacation",
    urlaub: "vacation",
    izin: "vacation",
    vacances: "vacation",
    "إجازة": "vacation"
  };
  return map[raw] || "appointment";
}

function countWeekdaysInRange(start, end) {
  const from = new Date(Math.min(start.getTime(), end.getTime()));
  const to = new Date(Math.max(start.getTime(), end.getTime()));
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);
  let weekdays = 0;
  const cur = new Date(from);
  while (cur <= to) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) weekdays++;
    cur.setDate(cur.getDate() + 1);
  }
  return weekdays;
}

function getGlobalVacationShiftDefault() {
  const raw = localStorage.getItem(VACATION_SHIFT_DEFAULT_KEY);
  const cleaned = String(raw || "default").trim().replace(/^"+|"+$/g, "");
  return cleaned === "exclude_we_1shift" ? "exclude_we_1shift" : "default";
}

function getEffectiveVacationShiftSetting(event) {
  const own = String(event?.shiftSetting || "").trim().replace(/^"+|"+$/g, "");
  if (own === "exclude_we_1shift") return "exclude_we_1shift";
  return getGlobalVacationShiftDefault();
}

function isOneShiftModeActive() {
  let livePlan = shiftPlan;
  try {
    const raw = localStorage.getItem(SHIFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") livePlan = parsed;
    }
  } catch (_) {
    // fallback to cached plan
  }
  if (!livePlan) return false;
  const modelRaw = String(livePlan.model ?? "").trim();
  const pattern = Array.isArray(livePlan.pattern) ? livePlan.pattern : [];
  const hasOnlyEarlyPattern = pattern.length > 0 && pattern.every(code => !code || code === "-" || code === "F");
  const modelIsOne = modelRaw === "1" || modelRaw === "model_1" || modelRaw.startsWith("1") || hasOnlyEarlyPattern;
  const enabledRaw = livePlan.enabled;
  const enabled = !(enabledRaw === false || String(enabledRaw).trim().toLowerCase() === "false");
  return modelIsOne && enabled;
}

function getShiftSettingAffectsVacation(effectiveEvent) {
  return getEffectiveVacationShiftSetting(effectiveEvent) === "exclude_we_1shift";
}

function getVacationDaysForEvent(event, start, end) {
  if (getShiftSettingAffectsVacation(event)) {
    return countWeekdaysInRange(start, end);
  }
  return getInclusiveDaysInRange(start, end);
}

function getVacationKindDetailForEvent(event, vacationLabel, daysLabel, start, end) {
  const days = getVacationDaysForEvent(event, start, end);
  if (getShiftSettingAffectsVacation(event)) {
    const fullDays = getInclusiveDaysInRange(start, end);
    const withoutWeLabel = (window.i18n && window.i18n.t) ? window.i18n.t("without_weekend_short") : "Ohne WE";
    const withWeLabel = (window.i18n && window.i18n.t) ? window.i18n.t("with_weekend_short") : "mit WE";
    return `${vacationLabel} - ${days} ${daysLabel} (${withoutWeLabel}) - ${fullDays} ${daysLabel} (${withWeLabel})`;
  }
  return `${vacationLabel} - ${days} ${daysLabel}`;
}


function getUpcomingCountdownsForCurrentMonth(now) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based
  const candidates = [];
  const vacationQueue = [];
  const birthdayLabel = (window.i18n && window.i18n.t) ? window.i18n.t("birthday") : "Geburtstag";
  const vacationLabel = (window.i18n && window.i18n.t) ? window.i18n.t("vacation") : "Urlaub";
  const daysLabel = (window.i18n && window.i18n.t) ? window.i18n.t("days") : "Tage";
  const mode = vacationCountdownMode === "all" ? "all" : "queue";
  const nowDayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  events.forEach(e => {
    if (!e?.date) return;
    const normalizedType = normalizeEventType(e.type);
    if (normalizedType === "birthday" && showBirthdayCountdown) {
      const birth = parseDateSafe(e.date);
      if (!birth || birth.getMonth() !== month) return;
      const validYear = isBirthdayValidForYear(e, birth, year);
      if (!validYear) return;
      const target = new Date(year, month, birth.getDate(), 0, 0, 0);
      if (target < now) return;
      candidates.push({
        name: e.title || birthdayLabel,
        kind: birthdayLabel,
        target
      });
      return;
    }
    if (normalizedType === "vacation" && showVacationCountdown) {
      const start = parseDateSafe(e.date);
      if (!start) return;
      const end = parseDateSafe(e.endDate || e.date);
      if (!end) return;
      const target = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
      const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
      const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
      const rangeStartUtc = Math.min(startUtc, endUtc);
      const rangeEndUtc = Math.max(startUtc, endUtc);
      if (rangeEndUtc < nowDayUtc) return;
      vacationQueue.push({
        name: e.title || vacationLabel,
        kind: vacationLabel,
        kindDetail: getVacationKindDetailForEvent(e, vacationLabel, daysLabel, start, end),
        target,
        rangeStartUtc
      });
    }
  });

  if (vacationQueue.length) {
    vacationQueue.sort((a, b) => a.rangeStartUtc - b.rangeStartUtc);
    if (mode === "all") {
      candidates.push(...vacationQueue);
    } else {
      candidates.push(vacationQueue[0]);
    }
  }

  candidates.sort((a, b) => a.target - b.target);

  return candidates.map(c => ({
    name: c.name,
    kind: c.kind,
    kindDetail: c.kindDetail,
    timeLeft: c.kind === ((window.i18n && window.i18n.t) ? window.i18n.t("vacation") : "Urlaub")
      ? formatCountdownNoSeconds(c.target - now)
      : formatCountdown(c.target - now)
  }));
}

function isBirthdayValidForYear(event, birthDate, year) {
  if (event.repeat === "yearly") return true;
  if (event.repeat === "once") {
    const onceYear = Number(event.repeatYear);
    const targetYear = Number.isFinite(onceYear) && onceYear > 0 ? onceYear : birthDate.getFullYear();
    return targetYear === year;
  }
  return birthDate.getFullYear() === year;
}

function formatCountdown(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const dd = Math.floor(total / 86400);
  const hh = Math.floor((total % 86400) / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  return `${String(dd).padStart(2, "0")}:${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function formatCountdownNoSeconds(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const dd = Math.floor(total / 86400);
  const hh = Math.floor((total % 86400) / 3600);
  const mm = Math.floor((total % 3600) / 60);
  return `${String(dd).padStart(2, "0")}:${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (toggleMonthPicker && calendarRoot) {
  toggleMonthPicker.addEventListener("click", () => {
    calendarRoot.classList.toggle("show-month-controls");
  });
}

function showEntryOverlayForDate(iso) {
  if (!entryOverlay || !overlayBody || !overlayTitle) return;
  const dateObj = parseDateSafe(iso);
  const locale = (window.i18n && window.i18n.getLangData)
    ? window.i18n.getLangData("locale", "de-DE")
    : "de-DE";
  const titleText = dateObj
    ? dateObj.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : ((window.i18n && window.i18n.t) ? window.i18n.t("events") : "Ereignisse");
  overlayTitle.textContent = titleText;
  overlayBody.innerHTML = buildOverlayListHtml(iso);
  overlayAddMenu?.classList.remove("show");
  entryOverlay.dataset.date = iso;
  entryOverlay.classList.add("show");
  entryOverlay.setAttribute("aria-hidden", "false");
}

function hideEntryOverlay() {
  if (!entryOverlay) return;
  entryOverlay.classList.remove("show");
  entryOverlay.setAttribute("aria-hidden", "true");
  if (overlayCard) {
    overlayCard.style.transform = "";
  }
}

overlayClose?.addEventListener("click", hideEntryOverlay);
entryOverlay?.addEventListener("click", (e) => {
  if (e.target === entryOverlay) hideEntryOverlay();
});

if (overlayCard) {
  let startY = 0;
  let currentY = 0;
  let dragging = false;
  const threshold = 90;

  overlayCard.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    dragging = true;
    startY = e.touches[0].clientY;
    currentY = 0;
  }, { passive: true });

  overlayCard.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    const y = e.touches[0].clientY;
    currentY = Math.max(0, y - startY);
    overlayCard.style.transform = `translateY(${currentY}px)`;
  }, { passive: true });

  overlayCard.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;
    if (currentY > threshold) {
      hideEntryOverlay();
    } else {
      overlayCard.style.transition = "transform .25s cubic-bezier(0.2, 0.8, 0.2, 1.2)";
      overlayCard.style.transform = "";
      setTimeout(() => {
        if (overlayCard) overlayCard.style.transition = "";
      }, 260);
    }
  });
}

overlayBody?.addEventListener("click", (e) => {
  const item = e.target.closest("[data-index], [data-shift-plan]");
  if (!item) return;
  if (item.dataset.shiftPlan === "1") {
    window.location.href = "schicht-editor.html";
    return;
  }
  const index = item.dataset.index;
  if (index) window.location.href = `day-editor.html?index=${index}`;
});

overlayAdd?.addEventListener("click", () => {
  overlayAddMenu?.classList.toggle("show");
});

overlayAddMenu?.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-type]");
  if (!btn) return;
  const date = entryOverlay?.dataset.date;
  if (!date) return;
  const type = btn.dataset.type;
  if (type === "shift") {
    window.location.href = "schicht-editor.html";
    return;
  }
  window.location.href = `day-editor.html?date=${date}&type=${type}`;
});

function buildOverlayListHtml(iso) {
  const dateObj = parseDateSafe(iso);
  if (!dateObj) {
    const emptyText = (window.i18n && window.i18n.t) ? window.i18n.t("overlay_empty") : "Keine Ereignisse";
    return `<div class="overlay-empty">${emptyText}</div>`;
  }
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const items = [];

  events
    .filter(e => eventMatchesDate(e, year, month, day, iso))
    .forEach(e => {
      const eventType = normalizeEventType(e.type);
      const timeLabel = eventType === "birthday"
        ? ""
        : (e.startTime && e.endTime ? `${e.startTime}–${e.endTime} ` : (e.startTime ? `${e.startTime} ` : ""));
      const titleLabel = eventType === "birthday"
        ? formatBirthdayTitle(e, year)
        : formatRangeTitle(e);
      const bg = e.color || "";
      const fg = bg ? getContrastColor(bg) : "";
      const style = bg ? ` style="background:${bg};color:${fg};"` : "";
      const index = events.indexOf(e);
      items.push(`<div class="overlay-item" data-index="${index}"${style}>${timeLabel}${titleLabel}</div>`);
    });

  const shiftEntry = getShiftEntryForDate(year, month, day);
  if (shiftEntry) {
    const bg = shiftEntry.color || "";
    const fg = bg ? getContrastColor(bg) : "";
    const style = bg ? ` style="background:${bg};color:${fg};"` : "";
    items.push(`<div class="overlay-item shift-item" data-shift-plan="1"${style}><span class="shift-badge-inline">${shiftEntry.code}</span>${shiftEntry.label}</div>`);
  }

  const holidayList = getCalendarHolidayList(year);
  holidayList
    .filter(h => h.date === iso)
    .forEach(h => {
      const schoolBg = getSchoolHolidayColor(h.name);
      if (schoolBg) {
        const schoolFg = getContrastColor(schoolBg);
        items.push(`<div class="overlay-item holiday school-holiday" style="background:${schoolBg};color:${schoolFg};">${h.name}</div>`);
      } else {
        items.push(`<div class="overlay-item holiday">${h.name}</div>`);
      }
    });

  if (includeIslamic) {
    const islamicEntries = getIslamicHolidaysForDate(year, month, day);
    islamicEntries.forEach(name => {
      items.push(`<div class="overlay-item holiday">${name}</div>`);
    });
  }

  if (!items.length) {
    const emptyText = (window.i18n && window.i18n.t) ? window.i18n.t("overlay_empty") : "Keine Ereignisse";
    return `<div class="overlay-empty">${emptyText}</div>`;
  }
  return `<div class="overlay-list">${items.join("")}</div>`;
}

const islamicToggle = document.getElementById("toggleIslamic");
if (islamicToggle) {
  islamicToggle.checked = includeIslamic;
  islamicToggle.addEventListener("change", () => {
    includeIslamic = islamicToggle.checked;
    localStorage.setItem(ISLAMIC_KEY, JSON.stringify(includeIslamic));
    renderCalendar(currentDate);
  });
}

const germanToggle = document.getElementById("toggleGerman");
if (germanToggle) {
  germanToggle.checked = includeGerman;
  germanToggle.addEventListener("change", () => {
    includeGerman = germanToggle.checked;
    localStorage.setItem(GERMAN_KEY, JSON.stringify(includeGerman));
    renderCalendar(currentDate);
  });
}

const turkishToggle = document.getElementById("toggleTurkish");
if (turkishToggle) {
  turkishToggle.checked = includeTurkish;
  turkishToggle.addEventListener("change", () => {
    includeTurkish = turkishToggle.checked;
    localStorage.setItem(TURKISH_KEY, JSON.stringify(includeTurkish));
    renderCalendar(currentDate);
  });
}

function gregorianToJD(y, m, d) {
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716))
    + Math.floor(30.6001 * (m + 1))
    + d + b - 1524.5;
}

function islamicToJD(y, m, d) {
  return d
    + Math.ceil(29.5 * (m - 1))
    + (y - 1) * 354
    + Math.floor((3 + 11 * y) / 30)
    + 1948439.5 - 1;
}

function jdToIslamic(jd) {
  jd = Math.floor(jd) + 0.5;
  const year = Math.floor((30 * (jd - 1948439.5) + 10646) / 10631);
  const month = Math.min(12, Math.ceil((jd - 29 - islamicToJD(year, 1, 1)) / 29.5) + 1);
  const day = Math.floor(jd - islamicToJD(year, month, 1) + 1);
  return { year, month, day };
}

function gregorianToIslamic(y, m, d) {
  const jd = gregorianToJD(y, m, d);
  return jdToIslamic(jd);
}

function getIslamicHolidaysForDate(y, m, d) {
  const { month, day } = gregorianToIslamic(y, m, d);
  const result = [];
  if (month === 10 && day >= 1 && day <= 3) {
    result.push(`Ramazan Bayramı (${day}. gün)`);
  }
  if (month === 12 && day >= 10 && day <= 12) {
    result.push(`Kurban Bayramı (${day - 9}. gün)`);
  }
  return result;
}

function getShiftEntryForDate(year, month, day) {
  if (!shiftPlan || !shiftPlan.enabled || !shiftPlan.pattern?.length) return null;
  const start = parseDateSafe(shiftPlan.startDate);
  if (!start) return null;
  const target = new Date(year, month - 1, day);
  const diff = diffDaysUtc(start, target);
  const len = shiftPlan.pattern.length;
  const offset = getShiftStartOffset(shiftPlan);
  const idx = ((diff + offset) % len + len) % len;
  const code = shiftPlan.pattern[idx];
  if (!code || code === "-") return null;
  const labels = shiftPlan.labels || {};
  const shiftColors = shiftPlan.shiftColors || {};
  return {
    code,
    label: labels[code] || code,
    color: shiftColors[code] || shiftPlan.color || "#22c55e"
  };
}

function getShiftStartOffset(plan) {
  if (!plan?.pattern?.length) return 0;
  if (Number.isInteger(plan.startOffset)) return plan.startOffset;
  if (plan.startCode) {
    const idx = plan.pattern.indexOf(plan.startCode);
    return idx >= 0 ? idx : 0;
  }
  return 0;
}

function diffDaysUtc(a, b) {
  const aUtc = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bUtc = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((bUtc - aUtc) / 86400000);
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getWeekNumber(date, startDay) {
  if (startDay === 1) return getISOWeek(date);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const yearStartOffset = (yearStart.getDay() - startDay + 7) % 7;
  const firstWeekStart = new Date(yearStart);
  firstWeekStart.setDate(yearStart.getDate() - yearStartOffset);
  return Math.floor((d - firstWeekStart) / 86400000 / 7) + 1;
}

function eventMatchesDate(e, year, month, day, iso) {
  const eventType = normalizeEventType(e?.type);
  if (eventType === "vacation" && getShiftSettingAffectsVacation(e)) {
    const weekDay = new Date(year, month - 1, day).getDay();
    if (weekDay === 0 || weekDay === 6) return false;
  }
  if (eventType !== "birthday") {
    return isDateInRange(iso, e.date, e.endDate);
  }
  if (!e.date) return false;
  const birth = parseDateSafe(e.date);
  if (!birth) return false;
  const birthMonth = birth.getMonth() + 1;
  const birthDay = birth.getDate();
  const isSameMonthDay = birthMonth === month && birthDay === day;
  if (e.repeat === "yearly") {
    return isSameMonthDay;
  }
  if (e.repeat === "once") {
    const onceYear = Number(e.repeatYear);
    const targetYear = Number.isFinite(onceYear) && onceYear > 0 ? onceYear : birth.getFullYear();
    return isSameMonthDay && targetYear === year;
  }
  return false;
}

function formatBirthdayTitle(e, year) {
  const birth = parseDateSafe(e.date);
  const age = birth ? (year - birth.getFullYear()) : NaN;
  const name = e.title || ((window.i18n && window.i18n.t) ? window.i18n.t("birthday") : "Geburtstag");
  const prefix = "🎂 ";
  const displayName = name.startsWith(prefix) ? name : `${prefix}${name}`;
  if (Number.isFinite(age) && age > 0) {
    const suffix = (window.i18n && window.i18n.t) ? window.i18n.t("birthday_suffix") : "Geburtstag";
    return `${displayName} (${age}. ${suffix})`;
  }
  return displayName;
}

function formatRangeTitle(e) {
  if (!e.endDate || e.endDate === e.date) return e.title;
  const start = parseDateSafe(e.date);
  const end = parseDateSafe(e.endDate);
  if (!start || !end) return e.title;
  return `${e.title} (${formatDateShort(start)}–${formatDateShort(end)})`;
}

function isDateInRange(isoDate, startDate, endDate) {
  const current = parseDateSafe(isoDate);
  const start = parseDateSafe(startDate);
  const end = parseDateSafe(endDate || startDate);
  if (!current || !start || !end) return false;
  const cur = current.setHours(0, 0, 0, 0);
  const s = start.setHours(0, 0, 0, 0);
  const e = end.setHours(0, 0, 0, 0);
  return cur >= s && cur <= e;
}

function formatDateShort(d) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

function getContrastColor(hex) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return "#fff";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#111" : "#fff";
}

function parseDateSafe(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    const [d, m, y] = value.split(".").map(Number);
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
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
