import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Menu } from "react-native-paper";
import { THEME_MODE } from "../../constants/theme";
import { LANGUAGE } from "../../constants/lang";
import { styles } from "./SettingsPage.styles";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { appSelectors } from "../../redux/selectors";
import { AppState } from "../../redux/slice.types";
import { appActions } from "../../redux/actions";
import { ThemedView } from "../../components/ThemedView";
import { CustomSwitch } from "../../components/CustomSwitch";
import { ThemedText } from "../../components/ThemedText";
import { Account } from "./Account";
import { globalStyles } from "../../styles/globalStyles";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(appSelectors.getThemeMode);
  const language = useAppSelector(appSelectors.getLanguage);

  const { t } = useTranslation();

  const changeThemeMode = (isDarkMode: boolean) => {
    const mode: AppState["themeMode"] = isDarkMode
      ? THEME_MODE.light
      : THEME_MODE.dark;
    dispatch(appActions.changeThemeMode(mode));
  };

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleChangeLanguage = (lang: LANGUAGE) => {
    dispatch(appActions.changeLanguage(lang));
    setVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        variant="headlineSmall"
        style={globalStyles.heading}
        text={t("settings.settings")}
      />
      <ThemedView style={styles.row}>
        <ThemedText style={styles.mr10} text={t("settings.dark-mode")} />
        <CustomSwitch
          value={themeMode === "dark"}
          onValueChange={() => changeThemeMode(themeMode === "dark")}
        />
      </ThemedView>
      <ThemedView style={styles.row}>
        <ThemedText style={styles.mr10} text={t("settings.select-language")} />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              <ThemedText variant="bodyLarge" text={language.toUpperCase()} />
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleChangeLanguage(LANGUAGE.pl)}
            title={LANGUAGE.pl.toUpperCase()}
          />
          <Menu.Item
            onPress={() => handleChangeLanguage(LANGUAGE.en)}
            title={LANGUAGE.en.toUpperCase()}
          />
        </Menu>
      </ThemedView>
      <Account />
    </ThemedView>
  );
};
