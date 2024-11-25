import { ThemedText, useTheme } from "@repo/ui";
import { ScrollView } from "react-native";

export default function Test() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <ThemedText text="Test" />
    </ScrollView>
  );
}
