import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    minHeight: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    aspectRatio: Platform.OS === "web" ? 1.5 : 0.4,
    position: "absolute",
    top: 0,
    left: 0,
  },
  returnButton: {
    position: "absolute",
    top: 0,
    left: 16,
  },
});
