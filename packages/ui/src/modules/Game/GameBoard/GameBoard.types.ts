import { Dispatch, SetStateAction } from "react";

export type GameBoardProps = {
  mode: GAME_BOARD_MODE;
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
  alertOnPress: (() => void) | undefined;
};

export enum SCORES_KEY {
  player1 = "player1",
  player2 = "player2",
}

export type Scores = {
  [SCORES_KEY.player1]: number;
  [SCORES_KEY.player2]: number;
};

export enum GAME_BOARD_MODE {
  player1 = "player1",
  player2 = "player2",
  multiplayer = "multiplayer",
}

export enum PLAYER_TURN {
  player1 = 1,
  player2 = 2,
}
