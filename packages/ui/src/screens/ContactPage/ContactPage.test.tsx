import React from "react";
import { renderWithProviders } from "../../utils/testUtils";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { ContactPage } from "./ContactPage";

jest.useFakeTimers();

it("renders correctly", async () => {
  renderWithProviders(<ContactPage />);
  const { getByText } = screen;

  await waitFor(() => {
    expect(getByText("Contact us")).toBeOnTheScreen();
  });
});

it("sends email with correct data", async () => {
  renderWithProviders(<ContactPage />);
  const { getAllByText, getAllByTestId, getByTestId, queryByText } = screen;

  await waitFor(async () => {
    expect(getAllByText("Your email")).toHaveLength(2);
    expect(getAllByText("Message")).toHaveLength(2);
    expect(getAllByText("Send")).toHaveLength(1);
  });

  const inputs = getAllByTestId("text-input-flat-label-active");

  fireEvent.changeText(inputs[0], "test@email.com");
  fireEvent.changeText(inputs[1], "message");
  fireEvent.press(getByTestId("send-button"));

  await waitFor(async () => {
    expect(queryByText("This field cannot be empty.")).not.toBeVisible();
  });
});

it("does not send email with incorrect data", async () => {
  renderWithProviders(<ContactPage />);
  const { getAllByText, getAllByTestId, getByTestId, queryByText } = screen;

  await waitFor(async () => {
    expect(getAllByText("Your email")).toHaveLength(2);
    expect(getAllByText("Message")).toHaveLength(2);
    expect(getAllByText("Send")).toHaveLength(1);
  });

  const inputs = getAllByTestId("text-input-flat-label-active");

  fireEvent.changeText(inputs[0], "test@email");
  fireEvent.changeText(inputs[1], "");
  fireEvent.press(getByTestId("send-button"));

  await waitFor(async () => {
    expect(queryByText("This field cannot be empty.")).toBeVisible();
    expect(queryByText("Invalid email address format.")).toBeVisible();
  });
});
