import React, { useEffect, useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./StatisticsPage.styles";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ThemedTable } from "../../components/ThemedTable";
import { SegmentedButtons, Switch } from "react-native-paper";
import { STATISTICS_PAGE_TABS } from "./StatisticsPage.types";
import { ThemedText } from "../../components/ThemedText";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../styles/globalStyles";
import {
  onePlayerTableConfig,
  twoPlayerTableConfig,
} from "./StatisticsPage.const";
import { userSelectors } from "../../modules/User/selectors";
import { gameSelectors } from "../../modules/Game/selectors";
import { gameActions } from "../../modules/Game/actions";
import { View } from "react-native";
import { gameSliceActions } from "../../modules/Game/slice";

export const StatisticsPage = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const me = useAppSelector(userSelectors.getMe);
  const onePlayerGames = useAppSelector(gameSelectors.getOnePlayerGames);
  const twoPlayerGames = useAppSelector(gameSelectors.getTwoPlayerGames);
  const showPersonalGames = useAppSelector(
    (state) => state.game.showPersonalGames,
  );

  const [tab, setTab] = useState(STATISTICS_PAGE_TABS.player1);

  useEffect(() => {
    if (me?.id) {
      dispatch(gameActions.getOnePlayerGames(me.id, showPersonalGames));
      dispatch(gameActions.getTwoPlayerGames(me.id));
    }
  }, [me, dispatch, showPersonalGames]);

  useEffect(() => {
    if (tab === STATISTICS_PAGE_TABS.player2) {
      dispatch(gameSliceActions.setShowPersonalGames(true));
    }
  }, [tab, dispatch]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        variant="headlineSmall"
        style={globalStyles.heading}
        text={t("statistics.statistics")}
      />

      <Loader isVisible={false} />
      <SegmentedButtons
        style={styles.segmentedButtons}
        value={tab}
        onValueChange={(value) => setTab(value as STATISTICS_PAGE_TABS)}
        buttons={[
          {
            value: STATISTICS_PAGE_TABS.player1,
            label: "1 player",
          },
          {
            value: STATISTICS_PAGE_TABS.player2,
            label: "2 players",
          },
        ]}
      />
      <View style={styles.switchContainer}>
        <ThemedText text={"Show only your games"} />
        <Switch
          value={showPersonalGames}
          onValueChange={() => {
            dispatch(gameSliceActions.setShowPersonalGames(!showPersonalGames));
          }}
          disabled={tab === STATISTICS_PAGE_TABS.player2}
        />
      </View>

      {tab === STATISTICS_PAGE_TABS.player1 ? (
        <ThemedTable config={onePlayerTableConfig} data={onePlayerGames} />
      ) : (
        <ThemedTable config={twoPlayerTableConfig} data={twoPlayerGames} />
      )}
    </ThemedView>
  );
};
