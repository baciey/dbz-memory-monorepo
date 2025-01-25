import React, { memo } from "react";
import { styles } from "./Card.styles";
import { Image, Pressable, View } from "react-native";
import { CardProps } from "./Card.types";
import { useGetImages } from "../../../hooks/useGetImages";

export const Card = memo(
  ({ width, card, onPress, setIsLoaded, index }: CardProps) => {
    const { images } = useGetImages();
    return (
      <Pressable onPress={onPress} testID={`cardContainer-${index}`}>
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
          {card.isRevealed && (
            <Image
              style={[styles.image]}
              source={{
                width: width,
                height: width,
                uri: card.src || undefined,
              }}
              testID={`cardFront-${index}`}
            />
          )}
          {!card.isRevealed && (
            <Image
              style={[styles.image]}
              source={{
                width: width,
                height: width,
                uri: images.main.cardBack || undefined,
              }}
              onLoadEnd={setIsLoaded}
              testID={`cardBack-${index}`}
            />
          )}
        </View>
      </Pressable>
    );
  },
);
