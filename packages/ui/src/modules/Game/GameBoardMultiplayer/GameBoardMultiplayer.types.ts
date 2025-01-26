import { GAME_BOARD_MODE } from "../GameBoard/GameBoard.types";
import { MultiPlayerGame } from "../slice.types";
import { Dispatch, SetStateAction } from "react";

export type GameBoardMultiplayerProps = {
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  initialGame: MultiPlayerGame;
};

export type UseGameHasEndedProps = {
  game: MultiPlayerGame;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
};

export type UseSupabaseListenerProps = {
  gameId: number;
  showOwnerClosedGameAlert: () => void;
  showOpponentLeftGameAlert: () => void;
  setGame: Dispatch<SetStateAction<MultiPlayerGame>>;
};

export type UsePlayerTimeToMoveProps = {
  game: MultiPlayerGame;
  setPlayer1TimeToMove: Dispatch<SetStateAction<number>>;
  setPlayer2TimeToMove: Dispatch<SetStateAction<number>>;
  player1TimeToMove: number;
  player2TimeToMove: number;
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
};
