import { useTheme, StatisticsPage } from "@repo/ui";
import { ScrollView } from "react-native";
import * as Linking from "expo-linking";

export default function Statistics() {
  const theme = useTheme();
  const url = Linking.useURL();
  console.log({ url });
  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    console.log(
      `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
        queryParams,
      )}`,
    );
  }

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <StatisticsPage />
    </ScrollView>
  );
}
