import React from "react";

import { useTranslation } from "react-i18next";
import { Button, Menu, Text } from "react-native-paper";
import { THEME_MODES } from "../../constants/theme";
import { LANGUAGES } from "../../constants/lang";
import { styles } from "./SettingsPage.styles";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { appSelectors } from "../../redux/selectors";
import { AppState } from "../../redux/slice.types";
import { appActions } from "../../redux/actions";
import { ThemedView } from "../ThemedView";
import { CustomSwitch } from "../CustomSwitch";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(appSelectors.getThemeMode);
  const language = useAppSelector(appSelectors.getLanguage);

  const { t } = useTranslation();

  const changeThemeMode = (isDarkMode: boolean) => {
    const mode: AppState["themeMode"] = isDarkMode
      ? THEME_MODES.light
      : THEME_MODES.dark;
    dispatch(appActions.changeThemeMode(mode));
  };

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleChangeLanguage = (lang: LANGUAGES) => {
    dispatch(appActions.changeLanguage(lang));
    setVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        {t("settings.settings")}
      </Text>
      <ThemedView style={styles.row}>
        <Text style={styles.mr10}>{t("settings.dark-mode")}</Text>

        <CustomSwitch
          value={themeMode === "dark"}
          onValueChange={() => changeThemeMode(themeMode === "dark")}
        />
      </ThemedView>
      <ThemedView style={styles.row}>
        <Text style={styles.mr10}>{t("settings.select-language")}</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              <Text variant="bodyLarge">{language.toUpperCase()}</Text>
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleChangeLanguage(LANGUAGES.pl)}
            title={LANGUAGES.pl.toUpperCase()}
          />
          <Menu.Item
            onPress={() => handleChangeLanguage(LANGUAGES.en)}
            title={LANGUAGES.en.toUpperCase()}
          />
        </Menu>
      </ThemedView>
    </ThemedView>
  );
};
