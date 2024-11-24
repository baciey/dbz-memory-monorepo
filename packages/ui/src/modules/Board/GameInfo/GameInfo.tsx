import React from "react";
import { ThemedText } from "../../../components/ThemedText";
import { GAME_BOARD_MODE, PLAYER_TURN } from "../GameBoard/GameBoard.types";
import { ThemedView } from "../../../components/ThemedView";
import { View } from "react-native";
import { GameInfoProps } from "./GameInfo.types";
import { useTranslation } from "react-i18next";
import { styles } from "./GameInfo.styles";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";

export const GameInfo = ({
  mode,
  elapsedTime,
  scores,
  cards,
  playerTurn,
}: GameInfoProps) => {
  const { t } = useTranslation();

  if (mode === GAME_BOARD_MODE.player1) {
    return (
      <ThemedText
        variant="titleLarge"
        style={GLOBAL_STYLES.m.mb16}
        text={
          elapsedTime === 0
            ? t("board.start-timer")
            : `${t("board.time")}: ${elapsedTime} ${t("board.seconds")}`
        }
      />
    );
  }

  if (mode === GAME_BOARD_MODE.player2) {
    const winner =
      cards.every((card) => card.isPaired) &&
      (scores.player1 > scores.player2
        ? "Player 1"
        : scores.player2 > scores.player1
          ? "Player 2"
          : null);

    const activeStyle = { color: GLOBAL_STYLES.colors.blueLight };
    const inactiveStyle = { color: GLOBAL_STYLES.colors.grey };
    const player1Style =
      playerTurn === PLAYER_TURN.player1 ? activeStyle : inactiveStyle;
    const player2Style =
      playerTurn === PLAYER_TURN.player2 ? activeStyle : inactiveStyle;

    return (
      <ThemedView style={styles.player2Container}>
        <View style={{ flexDirection: "row" }}>
          <ThemedText
            variant="titleLarge"
            style={player1Style}
            text={`Player 1: ${scores.player1}`}
          />

          <ThemedText
            variant="titleLarge"
            style={[player2Style, styles.player2text]}
            text={`Player 2: ${scores.player2}`}
          />
        </View>
        {winner && (
          <ThemedText
            variant="titleLarge"
            style={{ color: "green" }}
            text={`${t("board.winner")}: ${winner}!`}
          />
        )}
        <View style={GLOBAL_STYLES.m.mt16} />
      </ThemedView>
    );
  }

  return null;
};
