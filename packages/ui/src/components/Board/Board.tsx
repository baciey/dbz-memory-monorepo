import React from "react";

// import { Card } from "../Card";
import { Text, View, Image } from "react-native";
import { BoardProps } from "./Board.types";
import { styles } from "./Board.styles";
// import CardBack from "./cardBack.jpg";

// export const Board = ({ imageList, cardBackSrc, screenWidth }: BoardProps) => {
export const Board = () => {
  // const imageListDoubled = imageList
  //   .flatMap((image) => [image, image])
  //   .sort(function () {
  //     return 0.5 - Math.random();
  //   });

  // const cardElements = imageListDoubled.map((imgSrc, index) => {
  //   return (
  //     <Card
  //       key={index}
  //       imgSrc={imgSrc}
  //       onClick={() => console.log("clik")}
  //       cardBackSrc={cardBackSrc}
  //       screenWidth={screenWidth}
  //     />
  //   );
  // });
  // return <Image source={{ uri: CardBack }} width={100} height={100} />;
  return <Text>Boar333</Text>;

  // return (
  //   <View style={[styles.container, { width: screenWidth }]}>
  //     {cardElements}
  //   </View>
  // );
};
