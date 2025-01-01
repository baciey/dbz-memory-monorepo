import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { SettingsPage } from "./SettingsPage";
import { MOCK_APP_STATE, MOCK_USER_STATE } from "../../../__mocks__/mockData";
import { LANGUAGE } from "../../constants/lang";

jest.useFakeTimers();

it("changes theme mode", async () => {
  renderWithProviders(<SettingsPage />, {
    preloadedState: {
      app: MOCK_APP_STATE,
      user: MOCK_USER_STATE,
    },
  });
  const { getByTestId } = screen;

  const switcher = getByTestId("theme-switch");
  const container = getByTestId("settings-container");
  expect(switcher).toHaveProp("value", false);
  expect(container).toHaveStyle({ backgroundColor: "rgb(253, 252, 255)" });
  fireEvent(switcher, "onValueChange", true);

  await waitFor(() => {
    expect(switcher).toHaveProp("value", true);
    expect(container).toHaveStyle({
      backgroundColor: "rgb(26, 28, 30)",
    });
  });
});

it("changes language to PL", async () => {
  renderWithProviders(<SettingsPage />, {
    preloadedState: {
      app: {
        ...MOCK_APP_STATE,
        language: LANGUAGE.en,
      },
      user: MOCK_USER_STATE,
    },
  });
  const { getByText, getByTestId, queryByText } = screen;

  const langButton = getByTestId("lang-menu-button");
  fireEvent.press(langButton);
  const langPL = getByTestId("lang-pl");
  fireEvent.press(langPL);

  await waitFor(() => {
    expect(getByText("PL")).toBeOnTheScreen();
    expect(queryByText("EN")).not.toBeOnTheScreen();
    expect(getByText("Ustawienia")).toBeOnTheScreen();
    expect(queryByText("Settings")).not.toBeOnTheScreen();
  });
});

it("changes language to EN", async () => {
  renderWithProviders(<SettingsPage />, {
    preloadedState: {
      app: MOCK_APP_STATE,
      user: MOCK_USER_STATE,
    },
  });
  const { getByText, getByTestId, queryByText } = screen;

  const langButton = getByTestId("lang-menu-button");
  fireEvent.press(langButton);
  const langEN = getByTestId("lang-en");
  fireEvent.press(langEN);

  await waitFor(() => {
    expect(getByText("EN")).toBeOnTheScreen();
    expect(queryByText("PL")).not.toBeOnTheScreen();
    expect(getByText("Settings")).toBeOnTheScreen();
    expect(queryByText("Ustawienia")).not.toBeOnTheScreen();
  });
});
