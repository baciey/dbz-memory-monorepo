import React from "react";
import { GAME_BOARD_MODE, PLAYER_TURN } from "../GameBoard/GameBoard.types";
import { ThemedView } from "../../../components/ThemedView";
import { View } from "react-native";
import { GameInfoProps } from "./GameInfo.types";
import { useTranslation } from "react-i18next";
import { styles } from "./GameInfo.styles";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";
import { useAppSelector } from "../../../redux/store";
import { Text, useTheme } from "react-native-paper";

export const GameInfo = ({
  mode,
  elapsedTime,
  scores,
  playerTurn,
}: GameInfoProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const player1Name =
    useAppSelector((state) => state.game.playersNames[0]) || t("game.player1");
  const player2Name =
    useAppSelector((state) => state.game.playersNames[1]) || t("game.player2");

  if (mode === GAME_BOARD_MODE.player1) {
    return (
      <Text variant="titleMedium" style={GLOBAL_STYLES.m.mb16}>
        {elapsedTime === 0
          ? t("game.startTimer")
          : `${t("game.time")}: ${elapsedTime} ${t("game.sec")}`}
      </Text>
    );
  } else if (mode === GAME_BOARD_MODE.player2) {
    const activeStyle = { color: theme.colors.primary };
    const inactiveStyle = { color: theme.colors.secondary };
    const player1Style =
      playerTurn === PLAYER_TURN.player1 ? activeStyle : inactiveStyle;
    const player2Style =
      playerTurn === PLAYER_TURN.player2 ? activeStyle : inactiveStyle;

    return (
      <ThemedView style={styles.player2Container}>
        <Text variant="titleLarge" style={player1Style}>
          {`${player1Name}: ${scores.player1}`}
        </Text>
        <Text variant="titleLarge" style={[player2Style, styles.player2text]}>
          {`${player2Name}: ${scores.player2}`}
        </Text>
      </ThemedView>
    );
  } else return null;
};
