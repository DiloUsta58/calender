/* =========================
   LANGUAGE DEFINITIONS
========================= */

const translations = {
	
  tr: {

  },

  Arab: {

  },
  
  de: {
  },

  en: {

  },

  fr: {

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

  localStorage.setItem("language", lang);
}

function t(key) {
  const lang = localStorage.getItem("language") || "de";
  return translations[lang][key] || key;
}

function detectBrowserLanguage() {
  const supported = ["de", "tr", "en", "fr"];

  const browserLang =
    navigator.language ||
    navigator.userLanguage ||
    "de";

  const short = browserLang.slice(0, 2).toLowerCase();

  return supported.includes(short) ? short : "de";
}
