import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ROUTES, useTranslation } from "@repo/ui";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const { t } = useTranslation();
  const theme = useTheme();

  const tabs = [
    {
      name: "index",
      title: t("home.home"),
      icon: "home" as "home",
      iconOutline: "home-outline" as "home-outline",
    },
    {
      name: ROUTES.settings,
      title: t("settings.settings"),
      icon: "settings" as "settings",
      iconOutline: "settings-outline" as "settings-outline",
    },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.onBackground,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? tab.icon : tab.iconOutline}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
