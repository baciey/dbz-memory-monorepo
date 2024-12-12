import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import { gameSliceActions } from "../modules/Game/slice";

export const useGetPlayerName = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNames = async () => {
      const playerName = await AsyncStorage.getItem("playerName");
      const playersNames = await AsyncStorage.getItem("playersNames");
      if (playerName)
        dispatch(gameSliceActions.setPlayerName(JSON.parse(playerName)));
      if (playersNames)
        dispatch(gameSliceActions.setPlayersNames(JSON.parse(playersNames)));
    };

    getNames();
  }, [dispatch]);

  return null;
};
