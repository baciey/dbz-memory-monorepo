import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
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
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  avatarRow: {
    height: 150,
    marginTop: 16,
  },
  listItem: {
    marginBottom: 8,
  },
  appVersionText: {
    marginTop: 16,
  },
});
