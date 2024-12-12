import React, { useState } from "react";
import { View } from "react-native";
import { supabase } from "../../../utils/supabase";
import { TextInput } from "react-native-paper";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { ThemedText } from "../../../components/ThemedText";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { styles } from "./Account.styles";
import { userSelectors } from "../../../modules/User/selectors";
import { AUTH_MODAL_TYPES } from "../../../modules/App/slice.types";
import { userSliceActions } from "../../../modules/User/slice";
import { appSliceActions } from "../../../modules/App/slice";

export const Account = () => {
  const dispatch = useAppDispatch();
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

  const loggedinTextElement = <ThemedText text="You are logged in" />;
  const anonymousTextElement = <ThemedText text="You are a guest" />;
  const anonymousWithEmailNotConfirmedTextElement = (
    <ThemedText text="You are still a guest. Confirm your email." />
  );
  const anonymousWithEmailConfirmedTextElement = (
    <ThemedText text="You are still a guest. Set a password." />
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
      onPress={isLoggedIn && password ? logOut : showLogoutWarning}
    />
  );

  const setPasswordButtonElement = (
    <ThemedButton
      text={isLoggedIn ? "Change Password" : "Set Password"}
      onPress={() => openModal(AUTH_MODAL_TYPES.SET_PASSWORD)}
    />
  );

  const registerButtonElement = (
    <ThemedButton text="Register" onPress={showRegisterInfo} />
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
        setIsVisible={() => setAlert("")}
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
