import { StyleSheet } from "react-native";
import { GLOBAL_STYLES } from "../../../styles/globalStyles";

export const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    justifyContent: "center",
    borderRadius: GLOBAL_STYLES.br.small,
    margin: 16,
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
  rowAligned: {
    flexDirection: "row",
    alignItems: "center",
  },
  vanishTimeIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 32,
  },
  vanishTimeIcon: {
    marginRight: 0,
  },
  vanishTimeValue: {
    padding: 10,
    borderRadius: GLOBAL_STYLES.br.small,
  },
  switch: {
    marginLeft: 16,
  },
});
