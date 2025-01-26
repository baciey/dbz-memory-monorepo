import { GAME_BOARD_MODE } from "../GameBoard/GameBoard.types";

export type GameInfoProps = {
  mode: GAME_BOARD_MODE;
  elapsedTime?: number;
  isPlayer1Turn?: boolean;
  player2Id?: string | null;
  player1Score?: number;
  player2Score?: number;
  player1Name?: string;
  player2Name?: string | null;
};
