import { useEffect } from "react";
import { UseSupabaseListenerProps } from "./GameBoardMultiplayer.types";
import { MultiPlayerGameResponse } from "../slice.types";
import { proccessMultiPlayerGame } from "../utils";
import { supabase } from "../../../utils/supabase";
import { DATABASE_TABLE } from "../../../constants/database";

export const useSupabaseListener = ({
  gameId,
  showOwnerClosedGameAlert,
  showOpponentLeftGameAlert,
  setGame,
}: UseSupabaseListenerProps) => {
  useEffect(() => {
    // @ts-ignore
    const handleChange = (payload) => {
      console.log("UPDATE!", payload);
      const updatedGame = payload.new as MultiPlayerGameResponse;
      if (!updatedGame.id) {
        return showOwnerClosedGameAlert();
      } else if (!updatedGame.player2_id) {
        showOpponentLeftGameAlert();
      }
      const proccessedGame = proccessMultiPlayerGame(updatedGame);
      setGame(proccessedGame);
    };

    const channel = supabase
      .channel("multi_player_games_single_game")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: DATABASE_TABLE.multi_player_games,
          filter: "id=eq." + gameId,
        },
        handleChange,
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: DATABASE_TABLE.multi_player_games,
          filter: "id=eq." + gameId,
        },
        handleChange,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, showOpponentLeftGameAlert, showOwnerClosedGameAlert, setGame]);
};
