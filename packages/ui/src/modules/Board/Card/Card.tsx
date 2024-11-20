import React, { memo } from "react";
import { styles } from "./Card.styles";
import { Image, Pressable, View } from "react-native";
import { CardProps } from "./Card.types";
import { cardBackImage } from "../../../constants/images";

export const Card = memo(({ width, card, onPress, setIsLoaded }: CardProps) => {
  return (
    <Pressable onPress={onPress}>
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
          style={[styles.image]}
          source={{
            width: width,
            height: width,
            uri: card.src,
          }}
        />
        {!card.isRevealed && (
          <Image
            style={[styles.image]}
            source={{
              width: width,
              height: width,
              uri: cardBackImage,
            }}
            onLoadEnd={setIsLoaded}
          />
        )}
      </View>
    </Pressable>
  );
});
