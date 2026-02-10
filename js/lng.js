/* =========================
   LANGUAGE DEFINITIONS
========================= */

const translations = {
  de: {
    app_title: "Kalender+",
    locale: "de-DE",
    month_names: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    weekday_short: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    app_settings: "App Einstellungen",
    back: "Zurück",
    holidays: "Feiertage",
    islamic_holidays: "Islamische Feiertage",
    german_holidays: "Deutsche Feiertage",
    turkish_holidays: "Türkische Feiertage",
    arabic_holidays: "Arabische Feiertage",
    language: "Sprache",
    app_language: "App‑Sprache",
    cancel: "Abbrechen",
    apply: "Übernehmen",
    select_month: "Monat wählen",
    today: "Heute",
    settings: "Einstellungen",
    events: "Ereignisse",
    appointment: "Termin",
    birthday: "Geburtstag",
    birthday_suffix: "Geburtstag",
    shift: "Schicht",
    vacation: "Urlaub",
    rights: "Alle Rechte vorbehalten",
    event_title: "Ereignis",
    name: "Name",
    birthday_entry: "Geburtstag eintragen",
    title: "Titel",
    location: "Ort",
    repeats: "Wiederholungen",
    once: "Einmalig",
    once_current_year: "Einmalig (aktuelles Jahr)",
    yearly: "Jährlich",
    yearly_forever: "Für immer (jährlich)",
    start: "Beginn",
    end: "Ende",
    year: "Jahr",
    color: "Farbe",
    notes: "Notizen",
    delete_entry: "Eintrag löschen",
    full_date_hint: "Bitte vollständiges Datum eingeben (TT.MM.JJJJ)",
    shift_plan: "Schichtplan",
    model_period: "Modell & Zeitraum",
    model: "Modell",
    model_1: "1‑Schicht (nur Früh)",
    model_2: "2‑Schicht (Früh/Mittag)",
    model_3: "3‑Schicht (Früh/Mittag/Nacht)",
    model_4: "4‑Schicht",
    model_5: "5‑Schicht",
    model_custom: "Eigenes Muster",
    first_shift_date: "Datum der 1. Schicht",
    shift_on_start: "Schicht am Startdatum",
    early: "Früh",
    noon: "Mittag",
    night: "Nacht",
    off: "Frei",
    rhythm: "Schichtrhythmus (Komma‑getrennt)",
    rhythm_example: "z.B. M,N,-,-,-,-,F,F,M,M,N,N,-,-,-,-,F,F,M",
    rhythm_help: "Komma‑getrennt: F=Früh, M=Mittag, N=Nacht, -=frei. Keine Leerzeichen am Ende.",
    preview_update: "Vorschau aktualisieren",
    test_plan: "Schichtplan testen (1 Jahr)",
    active: "Aktiv",
    labels_colors: "Labels & Farben",
    early_label: "Früh‑Label",
    early_help: "Anzeige Text Frühschicht..",
    noon_label: "Mittag‑Label",
    noon_help: "Anzeige Text Mittagschicht..",
    night_label: "Nacht‑Label",
    night_help: "Anzeige Text Nachtschicht..",
    early_color: "Früh‑Farbe",
    noon_color: "Mittag‑Farbe",
    night_color: "Nacht‑Farbe",
    preview_4w: "Vorschau (4 Wochen)",
    delete_shift: "Schichtplan löschen",
    color_blue: "Blau",
    color_green: "Grün",
    color_red: "Rot",
    color_orange: "Orange",
    color_yellow: "Gelb",
    color_purple: "Violett",
    color_pink: "Pink",
    color_teal: "Türkis",
    color_cyan: "Cyan",
    color_lime: "Limette",
    color_custom: "Custom",
    lang_de: "Deutsch",
    lang_tr: "Türkisch",
    lang_en: "Englisch",
    lang_fr: "Französisch",
    lang_ar: "Arabisch",
    overlay_empty: "Keine Ereignisse",
    click_edit: "Klicken zum Bearbeiten",
    confirm_delete_entry: "Eintrag wirklich löschen?",
    confirm_delete_shift: "Schichtplan wirklich löschen?",
    test_ok: "Schicht-Test: OK (keine Sprünge in 1 Jahr).",
    test_issues: "Schicht-Test: Probleme gefunden:",
    invalid_start: "Startdatum ist ungültig.",
    no_pattern: "Kein Schichtmuster vorhanden."
  },

  en: {
    app_title: "Calendar+",
    locale: "en-US",
    month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekday_short: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    app_settings: "App Settings",
    back: "Back",
    holidays: "Holidays",
    islamic_holidays: "Islamic Holidays",
    german_holidays: "German Holidays",
    turkish_holidays: "Turkish Holidays",
    arabic_holidays: "Arabic Holidays",
    language: "Language",
    app_language: "App Language",
    cancel: "Cancel",
    apply: "Apply",
    select_month: "Select month",
    today: "Today",
    settings: "Settings",
    events: "Events",
    appointment: "Appointment",
    birthday: "Birthday",
    birthday_suffix: "birthday",
    shift: "Shift",
    vacation: "Vacation",
    rights: "All rights reserved",
    event_title: "Event",
    name: "Name",
    birthday_entry: "Enter birthday",
    title: "Title",
    location: "Location",
    repeats: "Repeats",
    once: "Once",
    once_current_year: "Once (current year)",
    yearly: "Yearly",
    yearly_forever: "Forever (yearly)",
    start: "Start",
    end: "End",
    year: "Year",
    color: "Color",
    notes: "Notes",
    delete_entry: "Delete entry",
    full_date_hint: "Please enter full date (DD.MM.YYYY)",
    shift_plan: "Shift plan",
    model_period: "Model & period",
    model: "Model",
    model_1: "1‑shift (early only)",
    model_2: "2‑shift (early/afternoon)",
    model_3: "3‑shift (early/afternoon/night)",
    model_4: "4‑shift",
    model_5: "5‑shift",
    model_custom: "Custom pattern",
    first_shift_date: "Date of 1st shift",
    shift_on_start: "Shift on start date",
    early: "Early",
    noon: "Afternoon",
    night: "Night",
    off: "Off",
    rhythm: "Shift rhythm (comma‑separated)",
    rhythm_example: "e.g. M,N,-,-,-,-,F,F,M,M,N,N,-,-,-,-,F,F,M",
    rhythm_help: "Comma‑separated: F=Early, M=Afternoon, N=Night, -=off. No trailing spaces.",
    preview_update: "Update preview",
    test_plan: "Test shift plan (1 year)",
    active: "Active",
    labels_colors: "Labels & colors",
    early_label: "Early label",
    early_help: "Label text for early shift..",
    noon_label: "Afternoon label",
    noon_help: "Label text for afternoon shift..",
    night_label: "Night label",
    night_help: "Label text for night shift..",
    early_color: "Early color",
    noon_color: "Afternoon color",
    night_color: "Night color",
    preview_4w: "Preview (4 weeks)",
    delete_shift: "Delete shift plan",
    color_blue: "Blue",
    color_green: "Green",
    color_red: "Red",
    color_orange: "Orange",
    color_yellow: "Yellow",
    color_purple: "Purple",
    color_pink: "Pink",
    color_teal: "Teal",
    color_cyan: "Cyan",
    color_lime: "Lime",
    color_custom: "Custom",
    lang_de: "German",
    lang_tr: "Turkish",
    lang_en: "English",
    lang_fr: "French",
    lang_ar: "Arabic",
    overlay_empty: "No events",
    click_edit: "Click to edit",
    confirm_delete_entry: "Delete this entry?",
    confirm_delete_shift: "Delete shift plan?",
    test_ok: "Shift test: OK (no jumps in 1 year).",
    test_issues: "Shift test: issues found:",
    invalid_start: "Start date is invalid.",
    no_pattern: "No shift pattern available."
  },

  tr: {
    app_title: "Takvim+",
    locale: "tr-TR",
    month_names: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    weekday_short: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    app_settings: "Uygulama Ayarları",
    back: "Geri",
    holidays: "Resmî Tatiller",
    islamic_holidays: "İslami Bayramlar",
    german_holidays: "Almanya Tatilleri",
    turkish_holidays: "Türkiye Tatilleri",
    arabic_holidays: "Arap Tatilleri",
    language: "Dil",
    app_language: "Uygulama Dili",
    cancel: "İptal",
    apply: "Uygula",
    select_month: "Ay seç",
    today: "Bugün",
    settings: "Ayarlar",
    events: "Etkinlikler",
    appointment: "Randevu",
    birthday: "Doğum günü",
    birthday_suffix: "doğum günü",
    shift: "Vardiya",
    vacation: "İzin",
    rights: "Tüm hakları saklıdır",
    event_title: "Etkinlik",
    name: "İsim",
    birthday_entry: "Doğum günü gir",
    title: "Başlık",
    location: "Yer",
    repeats: "Tekrarlama",
    once: "Bir kez",
    once_current_year: "Bir kez (bu yıl)",
    yearly: "Yıllık",
    yearly_forever: "Sürekli (yıllık)",
    start: "Başlangıç",
    end: "Bitiş",
    year: "Yıl",
    color: "Renk",
    notes: "Notlar",
    delete_entry: "Kaydı sil",
    full_date_hint: "Lütfen tam tarih girin (GG.AA.YYYY)",
    shift_plan: "Vardiya planı",
    model_period: "Model ve dönem",
    model: "Model",
    model_1: "1‑vardiya (sadece sabah)",
    model_2: "2‑vardiya (sabah/öğlen)",
    model_3: "3‑vardiya (sabah/öğlen/gece)",
    model_4: "4‑vardiya",
    model_5: "5‑vardiya",
    model_custom: "Özel düzen",
    first_shift_date: "1. vardiya tarihi",
    shift_on_start: "Başlangıçtaki vardiya",
    early: "Sabah",
    noon: "Öğlen",
    night: "Gece",
    off: "İzin",
    rhythm: "Vardiya ritmi (virgülle)",
    rhythm_example: "örn. M,N,-,-,-,-,F,F,M,M,N,N,-,-,-,-,F,F,M",
    rhythm_help: "Virgülle: F=Sabah, M=Öğlen, N=Gece, -=izin. Sonda boşluk olmasın.",
    preview_update: "Önizleme güncelle",
    test_plan: "Vardiya planını test et (1 yıl)",
    active: "Aktif",
    labels_colors: "Etiketler ve renkler",
    early_label: "Sabah etiketi",
    early_help: "Sabah vardiya metni..",
    noon_label: "Öğlen etiketi",
    noon_help: "Öğlen vardiya metni..",
    night_label: "Gece etiketi",
    night_help: "Gece vardiya metni..",
    early_color: "Sabah rengi",
    noon_color: "Öğlen rengi",
    night_color: "Gece rengi",
    preview_4w: "Önizleme (4 hafta)",
    delete_shift: "Vardiya planını sil",
    color_blue: "Mavi",
    color_green: "Yeşil",
    color_red: "Kırmızı",
    color_orange: "Turuncu",
    color_yellow: "Sarı",
    color_purple: "Mor",
    color_pink: "Pembe",
    color_teal: "Turkuaz",
    color_cyan: "Camgöbeği",
    color_lime: "Limon",
    color_custom: "Özel",
    lang_de: "Almanca",
    lang_tr: "Türkçe",
    lang_en: "İngilizce",
    lang_fr: "Fransızca",
    lang_ar: "Arapça",
    overlay_empty: "Etkinlik yok",
    click_edit: "Düzenlemek için tıkla",
    confirm_delete_entry: "Kaydı silmek istiyor musun?",
    confirm_delete_shift: "Vardiya planı silinsin mi?",
    test_ok: "Vardiya testi: OK (1 yılda sıçrama yok).",
    test_issues: "Vardiya testi: sorun bulundu:",
    invalid_start: "Başlangıç tarihi geçersiz.",
    no_pattern: "Vardiya düzeni yok."
  },

  fr: {
    app_title: "Calendrier+",
    locale: "fr-FR",
    month_names: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    weekday_short: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    app_settings: "Paramètres de l’application",
    back: "Retour",
    holidays: "Jours fériés",
    islamic_holidays: "Fêtes islamiques",
    german_holidays: "Fêtes allemandes",
    turkish_holidays: "Fêtes turques",
    arabic_holidays: "Fêtes arabes",
    language: "Langue",
    app_language: "Langue de l’app",
    cancel: "Annuler",
    apply: "Appliquer",
    select_month: "Choisir le mois",
    today: "Aujourd’hui",
    settings: "Paramètres",
    events: "Événements",
    appointment: "Rendez‑vous",
    birthday: "Anniversaire",
    birthday_suffix: "anniversaire",
    shift: "Équipe",
    vacation: "Vacances",
    rights: "Tous droits réservés",
    event_title: "Événement",
    name: "Nom",
    birthday_entry: "Saisir l’anniversaire",
    title: "Titre",
    location: "Lieu",
    repeats: "Répétition",
    once: "Une fois",
    once_current_year: "Une fois (année en cours)",
    yearly: "Annuel",
    yearly_forever: "Toujours (annuel)",
    start: "Début",
    end: "Fin",
    year: "Année",
    color: "Couleur",
    notes: "Notes",
    delete_entry: "Supprimer l’entrée",
    full_date_hint: "Veuillez saisir la date complète (JJ.MM.AAAA)",
    shift_plan: "Plan d’équipe",
    model_period: "Modèle et période",
    model: "Modèle",
    model_1: "1‑équipe (matin)",
    model_2: "2‑équipes (matin/après‑midi)",
    model_3: "3‑équipes (matin/après‑midi/nuit)",
    model_4: "4‑équipes",
    model_5: "5‑équipes",
    model_custom: "Modèle personnalisé",
    first_shift_date: "Date de la 1re équipe",
    shift_on_start: "Équipe au début",
    early: "Matin",
    noon: "Après‑midi",
    night: "Nuit",
    off: "Repos",
    rhythm: "Rythme (séparé par des virgules)",
    rhythm_example: "ex. M,N,-,-,-,-,F,F,M,M,N,N,-,-,-,-,F,F,M",
    rhythm_help: "Séparé par des virgules : F=Matin, M=Après‑midi, N=Nuit, -=repos. Pas d’espace en fin.",
    preview_update: "Mettre à jour l’aperçu",
    test_plan: "Tester le plan (1 an)",
    active: "Actif",
    labels_colors: "Libellés et couleurs",
    early_label: "Libellé matin",
    early_help: "Texte pour l’équipe du matin..",
    noon_label: "Libellé après‑midi",
    noon_help: "Texte pour l’équipe de l’après‑midi..",
    night_label: "Libellé nuit",
    night_help: "Texte pour l’équipe de nuit..",
    early_color: "Couleur matin",
    noon_color: "Couleur après‑midi",
    night_color: "Couleur nuit",
    preview_4w: "Aperçu (4 semaines)",
    delete_shift: "Supprimer le plan",
    color_blue: "Bleu",
    color_green: "Vert",
    color_red: "Rouge",
    color_orange: "Orange",
    color_yellow: "Jaune",
    color_purple: "Violet",
    color_pink: "Rose",
    color_teal: "Turquoise",
    color_cyan: "Cyan",
    color_lime: "Citron vert",
    color_custom: "Personnalisé",
    lang_de: "Allemand",
    lang_tr: "Turc",
    lang_en: "Anglais",
    lang_fr: "Français",
    lang_ar: "Arabe",
    overlay_empty: "Aucun événement",
    click_edit: "Cliquer pour modifier",
    confirm_delete_entry: "Supprimer cette entrée ?",
    confirm_delete_shift: "Supprimer le plan d’équipe ?",
    test_ok: "Test d’équipe : OK (aucun saut sur 1 an).",
    test_issues: "Test d’équipe : problèmes trouvés :",
    invalid_start: "La date de début est invalide.",
    no_pattern: "Aucun modèle d’équipe."
  },

  ar: {
    app_title: "التقويم+",
    locale: "ar",
    month_names: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    weekday_short: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
    app_settings: "إعدادات التطبيق",
    back: "رجوع",
    holidays: "العطل",
    islamic_holidays: "العطل الإسلامية",
    german_holidays: "العطل الألمانية",
    turkish_holidays: "العطل التركية",
    arabic_holidays: "العطل العربية",
    language: "اللغة",
    app_language: "لغة التطبيق",
    cancel: "إلغاء",
    apply: "تطبيق",
    select_month: "اختيار الشهر",
    today: "اليوم",
    settings: "الإعدادات",
    events: "الأحداث",
    appointment: "موعد",
    birthday: "عيد ميلاد",
    birthday_suffix: "عيد ميلاد",
    shift: "وردية",
    vacation: "إجازة",
    rights: "جميع الحقوق محفوظة",
    event_title: "حدث",
    name: "الاسم",
    birthday_entry: "إدخال عيد الميلاد",
    title: "العنوان",
    location: "الموقع",
    repeats: "التكرار",
    once: "مرة واحدة",
    once_current_year: "مرة واحدة (هذا العام)",
    yearly: "سنوي",
    yearly_forever: "دائمًا (سنوي)",
    start: "البداية",
    end: "النهاية",
    year: "السنة",
    color: "اللون",
    notes: "ملاحظات",
    delete_entry: "حذف الإدخال",
    full_date_hint: "يرجى إدخال التاريخ الكامل (يوم.شهر.سنة)",
    shift_plan: "جدول الورديات",
    model_period: "النموذج والفترة",
    model: "النموذج",
    model_1: "وردية واحدة (صباح فقط)",
    model_2: "وردّيتان (صباح/ظهر)",
    model_3: "ثلاث ورديات (صباح/ظهر/ليل)",
    model_4: "أربع ورديات",
    model_5: "خمس ورديات",
    model_custom: "نمط مخصص",
    first_shift_date: "تاريخ أول وردية",
    shift_on_start: "الوردية في تاريخ البدء",
    early: "صباح",
    noon: "ظهر",
    night: "ليل",
    off: "راحة",
    rhythm: "إيقاع الورديات (مفصول بفواصل)",
    rhythm_example: "مثال: M,N,-,-,-,-,F,F,M,M,N,N,-,-,-,-,F,F,M",
    rhythm_help: "مفصول بفواصل: F=صباح، M=ظهر، N=ليل، -=راحة. بدون مسافات في النهاية.",
    preview_update: "تحديث المعاينة",
    test_plan: "اختبار جدول الورديات (سنة)",
    active: "مفعل",
    labels_colors: "التسميات والألوان",
    early_label: "تسمية الصباح",
    early_help: "نص وردية الصباح..",
    noon_label: "تسمية الظهر",
    noon_help: "نص وردية الظهر..",
    night_label: "تسمية الليل",
    night_help: "نص وردية الليل..",
    early_color: "لون الصباح",
    noon_color: "لون الظهر",
    night_color: "لون الليل",
    preview_4w: "معاينة (4 أسابيع)",
    delete_shift: "حذف جدول الورديات",
    color_blue: "أزرق",
    color_green: "أخضر",
    color_red: "أحمر",
    color_orange: "برتقالي",
    color_yellow: "أصفر",
    color_purple: "بنفسجي",
    color_pink: "وردي",
    color_teal: "فيروزي",
    color_cyan: "سماوي",
    color_lime: "ليموني",
    color_custom: "مخصص",
    lang_de: "الألمانية",
    lang_tr: "التركية",
    lang_en: "الإنجليزية",
    lang_fr: "الفرنسية",
    lang_ar: "العربية",
    overlay_empty: "لا توجد أحداث",
    click_edit: "انقر للتعديل",
    confirm_delete_entry: "حذف هذا الإدخال؟",
    confirm_delete_shift: "حذف جدول الورديات؟",
    test_ok: "اختبار الورديات: تم (لا يوجد قفزات خلال سنة).",
    test_issues: "اختبار الورديات: تم العثور على مشاكل:",
    invalid_start: "تاريخ البدء غير صالح.",
    no_pattern: "لا يوجد نمط ورديات."
  }
};

