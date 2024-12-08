import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ROUTES, useTranslation } from "@repo/ui";
import { BottomNavigation } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

export default function TabLayout() {
  const { t } = useTranslation();
  const homeIcon = "home" as const;
  const homeIconOutline = "home-outline" as const;
  const settingsIcon = "settings" as const;
  const settingsIconOutline = "settings-outline" as const;

  const tabs = [
    {
      name: "index",
      title: t("home.home"),
      icon: homeIcon,
      iconOutline: homeIconOutline,
    },
    {
      name: ROUTES.settings,
      title: t("settings.settings"),
      icon: settingsIcon,
      iconOutline: settingsIconOutline,
    },
    {
      name: ROUTES.statistics,
      title: t("statistics.statistics"),
      icon: settingsIcon,
      iconOutline: settingsIconOutline,
    },
  ];
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return options.title;
          }}
        />
      )}
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
