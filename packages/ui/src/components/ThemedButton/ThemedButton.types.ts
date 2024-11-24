import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

export type ThemedButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  icon?: IconSource;
  mode: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: StyleProp<ViewStyle>;
  type?: "primary" | "secondary";
  disabled?: boolean;
};
