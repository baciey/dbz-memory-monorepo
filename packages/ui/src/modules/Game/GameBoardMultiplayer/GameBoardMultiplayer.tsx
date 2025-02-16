import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../Card";
import { styles } from "./GameBoardMultiplayer.styles";
import { ThemedView } from "../../../components/ThemedView";
import { GameInfo } from "../GameInfo";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { GameBoardMultiplayerProps } from "./GameBoardMultiplayer.types";
import { GAME_BOARD_MODE } from "../GameBoard/GameBoard.types";
import { MultiPlayerGame } from "../slice.types";
import { gameActions } from "../actions";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";
import { useGameHasEnded } from "./useGameHasEnded";
import { useSupabaseListener } from "./useSupabaseListener";
import { useCalculateCardAndBoardDimensions } from "../hooks";
import { usePlayerTimeToMove } from "./usePlayerTimeToMove";
import { ThemedButton } from "../../../components/ThemedButton";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";
import { getShuffledBoardImages } from "../utils";
import { useGetImages } from "../../../hooks/useGetImages";
import { defaultTimeToMove } from "./GameBoardMultiPlayer.const";

export const GameBoardMultiplayer = ({
  handleSetGameMode,
  initialGame,
  setAlert,
  setAlertOnPress,
  setIsAlertWithCancel,
  alertOnPress,
}: GameBoardMultiplayerProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const me = useAppSelector((state) => state.user.me);
  const { isMobile, isWeb } = useGetScreenDimensions();
  const { images } = useGetImages();

  const [cardWidth, setCardWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [game, setGame] = useState<MultiPlayerGame>(initialGame);
  const [timeToMove, setTimeToMove] = useState<number>(defaultTimeToMove);

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
    isOver,
    deletedDueToInactivity,
  } = game;

  const isMeGameOwner = me?.id === player1Id;

  const showOpponentLeftGameAlert = useCallback(() => {
    setAlert(`${game.player2Name} ${t("game.hasLeftTheGame")}`);
    setIsAlertWithCancel(false);
    setAlertOnPress(undefined);
  }, [game.player2Name, t, setIsAlertWithCancel, setAlert, setAlertOnPress]);

  const showOwnerClosedGameAlert = useCallback(() => {
    setAlert(`${player1Name} ${t("game.hasLeftTheGame")}`);
    setIsAlertWithCancel(false);
    setAlertOnPress(() => {
      return () => {
        handleSetGameMode(null);
      };
    });
  }, [
    handleSetGameMode,
    t,
    player1Name,
    setAlert,
    setIsAlertWithCancel,
    setAlertOnPress,
  ]);

  useEffect(() => {
    const showGameDeletedDueToInactivityAlert = () => {
      setAlert(`${t("game.deletedDueToInactivity")}`);
      setIsAlertWithCancel(false);
      setAlertOnPress(() => {
        return () => {
          handleSetGameMode(null);
        };
      });
    };

    if (deletedDueToInactivity) {
      showGameDeletedDueToInactivityAlert();
    }
  }, [
    deletedDueToInactivity,
    handleSetGameMode,
    t,
    player1Name,
    player2Name,
    setAlert,
    setIsAlertWithCancel,
    setAlertOnPress,
  ]);

  const resetGame = useCallback(() => {
    const shuffledBoardImages = getShuffledBoardImages(images.board);

    dispatch(
      gameActions.updateMultiPlayerGame({
        id,
        isPlayer1Ready: false,
        isPlayer2Ready: false,
        cards: shuffledBoardImages,
        player2Id: null,
        player2Name: null,
        player1Score: 0,
        player2Score: 0,
        isPlayer1Turn: true,
        firstCard: null,
        secondCard: null,
      }),
    );
  }, [dispatch, id, images.board]);

  const setWinnerWithDelay = useCallback(
    (
      playerId: string | null,
      delay: number = 1000,
      isAbandoned: boolean = false,
    ) => {
      if (playerId) {
        setTimeout(
          () =>
            dispatch(
              gameActions.updateMultiPlayerGame({
                id,
                isOver: true,
                isAbandoned,
                winner: playerId,
              }),
            ),
          delay,
        );
      }
    },
    [dispatch, id],
  );

  const handleOpponentLeftGame = useCallback(() => {
    const looserName = isMeGameOwner ? player2Name : player1Name;
    const winnerName = isMeGameOwner ? player1Name : player2Name;
    const winnerId = isMeGameOwner ? player1Id : player2Id;

    let isAbandoned = false;

    // players are ready - game has started
    if (isPlayer1Ready && isPlayer2Ready && player2Id && !isOver) {
      setWinnerWithDelay(winnerId, 0, true);
      isAbandoned = true;
    } // one or both players are not ready, but both are in the game - game has not started
    else if ((!isPlayer1Ready || !isPlayer2Ready) && player2Id && !isOver) {
      if (isMeGameOwner) {
        resetGame();
        showOpponentLeftGameAlert();
      } else {
        showOwnerClosedGameAlert();
      }
    }

    if (isAbandoned) {
      const alertMessage = `${winnerName} ${t("game.wonTheGame")}! ${looserName} ${t("game.hasLeftTheGame")}. \n${t("game.finalScore")}: ${player1Score} : ${player2Score}`;
      setAlert(alertMessage);
      setAlertOnPress(() => {
        return () => {
          handleSetGameMode(null);
        };
      });
    }
  }, [
    isOver,
    isPlayer1Ready,
    isPlayer2Ready,
    player2Id,
    isMeGameOwner,
    player1Id,
    setWinnerWithDelay,
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    handleSetGameMode,
    t,
    resetGame,
    showOwnerClosedGameAlert,
    showOpponentLeftGameAlert,
    setAlert,
    setAlertOnPress,
  ]);

  const handleMeLeftGame = useCallback(() => {
    if (isOver) {
      return handleSetGameMode(null);
    }
    const winnerId = isMeGameOwner ? player2Id : player1Id;

    // players are ready - game has started
    if (isPlayer1Ready && isPlayer2Ready) {
      setWinnerWithDelay(winnerId, 1000, true);
    }
    // one or both players are not ready, but both are in the game - game has not started
    else if ((!isPlayer1Ready || !isPlayer2Ready) && player2Id) {
      if (isMeGameOwner) {
        dispatch(gameActions.deleteMultiPlayerGame(id));
      } else {
        handleSetGameMode(null);
      }
      // only game owner is in the game
    } else if (!player2Id) {
      dispatch(gameActions.deleteMultiPlayerGame(id));
    }
  }, [
    isOver,
    isPlayer1Ready,
    isPlayer2Ready,
    player2Id,
    isMeGameOwner,
    setWinnerWithDelay,
    player1Id,
    handleSetGameMode,
    dispatch,
    id,
  ]);

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
  }, [
    game.player2Name,
    id,
    dispatch,
    t,
    setAlertOnPress,
    setIsAlertWithCancel,
    setAlert,
  ]);

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
  }, [id, dispatch, t, setAlertOnPress, setIsAlertWithCancel, setAlert]);

  const showGoBackToMenuAlert = () => {
    setAlert(t("home.returnAlert"));
    setIsAlertWithCancel(true);
    setAlertOnPress(() => {
      return () => {
        handleMeLeftGame();
        handleSetGameMode(null);
      };
    });
  };

  useEffect(() => {
    if (isMeGameOwner && player2Id) {
      showSetOwnerReadyAlert();
    } else if (!isMeGameOwner && player2Id) {
      showSetOpponentReadyAlert();
    }
  }, [
    isMeGameOwner,
    player2Id,
    showSetOwnerReadyAlert,
    showSetOpponentReadyAlert,
  ]);
  const { activePlayers } = useSupabaseListener({
    gameId: id,
    setGame,
  });
  const [isRoomFull, setIsRoomFull] = useState(false);
  useEffect(() => {
    if (activePlayers.length === 2 && !isRoomFull) {
      setIsRoomFull(true);
    }
  }, [activePlayers, handleOpponentLeftGame, isRoomFull]);
  useEffect(() => {
    if (isRoomFull && activePlayers.length === 1 && me?.id) {
      if (activePlayers.includes(me?.id)) {
        handleOpponentLeftGame();
      } else {
        if (isMeGameOwner) {
          dispatch(gameActions.deleteMultiPlayerGame(id));
        }
        setAlert(t("game.youHaveBeenKickedDueToInactivity"));
        setIsAlertWithCancel(false);
        setAlertOnPress(undefined);
        handleSetGameMode(null);
      }

      setIsRoomFull(false);
    }
  }, [
    isRoomFull,
    activePlayers,
    handleOpponentLeftGame,
    me?.id,
    handleMeLeftGame,
    handleSetGameMode,
    t,
    setAlert,
    setIsAlertWithCancel,
    setAlertOnPress,
    isMeGameOwner,
    dispatch,
    id,
  ]);

  useCalculateCardAndBoardDimensions({
    setCardWidth,
    setContainerWidth,
  });

  useGameHasEnded({
    game,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
    alertOnPress,
  });

  usePlayerTimeToMove({
    game,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
    timeToMove,
    setTimeToMove,
    alertOnPress,
  });

  const handleCardPress = (index: number) => {
    if (
      (!isMeGameOwner && isPlayer1Turn) ||
      (isMeGameOwner && !isPlayer1Turn) ||
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
      setTimeToMove(defaultTimeToMove);
    } else {
      const currentCard = { ...updatedCards[index], index };

      dispatch(
        gameActions.updateMultiPlayerGame({
          id: id,
          secondCard: currentCard,
          cards: updatedCards,
        }),
      );
      setTimeToMove(defaultTimeToMove);

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
  };

  const isMyTurn =
    (isMeGameOwner && isPlayer1Turn) || (!isMeGameOwner && !isPlayer1Turn);

  return (
    <>
      <ThemedButton
        icon="arrow-left"
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
        <View>
          {isMyTurn && timeToMove < 10 && (
            <Text
              style={isMobile ? {} : { position: "absolute", right: 0 }}
            >{`${t("game.hurryUp")}! ${t("game.timeToMove")}: ${timeToMove}s`}</Text>
          )}
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
