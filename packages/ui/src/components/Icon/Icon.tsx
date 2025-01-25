import React from "react";
import { Icon as IconPaper } from "react-native-paper";
import { IconProps } from "./Icon.types";

export const Icon = ({ source, color, size }: IconProps) => (
  <IconPaper source={source} color={color} size={size} />
);
