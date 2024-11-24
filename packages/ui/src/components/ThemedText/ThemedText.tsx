import React from "react";
import { Text, useTheme } from "react-native-paper";
import { ThemedTextProps } from "./ThemedText.types";

export const ThemedText = ({
  style,
  variant,
  text,
  type = "onBackground",
}: ThemedTextProps) => {
  const theme = useTheme();
  let color = theme.colors.onBackground;

  if (type === "onSurface") {
    color = theme.colors.onSurface;
  } else if (type === "onPrimary") {
    color = theme.colors.onPrimary;
  } else if (type === "error") {
    color = theme.colors.error;
  }

  return (
    <Text variant={variant || "bodyMedium"} style={[{ color }, style]}>
      {text}
    </Text>
  );
};
