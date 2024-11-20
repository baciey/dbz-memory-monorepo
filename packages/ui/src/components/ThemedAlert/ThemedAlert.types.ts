import { Dispatch, SetStateAction } from "react";

export type ThemedAlertProps = {
  actionButtonText?: string;
  actionButtonOnPress: () => void;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
};
