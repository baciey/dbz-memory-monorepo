import React from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useFocusEffect } from "@react-navigation/native";
import {
  GLOBAL_STYLES,
  SettingsPage,
  Text,
  useTheme,
  useTranslation,
} from "@repo/ui";
import { GOOGLE_PLAY_URL } from "@repo/ui/src/constants/config";
import { useCheckAppVersion } from "@repo/ui/src/hooks/useCheckAppVersion";
import { useCallback } from "react";
import { Linking, View } from "react-native";

export default function Settings() {
  const { availableVersion, checkAppVersion } = useCheckAppVersion(false);
  const theme = useTheme();
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      checkAppVersion();
    }, [checkAppVersion]),
  );

  return (
    <ScreenWrapper>
      <SettingsPage />
      {!!availableVersion && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 16,
          }}
        >
          <Text
            style={{
              marginTop: 16,
            }}
          >
            {`${t("settings.availableVersion")}: ${availableVersion} `}
          </Text>
          <Text
            onPress={() => {
              Linking.openURL(GOOGLE_PLAY_URL);
            }}
            style={{
              padding: 8,
              borderRadius: GLOBAL_STYLES.br.small,
              marginTop: 16,
              color: theme.colors.tertiary,
            }}
          >
            {t("home.update").toUpperCase()}
          </Text>
        </View>
      )}
    </ScreenWrapper>
  );
}
