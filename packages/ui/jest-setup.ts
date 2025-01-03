import "@testing-library/react-native/extend-expect";
import { cleanup } from "@testing-library/react-native";

afterEach(cleanup);

jest.mock("react-native-paper", () => {
  const originalModule = jest.requireActual("react-native-paper");

  return {
    ...originalModule,
    ActivityIndicator: jest.fn(() => {
      return null;
    }),
  };
});
