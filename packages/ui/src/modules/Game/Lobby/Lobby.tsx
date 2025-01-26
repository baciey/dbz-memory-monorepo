import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ThemedButton } from "../../../components/ThemedButton";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { gameActions } from "../actions";
import { userSelectors } from "../../User/selectors";
import { gameSelectors } from "../selectors";
import { useGetImages } from "../../../hooks/useGetImages";
import {
  CreateMultiPlayerGameParams,
  MultiPlayerGame,
  UpdateMultiPlayerGameParams,
} from "../slice.types";
import { LobbyProps } from "./Lobby.types";
import { supabase } from "../../../utils/supabase";
import { DATABASE_TABLE } from "../../../constants/database";
import { getShuffledBoardImages } from "../utils";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { useTranslation } from "react-i18next";
import { styles } from "./Lobby.styles";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";

export const Lobby = ({ onJoinOrCreatePublicGame }: LobbyProps) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector(userSelectors.getMe);
  const playerName = useAppSelector(gameSelectors.getPlayerName);
  const multiPlayerGames = useAppSelector(gameSelectors.getMultiPlayerGames);

  const theme = useTheme();
  const { t } = useTranslation();
  const { images } = useGetImages();
  const shuffledBoardImages = getShuffledBoardImages(images.board);

  const [alert, setAlert] = useState<string>("");

  const isUserAlreadyGameOwner = multiPlayerGames.some(
    (game) => game.player1Id === me?.id,
  );
  const isUserAlreadyInGame = multiPlayerGames.some(
    (game) => game.player1Id === me?.id || game.player2Id === me?.id,
  );

  useEffect(() => {
    dispatch(gameActions.getMultiPlayerGames({}));
  }, [dispatch, me]);

  useEffect(() => {
    const handleChange = () => {
      dispatch(gameActions.getMultiPlayerGames({}));
    };

    const channel = supabase
      .channel("multi_player_games")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: DATABASE_TABLE.multi_player_games,
        },

        handleChange,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dispatch]);

  const isJoinCreatePossible = (game?: MultiPlayerGame) => {
    return true;
    if (me?.id === game?.player1Id) {
      setAlert(t("game.ownGameAlert"));
      return false;
    } else if (isUserAlreadyGameOwner) {
      setAlert(t("game.gameCreatedAlert"));
      return false;
    } else if (isUserAlreadyInGame) {
      setAlert(t("game.gameJoinAlert"));
      return false;
    } else {
      return true;
    }
  };

  const createPublicGame = () => {
    if (me?.id && isJoinCreatePossible()) {
      const params: CreateMultiPlayerGameParams = {
        player1Id: me.id,
        player1Name: playerName,
        cards: shuffledBoardImages,
        onJoinOrCreatePublicGame,
      };
      dispatch(gameActions.createMultiPlayerGame({ ...params }));
    }
  };

  const joinPublicGame = (game: MultiPlayerGame) => {
    if (me?.id && isJoinCreatePossible(game)) {
      const params: UpdateMultiPlayerGameParams = {
        id: game.id,
        player2Id: me.id,
        player2Name: playerName,
      };
      dispatch(gameActions.updateMultiPlayerGame({ ...params }));
      const gameUpdated = {
        ...game,
        player2Id: me.id,
        player2Name: playerName,
      };
      onJoinOrCreatePublicGame(gameUpdated);
    }
  };

  const publicGamesElement = multiPlayerGames.map((game) => {
    return (
      <View key={game.id} style={styles.gameRowContainer}>
        <ThemedButton
          onPress={() => joinPublicGame(game)}
          text={t("game.join")}
        />
        <Text>{game.player1Name}</Text>
      </View>
    );
  });

  const { height: screenHeight, isMobile } = useGetScreenDimensions();
  const divider = isMobile ? 2 : 1.5;

  return (
    <View style={[styles.container]}>
      <ThemedAlert
        text={alert}
        isVisible={Boolean(alert)}
        actionButtonOnPress={() => setAlert("")}
      />
      <View
        style={[styles.columnsContainer, { width: isMobile ? "100%" : "auto" }]}
      >
        <View
          style={[
            styles.column,
            { backgroundColor: theme.colors.elevation.level4 },
            { width: isMobile ? "100%" : "auto" },
          ]}
        >
          <Text variant="bodyLarge">{t("game.publicGames")}</Text>
          <ThemedButton
            style={[styles.createButton, styles.mr32]}
            onPress={createPublicGame}
            text={t("game.create")}
            type="tertiary"
          />
          <ScrollView
            nestedScrollEnabled
            style={[
              {
                height: screenHeight / divider,
              },
              styles.mr32,
            ]}
          >
            {publicGamesElement}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
