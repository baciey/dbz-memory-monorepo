import React from "react";
import { ThemedText } from "../../../components/ThemedText";
import { GAME_BOARD_MODE, PLAYER_TURN } from "../GameBoard/GameBoard.types";
import { ThemedView } from "../../../components/ThemedView";
import { View } from "react-native";
import { GameInfoProps } from "./GameInfo.types";
import { useTranslation } from "react-i18next";
import { styles } from "./GameInfo.styles";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";
import { useAppSelector } from "../../../redux/store";
import { useTheme } from "react-native-paper";

export const GameInfo = ({
  mode,
  elapsedTime,
  scores,
  cards,
  playerTurn,
}: GameInfoProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const player1Name =
    useAppSelector((state) => state.game.playersNames[0]) || "Player 1";
  const player2Name =
    useAppSelector((state) => state.game.playersNames[1]) || "Player 2";

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
        ? player1Name
        : scores.player2 > scores.player1
          ? player2Name
          : null);

    const activeStyle = { color: theme.colors.primary };
    const inactiveStyle = { color: theme.colors.secondary };
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
            text={`${player1Name}: ${scores.player1}`}
          />

          <ThemedText
            variant="titleLarge"
            style={[player2Style, styles.player2text]}
            text={`${player2Name}: ${scores.player2}`}
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
