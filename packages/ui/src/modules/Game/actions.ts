import { gameSliceActions } from "./slice";
import { supabase } from "../../utils/supabase";
import { DATABASE_TABLE } from "../../constants/database";
import { Platform } from "react-native";
import { dateFormatter } from "../../utils/date";
import { PayloadThunkAction } from "../../redux/store";
import {
  CreateMultiPlayerGameParams,
  UpdateMultiPlayerGameParams,
  UpdateMultiPlayerGameRequestParams,
} from "./slice.types";
import { proccessMultiPlayerGame } from "./utils";

// for testing purposes
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
const isMock = false;

const getOnePlayerGames = (
  userId: string,
  showPersonal?: boolean,
  showTripleMode?: boolean,
  searchQuery: string = "",
): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(gameSliceActions.onePlayerGamesLoading());

    supabase
      .from(DATABASE_TABLE.one_player_games)
      .select(`id, name, time, created_at, is_triple, profiles ( avatar_url )`)
      .eq(showPersonal ? "user_id" : "", userId)
      .eq(showTripleMode ? "is_triple" : "", true)
      .ilike("name", `%${searchQuery}%`)
      .then(({ data, error }) => {
        if (error) {
          dispatch(gameSliceActions.onePlayerGamesError());
        } else {
          // Order by time, if time is the same, order by date
          data.sort((a, b) => {
            if (a.time === b.time) {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            }
            return a.time - b.time;
          });

          const processedData = data.map((game) => {
            return {
              name: game.name,
              time: game.time,
              id: game.id,
              isTriple: game.is_triple,
              // @ts-ignore supabase typing issue, avatar_url is not recognized
              avatarUrl: game.profiles.avatar_url || null,
              createdAt: dateFormatter(game.created_at),
            };
          });

          dispatch(
            gameSliceActions.onePlayerGamesSuccess(
              isMock ? onePlayerGames : processedData,
            ),
          );
        }
      });
  };
};

const getTwoPlayerGames = (
  userId: string,
  searchQuery: string = "",
): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(gameSliceActions.twoPlayerGamesLoading());

    supabase
      .from(DATABASE_TABLE.two_player_games)
      .select(
        `id, player1_name, player2_name, player1_score, player2_score, created_at`,
      )
      .eq("user_id", userId)
      .or(
        `player1_name.ilike.%${searchQuery}%,player2_name.ilike.%${searchQuery}%`,
      )
      .then(({ data, error }) => {
        if (error) {
          dispatch(gameSliceActions.twoPlayerGamesError());
        } else {
          // Order by date
          data.sort((a, b) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          const processedData = data.map((game) => {
            return {
              id: game.id,
              player1Name: game.player1_name,
              player2Name: game.player2_name,
              player1Score: game.player1_score,
              player2Score: game.player2_score,
              createdAt: dateFormatter(game.created_at),
            };
          });

          dispatch(
            gameSliceActions.twoPlayerGamesSuccess(
              isMock ? twoPlayerGames : processedData,
            ),
          );
        }
      });
  };
};

const updateOnePlayerGames = (
  userId: string,
  name: string,
  time: number,
  showPersonalGames: boolean,
  isTriple: boolean,
): PayloadThunkAction => {
  return async (dispatch) => {
    await supabase.from(DATABASE_TABLE.one_player_games).insert({
      name: name,
      time: time,
      platform: Platform.OS,
      user_id: userId,
      is_triple: isTriple,
    });
    dispatch(getOnePlayerGames(userId, showPersonalGames));
  };
};

const updateTwoPlayerGames = (
  player1name: string,
  player2name: string,
  player1score: number,
  player2score: number,
  userId: string,
): PayloadThunkAction => {
  return async (dispatch) => {
    await supabase.from(DATABASE_TABLE.two_player_games).insert({
      player1_name: player1name,
      player2_name: player2name,
      player1_score: player1score,
      player2_score: player2score,
      platform: Platform.OS,
      user_id: userId,
    });
    dispatch(getTwoPlayerGames(userId));
  };
};

