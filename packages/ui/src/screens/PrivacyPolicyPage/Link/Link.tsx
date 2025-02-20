import React from "react";
import { Linking, Pressable, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { styles } from "./Link.styles";
import { LinkProps } from "./Link.types";

export const Link = ({ text, url, name }: LinkProps) => {
  const theme = useTheme();

  return (
    <View style={styles.linkContainer}>
      <Text>{text} </Text>
      <Pressable
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <Text style={[styles.link, { color: theme.colors.tertiary }]}>
          {name}
        </Text>
      </Pressable>
    </View>
  );
};
