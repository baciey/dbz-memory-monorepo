import { TextProps } from "react-native";
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

export type ThemedTextProps = TextProps & {
  variant?: VariantProp<never>;
  lightColor?: string;
  darkColor?: string;
};
