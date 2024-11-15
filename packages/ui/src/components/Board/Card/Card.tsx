import React from "react";
import { styles } from "./Card.styles";
import { Image, Pressable, View } from "react-native";
import { CardProps } from "./Card.types";
import { cardBackImage } from "../../../constants/images";

export const Card = ({ onPress, src, width, card }: CardProps) => {
  let classes = "";
  return (
    <Pressable style={styles.container} onPress={() => onPress()}>
      <View
        style={[
          styles.imageContainer,
          {
            width: width,
            height: width,
            opacity: card.isPaired ? 0 : 1,
          },
        ]}
      >
        <Image
          style={[styles.image, styles.imageFront]}
          source={{
            width: width,
            height: width,
            uri: src,
          }}
        />
        {!card.isRevealed && (
          <Image
            style={[styles.image, styles.imageBack]}
            source={{
              width: width,
              height: width,
              uri: cardBackImage,
            }}
          />
        )}
      </View>
      <View style={[styles.inner, classes]}>
        <View style={styles.front} />
      </View>
    </Pressable>
  );
};
