const SHIFT_KEY = "calendar_shift_plan";

const MODEL_PATTERNS = {
  "1": ["-", "-", "F", "F", "F", "F", "F", "-", "-", "F", "F", "F", "F", "F", "-", "-", "F", "F", "F", "F", "F", "-", "-", "F", "F", "F", "F", "F"],
  "2": ["F", "F", "F", "F", "F", "-", "-", "M", "M", "M", "M", "M", "-", "-"],
  "3": ["-", "-", "N", "N", "N", "N", "-", "-", "-", "M", "M", "M", "M", "M", "-", "-", "F", "F", "F", "F", "F"],
  "4": ["M", "N", "N", "N", "-", "-", "F", "F", "-", "M", "M", "N", "N", "-", "-", "-", "F", "F", "M", "M", "N", "-", "-", "-", "-", "F", "F", "M"],
  "5": ["M", "N", "N", "-", "-", "-", "-", "F", "F", "M", "M", "N", "N", "-", "-", "-", "-", "F", "F", "M", "M", "N", "N", "-", "-", "-", "-", "F", "F", "M"]
};

function loadPlan() {
  return JSON.parse(localStorage.getItem(SHIFT_KEY)) || null;
}

function savePlan(plan) {
  localStorage.setItem(SHIFT_KEY, JSON.stringify(plan));
}

function byId(id) {
  return document.getElementById(id);
}

const modelEl = byId("shiftModel");
const startEl = byId("shiftStart");
const enabledEl = byId("shiftEnabled");
const colorPresetF = byId("shiftColorPresetF");
const colorCustomF = byId("shiftColorCustomF");
const colorPresetM = byId("shiftColorPresetM");
const colorCustomM = byId("shiftColorCustomM");
const colorPresetN = byId("shiftColorPresetN");
const colorCustomN = byId("shiftColorCustomN");
const labelF = byId("labelF");
const labelM = byId("labelM");
const labelN = byId("labelN");
const previewEl = byId("shiftPreview");
const patternEl = byId("shiftPattern");
const startCodeEl = byId("shiftStartCode");
const previewBtn = byId("previewBtn");

const todayIso = new Date().toISOString().slice(0, 10);
const existing = loadPlan();

modelEl.value = existing?.model || "3";
startEl.value = existing?.startDate || todayIso;
enabledEl.checked = existing?.enabled ?? true;
labelF.value = existing?.labels?.F || "F (06–14)";
labelM.value = existing?.labels?.M || "M (14–22)";
labelN.value = existing?.labels?.N || "N (22–06)";
const defaultColors = {
  F: existing?.shiftColors?.F || "#22c55e",
  M: existing?.shiftColors?.M || "#3b82f6",
  N: existing?.shiftColors?.N || "#ef4444"
};
colorCustomF.value = defaultColors.F;
colorCustomM.value = defaultColors.M;
colorCustomN.value = defaultColors.N;
patternEl.value = existing?.patternRaw || "";
startCodeEl.value = existing?.startCode || "F";

function initPreset(presetEl, customEl, value) {
  if ([...presetEl.options].some(o => o.value === value)) {
    presetEl.value = value;
  } else {
    presetEl.value = "custom";
  }
  customEl.value = value;
}

function wirePreset(presetEl, customEl) {
  presetEl.addEventListener("change", () => {
    if (presetEl.value !== "custom") {
      customEl.value = presetEl.value;
    }
  });
}

initPreset(colorPresetF, colorCustomF, defaultColors.F);
initPreset(colorPresetM, colorCustomM, defaultColors.M);
initPreset(colorPresetN, colorCustomN, defaultColors.N);

wirePreset(colorPresetF, colorCustomF);
wirePreset(colorPresetM, colorCustomM);
wirePreset(colorPresetN, colorCustomN);

function getShiftForDate(dateObj, plan) {
  if (!plan || !plan.enabled || !plan.pattern?.length) return null;
  const start = new Date(plan.startDate);
  const diff = Math.floor((dateObj - start) / 86400000);
  const len = plan.pattern.length;
  const offset = getStartOffset(plan);
  const idx = ((diff + offset) % len + len) % len;
  const code = plan.pattern[idx];
  if (!code || code === "-") return null;
  return code;
}

