import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "./Loader.styles";
import { LoaderProps } from "./Loader.types";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";

export const Loader = ({ isVisible, withBackground }: LoaderProps) => {
  const { width, height } = useGetScreenDimensions();
  if (!isVisible) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: withBackground ? "rgba(0,0,0,0.5)" : "transparent",
        },
        { minHeight: height, minWidth: width },
      ]}
    >
      <ActivityIndicator size="large" testID="loader" />
    </View>
  );
};
