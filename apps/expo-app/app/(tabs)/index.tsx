import { useTheme, HomePage } from "@repo/ui";
import { ScrollView } from "react-native";

export default function Home() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <HomePage />
    </ScrollView>
  );
}