const createMultiPlayerGame = ({
  player1Id,
  player1Name,
  cards,
  onJoinOrCreatePublicGame,
}: CreateMultiPlayerGameParams): PayloadThunkAction => {
  return async (dispatch) => {
    supabase
      .from(DATABASE_TABLE.multi_player_games)
      .insert({
        player1_id: player1Id,
        player1_name: player1Name,
        cards: cards,
      })
      .select()
      .then(({ data }) => {
        if (data) {
          const proccessedData = proccessMultiPlayerGame(data[0]);
          onJoinOrCreatePublicGame(proccessedData);
        }
      });
    dispatch(getMultiPlayerGames());
  };
};

const updateMultiPlayerGame = ({
  id,
  player1Score,
  player2Id,
  player2Score,
  player2Name,
  isPlayer1Ready,
  isPlayer2Ready,
  cards,
  isPlayer1Turn,
  firstCard,
  secondCard,
  winner,
  isOver,
  isAbandoned,
  endedDueToTime,
}: UpdateMultiPlayerGameParams): PayloadThunkAction => {
  return async (dispatch) => {
    const data: UpdateMultiPlayerGameRequestParams = {};

    if (player2Id !== undefined) data["player2_id"] = player2Id;
    if (player1Score !== undefined) data["player1_score"] = player1Score;
    if (player2Score !== undefined) data["player2_score"] = player2Score;
    if (player2Name !== undefined) data["player2_name"] = player2Name;
    if (isPlayer1Turn !== undefined) data["is_player1_turn"] = isPlayer1Turn;
    if (isPlayer1Ready !== undefined) data["is_player1_ready"] = isPlayer1Ready;
    if (isPlayer2Ready !== undefined) data["is_player2_ready"] = isPlayer2Ready;
    if (cards !== undefined) data["cards"] = cards;
    if (firstCard !== undefined) data["first_card"] = firstCard;
    if (secondCard !== undefined) data["second_card"] = secondCard;
    if (winner !== undefined) data["winner"] = winner;
    if (isOver !== undefined) data["is_over"] = isOver;
    if (isAbandoned !== undefined) data["is_abandoned"] = isAbandoned;
    if (endedDueToTime !== undefined)
      data["ended_due_to_time"] = endedDueToTime;

    await supabase
      .from(DATABASE_TABLE.multi_player_games)
      .update(data)
      .eq("id", id);

    dispatch(getMultiPlayerGames());
  };
};

const getMultiPlayerGames = (): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(gameSliceActions.multiPlayerGamesLoading());

    const query = supabase
      .from(DATABASE_TABLE.multi_player_games)
      .select(
        `id, player1_name, player2_name, player1_id, player2_id, player1_score, player2_score, is_player1_ready, is_player2_ready, is_player1_turn, cards, first_card, second_card, winner, is_over, is_abandoned, deleted_due_to_inactivity, time_to_move, ended_due_to_time, created_at`,
      );

    const { data, error } = await query;

    if (error) {
      dispatch(gameSliceActions.multiPlayerGamesError());
    } else {
      // Order by date
      data.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      const processedData = data
        .filter((game) => game.id)
        .map((game) => {
          return proccessMultiPlayerGame(game);
        });

      dispatch(gameSliceActions.multiPlayerGamesSuccess(processedData));
    }
  };
};

const deleteMultiPlayerGame = (id: number): PayloadThunkAction => {
  return async (dispatch) => {
    await supabase
      .from(DATABASE_TABLE.multi_player_games)
      .delete()
      .eq("id", id);
    dispatch(getMultiPlayerGames());
  };
};

export const gameActions = {
  getOnePlayerGames,
  getTwoPlayerGames,
  updateOnePlayerGames,
  updateTwoPlayerGames,
  createMultiPlayerGame,
  getMultiPlayerGames,
  updateMultiPlayerGame,
  deleteMultiPlayerGame,
};
