import React from "react";
import { Platform } from "react-native";
import { Switch } from "react-native-paper";
import { CustomSwitchProps } from "./CustomSwitch.types";

const style = Platform.OS === "android" ? { height: 25 } : {};

export const CustomSwitch = ({
  value,
  onValueChange,
  ...props
}: CustomSwitchProps) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      {...props}
      style={style}
    />
  );
};
