import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    alignSelf: "center",
    borderRadius: GLOBAL_STYLES.br.small,
    maxWidth: 600,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
});
