import { ImageSourcePropType } from "react-native";

export type CardProps = {
  //   checked: boolean;
  //   firstCard: boolean;
  //   secondCard: boolean;
  //   disabled: boolean;
  onClick: (imgSrc: ImageSourcePropType) => void;
  imgSrc: ImageSourcePropType;
  cardBackSrc: ImageSourcePropType;
  //   clicked: boolean;
  screenWidth: number;
};
