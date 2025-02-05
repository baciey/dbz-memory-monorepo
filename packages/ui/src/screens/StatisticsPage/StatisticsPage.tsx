import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./StatisticsPage.styles";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ThemedTable } from "../../components/ThemedTable";
import {
  Searchbar,
  SegmentedButtons,
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
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";

export const StatisticsPage = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const theme = useTheme();
  const { isMobile } = useGetScreenDimensions();
  const me = useAppSelector(userSelectors.getMe);
  const onePlayerGames = useAppSelector(gameSelectors.getOnePlayerGames);
  const twoPlayerGames = useAppSelector(gameSelectors.getTwoPlayerGames);
  const multiPlayerGames = useAppSelector(gameSelectors.getMultiPlayerGames);

  const showPersonalGames = useAppSelector(
    (state) => state.game.showPersonalGames,
  );

  const [tab, setTab] = useState(STATISTICS_PAGE_TABS.player1);
  const [searchQuery, setSearchQuery] = useState("");

  const isTwoPlayerTab = tab === STATISTICS_PAGE_TABS.player2;

  const multiPlayerGamesFiltered = useMemo(() => {
    return multiPlayerGames
      .filter(
        (game) =>
          game.isOver &&
          (showPersonalGames
            ? game.player1Id === me?.id || game.player2Id === me?.id
            : true) &&
          (searchQuery
            ? game.player1Name.includes(searchQuery) ||
              game.player2Name?.includes(searchQuery)
            : true),
      )
      .map((game) => {
        return {
          player1Name: game.player1Name,
          player2Name: game.player2Name,
          player1Score: game.player1Score,
          player2Score: game.player2Score,
          createdAt: game.createdAt,
          winner: game.winner,
          player1Id: game.player1Id,
          player2Id: game.player2Id,
        };
      });
  }, [multiPlayerGames, showPersonalGames, me, searchQuery]);

  const tableComponent = useMemo(() => {
    if (tab === STATISTICS_PAGE_TABS.player1) {
      return (
        <ThemedTable config={onePlayerTableConfig(t)} data={onePlayerGames} />
      );
    } else if (tab === STATISTICS_PAGE_TABS.player2) {
      return (
        <ThemedTable config={twoPlayerTableConfig(t)} data={twoPlayerGames} />
      );
    } else if (tab === STATISTICS_PAGE_TABS.multiplayer) {
      return (
        <ThemedTable
          config={twoPlayerTableConfig(t)}
          data={multiPlayerGamesFiltered}
        />
      );
    }
  }, [onePlayerGames, twoPlayerGames, multiPlayerGamesFiltered, tab, t]);

  const fetchGames = useCallback(() => {
    if (me?.id) {
      dispatch(
        gameActions.getOnePlayerGames(me.id, showPersonalGames, searchQuery),
      );
      dispatch(gameActions.getTwoPlayerGames(me.id, searchQuery));
      dispatch(gameActions.getMultiPlayerGames());
    }
  }, [me, dispatch, showPersonalGames, searchQuery]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames, tab]);

  return (
    <ThemedView style={globalStyles.pageContainer}>
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
            label: t("statistics.player1"),
          },
          {
            value: STATISTICS_PAGE_TABS.player2,
            label: t("statistics.player2"),
          },
          {
            value: STATISTICS_PAGE_TABS.multiplayer,
            label: t("statistics.multiplayer"),
          },
        ]}
      />
      <View
        style={[
          styles.switchSearchContainer,
          {
            flexDirection: isMobile ? "column" : "row",
          },
        ]}
      >
        <View
          style={[
            isMobile
              ? { marginBottom: 16, maxWidth: "100%" }
              : { maxWidth: 200 },
          ]}
        >
          <Searchbar
            placeholder={t("statistics.search")}
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.search}
            inputStyle={styles.searchInput}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text
            style={{
              color: isTwoPlayerTab
                ? theme.colors.onSurfaceDisabled
                : theme.colors.onBackground,
            }}
          >
            {t("statistics.showOnlyYourGames")}
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
      </View>

      {tableComponent}
    </ThemedView>
  );
};
