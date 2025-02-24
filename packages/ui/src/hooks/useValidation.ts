import { useTranslation } from "react-i18next";

export const useValidation = () => {
  const { t } = useTranslation();

  const validateName = (text: string): string => {
    const trimmedText = text.trim();
    if (!/^[\p{L}0-9 ]*$/u.test(trimmedText)) {
      return t("validation.name.onlyLettersNumbersSpaces");
    } else if (trimmedText.length > 20) {
      return t("validation.name.max20Characters");
    } else if (trimmedText.length < 3) {
      return t("validation.name.min3Characters");
    } else if (/\s{2,}/.test(trimmedText)) {
      return t("validation.name.noConsecutiveSpaces");
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return t("validation.email.invalidFormat");
    }

    if (trimmedEmail.length > 254) {
      return t("validation.email.tooLong");
    }

    return "";
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6) {
      return t("validation.password.min6Characters");
    }

    return "";
  };

  return { validateName, validateEmail, validatePassword };
};
