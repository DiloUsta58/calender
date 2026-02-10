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
const TURKISH_KEY = "calendar_turkish_holidays";
const ARABIC_KEY = "calendar_arabic_holidays";
const SHIFT_KEY = "calendar_shift_plan";
const APP_VERSION = "1.0.3";

let events = JSON.parse(localStorage.getItem(EVENTS_KEY)) || [
/*  { date: "2026-02-10", type: "appointment", title: "Arzt 10:00" },
  { date: "2026-02-14", type: "birthday", title: "Mama 🎂" }*/
];


function saveEvents() {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}

// Initialisierung
const grid = document.querySelector(".calendar-grid");
const monthLabel = document.getElementById("monthLabel");
const monthSelect = document.getElementById("monthSelect");
const yearInput = document.getElementById("yearInput");
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

let currentDate = new Date();
let includeIslamic = JSON.parse(localStorage.getItem(ISLAMIC_KEY)) || false;
let includeGerman = JSON.parse(localStorage.getItem(GERMAN_KEY)) ?? true;
let includeTurkish = JSON.parse(localStorage.getItem(TURKISH_KEY)) ?? true;
let includeArabic = JSON.parse(localStorage.getItem(ARABIC_KEY)) ?? false;
let shiftPlan = JSON.parse(localStorage.getItem(SHIFT_KEY)) || null;

const MONTH_NAMES = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember"
];

function setupMonthPicker() {
  if (!monthSelect || !yearInput) return;
  monthSelect.innerHTML = MONTH_NAMES
    .map((name, i) => `<option value="${i}">${name}</option>`)
    .join("");

  yearInput.value = String(currentDate.getFullYear());
  monthSelect.value = String(currentDate.getMonth());

  monthSelect.addEventListener("change", () => {
    const m = Number(monthSelect.value);
    const y = Number(yearInput.value);
    currentDate = new Date(y, m, 1);
    renderCalendar(currentDate);
  });

  const applyYear = () => {
    const y = Number(yearInput.value);
    if (!Number.isFinite(y) || y < 1900 || y > 2100) return;
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
}

function renderCalendar(date) {

  // alte Tage/Platzhalter löschen (Wochentage bleiben)
  grid.querySelectorAll(".day, .pad, .week-number").forEach(d => d.remove());

  const year = date.getFullYear();
  const month = date.getMonth();

  monthLabel.textContent =
    date.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
  if (monthSelect && yearInput) {
    monthSelect.value = String(month);
    yearInput.value = String(year);
  }

  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  // Montag = 0
  const startOffset = (firstDay.getDay() + 6) % 7;

  const totalDays = lastDay.getDate();
  const totalCells = startOffset + totalDays;
  const endPad = (7 - (totalCells % 7)) % 7;
  const weeks = (totalCells + endPad) / 7;

  let currentDay = 1;
  let nextMonthDay = 1;

  for (let w = 0; w < weeks; w++) {
    const weekStartDate = new Date(year, month, 1 - startOffset + (w * 7));
    const weekNumber = getISOWeek(weekStartDate);
    const weekCell = document.createElement("div");
    weekCell.className = "week-number";
    weekCell.textContent = weekNumber;
    grid.appendChild(weekCell);

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
      const timeLabel = e.type === "birthday"
        ? ""
        : (e.startTime && e.endTime ? `${e.startTime}–${e.endTime} ` : (e.startTime ? `${e.startTime} ` : ""));
      const titleLabel = e.type === "birthday"
        ? formatBirthdayTitle(e, year)
        : formatRangeTitle(e);
      const bg = e.color || "";
      const fg = bg ? getContrastColor(bg) : "";
      const colorStyle = bg ? ` style="background:${bg};color:${fg};"` : "";
      const fullText = `${timeLabel}${titleLabel}`;
      entries.innerHTML += `<div class="entry ${e.type}" data-date="${iso}" data-index="${eventIndex}" data-full-text="${fullText.replace(/"/g, "&quot;")}" title="Klicken zum Bearbeiten"${colorStyle}>${fullText}</div>`;
    });

  const holidayList = [
    ...(includeGerman ? HOLIDAYS.DE(year) : []),
    ...(includeTurkish ? HOLIDAYS.TR(year) : []),
    ...(includeArabic ? HOLIDAYS.MA(year) : [])
  ];

  holidayList
    .filter(h => h.date === iso)
    .forEach(h => {
      isHoliday = true;
      entries.innerHTML += `<div class="entry holiday">${h.name}</div>`;
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

  const weekdayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const weekdayIndex = (dayOfWeek + 6) % 7; // Monday=0

  cell.innerHTML = `
    <div class="day-head">
      <div class="day-weekday">${weekdayNames[weekdayIndex]}</div>
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

renderCalendar(currentDate);
setupMonthPicker();
if (versionLabel) {
  versionLabel.textContent = `v${APP_VERSION}`;
}

if (toggleMonthPicker && calendarRoot) {
  toggleMonthPicker.addEventListener("click", () => {
    calendarRoot.classList.toggle("show-month-controls");
  });
}

function showEntryOverlayForDate(iso) {
  if (!entryOverlay || !overlayBody || !overlayTitle) return;
  const dateObj = parseDateSafe(iso);
  const titleText = dateObj
    ? dateObj.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "Ereignisse";
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
  if (!dateObj) return `<div class="overlay-empty">Keine Ereignisse</div>`;
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const items = [];

  events
    .filter(e => eventMatchesDate(e, year, month, day, iso))
    .forEach(e => {
      const timeLabel = e.type === "birthday"
        ? ""
        : (e.startTime && e.endTime ? `${e.startTime}–${e.endTime} ` : (e.startTime ? `${e.startTime} ` : ""));
      const titleLabel = e.type === "birthday"
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

  const holidayList = [
    ...(includeGerman ? HOLIDAYS.DE(year) : []),
    ...(includeTurkish ? HOLIDAYS.TR(year) : []),
    ...(includeArabic ? HOLIDAYS.MA(year) : [])
  ];
  holidayList
    .filter(h => h.date === iso)
    .forEach(h => {
      items.push(`<div class="overlay-item holiday">${h.name}</div>`);
    });

  if (includeIslamic) {
    const islamicEntries = getIslamicHolidaysForDate(year, month, day);
    islamicEntries.forEach(name => {
      items.push(`<div class="overlay-item holiday">${name}</div>`);
    });
  }

  if (!items.length) return `<div class="overlay-empty">Keine Ereignisse</div>`;
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

function eventMatchesDate(e, year, month, day, iso) {
  if (e.type !== "birthday") {
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
  const name = e.title || "Geburtstag";
  if (Number.isFinite(age) && age > 0) {
    return `${name} (${age}. Geburtstag)`;
  }
  return name;
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
