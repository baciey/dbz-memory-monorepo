import { useEffect } from "react";
import { gameActions } from "../actions";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import { UseGameHasEndedProps } from "./GameBoardMultiplayer.types";

export const useGameHasEnded = ({
  game,
  handleSetGameMode,
  setAlert,
  setAlertOnPress,
}: UseGameHasEndedProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const me = useAppSelector((state) => state.user.me);

  const {
    id,
    cards,
    isOver,
    player1Name,
    player2Name,
    player1Score,
    player2Score,
    player1Id,
    player2Id,
  } = game;

  useEffect(() => {
    const isGameEnded = cards.every((card) => card.isPaired);
    if (
      cards.length &&
      isGameEnded &&
      player1Name &&
      player2Name &&
      me?.id &&
      !isOver
    ) {
      const isTie = player1Score === player2Score;
      const winnerName =
        player1Score > player2Score ? player1Name : player2Name;
      const winnerId = player1Score > player2Score ? player1Id : player2Id;

      const alertMessage = isTie
        ? `${t("game.itsATie")}!`
        : `${winnerName} ${t("game.wonTheGame")}! \n${t("game.finalScore")}: ${player1Score} : ${player2Score}`;

      if (isTie) {
        dispatch(
          gameActions.updateMultiPlayerGame({
            id: id,
            isOver: true,
          }),
        );
      } else if (!isTie && winnerId) {
        dispatch(
          gameActions.updateMultiPlayerGame({
            id: id,
            winner: winnerId,
            isOver: true,
          }),
        );
      }

      setAlert(alertMessage);
      setAlertOnPress(() => {
        return () => {
          handleSetGameMode(null);
        };
      });
    }
  }, [
    player1Name,
    player2Name,
    player1Id,
    player2Id,
    player1Score,
    player2Score,
    id,
    cards,
    me?.id,
    dispatch,
    t,
    isOver,
    handleSetGameMode,
    setAlert,
    setAlertOnPress,
  ]);
};
