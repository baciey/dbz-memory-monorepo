import { useEffect, useState } from "react";
import { UseSupabaseListenerProps } from "./GameBoardMultiplayer.types";
import { MultiPlayerGameResponse } from "../slice.types";
import { proccessMultiPlayerGame } from "../utils";
import { supabase } from "../../../utils/supabase";
import { DATABASE_TABLE } from "../../../constants/database";
import { useAppSelector } from "../../../redux/store";

export const useSupabaseListener = ({
  gameId,
  setGame,
}: UseSupabaseListenerProps) => {
  const [activePlayers, setActivePlayers] = useState<string[]>([]);
  const me = useAppSelector((state) => state.user.me);

  useEffect(() => {
    if (!gameId) return;

    //@ts-ignore
    const handleChange = (payload) => {
      const updatedGame = payload.new as MultiPlayerGameResponse;
      if (updatedGame.id) {
        const proccessedGame = proccessMultiPlayerGame(updatedGame);
        setGame(proccessedGame);
      }
    };

    const channel = supabase
      .channel(`game-${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: DATABASE_TABLE.multi_player_games,
          filter: `id=eq.${gameId}`,
        },
        handleChange,
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: DATABASE_TABLE.multi_player_games,
          filter: `id=eq.${gameId}`,
        },
        handleChange,
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [gameId, setGame]);

  useEffect(() => {
    if (!gameId) return;

    const channel = supabase
      .channel(`presence-${gameId}`)
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const activeUsers = Object.values(state);
        const activeUsersMapped = activeUsers.map((user) => {
          //@ts-ignore
          return user[0].playerId;
        });
        setActivePlayers(activeUsersMapped);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ playerId: me?.id });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, [gameId, me]);

  return { activePlayers };
};
