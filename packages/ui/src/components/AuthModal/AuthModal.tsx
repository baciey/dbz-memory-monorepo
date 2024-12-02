import React, { useCallback, useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { Pressable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { appSelectors } from "../../redux/selectors";
import { useGetIsAuthenticated } from "../../hooks/useGetIsAuthenticated";
import { styles } from "./AuthModal.styles";
import { Button, Modal, Portal, useTheme } from "react-native-paper";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { ThemedButton } from "../ThemedButton";
import { supabase } from "../../utils/supabase";
import { ThemedAlert } from "../ThemedAlert";
import { ThemedTextInput } from "../ThemedTextInput";
import { AUTH_MODAL_TYPES } from "../../redux/slice.types";
import { appSliceActions } from "../../redux/slice";
import { validateEmail } from "../../utils/validateEmail";
import { validatePassword } from "../../utils/validatePassword";
import { Loader } from "../Loader";
import * as Linking from "expo-linking";

const headerText = {
  [AUTH_MODAL_TYPES.LOGIN]: "Log in",
  [AUTH_MODAL_TYPES.REGISTER]: "Register",
  [AUTH_MODAL_TYPES.SET_PASSWORD]: "Set password",
  [AUTH_MODAL_TYPES.FORGOT_PASSWORD]: "Forgot password",
};

export const AuthModal = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(appSelectors.getMe);
  const isAuthenticated = useGetIsAuthenticated();
  const authModal = useAppSelector(appSelectors.getAuthModal);

  const theme = useTheme();
  const { isMobile, isWeb } = useGetScreenDimensions();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string>("");
  const [alertOnPress, setAlertOnPress] = useState<(() => void) | undefined>(
    undefined,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const url = Linking.useURL();

  const isAnonymous = Boolean(me?.isAnonymous);
  const redirectUrl = isWeb
    ? "http://localhost:3000/settings"
    : "myapp://settings";

  const validateInputs = (inputsToValidate: string[]) => {
    const emailErrorText = inputsToValidate.includes("email")
      ? validateEmail(email)
      : "";
    const passwordErrorText = inputsToValidate.includes("password")
      ? validatePassword(password)
      : "";

    const isPasswordSameText =
      password === repeatPassword ? "" : "Passwords do not match";
    const repeatPasswordErrorText = inputsToValidate.includes("repeatPassword")
      ? isPasswordSameText
      : "";

    setEmailError(emailErrorText);
    setPasswordError(passwordErrorText);
    setRepeatPasswordError(repeatPasswordErrorText);
    return emailErrorText || passwordErrorText || repeatPasswordErrorText;
  };

  const signIn = async () => {
    console.log("signIn");

    const hasError = validateInputs([]);
    if (hasError) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setAlert(error.message);
    } else {
      closeModal();
    }

    setLoading(false);
  };

  const signUp = async () => {
    console.log("signUp");

    const hasError = validateInputs(["email", "password", "repeatPassword"]);
    if (hasError) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      setAlert(error.message);
    } else {
      setAlertOnPress(() => {
        return () => openModal(AUTH_MODAL_TYPES.LOGIN);
      });
      setAlert(
        "We have sent you an email to verify your account" + redirectUrl,
      );
    }
    setLoading(false);
  };

  const updatePassword = async () => {
    console.log("updatePassword");

    const hasError = validateInputs(["password", "repeatPassword"]);
    if (hasError) return;

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setAlert(error.message);
    } else {
      setAlertOnPress(() => {
        return closeModal;
      });
      setAlert("Password updated");
    }

    setLoading(false);
  };

  const updateEmail = async () => {
    console.log("updateEmail");

    const hasError = validateInputs(["email"]);
    if (hasError) return;

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      email: email,
    });

    if (error) {
      setAlert(error.message);
    } else {
      setAlertOnPress(() => {
        return () => openModal(AUTH_MODAL_TYPES.SET_PASSWORD);
      });
      setAlert(
        "We have sent you an email to verify your account. Once you verify your email, please set a password.",
      );
    }

    setLoading(false);
  };

  const clearModal = () => {
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setLoading(false);
    setAlert("");
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");
    setAlertOnPress(undefined);
  };

  const closeModal = useCallback(() => {
    dispatch(
      appSliceActions.setAuthModal({
        isVisible: false,
      }),
    );
  }, [dispatch]);

  const openModal = useCallback(
    (type: AUTH_MODAL_TYPES) => {
      dispatch(
        appSliceActions.setAuthModal({
          isVisible: true,
          type: type,
        }),
      );
    },
    [dispatch],
  );

  const handleForgotPassword = async () => {
    console.log("handleForgotPassword");

    const hasError = validateInputs(["email"]);
    if (hasError) return;

    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      setAlert(error.message);
    } else {
      setAlert(
        "We have sent you an email to reset your password. Please check your inbox.",
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    clearModal();
    if (!isAuthenticated) openModal(AUTH_MODAL_TYPES.LOGIN);
  }, [authModal.isVisible, isAuthenticated, openModal]);

  useEffect(() => {
    const handleUrlFromForgotPasswordRedirect = async () => {
      if (!url) return;
      const urlFixed = url.replace("#", "?");
      const baseUrl = urlFixed.split("?")[0];
      const { hostname, path, scheme, queryParams } = Linking.parse(urlFixed);
      const accessToken = queryParams?.access_token;
      const refreshToken = queryParams?.refresh_token;
      console.log({ baseUrl });
      if (
        accessToken &&
        refreshToken &&
        typeof accessToken === "string" &&
        typeof refreshToken === "string"
      ) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          setAlert(error.message);
        } else {
          openModal(AUTH_MODAL_TYPES.SET_PASSWORD);
        }
      }
    };

    handleUrlFromForgotPasswordRedirect();
  }, [url, openModal]);

  const emailInputElement = (
    <ThemedTextInput
      label="Email"
      value={email}
      onChangeText={setEmail}
      errorText={emailError}
    />
  );

  const passwordInputElement = (
    <ThemedTextInput
      label="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={true}
      errorText={passwordError}
    />
  );

  const repeatPasswordInputElement = (
    <ThemedTextInput
      label="Repeat password"
      value={repeatPassword}
      onChangeText={setRepeatPassword}
      secureTextEntry={true}
      errorText={repeatPasswordError}
    />
  );

  const registerButtonElement = (
    <ThemedButton
      text="Register"
      disabled={loading}
      onPress={isAnonymous ? updateEmail : signUp}
    />
  );

  const loginButtonElement = (
    <ThemedButton text="Log in" disabled={loading} onPress={signIn} />
  );

  const setPasswordButtonElement = (
    <ThemedButton
      text="Set password"
      disabled={loading}
      onPress={updatePassword}
    />
  );

  const continueAsGuestButtonElement = (
    <ThemedButton
      text="Continue as a guest"
      onPress={async () => {
        await supabase.auth.signInAnonymously();
        closeModal();
      }}
    />
  );

  const confirmButtonElement = (
    <ThemedButton
      text="Confirm"
      disabled={loading}
      onPress={handleForgotPassword}
    />
  );

  const cancelButtonElement = (
    <Button
      textColor={theme.colors.onSurface}
      mode="outlined"
      onPress={closeModal}
    >
      Cancel
    </Button>
  );

  const loginLinkElement = (
    <Pressable onPress={() => openModal(AUTH_MODAL_TYPES.LOGIN)}>
      <ThemedText text="Log in" />
    </Pressable>
  );

  const registerLinkElement = (
    <Pressable onPress={() => openModal(AUTH_MODAL_TYPES.REGISTER)}>
      <ThemedText text="Register" />
    </Pressable>
  );

  const forgotPasswordLinkElement = (
    <Pressable onPress={() => openModal(AUTH_MODAL_TYPES.FORGOT_PASSWORD)}>
      <ThemedText text="Forgot password?" />
    </Pressable>
  );

  const loginContent = (
    <>
      {emailInputElement}
      {passwordInputElement}
      {loginButtonElement}
      {continueAsGuestButtonElement}
      {registerLinkElement}
      {forgotPasswordLinkElement}
    </>
  );

  const registerContent = (
    <>
      {emailInputElement}
      {passwordInputElement}
      {repeatPasswordInputElement}
      {registerButtonElement}
      {loginLinkElement}
    </>
  );

  const registerFromAnonymousToPermanentContent = //when turning anonymous to permanent user supabase requires email to be updated before password (2 steps)
    (
      <>
        {emailInputElement}
        {registerButtonElement}
        {cancelButtonElement}
        {loginLinkElement}
      </>
    );

  const setPasswordContent = (
    <>
      {passwordInputElement}
      {repeatPasswordInputElement}
      {setPasswordButtonElement}
      {cancelButtonElement}
    </>
  );

  const forgotPasswordContent = (
    <>
      {emailInputElement}
      {confirmButtonElement}
      {cancelButtonElement}
    </>
  );

  const content = {
    [AUTH_MODAL_TYPES.LOGIN]: loginContent,
    [AUTH_MODAL_TYPES.REGISTER]: isAnonymous
      ? registerFromAnonymousToPermanentContent
      : registerContent,
    [AUTH_MODAL_TYPES.SET_PASSWORD]: setPasswordContent,
    [AUTH_MODAL_TYPES.FORGOT_PASSWORD]: forgotPasswordContent,
  };

  return (
    <Portal>
      <Modal
        visible={!isAuthenticated || authModal.isVisible}
        dismissable={false}
        contentContainerStyle={[
          styles.modalContainer,
          {
            backgroundColor: theme.colors.surface,
            alignSelf: isMobile ? "stretch" : "center",
            minWidth: isMobile ? "auto" : 300,
          },
        ]}
      >
        <ThemedView>
          <View
            style={[
              styles.contentContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <ThemedAlert
              isVisible={Boolean(alert)}
              setIsVisible={() => setAlert("")}
              text={alert}
              actionButtonOnPress={alertOnPress}
            />
            <Loader isVisible={loading} />
            <ThemedText
              text={authModal.type ? headerText[authModal.type] : ""}
            />
            {authModal.type ? content[authModal.type] : null}
          </View>
        </ThemedView>
      </Modal>
    </Portal>
  );
};
