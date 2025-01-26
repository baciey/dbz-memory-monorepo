import { useEffect } from "react";
import { gameActions } from "../actions";
import { useAppDispatch } from "../../../redux/store";
import { UsePlayerTimeToMoveProps } from "./GameBoardMultiplayer.types";
import { useTranslation } from "react-i18next";

export const usePlayerTimeToMove = ({
  game,
  setPlayer1TimeToMove,
  setPlayer2TimeToMove,
  player1TimeToMove,
  player2TimeToMove,
  handleSetGameMode,
  setAlert,
  setAlertOnPress,
}: UsePlayerTimeToMoveProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    isPlayer1Turn,
    isPlayer1Ready,
    isPlayer2Ready,
    isOver,
    id,
    player1Id,
    player2Id,
    player1Name,
    player2Name,
  } = game;

  useEffect(() => {
    if (!isPlayer1Ready || !isPlayer2Ready || isOver) return;
    const int = setInterval(() => {
      if (isPlayer1Turn) {
        setPlayer1TimeToMove((prev) => prev - 1);
      } else {
        setPlayer2TimeToMove((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [
    isPlayer1Turn,
    isPlayer2Ready,
    isPlayer1Ready,
    isOver,
    setPlayer1TimeToMove,
    setPlayer2TimeToMove,
  ]);

  useEffect(() => {
    let winnerId = null;
    let winnerName = null;
    if (player1TimeToMove === 0 && player2Id) {
      winnerId = player2Id;
      winnerName = player2Name;
    } else if (player2TimeToMove === 0 && player1Id) {
      winnerId = player1Id;
      winnerName = player1Name;
    }
    if (winnerId) {
      const alertMessage = `${t("game.timesUp")}! ${winnerName} ${t("game.wonTheGame")}`;
      setAlert(alertMessage);
      setAlertOnPress(() => {
        return () => {
          handleSetGameMode(null);
        };
      });
      dispatch(
        gameActions.updateMultiPlayerGame({
          id: id,
          winner: winnerId,
          isOver: true,
        }),
      );
    }
  }, [
    player1TimeToMove,
    dispatch,
    id,
    player1Name,
    player1Id,
    player2Id,
    player2Name,
    player2TimeToMove,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
    t,
  ]);
};