function getStartOffset(plan) {
  if (!plan?.pattern?.length) return 0;
  if (Number.isInteger(plan.startOffset)) return plan.startOffset;
  if (plan.startCode) {
    const idx = plan.pattern.indexOf(plan.startCode);
    return idx >= 0 ? idx : 0;
  }
  return 0;
}

function renderPreview() {
  if (!previewEl) return;
  const model = modelEl.value;
  const startDate = startEl.value || todayIso;
  const enabled = enabledEl.checked;
  const color = colorCustomF.value || defaultColors.F;
  const labels = {
    F: labelF.value.trim() || "F",
    M: labelM.value.trim() || "M",
    N: labelN.value.trim() || "N"
  };
  const shiftColors = {
    F: colorCustomF.value || "#22c55e",
    M: colorCustomM.value || "#3b82f6",
    N: colorCustomN.value || "#ef4444"
  };
  const pattern = model === "custom" ? parsePattern(patternEl.value) : (MODEL_PATTERNS[model] || []);
  const startCode = startCodeEl.value;
  const plan = { model, startDate, enabled, color, labels, pattern, startCode, shiftColors };
  const start = new Date(startDate);
  const gridStart = startOfWeekMonday(start);

  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const cells = weekdays.map(w => `<div class="shift-weekday">${w}</div>`);

  for (let i = 0; i < 28; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const code = getShiftForDate(d, plan);
    const label = code ? (labels[code] || code) : "-";
    const badgeColor = code ? (shiftColors[code] || color) : "";
    const badgeStyle = code ? ` style="background:${badgeColor};color:#fff"` : ` style="background:#1f2937;color:#9ca3af"`;
    const dateText = d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
    cells.push(
      `<div class="shift-cell">
        <div class="shift-date">${dateText}</div>
        <div class="shift-badge"${badgeStyle}>${label}</div>
      </div>`
    );
  }
  previewEl.innerHTML = cells.join("");
}

["change", "input"].forEach(evt => {
  modelEl.addEventListener(evt, renderPreview);
  startEl.addEventListener(evt, renderPreview);
  startCodeEl.addEventListener(evt, renderPreview);
  enabledEl.addEventListener(evt, renderPreview);
  colorPresetF.addEventListener(evt, renderPreview);
  colorCustomF.addEventListener(evt, renderPreview);
  colorPresetM.addEventListener(evt, renderPreview);
  colorCustomM.addEventListener(evt, renderPreview);
  colorPresetN.addEventListener(evt, renderPreview);
  colorCustomN.addEventListener(evt, renderPreview);
  labelF.addEventListener(evt, renderPreview);
  labelM.addEventListener(evt, renderPreview);
  labelN.addEventListener(evt, renderPreview);
});

renderPreview();

patternEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    renderPreview();
  }
});

previewBtn?.addEventListener("click", renderPreview);

byId("saveShift").addEventListener("click", () => {
  const model = modelEl.value;
  const startDate = startEl.value || todayIso;
  const enabled = enabledEl.checked;
  const color = existing?.color || colorCustomF.value || "#22c55e";
  const labels = {
    F: labelF.value.trim() || "F",
    M: labelM.value.trim() || "M",
    N: labelN.value.trim() || "N"
  };
  const shiftColors = {
    F: colorCustomF.value || "#22c55e",
    M: colorCustomM.value || "#3b82f6",
    N: colorCustomN.value || "#ef4444"
  };

  const pattern = model === "custom" ? parsePattern(patternEl.value) : (MODEL_PATTERNS[model] || []);
  const patternRaw = patternEl.value.trim();
  const startCode = startCodeEl.value;
  const plan = { model, startDate, enabled, color, labels, pattern, patternRaw, startCode, shiftColors };
  savePlan(plan);
  window.location.href = "index.html";
});

byId("deleteShift").addEventListener("click", () => {
  const ok = confirm("Schichtplan wirklich löschen?");
  if (!ok) return;
  localStorage.removeItem(SHIFT_KEY);
  window.location.href = "index.html";
});

function parsePattern(text) {
  return text
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function startOfWeekMonday(date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Monday=0
  d.setDate(d.getDate() - day);
  return d;
}
