import { Dispatch, SetStateAction } from "react";
import { GAME_BOARD_MODE } from "../GameBoard";
import { MultiPlayerGame } from "../slice.types";

export type LobbyProps = {
  onJoinOrCreatePublicGame: (game: MultiPlayerGame) => void;
  handleSetGameMode: (mode: GAME_BOARD_MODE | null) => void;
  setAlert: Dispatch<SetStateAction<string>>;
  setAlertOnPress: Dispatch<SetStateAction<(() => void) | undefined>>;
};
