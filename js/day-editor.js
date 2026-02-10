const EVENTS_KEY = "calendar_events";

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    date: params.get("date"),
    type: params.get("type"),
    index: params.get("index")
  };
}

function loadEvents() {
  return JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];
}

function saveEvents(list) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(list));
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || "";
}

function setChecked(id, value) {
  const el = document.getElementById(id);
  if (el) el.checked = !!value;
}

const { date, type, index } = getParams();
const events = loadEvents();
const indexNum = index !== null ? Number(index) : null;
const existing = Number.isInteger(indexNum) ? events[indexNum] : null;
const editorTitle = document.getElementById("editorTitle");

const todayIso = new Date().toISOString().slice(0, 10);
const startDate = existing?.date || date || todayIso;

setValue("titleInput", existing?.title);
setValue("locationInput", existing?.location);
setValue("startInput", startDate);
setValue("endInput", existing?.endDate || startDate);
setValue("startTimeInput", existing?.startTime || "");
setValue("endTimeInput", existing?.endTime || "");
setValue("notesInput", existing?.notes);
const initialType = existing?.type || type || "appointment";
setValue("typeInput", initialType);

function setEditorTitle(eventType) {
  const titleMap = {
    appointment: t("appointment"),
    birthday: t("birthday"),
    shift: t("shift"),
    vacation: t("vacation")
  };
  const label = titleMap[eventType] || t("event_title");
  if (editorTitle) editorTitle.textContent = label;
  document.title = label;
}
setValue("repeatInput", existing?.repeat || (existing?.type === "birthday" ? "yearly" : "none"));

const deleteBtn = document.getElementById("deleteBtn");
if (!existing && deleteBtn) {
  deleteBtn.style.display = "none";
}

function applyTypeUi(eventType) {
  const titleLabel = document.getElementById("titleLabel");
  const locationField = document.getElementById("locationField");
  const locationLabel = document.getElementById("locationLabel");
  const startLabel = document.getElementById("startLabel");
  const endField = document.getElementById("endField");
  const repeatInput = document.getElementById("repeatInput");
  const startTimeInput = document.getElementById("startTimeInput");
  const endTimeInput = document.getElementById("endTimeInput");
  const birthdayHint = document.getElementById("birthdayHint");
  if (eventType === "birthday") {
    titleLabel.textContent = t("name");
    locationLabel.textContent = t("birthday_entry");
    locationField.style.display = "none";
    startLabel.textContent = t("birthday");
    endField.style.display = "none";
    startTimeInput.disabled = true;
    endTimeInput.disabled = true;
    birthdayHint.style.display = "";
    repeatInput.innerHTML = `
      <option value="once">${t("once_current_year")}</option>
      <option value="yearly">${t("yearly_forever")}</option>
    `;
    if (!["once", "yearly"].includes(repeatInput.value)) repeatInput.value = "yearly";
  } else {
    titleLabel.textContent = t("title");
    locationLabel.textContent = t("location");
    locationField.style.display = "";
    startLabel.textContent = t("start");
    endField.style.display = "";
    startTimeInput.disabled = false;
    endTimeInput.disabled = false;
    birthdayHint.style.display = "none";
    repeatInput.innerHTML = `
      <option value="none">${t("once")}</option>
    `;
    repeatInput.value = "none";
  }
}

const typeInput = document.getElementById("typeInput");
applyTypeUi(initialType);
setEditorTitle(initialType);

document.addEventListener("languageChanged", () => {
  applyTypeUi(initialType);
  setEditorTitle(initialType);
});

// Ensure repeat selection reflects existing value after UI reset
const repeatInputInit = document.getElementById("repeatInput");
if (existing?.repeat && repeatInputInit) {
  repeatInputInit.value = existing.repeat;
}

const colorPreset = document.getElementById("colorPreset");
const colorCustom = document.getElementById("colorCustom");
const existingColor = existing?.color || "#3b82f6";
if ([...colorPreset.options].some(o => o.value === existingColor)) {
  colorPreset.value = existingColor;
} else {
  colorPreset.value = "custom";
  colorCustom.value = existingColor;
}

colorPreset.addEventListener("change", () => {
  if (colorPreset.value !== "custom") {
    colorCustom.value = colorPreset.value;
  }
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const title = document.getElementById("titleInput").value.trim();
  const location = document.getElementById("locationInput").value.trim();
  const repeat = document.getElementById("repeatInput").value;
  const startRaw = document.getElementById("startInput").value;
  const endRaw = document.getElementById("endInput").value;
  const start = normalizeDateInput(startRaw);
  const end = normalizeDateInput(endRaw);
  const startTime = document.getElementById("startTimeInput").value;
  const endTime = document.getElementById("endTimeInput").value;
  const notes = document.getElementById("notesInput").value.trim();
  const eventType = document.getElementById("typeInput").value;
  const color = (colorPreset.value === "custom" ? colorCustom.value : colorPreset.value) || "#3b82f6";

  if (!title || !start) return;

  const repeatYear = eventType === "birthday" && repeat === "once"
    ? new Date().getFullYear()
    : "";

  const eventData = {
    date: start,
    endDate: eventType === "birthday" ? start : (end || start),
    startTime: eventType === "birthday" ? "" : (startTime || ""),
    endTime: eventType === "birthday" ? "" : (endTime || ""),
    type: eventType,
    title,
    location,
    repeat: eventType === "birthday" ? repeat : "none",
    repeatYear,
    color,
    notes
  };

  if (existing && Number.isInteger(indexNum)) {
    events[indexNum] = eventData;
  } else {
    events.push(eventData);
  }

  saveEvents(events);
  window.location.href = "index.html";
});

function normalizeDateInput(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    const [d, m, y] = value.split(".");
    return `${y}-${m}-${d}`;
  }
  return value;
}


deleteBtn?.addEventListener("click", () => {
  if (!existing || !Number.isInteger(indexNum)) return;
  const ok = confirm(t("confirm_delete_entry"));
  if (!ok) return;
  events.splice(indexNum, 1);
  saveEvents(events);
  window.location.href = "index.html";
});
