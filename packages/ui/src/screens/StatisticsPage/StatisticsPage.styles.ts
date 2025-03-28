import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  segmentedButtons: {
    maxWidth: 500,
    width: "100%",
    marginBottom: 20,
  },
  switchSearchContainer: {
    justifyContent: "space-between",
    maxWidth: 500,
    width: "100%",
  },
  switchesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  search: {
    height: 40,
  },
  searchInput: {
    minHeight: 40,
  },
});
