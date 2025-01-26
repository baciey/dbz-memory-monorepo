import { MultiPlayerGame } from "../slice.types";

export type LobbyProps = {
  onJoinOrCreatePublicGame: (game: MultiPlayerGame) => void;
};
