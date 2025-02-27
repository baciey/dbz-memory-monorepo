import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../redux/store";
import { gameSliceActions } from "../modules/Game/slice";
import { STORAGE_KEYS } from "../constants/storage";

export const useGetCardsVanishTimeFromAsyncStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getVanishTime = async () => {
      const vanishTime = await AsyncStorage.getItem(
        STORAGE_KEYS.cardsVanishTime,
      );
      if (vanishTime)
        dispatch(gameSliceActions.setCardsVanishTime(JSON.parse(vanishTime)));
    };

    getVanishTime();
  }, [dispatch]);

  return null;
};
