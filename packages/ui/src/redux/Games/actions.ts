import { gamesSliceActions } from "./slice";
import { supabase } from "../../utils/supabase";
import { PayloadThunkAction } from "./../store";
import { DATABASE_TABLE } from "../../constants/database";

const onePlayerGames = [
  {
    id: 1,
    name: "Game 1",
    time: 100,
    createdAt: "2021-10-10",
  },
  {
    id: 2,
    name: "Game 2",
    time: 200,
    createdAt: "2021-10-11",
  },
  {
    id: 3,
    name: "Game 3",
    time: 300,
    createdAt: "2021-10-12",
  },
  {
    id: 4,
    name: "Game 4",
    time: 400,
    createdAt: "2021-10-13",
  },
  {
    id: 5,
    name: "Game 5",
    time: 500,
    createdAt: "2021-10-14",
  },
  {
    id: 6,
    name: "Game 6",
    time: 600,
    createdAt: "2021-10-15",
  },
  {
    id: 7,
    name: "Game 7",
    time: 700,
    createdAt: "2021-10-16",
  },
  {
    id: 8,
    name: "Game 8",
    time: 800,
    createdAt: "2021-10-17",
  },
  {
    id: 9,
    name: "Game 9",
    time: 900,
    createdAt: "2021-10-18",
  },
  {
    id: 10,
    name: "Game 10",
    time: 1000,
    createdAt: "2021-10-19",
  },
  {
    id: 11,
    name: "Game 11",
    time: 1100,
    createdAt: "2021-10-20",
  },
  {
    id: 12,
    name: "Game 12",
    time: 1200,
    createdAt: "2021-10-21",
  },
  {
    id: 13,
    name: "Game 13",
    time: 1300,
    createdAt: "2021-10-22",
  },
  {
    id: 14,
    name: "Game 14",
    time: 1400,
    createdAt: "2021-10-23",
  },
  {
    id: 15,
    name: "Game 15",
    time: 1500,
    createdAt: "2021-10-24",
  },
  {
    id: 16,
    name: "Game 16",
    time: 1600,
    createdAt: "2021-10-25",
  },
  {
    id: 17,
    name: "Game 17",
    time: 1700,
    createdAt: "2021-10-26",
  },
  {
    id: 18,
    name: "Game 18",
    time: 1800,
    createdAt: "2021-10-27",
  },
  {
    id: 19,
    name: "Game 19",
    time: 1900,
    createdAt: "2021-10-28",
  },
  {
    id: 20,
    name: "Game 20",
    time: 2000,
    createdAt: "2021-10-29",
  },
];
const twoPlayerGames = [
  {
    id: 1,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 10,
    player2Score: 20,
    createdAt: "2021-10-10",
  },
  {
    id: 2,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 30,
    player2Score: 40,
    createdAt: "2021-10-11",
  },
  {
    id: 3,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 50,
    player2Score: 60,
    createdAt: "2021-10-12",
  },
  {
    id: 4,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 70,
    player2Score: 80,
    createdAt: "2021-10-13",
  },
  {
    id: 5,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 90,
    player2Score: 100,
    createdAt: "2021-10-14",
  },
  {
    id: 6,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 110,
    player2Score: 120,
    createdAt: "2021-10-15",
  },
  {
    id: 7,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 130,
    player2Score: 140,
    createdAt: "2021-10-16",
  },
  {
    id: 8,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 150,
    player2Score: 160,
    createdAt: "2021-10-17",
  },
  {
    id: 9,
    player1Name: "Player 1",
    player2Name: "Player 2",
    player1Score: 170,
    player2Score: 180,
    createdAt: "2021-10-18",
  },
];

const getOnePlayerGames = (userId: string): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(gamesSliceActions.onePlayerGamesLoading());

    supabase
      .from(DATABASE_TABLE.one_player_games)
      .select(`id, name, time, created_at`)
      .eq("user_id", userId)
      .then(({ data, error, status }) => {
        if (data) {
          const processedData = data.map((game) => {
            return {
              name: game.name,
              time: game.time,
              id: game.id,
              createdAt: game.created_at,
            };
          });

          dispatch(gamesSliceActions.onePlayerGamesSuccess(onePlayerGames));
        } else {
          dispatch(gamesSliceActions.onePlayerGamesError());
        }
      });
  };
};

const getTwoPlayerGames = (userId: string): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(gamesSliceActions.twoPlayerGamesLoading());

    supabase
      .from(DATABASE_TABLE.two_player_games)
      .select(
        `id, player1_name, player2_name, player1_score, player2_score, created_at`
      )
      .eq("user_id", userId)
      .then(({ data, error, status }) => {
        if (data) {
          const processedData = data.map((game) => {
            return {
              id: game.id,
              player1Name: game.player1_name,
              player2Name: game.player2_name,
              player1Score: game.player1_score,
              player2Score: game.player2_score,
              createdAt: game.created_at,
            };
          });

          dispatch(gamesSliceActions.twoPlayerGamesSuccess(twoPlayerGames));
        } else {
          dispatch(gamesSliceActions.twoPlayerGamesError());
        }
      });
  };
};

export const gamesActions = {
  getOnePlayerGames,
  getTwoPlayerGames,
};
