import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  scrollview: {
    flexGrow: 0,
  },
  noDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cursorAuto: {
    cursor: "auto",
  },
  pagination: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  noDataText: {
    padding: 16,
  },
  iconContainer: {
    marginLeft: 8,
  },
});
