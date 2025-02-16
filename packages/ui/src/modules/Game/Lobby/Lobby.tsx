import React, { useCallback, useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Text, useTheme, IconButton } from "react-native-paper";
import { ThemedButton } from "../../../components/ThemedButton";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { gameActions } from "../actions";
import { userSelectors } from "../../User/selectors";
import { gameSelectors } from "../selectors";
import { useGetImages } from "../../../hooks/useGetImages";
import { CreateMultiPlayerGameParams, MultiPlayerGame } from "../slice.types";
import { LobbyProps } from "./Lobby.types";
import { supabase } from "../../../utils/supabase";
import { DATABASE_TABLE } from "../../../constants/database";
import { getShuffledBoardImages } from "../utils";
import { useTranslation } from "react-i18next";
import { styles } from "./Lobby.styles";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";

export const Lobby = ({
  onJoinOrCreatePublicGame,
  handleSetGameMode,
  setAlert,
  setAlertOnPress,
}: LobbyProps) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector(userSelectors.getMe);
  const playerName = useAppSelector(gameSelectors.getPlayerName);
  const multiPlayerGames = useAppSelector(gameSelectors.getMultiPlayerGames);

  const theme = useTheme();
  const { t } = useTranslation();
  const { images } = useGetImages();
  const shuffledBoardImages = getShuffledBoardImages(images.board);

  const isUserAlreadyGameOwner = multiPlayerGames.some(
    (game) =>
      game.player1Id === me?.id && !game.isOver && !game.deletedDueToInactivity,
  );
  const isUserAlreadyInGame = multiPlayerGames.some(
    (game) =>
      (game.player1Id === me?.id || game.player2Id === me?.id) &&
      !game.isOver &&
      !game.deletedDueToInactivity,
  );

  useEffect(() => {
    dispatch(gameActions.getMultiPlayerGames());
  }, [dispatch, me]);

  useEffect(() => {
    const handleChange = () => {
      dispatch(gameActions.getMultiPlayerGames());
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

  const isJoinCreatePossible = useCallback(
    (game?: MultiPlayerGame) => {
      setAlertOnPress(undefined);
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
    },
    [
      me,
      isUserAlreadyGameOwner,
      isUserAlreadyInGame,
      t,
      setAlert,
      setAlertOnPress,
    ],
  );

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

  const joinPublicGame = useCallback(
    async (game: MultiPlayerGame) => {
      if (me?.id && isJoinCreatePossible(game)) {
        const params = {
          player2_id: me.id,
          player2_name: playerName,
        };

        const { error } = await supabase
          .from(DATABASE_TABLE.multi_player_games)
          .update(params)
          .eq("id", game.id);

        if (error) {
          setAlert(t("game.joinGameError"));
          setAlertOnPress(() => {
            return () => {
              handleSetGameMode(null);
            };
          });
        } else {
          const gameUpdated = {
            ...game,
            player2Id: me.id,
            player2Name: playerName,
          };
          onJoinOrCreatePublicGame(gameUpdated);
        }
      }
    },
    [
      me,
      playerName,
      isJoinCreatePossible,
      onJoinOrCreatePublicGame,
      handleSetGameMode,
      setAlert,
      setAlertOnPress,
      t,
    ],
  );

  const handleDeleteGame = useCallback(
    (id: number) => {
      dispatch(gameActions.deleteMultiPlayerGame(id));
    },
    [dispatch],
  );

  const publicGamesElement = useMemo(() => {
    return multiPlayerGames
      .filter(
        (game) =>
          !game.isOver &&
          !game.deletedDueToInactivity &&
          game.player2Id === null,
      )
      .map((game) => {
        const isMeGameOwner = game.player1Id === me?.id;
        return (
          <View key={game.id} style={styles.gameRowContainer}>
            <ThemedButton
              onPress={() => joinPublicGame(game)}
              text={t("game.join")}
              icon="arrow-left"
            />
            <Text>{game.player1Name}</Text>
            {isMeGameOwner && (
              <IconButton
                icon="close"
                size={20}
                onPress={() => handleDeleteGame(game.id)}
              />
            )}
          </View>
        );
      });
  }, [multiPlayerGames, t, joinPublicGame, handleDeleteGame, me?.id]);

  const { height: screenHeight, isMobile } = useGetScreenDimensions();
  const divider = isMobile ? 2 : 1.5;

  return (
    <View style={[styles.container]}>
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
            icon="plus"
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
