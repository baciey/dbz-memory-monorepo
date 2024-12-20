import { MD3Theme } from "react-native-paper";

export const getTextColor = (
  theme: MD3Theme,
  rowId: string,
  player1Score: number,
  player2Score: number,
) => {
  let textColor = theme.colors.onBackground;
  if (
    (rowId === "player1Name" || rowId === "player1Score") &&
    player1Score > player2Score
  ) {
    textColor = "green";
  } else if (
    (rowId === "player2Name" || rowId === "player2Score") &&
    player2Score > player1Score
  ) {
    textColor = "green";
  } else if (
    (rowId === "player1Name" || rowId === "player1Score") &&
    player1Score < player2Score
  ) {
    textColor = theme.colors.error;
  } else if (
    (rowId === "player2Name" || rowId === "player2Score") &&
    player2Score < player1Score
  ) {
    textColor = theme.colors.error;
  }
  return textColor;
};
