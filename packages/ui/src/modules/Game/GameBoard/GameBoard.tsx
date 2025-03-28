import React, { useEffect, useRef, useState } from "react";
import { Card } from "../Card";
import { styles } from "./GameBoard.styles";
import { ThemedView } from "../../../components/ThemedView";
import { CardType, SelectedCardType } from "../Card/Card.types";
import {
  GAME_BOARD_MODE,
  GameBoardProps,
  PLAYER_TURN,
  Scores,
  SCORES_KEY,
} from "./GameBoard.types";
import { GameInfo } from "../GameInfo";
import { View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useGetImages } from "../../../hooks/useGetImages";
import { gameActions } from "../actions";
import { useTranslation } from "react-i18next";
import { gameSelectors } from "../selectors";
import { useCalculateCardAndBoardDimensions } from "../hooks";
import { getShuffledBoardImages } from "../utils";
import { userSelectors } from "../../User/selectors";
import { MOVES_LIMIT, MOVES_TIME_MULTIPLIER } from "./GameBoard.const";

export const GameBoard = ({
  mode,
  handleSetGameMode,
  setAlert,
  setAlertOnPress,
  alertOnPress,
  isTriple,
}: GameBoardProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [cardWidth, setCardWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<SelectedCardType | null>(null);
  const [secondCard, setSecondCard] = useState<SelectedCardType | null>(null);
  const [thirdCard, setThirdCard] = useState<SelectedCardType | null>(null);

  // Timer and score state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Elapsed time for 1-player mode
  const [playerTurn, setPlayerTurn] = useState<PLAYER_TURN>(1);
  const [scores, setScores] = useState<Scores>({ player1: 0, player2: 0 });
  const me = useAppSelector(userSelectors.getMe);
  const player1Name =
    useAppSelector(gameSelectors.getPlayersNames)[0] || t("game.player1");
  const player2Name =
    useAppSelector(gameSelectors.getPlayersNames)[1] || t("game.player2");
  const singlePlayerName = useAppSelector(gameSelectors.getPlayerName);
  const showPersonalGames = useAppSelector(gameSelectors.getShowPersonalGames);
  const { images } = useGetImages();
  const cardsVanishTime = useAppSelector(gameSelectors.getCardsVanishTime);

  const moves = useRef<number>(0);

  useEffect(() => {
    const shuffledBoardImages = getShuffledBoardImages(images.board, isTriple);
    setCards(shuffledBoardImages);
  }, [images, isTriple]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (mode === GAME_BOARD_MODE.player1 && startTime && !endTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000)); // Update elapsed time every second
      }, 1000);
    }

    if (endTime && timer) {
      clearInterval(timer); // Stop updating when the game ends
    }

    return () => {
      if (timer) clearInterval(timer); // Clean up interval on component unmount
    };
  }, [startTime, endTime, mode]);

  useCalculateCardAndBoardDimensions({
    setCardWidth,
    setContainerWidth,
    isTriple,
  });

  // Save single player score to the database
  useEffect(() => {
    if (
      mode === GAME_BOARD_MODE.player1 &&
      endTime &&
      startTime &&
      singlePlayerName &&
      me?.id
    ) {
      if (!alertOnPress) {
        const time = parseFloat(((endTime - startTime) / 1000).toFixed(2));
        let finalScore = time;

        if (moves.current > MOVES_LIMIT) {
          finalScore =
            time + (moves.current - MOVES_LIMIT) * MOVES_TIME_MULTIPLIER;
        }

        dispatch(
          gameActions.updateOnePlayerGames(
            me.id,
            singlePlayerName,
            finalScore,
            showPersonalGames,
            isTriple,
          ),
        );

        const alert = `${t("game.congratulations")}! ${t("game.youHaveFinishedGame")}\n${t("game.time")}: ${time}\n${t("game.moves")}: ${moves.current}\n${t("game.result")}: ${finalScore} (${t("game.movesInfo")})`;
        setAlert(alert);
        setAlertOnPress(() => {
          return () => {
            handleSetGameMode(null);
          };
        });
      }
    }
  }, [
    endTime,
    startTime,
    singlePlayerName,
    mode,
    me?.id,
    dispatch,
    showPersonalGames,
    t,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
    alertOnPress,
    isTriple,
  ]);

  // Save 2-players scores to the database
  useEffect(() => {
    const is2PlayerGameEnd = cards.every((card) => card.isPaired);
    if (
      cards.length &&
      mode === GAME_BOARD_MODE.player2 &&
      is2PlayerGameEnd &&
      player1Name &&
      player2Name &&
      me?.id
    ) {
      if (!alertOnPress) {
        dispatch(
          gameActions.updateTwoPlayerGames(
            player1Name,
            player2Name,
            scores.player1,
            scores.player2,
            me.id,
          ),
        );
        const isTie = scores.player1 === scores.player2;
        const winnerName =
          scores.player1 > scores.player2 ? player1Name : player2Name;

        const alertMessage = isTie
          ? `${t("game.itsATie")}!`
          : `${t("game.congratulations")} ${winnerName}! ${t("game.youHaveWonTheGame")}! \n${t("game.finalScore")}: ${scores.player1} : ${scores.player2}`;

        setAlert(alertMessage);
        setAlertOnPress(() => {
          return () => {
            handleSetGameMode(null);
          };
        });
      }
    }
  }, [
    scores,
    player1Name,
    player2Name,
    mode,
    cards,
    me?.id,
    dispatch,
    t,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
    alertOnPress,
  ]);

  const handleCardPressTriple = (index: number) => {
    if (firstCard && secondCard && thirdCard) return;
    if (cards[index].isRevealed) return;

    const updatedCards = [...cards];
    updatedCards[index].isRevealed = true;

    if (!firstCard) {
      if (!startTime) setStartTime(Date.now());
      setFirstCard({ ...updatedCards[index], index });
    } else if (!secondCard) {
      setSecondCard({ ...updatedCards[index], index });
    } else {
      moves.current += 1;
      setThirdCard({ ...updatedCards[index], index });

      const isMatch =
        firstCard.src === secondCard.src &&
        secondCard.src === updatedCards[index].src;

      setTimeout(() => {
        if (isMatch) {
          updatedCards[firstCard.index!].isPaired = true;
          updatedCards[secondCard.index!].isPaired = true;
          updatedCards[index].isPaired = true;

          if (mode === GAME_BOARD_MODE.player2) {
            const key = `player${playerTurn}`;
            const value =
              playerTurn === PLAYER_TURN.player1
                ? SCORES_KEY.player1
                : SCORES_KEY.player2;
            setScores((prevScores) => ({
              ...prevScores,
              [key]: prevScores[value] + 1,
            }));
          }
        } else {
          updatedCards[firstCard.index!].isRevealed = false;
          updatedCards[secondCard.index!].isRevealed = false;
          updatedCards[index].isRevealed = false;

          if (mode === GAME_BOARD_MODE.player2) {
            setPlayerTurn((prevTurn) =>
              prevTurn === PLAYER_TURN.player1
                ? PLAYER_TURN.player2
                : PLAYER_TURN.player1,
            );
          }
        }

        setFirstCard(null);
        setSecondCard(null);
        setThirdCard(null);
        setCards(updatedCards);

        if (updatedCards.every((card) => card.isPaired)) {
          setEndTime(Date.now());
        }
      }, cardsVanishTime * 1000);
    }

    setCards(updatedCards);
  };

  const handleCardPressDouble = (index: number) => {
    if (firstCard && secondCard) return; // Prevent further clicks
    if (cards[index].isRevealed) return; // Prevent clicking revealed cards

    const updatedCards = [...cards];
    updatedCards[index].isRevealed = true;

    if (!firstCard) {
      // Start timer for 1-player mode
      if (!startTime) setStartTime(Date.now());

      // Set first card
      setFirstCard({ ...updatedCards[index], index });
    } else {
      moves.current += 1;
      // Set second card
      const currentCard = { ...updatedCards[index], index };
      setSecondCard(currentCard);

      const isMatch = firstCard.src === currentCard.src;

      setTimeout(() => {
        if (isMatch) {
          updatedCards[firstCard.index!].isPaired = true;
          updatedCards[currentCard.index!].isPaired = true;

          // Update scores in 2-players mode
          if (mode === GAME_BOARD_MODE.player2) {
            const key = `player${playerTurn}`;
            const value =
              playerTurn === PLAYER_TURN.player1
                ? SCORES_KEY.player1
                : SCORES_KEY.player2;
            setScores((prevScores) => ({
              ...prevScores,
              [key]: prevScores[value] + 1,
            }));
          }
        } else {
          updatedCards[firstCard.index!].isRevealed = false;
          updatedCards[currentCard.index!].isRevealed = false;

          // Switch turn in 2-players mode
          if (mode === GAME_BOARD_MODE.player2) {
            setPlayerTurn((prevTurn) =>
              prevTurn === PLAYER_TURN.player1
                ? PLAYER_TURN.player2
                : PLAYER_TURN.player1,
            );
          }
        }

        setFirstCard(null);
        setSecondCard(null);
        setCards(updatedCards);

        // End game in 1-player mode
        if (updatedCards.every((card) => card.isPaired)) {
          setEndTime(Date.now());
        }
      }, cardsVanishTime * 1000);
    }

    setCards(updatedCards);
  };

  return (
    <View>
      <GameInfo
        mode={mode}
        elapsedTime={elapsedTime}
        isPlayer1Turn={playerTurn === PLAYER_TURN.player1}
        player1Score={scores.player1}
        player2Score={scores.player2}
        player1Name={player1Name}
        player2Name={player2Name}
        moves={moves.current}
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
            onPress={() =>
              isTriple
                ? handleCardPressTriple(index)
                : handleCardPressDouble(index)
            }
          />
        ))}
      </ThemedView>
    </View>
  );
};
