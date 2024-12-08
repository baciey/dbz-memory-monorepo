import { Dispatch, SetStateAction } from "react";
import { GAME_BOARD_MODE } from "../GameBoard";

export type NamesModalProps = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  mode: GAME_BOARD_MODE;
  setGameMode: Dispatch<SetStateAction<GAME_BOARD_MODE | null>>;
};
