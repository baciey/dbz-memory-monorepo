import React from "react";
import { View } from "react-native";
import { ThemedViewProps } from "./ThemedView.types";
import { useTheme } from "react-native-paper";

export const ThemedView = ({
  type = "background",
  style,
  ...otherProps
}: ThemedViewProps) => {
  const theme = useTheme();

  let backgroundColor = theme.colors.background;

  if (type === "surface") {
    backgroundColor = theme.colors.surface;
  } else if (type === "primary") {
    backgroundColor = theme.colors.primary;
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};
