import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const GLOBAL_STYLES = StyleSheet.create({
  window: {
    width,
    height,
  },
  mt16: {
    marginTop: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mt8: {
    marginTop: 8,
  },
  mb8: {
    marginBottom: 8,
  },
});
