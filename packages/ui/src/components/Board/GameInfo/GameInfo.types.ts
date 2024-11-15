import { CardType } from "../../Card/Card.types";
import { BOARD_MODE, PLAYER_TURN, Scores } from "../Board.types";

export type GameInfoProps = {
  mode: BOARD_MODE;
  elapsedTime: number;
  scores: Scores;
  cards: CardType[];
  playerTurn: PLAYER_TURN;
};
