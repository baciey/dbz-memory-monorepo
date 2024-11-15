import React from "react";
import { ThemedView } from "../../components/ThemedView";
import { Text, useTheme } from "react-native-paper";
import { styles } from "./HomePage.styles";
import { useTranslation } from "react-i18next";

import { Board } from "../../components/Board";
import { BOARD_MODE } from "../../components/Board/Board.types";
import { ThemedButton } from "../../components/ThemedButton";

export const HomePage = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  return (
    <ThemedView style={styles.container}>
      {/* <Text variant="headlineSmall" style={styles.heading}>
        {t("home.home")}
      </Text> */}
      {/* <Board mode={BOARD_MODE.player1} /> */}
      <ThemedView type="background" style={{ padding: 20 }}>
        <ThemedButton
          text="1 player"
          mode="contained"
          onPress={() => console.log("asd")}
        />
        <ThemedButton
          text="2 players"
          mode="contained"
          type="primary"
          onPress={() => console.log("asd")}
        />
      </ThemedView>
    </ThemedView>
  );
};
