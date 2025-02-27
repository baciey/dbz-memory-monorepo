import { ACTION_STATUS } from "../App/slice.types";
import { CardType, SelectedCardType } from "./Card/Card.types";

export interface GameState {
  playersNames: string[];
  playerName: string;
  onePlayerGames: OnePlayerGame[];
  twoPlayerGames: TwoPlayerGame[];
  onePlayerGamesStatus: ACTION_STATUS;
  twoPlayerGamesStatus: ACTION_STATUS;
  showPersonalGames: boolean;
  multiPlayerGames: MultiPlayerGame[];
  multiPlayerGamesStatus: ACTION_STATUS;
  cardsVanishTime: number;
}

export type OnePlayerGameResponse = {
  id: number;
  time: number;
  name: string;
  created_at: string;
};

export type OnePlayerGame = {
  id: number;
  time: number;
  name: string;
  createdAt: string;
};

export type TwoPlayerGame = {
  id: number;
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
  createdAt: string;
};

export type MultiPlayerGame = {
  id: number;
  player1Id: string;
  player2Id: string | null;
  player1Score: number;
  player2Score: number;
  player1Name: string;
  player2Name: string | null;
  isPlayer1Ready: boolean;
  isPlayer2Ready: boolean;
  cards: CardType[];
  firstCard: SelectedCardType | null;
  secondCard: SelectedCardType | null;
  isPlayer1Turn: boolean;
  winner: string | null;
  isOver: boolean;
  isAbandoned: boolean;
  deletedDueToInactivity: boolean;
  timeToMove: number;
  endedDueToTime: boolean;
  createdAt: string;
};

export type MultiPlayerGameResponse = {
  id: number;
  player1_id: string;
  player2_id: string | null;
  player1_score: number;
  player2_score: number;
  player1_name: string;
  player2_name: string | null;
  is_player1_ready: boolean;
  is_player2_ready: boolean;
  cards: CardType[];
  first_card: SelectedCardType | null;
  second_card: SelectedCardType | null;
  is_player1_turn: boolean;
  winner: string | null;
  is_over: boolean;
  is_abandoned: boolean;
  deleted_due_to_inactivity: boolean;
  time_to_move: number;
  ended_due_to_time: boolean;
  created_at: string;
};

export type CreateMultiPlayerGameParams = {
  player1Id: string;
  player1Name: string;
  cards: CardType[];
  onJoinOrCreatePublicGame: (game: MultiPlayerGame) => void;
};

export type UpdateMultiPlayerGameParams = {
  id: number;
  player2Id?: string | null;
  player1Score?: number;
  player2Score?: number;
  player2Name?: string | null;
  isPlayer1Ready?: boolean;
  isPlayer2Ready?: boolean;
  cards?: CardType[];
  isPlayer1Turn?: boolean;
  firstCard?: SelectedCardType | null;
  secondCard?: SelectedCardType | null;
  winner?: string;
  isAbandoned?: boolean;
  isOver?: boolean;
  endedDueToTime?: boolean;
  timeToMove?: number;
};

export type UpdateMultiPlayerGameRequestParams = {
  player2_id?: string | null;
  player1_score?: number;
  player2_score?: number;
  player2_name?: string | null;
  is_player1_ready?: boolean;
  is_player2_ready?: boolean;
  cards?: CardType[];
  is_player1_turn?: boolean;
  first_card?: SelectedCardType | null;
  second_card?: SelectedCardType | null;
  winner?: string;
  is_over?: boolean;
  is_abandoned?: boolean;
  time_to_move?: number;
  ended_due_to_time?: boolean;
};
