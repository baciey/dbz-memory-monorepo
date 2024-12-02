import { useTheme } from "@repo/ui";
import React from "react";
import { ScrollView } from "react-native";
import { ScreenWrapperProps } from "./ScreenWrapper.types";

export const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  const theme = useTheme();
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </ScrollView>
  );
};
