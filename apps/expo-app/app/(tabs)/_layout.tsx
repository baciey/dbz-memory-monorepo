import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import {
  appSelectors,
  useAppSelector,
  COLORS,
  ROUTES,
  capitalizeFirst,
  useTranslation,
} from "@repo/ui";

export default function TabLayout() {
  const themeMode = useAppSelector(appSelectors.getThemeMode);

  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS[themeMode].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS[themeMode].background2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.home"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={ROUTES.settings}
        options={{
          title: t("settings.settings"),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
