import { useEffect, useRef } from "react";
import { gameActions } from "../actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { UsePlayerTimeToMoveProps } from "./GameBoardMultiplayer.types";
import { useTranslation } from "react-i18next";

export const usePlayerTimeToMove = ({
  game,
  handleSetGameMode,
  setAlert,
  setAlertOnPress,
  timeToMove,
  setTimeToMove,
  alertOnPress,
}: UsePlayerTimeToMoveProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const me = useAppSelector((state) => state.user.me);

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
    endedDueToTime,
  } = game;

  const timeToMoveRef = useRef(timeToMove);
  const isMeGameOwner = me?.id === player1Id;
  const isMyTurn =
    (isPlayer1Turn && isMeGameOwner) || (!isPlayer1Turn && !isMeGameOwner);

  useEffect(() => {
    timeToMoveRef.current = timeToMove;
  }, [timeToMove]);

  useEffect(() => {
    if (!isPlayer1Ready || !isPlayer2Ready || isOver || !isMyTurn) return;

    const int = setInterval(() => {
      if (timeToMoveRef.current > 0) {
        setTimeToMove(timeToMoveRef.current - 1);
      }
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [
    isPlayer1Ready,
    isPlayer2Ready,
    isOver,
    dispatch,
    id,
    setTimeToMove,
    isMyTurn,
  ]);

  useEffect(() => {
    let winnerId = null;

    if (timeToMove === 0 && isMyTurn) {
      winnerId = isPlayer1Turn ? player2Id : player1Id;
    }

    if (winnerId) {
      dispatch(
        gameActions.updateMultiPlayerGame({
          id: id,
          winner: winnerId,
          isOver: true,
          endedDueToTime: true,
        }),
      );
    }
  }, [
    dispatch,
    id,
    player1Id,
    player2Id,
    handleSetGameMode,
    t,
    timeToMove,
    isPlayer1Turn,
    endedDueToTime,
    isMyTurn,
  ]);

  useEffect(() => {
    let winnerName = null;
    if (endedDueToTime) {
      winnerName = isPlayer1Turn ? player2Name : player1Name;
    }

    if (winnerName) {
      const alertMessage = `${t("game.timesUp")}! ${winnerName} ${t(
        "game.wonTheGame",
      )}`;
      setAlert(alertMessage);
      if (!alertOnPress) {
        setAlertOnPress(() => {
          return () => {
            handleSetGameMode(null);
          };
        });
      }
    }
  }, [
    endedDueToTime,
    handleSetGameMode,
    player1Name,
    player2Name,
    setAlert,
    setAlertOnPress,
    t,
    isPlayer1Turn,
    alertOnPress,
  ]);
};
