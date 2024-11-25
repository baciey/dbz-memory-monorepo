export const validateName = (text: string): string => {
  const trimmedText = text.trim();
  if (!/^[a-zA-Z0-9 ]*$/.test(trimmedText)) {
    return "Only letters, numbers, and spaces are allowed.";
  }
  if (trimmedText.length > 10) {
    return "Maximum length is 20 characters.";
  }
  if (trimmedText.length < 3 && trimmedText.length > 0) {
    return "Minimum length is 3 characters.";
  }
  if (/\s{2,}/.test(trimmedText)) {
    return "No consecutive spaces allowed.";
  }
  return "";
};
