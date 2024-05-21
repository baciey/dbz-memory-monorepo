import * as React from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  Text,
  Pressable,
} from "react-native";
import { styles } from "./button.styles";

export interface ButtonProps {
  text: string;
  onClick?: (event: GestureResponderEvent) => void;
}

export function Button({ text, onClick }: ButtonProps) {
  console.log("btn231");
  return (
    <Pressable style={styles.button} onPress={onClick}>
      <Text style={styles.text}>{"zxc"}</Text>
    </Pressable>
  );
}
