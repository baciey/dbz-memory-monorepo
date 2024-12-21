import React, { useState } from "react";
import { View } from "react-native";
import { supabase } from "../../../utils/supabase";
import { Text, TextInput } from "react-native-paper";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { styles } from "./Account.styles";
import { userSelectors } from "../../../modules/User/selectors";
import { AUTH_MODAL_TYPES } from "../../../modules/App/slice.types";
import { userSliceActions } from "../../../modules/User/slice";
import { appSliceActions } from "../../../modules/App/slice";
import { useTranslation } from "react-i18next";

export const Account = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const me = useAppSelector(userSelectors.getMe);
  const [alert, setAlert] = useState<string>("");
  const [alertOnPress, setAlertOnPress] = useState<(() => void) | undefined>();

  const { isAnonymous, password } = me || {};
  const isAnonymousWithEmailNotConfirmed =
    isAnonymous && Boolean(me?.session?.user?.new_email) && !me?.email;
  const isAnonymousWithEmailConfirmed = Boolean(
    !isAnonymous && me?.email && !password,
  );
  const isLoggedIn = Boolean(me?.email && me?.password);

  const showLogoutWarning = () => {
    setAlert(t("settings.logoutWarning"));
    setAlertOnPress(() => {
      return logOut;
    });
  };

  const showRegisterInfo = () => {
    setAlert(t("settings.registerInfo"));
    setAlertOnPress(() => {
      return () => openModal(AUTH_MODAL_TYPES.REGISTER);
    });
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAlert(t("settings.logoutFailed"));
    } else {
      dispatch(userSliceActions.meIdle());
      openModal(AUTH_MODAL_TYPES.LOGIN);
    }
  };

  const openModal = (type: AUTH_MODAL_TYPES) => {
    dispatch(
      appSliceActions.setAuthModal({
        isVisible: true,
        type: type,
      }),
    );
  };

  const loggedinTextElement = <Text>{t("settings.loggedIn")}</Text>;
  const anonymousTextElement = <Text>{t("settings.youAreGuest")}</Text>;
  const anonymousWithEmailNotConfirmedTextElement = (
    <Text>
      {t("settings.stillGuest")} {t("settings.confirmEmail")}
    </Text>
  );
  const anonymousWithEmailConfirmedTextElement = (
    <Text>
      {t("settings.stillGuest")} {t("settings.setPassword")}
    </Text>
  );

  const emailElement = (
    <TextInput
      label={t("settings.email")}
      value={me?.email || me?.session.user.new_email}
      disabled
    />
  );

  const logoutButtonElement = (
    <ThemedButton
      text={t("settings.logout")}
      onPress={isLoggedIn && password ? logOut : showLogoutWarning}
    />
  );

  const setPasswordButtonElement = (
    <ThemedButton
      text={
        isLoggedIn ? t("settings.changePassword") : t("settings.setPassword")
      }
      onPress={() => openModal(AUTH_MODAL_TYPES.SET_PASSWORD)}
    />
  );

  const registerButtonElement = (
    <ThemedButton text={t("settings.register")} onPress={showRegisterInfo} />
  );

  const loggedInContent = (
    <>
      {loggedinTextElement}
      {emailElement}
      {logoutButtonElement}
      {setPasswordButtonElement}
    </>
  );

  const anonymousContent = (
    <>
      {anonymousTextElement}
      {registerButtonElement}
      {logoutButtonElement}
    </>
  );

  const anonymousWithEmailNotConfirmedContent = (
    <>
      {anonymousWithEmailNotConfirmedTextElement}
      {emailElement}
      {logoutButtonElement}
    </>
  );

  const anonymousWithEmailConfirmedContent = (
    <>
      {anonymousWithEmailConfirmedTextElement}
      {emailElement}
      {setPasswordButtonElement}
      {logoutButtonElement}
    </>
  );

  return (
    <View style={styles.container}>
      <ThemedAlert
        isVisible={Boolean(alert)}
        onDismiss={() => setAlert("")}
        text={alert}
        actionButtonOnPress={alertOnPress}
        withCancel={Boolean(alertOnPress)}
      />
      {isLoggedIn && loggedInContent}
      {isAnonymous && !isAnonymousWithEmailNotConfirmed && anonymousContent}
      {isAnonymousWithEmailNotConfirmed &&
        anonymousWithEmailNotConfirmedContent}
      {isAnonymousWithEmailConfirmed &&
        !password &&
        anonymousWithEmailConfirmedContent}
    </View>
  );
};
