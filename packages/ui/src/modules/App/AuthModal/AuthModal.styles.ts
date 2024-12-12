import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
    margin: 16,
    justifyContent: "center",
    borderRadius: GLOBAL_STYLES.br.small,
  },
  contentContainer: {
    width: "100%",
    minWidth: 300,
    maxWidth: 400,
    gap: 12,
  },
});
