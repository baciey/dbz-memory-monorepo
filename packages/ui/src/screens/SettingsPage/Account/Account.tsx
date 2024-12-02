import React, { useState } from "react";
import { View } from "react-native";
import { supabase } from "../../../utils/supabase";
import { TextInput } from "react-native-paper";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { ThemedText } from "../../../components/ThemedText";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { appSelectors } from "../../../redux/selectors";
import { ACTION_STATUS, AUTH_MODAL_TYPES } from "../../../redux/slice.types";
import { appSliceActions } from "../../../redux/slice";
import { styles } from "./Account.styles";

export const Account = () => {
  const dispatch = useAppDispatch();
  const me = useAppSelector(appSelectors.getMe);
  const meStatus = useAppSelector(appSelectors.getMeStatus);
  const meUpdateStatus = useAppSelector(appSelectors.getMeUpdateStatus);

  const [alert, setAlert] = useState<string>("");
  const [alertOnPress, setAlertOnPress] = useState<(() => void) | undefined>();

  const isAnonymous = me?.isAnonymous;
  const isAnonymousWithEmailSet =
    isAnonymous && Boolean(me?.session?.user?.new_email);
  const isLoggedIn = Boolean(me?.session?.user.email_confirmed_at);
  const loading =
    meUpdateStatus === ACTION_STATUS.LOADING ||
    meStatus === ACTION_STATUS.LOADING;

  const showLogoutWarning = () => {
    setAlert(
      "You are about to log out. You are a guest user so you will lose all your data. Are you sure?",
    );
    setAlertOnPress(() => {
      return logOut;
    });
  };

  const showRegisterInfo = () => {
    setAlert(
      "You are a guest user. You can turn into a permanent user and save all your data. Do you want to continue? In first step you will need to confirm your email. In second step you will need to set a password.",
    );
    setAlertOnPress(() => {
      return () => openModal(AUTH_MODAL_TYPES.REGISTER);
    });
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAlert("Log out failed");
    } else {
      dispatch(appSliceActions.meIdle());
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

  const loggedinTextElement = <ThemedText text="You are logged in" />;
  const anonymousTextElement = <ThemedText text="You are a guest" />;
  const anonymousWithEmailSetTextElement = (
    <ThemedText text="You are still a guest. Confirm your email and set a password." />
  );

  const emailElement = (
    <TextInput
      label="Email"
      value={me?.email || me?.session.user.new_email}
      disabled
    />
  );

  const logoutButtonElement = (
    <ThemedButton
      text="Log Out"
      onPress={isAnonymous ? showLogoutWarning : logOut}
      disabled={meStatus === ACTION_STATUS.LOADING}
    />
  );

  const setPasswordButtonElement = (
    <ThemedButton
      text={isLoggedIn ? "Change Password" : "Set Password"}
      onPress={() => openModal(AUTH_MODAL_TYPES.SET_PASSWORD)}
      disabled={meStatus === ACTION_STATUS.LOADING}
    />
  );

  const registerButtonElement = (
    <ThemedButton
      text="Register"
      onPress={showRegisterInfo}
      disabled={loading}
    />
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

  const anonymousWithEmailSetContent = (
    <>
      {anonymousWithEmailSetTextElement}
      {emailElement}
      {setPasswordButtonElement}
    </>
  );

  return (
    <View style={styles.container}>
      <ThemedAlert
        isVisible={Boolean(alert)}
        setIsVisible={() => setAlert("")}
        text={alert}
        actionButtonOnPress={alertOnPress}
        withCancel={Boolean(alertOnPress)}
      />
      {isLoggedIn && loggedInContent}
      {isAnonymous && !isAnonymousWithEmailSet && anonymousContent}
      {isAnonymousWithEmailSet && anonymousWithEmailSetContent}
    </View>
  );
};
