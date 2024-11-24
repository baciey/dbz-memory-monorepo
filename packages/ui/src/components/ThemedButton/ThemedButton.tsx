import React from "react";
import { Button, useTheme } from "react-native-paper";
import { ThemedButtonProps } from "./ThemedButton.types";

export const ThemedButton = ({
  style,
  text,
  icon,
  mode,
  onPress,
  type = "primary",
  disabled,
}: ThemedButtonProps) => {
  const theme = useTheme();
  let buttonColor = theme.colors.primary;
  let textColor = theme.colors.onPrimary;
  if (type === "secondary") {
    buttonColor = theme.colors.secondary;
    textColor = theme.colors.onSecondary;
  }
  return (
    <Button
      icon={icon}
      mode={mode}
      onPress={onPress}
      style={style}
      buttonColor={buttonColor}
      textColor={textColor}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};
