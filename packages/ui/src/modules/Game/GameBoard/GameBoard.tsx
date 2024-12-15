import React, { useEffect, useState } from "react";
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
import { gameSliceActions } from "../slice";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";
import { useGetImages } from "../../../hooks/useGetImages";
import { gameActions } from "../actions";

export const GameBoard = ({ mode }: GameBoardProps) => {
  const dispatch = useAppDispatch();

  const [cardWidth, setCardWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<SelectedCardType | null>(null);
  const [secondCard, setSecondCard] = useState<SelectedCardType | null>(null);

  // Timer and score state
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Elapsed time for 1-player mode
  const [playerTurn, setPlayerTurn] = useState<PLAYER_TURN>(1);
  const [scores, setScores] = useState<Scores>({ player1: 0, player2: 0 });

  const player1Name = useAppSelector((state) => state.game.playersNames[0]);
  const player2Name = useAppSelector((state) => state.game.playersNames[1]);
  const singlePlayerName = useAppSelector((state) => state.game.playerName);
  const showPersonalGames = useAppSelector(
    (state) => state.game.showPersonalGames,
  );
  const loadedImages = cards.filter((card) => card.isLoaded);

  const percentageLoaded = (loadedImages.length / cards.length) * 100 || 0;
  const isEveryImageLoaded = percentageLoaded === 100;

  const { images } = useGetImages();

  useEffect(() => {
    const shuffleBoardImages = (): CardType[] =>
      images.board
        .flatMap((image) => [image, image])
        .sort(() => Math.random() - 0.5)
        .map((image) => ({
          isRevealed: false,
          isPaired: false,
          src: image,
          isLoaded: false,
        }));

    setCards(shuffleBoardImages());
  }, [images]);

  const me = useAppSelector((state) => state.user.me);

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

  const { width: deviceWidth, height: deviceHeight } = useGetScreenDimensions();

  // Dynamically calculate card and container dimensions
  useEffect(() => {
    const padding = 16;
    const gap = 16;
    const scrollBarWidth = 20;
    const smallScreenItemsInRow = 4;
    const largeScreenItemsInRow = 5;

    const isSmallScreen = deviceWidth <= 600;
    const itemsInRow = isSmallScreen
      ? smallScreenItemsInRow
      : largeScreenItemsInRow;

    const mainDimension = Math.min(deviceWidth, deviceHeight);
    const totalGap = gap * (itemsInRow - 1) + 2 * padding + scrollBarWidth;
    const cardWidth = mainDimension / itemsInRow - totalGap / itemsInRow;
    const containerWidth = cardWidth * itemsInRow + totalGap - scrollBarWidth;

    setCardWidth(cardWidth);
    setContainerWidth(containerWidth);
  }, [deviceWidth, deviceHeight]);

  // Save single player score to the database
  useEffect(() => {
    if (
      mode === GAME_BOARD_MODE.player1 &&
      endTime &&
      singlePlayerName &&
      me?.id
    ) {
      dispatch(
        gameActions.updateOnePlayerGames(
          me.id,
          singlePlayerName,
          elapsedTime,
          showPersonalGames,
        ),
      );
    }
  }, [
    endTime,
    elapsedTime,
    singlePlayerName,
    mode,
    me?.id,
    dispatch,
    showPersonalGames,
  ]);

  // Save 2-players scores to the database
  useEffect(() => {
    const is2PlayerGameEnd = cards.every((card) => card.isPaired);
    if (
      mode === GAME_BOARD_MODE.player2 &&
      is2PlayerGameEnd &&
      player1Name &&
      player2Name &&
      me?.id
    ) {
      dispatch(
        gameActions.updateTwoPlayerGames(
          player1Name,
          player2Name,
          scores.player1,
          scores.player2,
          me.id,
        ),
      );
    }
  }, [scores, player1Name, player2Name, mode, cards, me?.id, dispatch]);

  const handleCardPress = (index: number) => {
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
      // Set second card and handle match logic
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
      }, 2000);
    }

    setCards(updatedCards);
  };

  const handleIsImageLoaded = (index: number) => {
    if (isEveryImageLoaded) return;
    const updatedCards = [...cards];
    updatedCards[index].isLoaded = true;
    setCards(updatedCards);
  };

  useEffect(() => {
    dispatch(gameSliceActions.setImagesPercentageLoaded(percentageLoaded));
  }, [isEveryImageLoaded, percentageLoaded, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(gameSliceActions.setImagesPercentageLoaded(0));
    };
  }, [dispatch]);

  return (
    <View
      style={{
        opacity: isEveryImageLoaded ? 1 : 0,
      }}
    >
      {isEveryImageLoaded && (
        <GameInfo
          mode={mode}
          elapsedTime={elapsedTime}
          scores={scores}
          cards={cards}
          playerTurn={playerTurn}
        />
      )}
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
            key={index}
            width={cardWidth}
            card={card}
            onPress={() => handleCardPress(index)}
            setIsLoaded={() => handleIsImageLoaded(index)}
          />
        ))}
      </ThemedView>
    </View>
  );
};
