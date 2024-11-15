export type BoardProps = {
  mode: BOARD_MODE;
};

export enum SCORES_KEY {
  player1 = "player1",
  player2 = "player2",
}

export type Scores = {
  [SCORES_KEY.player1]: number;
  [SCORES_KEY.player2]: number;
};

export enum BOARD_MODE {
  player1 = "player1",
  player2 = "player2",
}

export enum PLAYER_TURN {
  player1 = 1,
  player2 = 2,
}
