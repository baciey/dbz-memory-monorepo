import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
