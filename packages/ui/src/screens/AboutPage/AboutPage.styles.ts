import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: Platform.OS === "web" ? 24 : 100,
  },
});
