import React from "react";
import { ThemedView } from "../ThemedView";
import { Text } from "react-native-paper";
import { styles } from "./HomePage.styles";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>
        {t("home.home")}
      </Text>
    </ThemedView>
  );
};
