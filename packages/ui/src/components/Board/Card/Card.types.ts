export type CardType = {
  isRevealed: boolean;
  isPaired: boolean;
  src: string;
};

export type SelectedCardType = CardType & {
  index: number;
};

export type CardProps = {
  onPress: () => void;
  src: string;
  width: number;
  card: CardType;
};
