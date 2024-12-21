import React, { useCallback, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { styles } from "./AuthModal.styles";
import { Button, Modal, Portal, Text, useTheme } from "react-native-paper";
import * as Linking from "expo-linking";
import { AUTH_MODAL_TYPES } from "../slice.types";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { userSelectors } from "../../User/selectors";
import { appSelectors } from "../selectors";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";
import { supabase } from "../../../utils/supabase";
import { userActions } from "../../User/actions";
import { appSliceActions } from "../slice";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { Loader } from "../../../components/Loader";
import { useTranslation } from "react-i18next";
import { useValidation } from "../../../hooks/useValidation";

export const AuthModal = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { validateEmail, validatePassword } = useValidation();

  const headerText = {
    [AUTH_MODAL_TYPES.LOGIN]: t("auth.login"),
    [AUTH_MODAL_TYPES.REGISTER]: t("auth.register"),
    [AUTH_MODAL_TYPES.SET_PASSWORD]: t("auth.setPassword"),
    [AUTH_MODAL_TYPES.FORGOT_PASSWORD]: t("auth.typeEmail"),
  };

  const me = useAppSelector(userSelectors.getMe);
  const authModal = useAppSelector(appSelectors.getAuthModal);
  const isAuthenticated = Boolean(me?.session);
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
  const redirectUrl = Linking.createURL(isWeb ? "/settings" : "settings");

  const validateInputs = (inputsToValidate: string[]) => {
    const emailErrorText = inputsToValidate.includes("email")
      ? validateEmail(email)
      : "";
    const passwordErrorText = inputsToValidate.includes("password")
      ? validatePassword(password)
      : "";

    const isPasswordSameText =
      password === repeatPassword ? "" : t("auth.passwordsDoNotMatch");
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

    const hasError = validateInputs(["email", "password"]);
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

  const signInAnonymously = async () => {
    console.log("signInAnonymously");
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      setAlert(error.message);
    } else {
      if (data.session) dispatch(userActions.getMe(data.session));
      closeModal();
    }
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
      setAlert(t("auth.weSentVerificationEmail"));
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
      setAlert(t("auth.passwordUpdated"));
    }

    setLoading(false);
  };

  const updateEmail = async () => {
    console.log("updateEmail");

    const hasError = validateInputs(["email"]);
    if (hasError) return;

    setLoading(true);

    const { error } = await supabase.auth.updateUser(
      {
        email: email,
      },
      {
        emailRedirectTo: redirectUrl,
      },
    );

    if (error) {
      setAlert(error.message);
    } else {
      setAlertOnPress(() => {
        return closeModal;
      });
      setAlert(t("auth.verifyEmailThenSetPassword"));
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
    console.log("close modal");
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
      setAlert(t("auth.weSentResetPasswordEmail"));
    }

    setLoading(false);
  };

  useEffect(() => {
    clearModal();
  }, [authModal.isVisible, isAuthenticated, openModal]);

  useEffect(() => {
    const handleUrlFromForgotPasswordRedirect = async () => {
      if (!url) return;
      const urlFixed = url.replace("#", "?");
      const { queryParams } = Linking.parse(urlFixed || "");
      const accessToken = queryParams?.access_token;
      const refreshToken = queryParams?.refresh_token;
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
          if (isWeb) {
            Linking.openURL(redirectUrl);
          } else {
            openModal(AUTH_MODAL_TYPES.SET_PASSWORD);
          }
        }
      }
    };

    handleUrlFromForgotPasswordRedirect();
  }, [url, openModal, redirectUrl, isWeb]);

  const emailInputElement = (
    <ThemedTextInput
      label={t("auth.email")}
      value={email}
      onChangeText={setEmail}
      errorText={emailError}
    />
  );

  const passwordInputElement = (
    <ThemedTextInput
      label={t("auth.password")}
      value={password}
      onChangeText={setPassword}
      secureTextEntry={true}
      errorText={passwordError}
    />
  );

  const repeatPasswordInputElement = (
    <ThemedTextInput
      label={t("auth.repeatPassword")}
      value={repeatPassword}
      onChangeText={setRepeatPassword}
      secureTextEntry={true}
      errorText={repeatPasswordError}
    />
  );

  const registerButtonElement = (
    <ThemedButton
      text={t("auth.register")}
      disabled={loading}
      onPress={isAnonymous ? updateEmail : signUp}
    />
  );

  const loginButtonElement = (
    <ThemedButton text={t("auth.login")} disabled={loading} onPress={signIn} />
  );

  const setPasswordButtonElement = (
    <ThemedButton
      text={t("auth.setPassword")}
      disabled={loading}
      onPress={updatePassword}
    />
  );

  const continueAsGuestButtonElement = (
    <ThemedButton
      text={t("auth.continueAsGuest")}
      onPress={signInAnonymously}
    />
  );

  const confirmButtonElement = (
    <ThemedButton
      text={t("buttons.confirm")}
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
      {t("buttons.cancel")}
    </Button>
  );

  const loginLinkElement = (
    <Pressable onPress={() => openModal(AUTH_MODAL_TYPES.LOGIN)}>
      <Text>{t("auth.login")}</Text>
    </Pressable>
  );

  const registerLinkElement = (
    <Pressable onPress={() => openModal(AUTH_MODAL_TYPES.REGISTER)}>
      <Text>{t("auth.register")}</Text>
    </Pressable>
  );

  const forgotPasswordLinkElement = (
    <Pressable onPress={() => openModal(AUTH_MODAL_TYPES.FORGOT_PASSWORD)}>
      <Text>{t("auth.forgotPassword")}?</Text>
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
        visible={authModal.isVisible}
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
              onDismiss={() => setAlert("")}
              text={alert}
              actionButtonOnPress={alertOnPress}
            />
            <Loader isVisible={loading} />
            <Text>{authModal.type ? headerText[authModal.type] : ""}</Text>
            {authModal.type ? content[authModal.type] : null}
          </View>
        </ThemedView>
      </Modal>
    </Portal>
  );
};
