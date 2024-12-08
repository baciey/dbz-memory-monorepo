import React, { memo } from "react";
import { styles } from "./Card.styles";
import { Image, Pressable, View } from "react-native";
import { CardProps } from "./Card.types";
import { useGetImages } from "../../../hooks/useGetImages";

export const Card = memo(({ width, card, onPress, setIsLoaded }: CardProps) => {
  const images = useGetImages();
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
            uri: card.src || undefined,
          }}
        />
        {!card.isRevealed && (
          <Image
            style={[styles.image]}
            source={{
              width: width,
              height: width,
              uri: images.view.cardBack || undefined,
            }}
            onLoadEnd={setIsLoaded}
          />
        )}
      </View>
    </Pressable>
  );
});
