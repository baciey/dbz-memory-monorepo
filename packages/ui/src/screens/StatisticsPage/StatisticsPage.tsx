import React, { useEffect, useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { ThemedButton } from "../../components/ThemedButton";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { View } from "react-native";
import { styles } from "./StatisticsPage.styles";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { gamesActions } from "../../redux/Games/actions";
import { appSelectors } from "../../redux/selectors";
import { gamesSelectors } from "../../redux/Games/selectors";
import { ThemedText } from "../../components/ThemedText";
import { supabase } from "../../utils/supabase";

export const StatisticsPage = () => {
  const dispatch = useAppDispatch();

  const me = useAppSelector(appSelectors.getMe);
  const singlePlayerGames = useAppSelector(gamesSelectors.getSinglePlayerGames);

  useEffect(() => {
    if (me?.id) dispatch(gamesActions.getSinglePlayerGames(me.id));
  }, [me, dispatch]);

  const singlePlayerGamesElements = singlePlayerGames?.map((game) => {
    return (
      <View key={game.id}>
        <ThemedText text={String(game.time)} />
        <ThemedText text={String(game.name)} />
      </View>
    );
  });

  return (
    <ThemedView style={styles.container}>
      <Loader isVisible={false} />
      <View>{singlePlayerGamesElements}</View>
    </ThemedView>
  );
};
