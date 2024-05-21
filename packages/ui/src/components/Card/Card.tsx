import React from "react";
import { styles } from "./Card.styles";
import { Image, Pressable, View } from "react-native";

import { CardProps } from "./Card.types";

const margin = 5;

// const cardBackSrc = "./cardBack.jpg";
// import cardBackSrc from "./cardBack.jpg";

export const Card = ({
  // checked,
  // firstCard,
  // secondCard,
  // disabled,
  onClick,
  imgSrc,
  cardBackSrc,
  screenWidth,
  // clicked,
}: CardProps) => {
  let classes = "";
  return (
    <Pressable style={styles.container} onPress={() => onClick(imgSrc)}>
      <View
        style={[
          styles.imageContainer,
          {
            width: screenWidth / 4 - margin * 2,
            height: screenWidth / 4 - margin * 2,
          },
        ]}
      >
        <Image
          source={imgSrc}
          style={[styles.image, styles.imageFront]}
          width={100}
        />
        <Image
          // source={{
          //   uri: cardBackSrc,
          // }}
          // source={{ uri: cardBackSrc, width: 100, height: 100 }}
          source={cardBackSrc}
          style={[styles.image, styles.imageBack]}
          width={100}
          height={100}
        />
      </View>
      <View style={[styles.inner, classes]}>
        <View style={styles.front} />
      </View>
    </Pressable>
  );
};
