import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./pl/translation.json";
import en from "./en/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    pl: { translation: pl },
    en: { translation: en },
  },
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export { i18n };
