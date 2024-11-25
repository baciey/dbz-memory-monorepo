export const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return "Invalid email address format.";
  }

  if (trimmedEmail.length > 254) {
    return "Email address is too long.";
  }

  return "";
};
