import React, { useEffect, useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./StatisticsPage.styles";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ThemedTable } from "../../components/ThemedTable";
import {
  Searchbar,
  SegmentedButtons,
  Switch,
  Text,
  useTheme,
} from "react-native-paper";
import { STATISTICS_PAGE_TABS } from "./StatisticsPage.types";
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
import { CustomSwitch } from "../../components/CustomSwitch";

export const StatisticsPage = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const theme = useTheme();
  const me = useAppSelector(userSelectors.getMe);
  const onePlayerGames = useAppSelector(gameSelectors.getOnePlayerGames);
  const twoPlayerGames = useAppSelector(gameSelectors.getTwoPlayerGames);
  const showPersonalGames = useAppSelector(
    (state) => state.game.showPersonalGames,
  );

  const [tab, setTab] = useState(STATISTICS_PAGE_TABS.player1);
  const [searchQuery, setSearchQuery] = React.useState("");

  const isTwoPlayerTab = tab === STATISTICS_PAGE_TABS.player2;

  useEffect(() => {
    if (me?.id) {
      dispatch(gameActions.getOnePlayerGames(me.id, showPersonalGames));
      dispatch(gameActions.getTwoPlayerGames(me.id));
    }
  }, [me, dispatch, showPersonalGames]);

  useEffect(() => {
    if (isTwoPlayerTab) {
      dispatch(gameSliceActions.setShowPersonalGames(true));
    }
  }, [isTwoPlayerTab, dispatch]);

  return (
    <ThemedView style={styles.container}>
      <Text variant="headlineSmall" style={globalStyles.heading}>
        {t("statistics.statistics")}
      </Text>

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          maxWidth: 500,
          width: "100%",
        }}
      >
        <View style={styles.switchContainer}>
          <Text
            style={{
              color: isTwoPlayerTab
                ? theme.colors.onSurfaceDisabled
                : theme.colors.onBackground,
            }}
          >
            Show only your games
          </Text>
          <CustomSwitch
            value={showPersonalGames}
            onValueChange={() => {
              dispatch(
                gameSliceActions.setShowPersonalGames(!showPersonalGames),
              );
            }}
            disabled={isTwoPlayerTab}
          />
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ height: 40, maxWidth: 200 }}
          inputStyle={{ height: 40, minHeight: 40, maxWidth: 200 }}
          mode="view"
        />
      </View>

      {isTwoPlayerTab ? (
        <ThemedTable config={twoPlayerTableConfig} data={twoPlayerGames} />
      ) : (
        <ThemedTable config={onePlayerTableConfig} data={onePlayerGames} />
      )}
    </ThemedView>
  );
};
