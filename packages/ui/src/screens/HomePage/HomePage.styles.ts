import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
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
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.1,
  },
  returnButton: {
    zIndex: 1,
    alignSelf: "flex-start",
  },
  returnButtonWeb: {
    position: "absolute",
    top: 16,
    left: 16,
  },
});
