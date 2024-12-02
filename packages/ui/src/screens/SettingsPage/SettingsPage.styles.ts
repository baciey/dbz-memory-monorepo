import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    width: "100%",
    paddingTop: Platform.OS === "web" ? 24 : 100,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mr10: {
    marginRight: 10,
  },
  authContainer: {
    width: "100%",
    minWidth: 300,
    maxWidth: 400,
  },
});