/* =========================
   LANGUAGE HANDLER
========================= */

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.dataset.i18nTitle;
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("title", translations[lang][key]);
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    const key = el.dataset.i18nAriaLabel;
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("aria-label", translations[lang][key]);
    }
  });

  document.documentElement.lang = lang;
  localStorage.setItem("language", lang);
  document.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang } }));
}

function t(key) {
  const lang = localStorage.getItem("language") || "de";
  return (translations[lang] && translations[lang][key]) || key;
}

function getLang() {
  return localStorage.getItem("language") || "de";
}

function getLangData(key, fallback) {
  const lang = getLang();
  const value = translations[lang] && translations[lang][key];
  return value !== undefined ? value : fallback;
}

function detectBrowserLanguage() {
  const supported = ["de", "tr", "en", "fr", "ar"];

  const browserLang =
    navigator.language ||
    navigator.userLanguage ||
    "de";

  const short = browserLang.slice(0, 2).toLowerCase();

  return supported.includes(short) ? short : "de";
}

window.i18n = { t, setLanguage, getLang, getLangData };

/* =========================
   SPRACHE
========================= */

const langSelect = document.getElementById("languageSelect");
let savedLang = localStorage.getItem("language");

if (!savedLang) {
  savedLang = detectBrowserLanguage();
  localStorage.setItem("language", savedLang);
}

if (langSelect) {
  langSelect.addEventListener("change", e => {
    const lang = e.target.value;
    setLanguage(lang);
    updateLanguageFlag(lang);
  });

  langSelect.value = savedLang;
  updateLanguageFlag(savedLang);
}

setLanguage(savedLang);

/* =========================
   FLAGGEN
========================= */

function updateLanguageFlag(lang) {
  const flags = {
    de: "flags/flagde.png",
    ar: "flags/flagma.png",
    tr: "flags/flagtr.png",
    en: "flags/flagen.png",
    fr: "flags/flagfr.png"
  };

  const img = document.getElementById("langFlag");
  if (img && flags[lang]) {
    img.src = flags[lang];
    img.alt = lang.toUpperCase();
  }
}
