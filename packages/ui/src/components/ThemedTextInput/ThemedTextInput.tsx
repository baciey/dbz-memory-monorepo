import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { ThemedText } from "../ThemedText";
import { ThemedTextInputProps } from "./ThemedTextInput.types";
import { styles } from "./ThemedTextInput.styles";
import { View } from "react-native";

export const ThemedTextInput = ({
  errorText,
  value,
  onChangeText,
  label,
  containerStyle,
  ...textInputProps
}: ThemedTextInputProps) => {
  const theme = useTheme();

  return (
    <View style={containerStyle}>
      <TextInput
        label={label}
        value={value || ""}
        onChangeText={(text) => onChangeText(text)}
        error={!!errorText}
        {...textInputProps}
      />
      {errorText ? (
        <ThemedText
          type="error"
          text={errorText}
          style={{ color: theme.colors.error }}
        />
      ) : null}
    </View>
  );
};
