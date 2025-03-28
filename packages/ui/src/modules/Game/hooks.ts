import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";

type UseCalculateCardAndBoardDimensionsProps = {
  setCardWidth: Dispatch<SetStateAction<number>>;
  setContainerWidth: Dispatch<SetStateAction<number>>;
  isTriple: boolean;
};

export const useCalculateCardAndBoardDimensions = ({
  setCardWidth,
  setContainerWidth,
  isTriple,
}: UseCalculateCardAndBoardDimensionsProps) => {
  const { width: deviceWidth, height: deviceHeight } = useGetScreenDimensions();

  useEffect(() => {
    const padding = 16;
    const gap = 16;
    const scrollBarWidth = 20;
    const smallScreenItemsInRow = isTriple ? 5 : 4;
    const largeScreenItemsInRow = isTriple ? 6 : 5;

    const isSmallScreen = deviceWidth <= 600;
    const itemsInRow = isSmallScreen
      ? smallScreenItemsInRow
      : largeScreenItemsInRow;

    const mainDimension = Math.min(deviceWidth, deviceHeight);
    const totalGap = gap * (itemsInRow - 1) + 2 * padding + scrollBarWidth;
    const cardWidth = mainDimension / itemsInRow - totalGap / itemsInRow;
    const containerWidth = cardWidth * itemsInRow + totalGap - scrollBarWidth;

    setCardWidth(cardWidth);
    setContainerWidth(containerWidth);
  }, [deviceWidth, deviceHeight, setCardWidth, setContainerWidth, isTriple]);
};
