import { Images } from "../../hooks/useGetImages";
import { dateFormatter } from "../../utils/date";
import { CardType } from "./Card/Card.types";
import { MultiPlayerGame, MultiPlayerGameResponse } from "./slice.types";

export const proccessMultiPlayerGame = (
  game: MultiPlayerGameResponse,
): MultiPlayerGame => {
  return {
    id: game.id,
    player1Name: game.player1_name,
    player2Name: game.player2_name,
    player1Id: game.player1_id,
    player2Id: game.player2_id,
    player1Score: game.player1_score,
    player2Score: game.player2_score,
    isPlayer1Ready: game.is_player1_ready,
    isPlayer2Ready: game.is_player2_ready,
    isPlayer1Turn: game.is_player1_turn,
    cards: game.cards,
    firstCard: game.first_card,
    secondCard: game.second_card,
    winner: game.winner,
    isOver: game.is_over,
    isAbandoned: game.is_abandoned,
    deletedDueToInactivity: game.deleted_due_to_inactivity,
    timeToMove: game.time_to_move,
    endedDueToTime: game.ended_due_to_time,
    createdAt: dateFormatter(game.created_at),
  };
};

export const getShuffledBoardImages = (
  images: Images["board"],
  isTriple: boolean,
): CardType[] => {
  return images
    .flatMap((image) => (isTriple ? [image, image, image] : [image, image]))
    .sort(() => Math.random() - 0.5)
    .map((image) => ({
      isRevealed: false,
      isPaired: false,
      src: image,
      isLoaded: false,
    }));
};
