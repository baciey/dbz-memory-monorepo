import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "transparent",
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
