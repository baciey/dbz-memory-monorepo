import React from "react";
import { GestureResponderEvent, Text, Pressable } from "react-native";
import { styles } from "./Button.styles";

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
}

export function Button({ text, onClick }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}
