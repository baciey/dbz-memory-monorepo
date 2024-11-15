import { ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  type?: "background" | "surface" | "primary";
};
