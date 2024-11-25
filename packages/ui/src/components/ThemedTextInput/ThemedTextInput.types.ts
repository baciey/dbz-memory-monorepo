import { StyleProp, ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";

export type ThemedTextInputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  errorText?: string;
  textInputProps?: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
};
