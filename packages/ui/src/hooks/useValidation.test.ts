import { renderHook } from "@testing-library/react-native";
import { useValidation } from "./useValidation";
import { TestHooksWrapper } from "../utils/testUtils";

describe("useValidation", () => {
  it("validateName", () => {
    const {
      result: {
        current: { validateName },
      },
    } = renderHook(() => useValidation(), { wrapper: TestHooksWrapper });

    expect(validateName("test 1234")).toBe("");
    expect(validateName("  test")).toBe("");
    expect(validateName("test  ")).toBe("");
    expect(validateName("abc")).toBe(""); // Exactly minimum
    expect(validateName("a".repeat(20))).toBe(""); // Exactly maximum

    expect(validateName("  test  test  ")).toBe(
      "No consecutive spaces allowed.",
    );
    expect(validateName("test      test")).toBe(
      "No consecutive spaces allowed.",
    );

    const warningLettersNumbersMinimum = "Minimum length is 3 characters.";
    expect(validateName("")).toBe(warningLettersNumbersMinimum);
    expect(validateName("   ")).toBe(warningLettersNumbersMinimum);
    expect(validateName("a")).toBe(warningLettersNumbersMinimum);
    expect(validateName("ab")).toBe(warningLettersNumbersMinimum);

    expect(validateName("a".repeat(21))).toBe(
      "Maximum length is 20 characters.",
    );

    const warningLettersNumbers =
      "Only letters, numbers, and spaces are allowed.";
    expect(validateName("test1234!")).toBe(warningLettersNumbers);
    expect(validateName("1234test!")).toBe(warningLettersNumbers);
    expect(validateName("test`")).toBe(warningLettersNumbers);
    expect(validateName("test!")).toBe(warningLettersNumbers);
    expect(validateName("test@")).toBe(warningLettersNumbers);
    expect(validateName("test#")).toBe(warningLettersNumbers);
    expect(validateName("test$")).toBe(warningLettersNumbers);
    expect(validateName("test%")).toBe(warningLettersNumbers);
    expect(validateName("test^")).toBe(warningLettersNumbers);
    expect(validateName("test&")).toBe(warningLettersNumbers);
    expect(validateName("test*")).toBe(warningLettersNumbers);
    expect(validateName("test(")).toBe(warningLettersNumbers);
    expect(validateName("test)")).toBe(warningLettersNumbers);
    expect(validateName("test-")).toBe(warningLettersNumbers);
    expect(validateName("test_")).toBe(warningLettersNumbers);
    expect(validateName("test=")).toBe(warningLettersNumbers);
    expect(validateName("test+")).toBe(warningLettersNumbers);
    expect(validateName("test[")).toBe(warningLettersNumbers);
    expect(validateName("test]")).toBe(warningLettersNumbers);
    expect(validateName("test{")).toBe(warningLettersNumbers);
    expect(validateName("test}")).toBe(warningLettersNumbers);
    expect(validateName("test|")).toBe(warningLettersNumbers);
    expect(validateName("test;")).toBe(warningLettersNumbers);
    expect(validateName("test:")).toBe(warningLettersNumbers);
    expect(validateName("test'")).toBe(warningLettersNumbers);
    expect(validateName('test"')).toBe(warningLettersNumbers);
    expect(validateName("test<")).toBe(warningLettersNumbers);
    expect(validateName("test>")).toBe(warningLettersNumbers);
    expect(validateName("test,")).toBe(warningLettersNumbers);
    expect(validateName("test.")).toBe(warningLettersNumbers);
    expect(validateName("test/")).toBe(warningLettersNumbers);
    expect(validateName("test?")).toBe(warningLettersNumbers);
    expect(validateName("test~")).toBe(warningLettersNumbers);
    expect(validateName("test\\")).toBe(warningLettersNumbers);
    expect(validateName("test😀")).toBe(warningLettersNumbers);
    expect(validateName("test€")).toBe(warningLettersNumbers);
    expect(validateName("testñ")).toBe(warningLettersNumbers);
  });

  it("validateEmail", () => {
    const { result } = renderHook(() => useValidation(), {
      wrapper: TestHooksWrapper,
    });

    const { validateEmail } = result.current;

    const warningInvalidFormat = "Invalid email address format.";
    expect(validateEmail("")).toBe(warningInvalidFormat);
    expect(validateEmail("plainaddress")).toBe(warningInvalidFormat);
    expect(validateEmail("missing@domain")).toBe(warningInvalidFormat);
    expect(validateEmail("missing@.com")).toBe(warningInvalidFormat);

    expect(validateEmail("a".repeat(255) + "@example.com")).toBe(
      "Email address is too long.",
    );

    expect(validateEmail("valid.email@example.com")).toBe("");
  });

  it("validatePassword", () => {
    const { result } = renderHook(() => useValidation(), {
      wrapper: TestHooksWrapper,
    });

    const { validatePassword } = result.current;

    const warningShort = "Password is too short (minimum is 6 characters)";
    expect(validatePassword("")).toBe(warningShort);
    expect(validatePassword("short")).toBe(warningShort);
    expect(validatePassword("Valid1Password!")).toBe("");
  });
});
