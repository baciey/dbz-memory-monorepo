import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  returnButton: {
    position: "absolute",
    top: 0,
    left: 16,
    marginTop: 0,
  },
  columnsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  column: {
    padding: 16,
    borderRadius: GLOBAL_STYLES.br.medium,
  },
  publicGamesContainer: {},
  gameRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 16,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: GLOBAL_STYLES.br.medium,
    padding: 8,
  },
  mr32: {
    marginRight: 32,
  },
  createButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});
