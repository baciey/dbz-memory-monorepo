export const validatePassword = (password: string): string => {
  if (password.length < 6) {
    return "Password is too short";
  }

  return "";
};
