import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../Card";
import { styles } from "./GameBoardMultiplayer.styles";
import { ThemedView } from "../../../components/ThemedView";
import { GameInfo } from "../GameInfo";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { ThemedAlert } from "../../../components/ThemedAlert";
import { GameBoardMultiplayerProps } from "./GameBoardMultiplayer.types";
import { GAME_BOARD_MODE } from "../GameBoard/GameBoard.types";
import { MultiPlayerGame } from "../slice.types";
import { gameActions } from "../actions";
import { useTranslation } from "react-i18next";
import { getShuffledBoardImages } from "../utils";
import { useGetImages } from "../../../hooks/useGetImages";
import { Text } from "react-native-paper";
import { useGameHasEnded } from "./useGameHasEnded";
import { useSupabaseListener } from "./useSupabaseListener";
import { useCalculateCardAndBoardDimensions } from "../hooks";
import { usePlayerTimeToMove } from "./usePlayerTimeToMove";
import { ThemedButton } from "../../../components/ThemedButton";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";

const timeToMove = 30;

export const GameBoardMultiplayer = ({
  handleSetGameMode,
  initialGame,
}: GameBoardMultiplayerProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const me = useAppSelector((state) => state.user.me);
  const { isMobile, isWeb } = useGetScreenDimensions();
  const { images } = useGetImages();

  const [cardWidth, setCardWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [alert, setAlert] = useState<string>("");
  const [alertOnPress, setAlertOnPress] = useState<(() => void) | undefined>();
  const [isAlertWithCancel, setIsAlertWithCancel] = useState<boolean>(false);
  const [player1TimeToMove, setPlayer1TimeToMove] =
    useState<number>(timeToMove);
  const [player2TimeToMove, setPlayer2TimeToMove] =
    useState<number>(timeToMove);
  const [game, setGame] = useState<MultiPlayerGame>(initialGame);

  const {
    id,
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    player1Id,
    player2Id,
    isPlayer1Ready,
    isPlayer2Ready,
    cards,
    firstCard,
    secondCard,
    isPlayer1Turn,
  } = game;

  const isUserGameOwner = me?.id === player1Id;

  const showOwnerClosedGameAlert = useCallback(() => {
    setAlert(`${player1Name} ${t("game.hasLeftTheGame")}`);
    setIsAlertWithCancel(false);
    setAlertOnPress(() => {
      return () => {
        handleSetGameMode(null);
      };
    });
  }, [handleSetGameMode, t, player1Name]);

  const showSetOwnerReadyAlert = useCallback(() => {
    setAlert(
      `${game.player2Name} ${t("game.joinedTheGame")}. ${t("game.setYourselfReady")}`,
    );
    setIsAlertWithCancel(false);
    setAlertOnPress(() => {
      return () => {
        dispatch(
          gameActions.updateMultiPlayerGame({ id, isPlayer1Ready: true }),
        );
      };
    });
  }, [game.player2Name, id, dispatch, t]);

  const showSetOpponentReadyAlert = useCallback(() => {
    setAlert(t("game.setYourselfReady"));
    setIsAlertWithCancel(false);
    setAlertOnPress(() => {
      return () => {
        dispatch(
          gameActions.updateMultiPlayerGame({ id, isPlayer2Ready: true }),
        );
      };
    });
  }, [id, dispatch, t]);

  const showGoBackToMenuAlert = () => {
    setAlert(t("home.returnAlert"));
    setIsAlertWithCancel(true);
    setAlertOnPress(() => {
      return () => {
        handleSetGameMode(null);

        if (isUserGameOwner) {
          dispatch(gameActions.deleteMultiPlayerGame(id));
        } else {
          const shuffledBoardImages = getShuffledBoardImages(images.board);

          dispatch(
            gameActions.updateMultiPlayerGame({
              id,
              isPlayer2Ready: false,
              cards: shuffledBoardImages,
              player2Id: null,
              isPlayer1Ready: false,
              player1Score: 0,
              player2Score: 0,
              isPlayer1Turn: true,
              firstCard: null,
              secondCard: null,
            }),
          );
        }
      };
    });
  };

  const showOpponentLeftGameAlert = useCallback(() => {
    setAlert(`${game.player2Name} ${t("game.hasLeftTheGame")}`);
    setIsAlertWithCancel(false);
    setAlertOnPress(undefined);
  }, [game.player2Name, t]);

  useEffect(() => {
    if (!isUserGameOwner) {
      showSetOpponentReadyAlert();
    }
  }, [isUserGameOwner, showSetOpponentReadyAlert]);

  useEffect(() => {
    if (isUserGameOwner && player2Id) {
      showSetOwnerReadyAlert();
    }
  }, [isUserGameOwner, player2Id, showSetOwnerReadyAlert]);

  useSupabaseListener({
    gameId: id,
    setGame,
    showOwnerClosedGameAlert,
    showOpponentLeftGameAlert,
  });

  useCalculateCardAndBoardDimensions({
    setCardWidth,
    setContainerWidth,
  });

  useGameHasEnded({
    game,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
  });

  usePlayerTimeToMove({
    game,
    setPlayer1TimeToMove,
    setPlayer2TimeToMove,
    player1TimeToMove,
    player2TimeToMove,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
  });

  const handleCardPress = (index: number) => {
    if (
      (!isUserGameOwner && isPlayer1Turn) ||
      (isUserGameOwner && !isPlayer1Turn) ||
      (firstCard && secondCard) ||
      cards[index].isRevealed ||
      !player2Id ||
      !isPlayer1Ready ||
      !isPlayer2Ready
    )
      return;

    const updatedCards = [...cards];
    updatedCards[index].isRevealed = true;

    if (!firstCard) {
      dispatch(
        gameActions.updateMultiPlayerGame({
          id: id,
          firstCard: { ...updatedCards[index], index },
          cards: updatedCards,
        }),
      );
    } else {
      const currentCard = { ...updatedCards[index], index };

      dispatch(
        gameActions.updateMultiPlayerGame({
          id: id,
          secondCard: currentCard,
          cards: updatedCards,
        }),
      );

      const isMatch = firstCard.src === currentCard.src;

      setTimeout(() => {
        const key = isPlayer1Turn ? "player1Score" : "player2Score";
        let value = game[key];
        let isPlayer1TurnNew = isPlayer1Turn;

        if (isMatch) {
          updatedCards[firstCard.index!].isPaired = true;
          updatedCards[currentCard.index!].isPaired = true;
          value += 1;
        } else {
          updatedCards[firstCard.index!].isRevealed = false;
          updatedCards[currentCard.index!].isRevealed = false;
          isPlayer1TurnNew = !isPlayer1Turn;
        }

        dispatch(
          gameActions.updateMultiPlayerGame({
            id: id,
            cards: updatedCards,
            firstCard: null,
            secondCard: null,
            [key]: value,
            isPlayer1Turn: isPlayer1TurnNew,
          }),
        );
      }, 2000);
    }

    setPlayer1TimeToMove(timeToMove);
    setPlayer2TimeToMove(timeToMove);
  };

  const timeDisplayElement = (time: number) => {
    return <Text>{`${t("game.hurryUp")}! ${time}s ${t("game.left")}`}</Text>;
  };

  return (
    <>
      <ThemedButton
        text={t("home.goBack")}
        onPress={showGoBackToMenuAlert}
        style={[
          GLOBAL_STYLES.m.mb16,
          isWeb ? {} : { marginTop: 50 },
          isMobile ? {} : styles.returnButtonWeb,
          styles.returnButton,
        ]}
      />
      <View>
        <ThemedAlert
          text={alert}
          isVisible={Boolean(alert)}
          actionButtonOnPress={alertOnPress}
          withCancel={isAlertWithCancel}
          onDismiss={() => setAlert("")}
        />

        {isUserGameOwner &&
          player1TimeToMove < 10 &&
          timeDisplayElement(player1TimeToMove)}
        {!isUserGameOwner &&
          player2TimeToMove < 10 &&
          timeDisplayElement(player2TimeToMove)}
        <View>
          <GameInfo
            mode={GAME_BOARD_MODE.multiplayer}
            isPlayer1Turn={isPlayer1Turn}
            player2Id={player2Id}
            player1Score={player1Score}
            player2Score={player2Score}
            player1Name={player1Name}
            player2Name={player2Name}
          />
          <ThemedView
            style={[
              styles.cardsContainer,
              {
                maxWidth: containerWidth,
              },
            ]}
          >
            {cards.map((card, index) => (
              <Card
                index={index}
                key={index}
                width={cardWidth}
                card={card}
                onPress={() => handleCardPress(index)}
              />
            ))}
          </ThemedView>
        </View>
      </View>
    </>
  );
};
