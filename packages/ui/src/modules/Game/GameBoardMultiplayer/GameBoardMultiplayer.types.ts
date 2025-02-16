import { GAME_BOARD_MODE } from "../GameBoard/GameBoard.types";
import { MultiPlayerGame } from "../slice.types";
import { Dispatch, SetStateAction } from "react";

export type GameBoardMultiplayerProps = {
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  initialGame: MultiPlayerGame;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
  setIsAlertWithCancel: Dispatch<SetStateAction<boolean>>;
  alertOnPress: (() => void) | undefined;
};

export type UseGameHasEndedProps = {
  game: MultiPlayerGame;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  alertOnPress: (() => void) | undefined;
};

export type UseSupabaseListenerProps = {
  gameId: number;
  setGame: Dispatch<SetStateAction<MultiPlayerGame>>;
};

export type UsePlayerTimeToMoveProps = {
  game: MultiPlayerGame;
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
  timeToMove: number;
  setTimeToMove: Dispatch<SetStateAction<number>>;
  alertOnPress: (() => void) | undefined;
};
