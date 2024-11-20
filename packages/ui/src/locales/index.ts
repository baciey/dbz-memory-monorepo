import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "./pl/translation.json";
import en from "./en/translation.json";

export const i18nInit = i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: pl,
      },
      en: {
        translation: en,
      },
    },
    compatibilityJSON: "v3",
    lng: "pl",
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  })
  .catch((error) => {
    console.log("Cannot initialize i18n", error);
  });
