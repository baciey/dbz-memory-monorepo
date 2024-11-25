import { gamesSliceActions } from "./slice";
import { supabase } from "../../utils/supabase";
import { PayloadThunkAction } from "./../store";
import { TABLES } from "../../constants/database";

const getSinglePlayerGames = (userId: string): PayloadThunkAction => {
  return async (dispatch) => {
    dispatch(gamesSliceActions.singlePlayerGamesLoading());

    supabase
      .from(TABLES.single_player_games)
      .select(`name, time, id, created_at`)
      .eq("user_id", userId)
      .then(({ data, error, status }) => {
        // console.log("GET DATA", error, status, data);
        if (data) {
          const processedData = data.map((game) => {
            return {
              ...game,
              createdAt: game.created_at,
            };
          });

          dispatch(gamesSliceActions.singlePlayerGamesSuccess(processedData));
        } else {
          dispatch(gamesSliceActions.singlePlayerGamesError());
        }
      });
  };
};

export const gamesActions = {
  getSinglePlayerGames,
};
