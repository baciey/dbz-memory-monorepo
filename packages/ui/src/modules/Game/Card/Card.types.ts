export type CardType = {
  isRevealed: boolean;
  isPaired: boolean;
  src: string;
  isLoaded: boolean;
};

export type SelectedCardType = CardType & {
  index: number;
};

export type CardProps = {
  width: number;
  card: CardType;
  onPress: () => void;
  setIsLoaded: () => void;
  index: number;
};
