import { SwitchProps } from "react-native-paper";

export type CustomSwitchProps = SwitchProps & {
  value: boolean;
  onValueChange: (value: boolean) => void;
};
