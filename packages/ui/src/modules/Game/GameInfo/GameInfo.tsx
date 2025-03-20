import React from "react";
import { GAME_BOARD_MODE } from "../GameBoard/GameBoard.types";
import { ThemedView } from "../../../components/ThemedView";
import { GameInfoProps } from "./GameInfo.types";
import { useTranslation } from "react-i18next";
import { styles } from "./GameInfo.styles";
import { Text } from "react-native-paper";

export const GameInfo = ({
  mode,
  elapsedTime,
  player1Score,
  player2Score,
  player1Name,
  player2Name,
  player2Id,
  isPlayer1Turn,
  moves,
}: GameInfoProps) => {
  const { t } = useTranslation();

  const activeStyle = { color: "lightgreen" };
  const inactiveStyle = { color: "grey" };
  const player1Style = isPlayer1Turn ? activeStyle : inactiveStyle;
  const player2Style = !isPlayer1Turn ? activeStyle : inactiveStyle;

  if (mode === GAME_BOARD_MODE.player1) {
    return (
      <ThemedView style={styles.container}>
        <Text variant="titleMedium">{`${t("game.time")}: ${elapsedTime}`}</Text>
        <Text variant="titleMedium">{`${t("game.moves")}: ${moves}`}</Text>
      </ThemedView>
    );
  } else {
    if (mode === GAME_BOARD_MODE.multiplayer && !player2Id) {
      return (
        <ThemedView style={styles.container}>
          <Text variant="titleMedium">{t("game.waitingForOpponent")}</Text>
        </ThemedView>
      );
    } else {
      return (
        <ThemedView style={styles.container}>
          <Text variant="titleMedium" style={player1Style}>
            {`${player1Name}: ${player1Score}`}
          </Text>
          <Text variant="titleMedium" style={player2Style}>
            {`${player2Name}: ${player2Score}`}
          </Text>
        </ThemedView>
      );
    }
  }
};
