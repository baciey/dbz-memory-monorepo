import React from "react";
import { HelperText, TextInput } from "react-native-paper";
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
  return (
    <View style={containerStyle}>
      <TextInput
        label={label}
        value={value || ""}
        onChangeText={(text) => onChangeText(text)}
        error={!!errorText}
        {...textInputProps}
      />
      <HelperText
        type="error"
        visible={Boolean(errorText)}
        style={styles.helperText}
      >
        {errorText}
      </HelperText>
    </View>
  );
};
