import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Avatar,
  Button,
  IconButton,
  Menu,
  Text,
  useTheme,
} from "react-native-paper";
import { THEME_MODE } from "../../constants/theme";
import { LANGUAGE } from "../../constants/lang";
import { styles } from "./SettingsPage.styles";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ThemedView } from "../../components/ThemedView";
import { CustomSwitch } from "../../components/CustomSwitch";
import { Account } from "./Account";
import { globalStyles } from "../../styles/globalStyles";
import { useGetImages } from "../../hooks/useGetImages";
import { ThemedAlert } from "../../components/ThemedAlert";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { View } from "react-native";
import { userSelectors } from "../../modules/User/selectors";
import { userActions } from "../../modules/User/actions";
import { appActions } from "../../modules/App/actions";
import { appSelectors } from "../../modules/App/selectors";
import { ACTION_STATUS } from "../../modules/App/slice.types";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(appSelectors.getThemeMode);
  const language = useAppSelector(appSelectors.getLanguage);
  const me = useAppSelector(userSelectors.getMe);
  const meStatus = useAppSelector(userSelectors.getMeStatus);
  const meUpdateStatus = useAppSelector(userSelectors.getMeUpdateStatus);
  const isAuthenticated = Boolean(me?.session);

  const { publicUrl } = useGetImages();
  const { t } = useTranslation();
  const { isWeb } = useGetScreenDimensions();
  const theme = useTheme();

  const [alert, setAlert] = useState<string>("");
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

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
    if (me) {
      if (!isWeb) setIsAvatarLoaded(false);
      dispatch(userActions.uploadAvatar(me, isWeb, setIsAvatarLoaded));
    }
  };

  const avatar = useMemo(() => {
    if (!publicUrl) return null;
    const isReady =
      me?.avatarUrl &&
      meUpdateStatus !== ACTION_STATUS.LOADING &&
      meStatus !== ACTION_STATUS.LOADING;
    return (
      <Avatar.Image
        size={150}
        source={{ uri: publicUrl + me?.avatarUrl }}
        onLoadEnd={() => {
          if (isReady) setIsAvatarLoaded(true);
        }}
        onLoadStart={() => {
          if (isReady) setIsAvatarLoaded(false);
        }}
      />
    );
  }, [publicUrl, me?.avatarUrl, meUpdateStatus, meStatus]);

  return (
    <ThemedView style={styles.container}>
      <ThemedAlert
        isVisible={Boolean(alert)}
        onDismiss={() => setAlert("")}
        text={alert}
      />
      <Text variant="headlineSmall" style={globalStyles.heading}>
        {t("settings.settings")}
      </Text>
      <ThemedView style={styles.row}>
        <Text style={styles.mr10}>{t("settings.darkTheme")}</Text>
        <CustomSwitch
          value={themeMode === THEME_MODE.dark}
          onValueChange={changeThemeMode}
        />
      </ThemedView>
      <ThemedView style={styles.row}>
        <Text style={styles.mr10}>{t("settings.selectLanguage")}</Text>
        <Menu
          visible={isLanguageMenuVisible}
          onDismiss={() => setIsLanguageMenuVisible(false)}
          anchor={
            <Button onPress={() => setIsLanguageMenuVisible(true)}>
              <Text variant="bodyLarge">{language.toUpperCase()}</Text>
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
      <ThemedView style={[styles.row, styles.avatarRow]}>
        {avatar}

        {(!isAvatarLoaded ||
          meUpdateStatus === ACTION_STATUS.LOADING ||
          meStatus === ACTION_STATUS.LOADING) && (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            {isAuthenticated && (
              <ActivityIndicator
                size="large"
                color={theme.colors.onBackground}
              />
            )}
          </View>
        )}
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
