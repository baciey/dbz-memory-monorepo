import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import { boardSliceActions } from "../modules/Board/slice";

export const useGetPlayerName = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getNames = async () => {
      const playerName = await AsyncStorage.getItem("playerName");
      const playersNames = await AsyncStorage.getItem("playersNames");
      if (playerName) dispatch(boardSliceActions.setPlayerName(playerName));
      if (playersNames)
        dispatch(boardSliceActions.setPlayersNames(JSON.parse(playersNames)));
    };

    getNames();
  }, [dispatch]);

  return null;
};
