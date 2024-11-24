import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    justifyContent: "center",
    borderRadius: GLOBAL_STYLES.br.small,
    margin: 16,
    alignSelf: GLOBAL_STYLES.isWeb ? "center" : "stretch",
    minWidth: GLOBAL_STYLES.isWeb ? 300 : "auto",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  inputsContainer: {
    flexDirection: "column",
    gap: 16,
    marginTop: 16,
  },
  errorText: {
    color: GLOBAL_STYLES.colors.error,
  },
});
