import { GAME_BOARD_MODE } from "../GameBoard";
import { Dispatch, SetStateAction } from "react";

export type NamesModalProps = {
  isVisible: boolean;
  mode: GAME_BOARD_MODE;
  onCancel: () => void;
  onConfirm: () => void;
  isTriple: boolean;
  setIsTriple: Dispatch<SetStateAction<boolean>>;
};
