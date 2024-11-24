import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "./Loader.styles";
import { LoaderProps } from "./Loader.types";

export const Loader = ({ isVisible }: LoaderProps) => {
  if (!isVisible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};
