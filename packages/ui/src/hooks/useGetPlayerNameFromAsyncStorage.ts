import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import { gameSliceActions } from "../modules/Game/slice";
import { STORAGE_KEYS } from "../constants/storage";

export const useGetPlayerNameFromAsyncStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNames = async () => {
      const playerName = await AsyncStorage.getItem(STORAGE_KEYS.playerName);
      const playersNames = await AsyncStorage.getItem(
        STORAGE_KEYS.playersNames,
      );
      if (playerName)
        dispatch(gameSliceActions.setPlayerName(JSON.parse(playerName)));
      if (playersNames)
        dispatch(gameSliceActions.setPlayersNames(JSON.parse(playersNames)));
    };

    getNames();
  }, [dispatch]);

  return null;
};
