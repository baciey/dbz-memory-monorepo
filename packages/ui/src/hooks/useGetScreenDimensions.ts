import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

export const useGetScreenDimensions = () => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const isWeb = Platform.OS === "web";
  const isWebMobile = isWeb && dimensions.width < 480;
  const isMobile = !isWeb || (isWeb && dimensions.width < 480);

  useEffect(() => {
    setDimensions({ width, height });
  }, []);

  return {
    isWeb,
    isWebMobile,
    isMobile,
    width: dimensions.width,
    height: dimensions.height,
  };
};
