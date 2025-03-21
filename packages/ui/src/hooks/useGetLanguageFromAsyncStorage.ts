import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { useAppDispatch } from "../redux/store";
import { LANGUAGE } from "../constants/lang";
import { appActions } from "../modules/App/actions";
import { STORAGE_KEYS } from "../constants/storage";

export const useGetLanguageFromAsyncStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem(STORAGE_KEYS.language);
        const userLanguage = getLocales()[0].languageCode;
        const languageToSet = language || userLanguage;
        dispatch(
          appActions.changeLanguage(
            languageToSet === LANGUAGE.pl ? LANGUAGE.pl : LANGUAGE.en,
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
