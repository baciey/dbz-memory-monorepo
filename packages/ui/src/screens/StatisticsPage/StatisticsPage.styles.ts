import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: Platform.OS === "web" ? 24 : 100,
  },
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
