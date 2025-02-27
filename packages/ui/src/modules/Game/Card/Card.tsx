import React, { memo } from "react";
import { styles } from "./Card.styles";
import { Image, Pressable, View } from "react-native";
import { CardProps } from "./Card.types";
import { useGetImages } from "../../../hooks/useGetImages";
import { TESTING_MODE } from "../../../constants/config";

export const Card = memo(({ width, card, onPress, index }: CardProps) => {
  const { images } = useGetImages();
  const cardFrontOpacity = TESTING_MODE ? 1 : 0;
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
        <Image
          style={[
            styles.image,
            { opacity: card.isRevealed ? 1 : cardFrontOpacity },
          ]}
          source={{
            width: width,
            height: width,
            uri: card.src || undefined,
          }}
          testID={`cardFront-${index}`}
        />
        {!card.isRevealed && (
          <Image
            style={[styles.image, TESTING_MODE ? { opacity: 0.3 } : {}]}
            source={{
              width: width,
              height: width,
              uri: images.main.cardBack || undefined,
            }}
            testID={`cardBack-${index}`}
          />
        )}
      </View>
    </Pressable>
  );
});
