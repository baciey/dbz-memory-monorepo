import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignSelf: "center",
    ...GLOBAL_STYLES.borderRadius,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
});
