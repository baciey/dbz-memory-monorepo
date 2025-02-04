import {
  GAME_BOARD_MODE,
  PLAYER_TURN,
  Scores,
} from "../GameBoard/GameBoard.types";

export type GameInfoProps = {
  mode: GAME_BOARD_MODE;
  elapsedTime: number;
  scores: Scores;
  playerTurn: PLAYER_TURN;
};
