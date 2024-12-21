import type { Config } from "jest";

const config: Config = {
  preset: "react-native",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-native|react-native|react-native-url-polyfill)/).*/",
  ],
  setupFilesAfterEnv: ["./jest-setup.ts"],
};
export default config;
