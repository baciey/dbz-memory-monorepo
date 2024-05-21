import React from "react";
import { Text } from "react-native-paper";
import { ThemedTextProps } from "./ThemedText.types";
import { useThemeColor } from "../../hooks/useThemeColor";

export const ThemedText = ({
  style,
  variant,
  children,
  lightColor,
  darkColor,
}: ThemedTextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <Text
      variant={variant || "bodyMedium"}
      style={[{ color, backgroundColor }, style]}
    >
      {children}
    </Text>
  );
};
