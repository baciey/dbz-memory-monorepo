import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const i18nInit = i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: require("./pl/translation.json"),
      },
      en: {
        translation: require("./en/translation.json"),
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
