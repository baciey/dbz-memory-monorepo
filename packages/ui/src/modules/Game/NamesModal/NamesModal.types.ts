import { GAME_BOARD_MODE } from "../GameBoard";

export type NamesModalProps = {
  isVisible: boolean;
  mode: GAME_BOARD_MODE;
  onCancel: () => void;
  onConfirm: () => void;
};
