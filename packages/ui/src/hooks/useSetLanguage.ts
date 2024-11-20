import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { useAppDispatch } from "../redux/store";
import { appActions } from "../redux/actions";
import { LANGUAGES } from "../constants/lang";

export const useSetLanguage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem("language");
        const userLanguage = getLocales()[0].languageCode;
        const languageToSet = language || userLanguage;
        dispatch(
          appActions.changeLanguage(
            languageToSet === LANGUAGES.pl ? LANGUAGES.pl : LANGUAGES.en,
          ),
        );
      } catch (error) {
        console.error("setLanguage error:", error);
      }
    };

    setLanguage();
  }, [dispatch]);

  return null;
};
