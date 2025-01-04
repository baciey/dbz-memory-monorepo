import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { AboutPage } from "./AboutPage";
import { MOCK_GAME_STATE } from "../../../__mocks__/mockData";

jest.useFakeTimers();

it("", async () => {
  renderWithProviders(<AboutPage />);
});
