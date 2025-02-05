import { DataItem } from "./ThemedTable.types";

export const shouldDisplayWinIcon = (rowId: string, item: DataItem) => {
  const {
    player1Score,
    player2Score,
    player1Id = "",
    player2Id,
    winner,
  } = item || {};
  const isMultiplayer = "player1Id" in item;
  let isWinner = false;

  const isPlayer1Row = rowId === "player1Name";
  const isPlayer2Row = rowId === "player2Name";

  if (isMultiplayer) {
    if (isPlayer1Row && winner === player1Id) {
      isWinner = true;
    } else if (isPlayer2Row && winner === player2Id) {
      isWinner = true;
    } else if (isPlayer1Row && winner !== player1Id) {
      isWinner = false;
    } else if (isPlayer2Row && winner !== player2Id) {
      isWinner = false;
    }
  } else {
    if (player1Score === null || player2Score === null) return isWinner;
    if (isPlayer1Row && player1Score > player2Score) {
      isWinner = true;
    } else if (isPlayer2Row && player2Score > player1Score) {
      isWinner = true;
    } else if (isPlayer1Row && player1Score < player2Score) {
      isWinner = false;
    } else if (isPlayer2Row && player2Score < player1Score) {
      isWinner = false;
    }
  }

  return isWinner;
};
