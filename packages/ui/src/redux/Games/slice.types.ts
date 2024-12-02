import { ACTION_STATUS } from "../slice.types";

export type SinglePlayerGameResponse = {
  time: number;
  name: string;
  id: number;
  created_at: string;
};

export type SinglePlayerGame = {
  time: number;
  name: string;
  id: number;
  createdAt: string;
};

export type MultiPlayerGameResponse = {
  player1_name: string;
  player2_name: string;
  player1_score: number;
  player2_score: number;
  id: number;
  created_at: string;
};

export type MultiPlayerGame = {
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  id: number;
  createdAt: string;
};

export type GamesState = {
  onePlayerGames: SinglePlayerGame[];
  twoPlayerGames: MultiPlayerGame[];
  onePlayerGamesStatus: ACTION_STATUS;
  twoPlayerGamesStatus: ACTION_STATUS;
};
