import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Button, IconButton, Menu } from "react-native-paper";
import { THEME_MODE } from "../../constants/theme";
import { LANGUAGE } from "../../constants/lang";
import { styles } from "./SettingsPage.styles";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { appSelectors } from "../../redux/selectors";
import { ACTION_STATUS } from "../../redux/slice.types";
import { appActions } from "../../redux/actions";
import { ThemedView } from "../../components/ThemedView";
import { CustomSwitch } from "../../components/CustomSwitch";
import { ThemedText } from "../../components/ThemedText";
import { Account } from "./Account";
import { GLOBAL_STYLES, globalStyles } from "../../styles/globalStyles";
import { useGetImages } from "../../hooks/useGetImages";
import { Loader } from "../../components/Loader";
import { ThemedAlert } from "../../components/ThemedAlert";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(appSelectors.getThemeMode);
  const language = useAppSelector(appSelectors.getLanguage);
  const me = useAppSelector(appSelectors.getMe);
  const meUpdateStatus = useAppSelector(appSelectors.getMeUpdateStatus);

  const { publicUrl } = useGetImages();
  const { t } = useTranslation();
  const { isWeb } = useGetScreenDimensions();

  const [alert, setAlert] = useState<string>("");
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);

  const changeThemeMode = () => {
    const newThemeMode =
      themeMode === THEME_MODE.light ? THEME_MODE.dark : THEME_MODE.light;
    dispatch(appActions.changeThemeMode(newThemeMode));
  };

  const changeLanguage = (lang: LANGUAGE) => {
    dispatch(appActions.changeLanguage(lang));
    setIsLanguageMenuVisible(false);
  };

  const uploadAvatar = () => {
    if (me) dispatch(appActions.uploadAvatar(me, isWeb));
  };

  return (
    <ThemedView style={styles.container}>
      <Loader
        isVisible={meUpdateStatus === ACTION_STATUS.LOADING}
        withBackground
      />
      <ThemedAlert
        isVisible={Boolean(alert)}
        setIsVisible={() => setAlert("")}
        text={alert}
      />
      <ThemedText
        variant="headlineSmall"
        style={globalStyles.heading}
        text={t("settings.settings")}
      />
      <ThemedView style={styles.row}>
        <ThemedText style={styles.mr10} text={t("settings.dark-mode")} />
        <CustomSwitch
          value={themeMode === THEME_MODE.dark}
          onValueChange={changeThemeMode}
        />
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText style={styles.mr10} text={t("settings.select-language")} />
        <Menu
          visible={isLanguageMenuVisible}
          onDismiss={() => setIsLanguageMenuVisible(false)}
          anchor={
            <Button onPress={() => setIsLanguageMenuVisible(true)}>
              <ThemedText variant="bodyLarge" text={language.toUpperCase()} />
            </Button>
          }
        >
          <Menu.Item
            onPress={() => changeLanguage(LANGUAGE.pl)}
            title={LANGUAGE.pl.toUpperCase()}
          />
          <Menu.Item
            onPress={() => changeLanguage(LANGUAGE.en)}
            title={LANGUAGE.en.toUpperCase()}
          />
        </Menu>
      </ThemedView>
      <ThemedView style={styles.row}>
        <Avatar.Image
          size={150}
          source={{ uri: publicUrl + me?.avatarUrl }}
          style={GLOBAL_STYLES.m.mt16}
        />
        <IconButton
          icon="upload"
          size={32}
          mode="contained"
          onPress={uploadAvatar}
        />
      </ThemedView>
      <Account />
    </ThemedView>
  );
};
