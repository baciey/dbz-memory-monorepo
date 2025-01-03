import React from "react";
import { renderWithProviders } from "../../../utils/testUtils";
import { AuthModal } from "./AuthModal";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { AUTH_MODAL_TYPES } from "../slice.types";
import {
  MOCK_APP_STATE,
  MOCK_USER_STATE,
} from "../../../../__mocks__/mockData";

jest.useFakeTimers();

it("handles correctly type LOGIN", async () => {
  renderWithProviders(
    <AuthModal />,
    {
      preloadedState: {
        app: {
          ...MOCK_APP_STATE,
          authModal: {
            isVisible: true,
            type: AUTH_MODAL_TYPES.LOGIN,
          },
        },
        user: {
          ...MOCK_USER_STATE,
          me: null,
        },
      },
    },
    false,
  );

  const { getByText, getAllByText, queryByText, getByTestId } = screen;

  await waitFor(async () => {
    expect(getAllByText("Log in")).toHaveLength(2);
    expect(getAllByText("Email")).toHaveLength(2);
    expect(getAllByText("Password")).toHaveLength(2);
    expect(getByText("Register")).toBeOnTheScreen();
    expect(getByText("Forgot password?")).toBeOnTheScreen();
    expect(getByText("Continue as a guest")).toBeOnTheScreen();
  });

  await fireEvent.press(getByTestId("continue-as-guest-button"));

  expect(queryByText("Continue as a guest")).not.toBeOnTheScreen();
});

it("handles correctly type REGISTER", async () => {
  renderWithProviders(
    <AuthModal />,
    {
      preloadedState: {
        app: {
          ...MOCK_APP_STATE,
          authModal: {
            isVisible: true,
            type: AUTH_MODAL_TYPES.REGISTER,
          },
        },
        user: {
          ...MOCK_USER_STATE,
          me: null,
        },
      },
    },
    false,
  );

  const {
    getByText,
    getAllByText,
    getAllByTestId,
    queryAllByText,
    getByTestId,
    findByText,
  } = screen;

  await waitFor(async () => {
    expect(getAllByText("Register")).toHaveLength(2);
    expect(getAllByText("Email")).toHaveLength(2);
    expect(getAllByText("Password")).toHaveLength(2);
    expect(getAllByText("Repeat password")).toHaveLength(2);
    expect(getByText("Log in")).toBeOnTheScreen();
  });

  const inputs = getAllByTestId("text-input-flat-label-active");

  fireEvent.changeText(inputs[0], "test@email.com");
  fireEvent.changeText(inputs[1], "password");
  fireEvent.changeText(inputs[2], "password");
  fireEvent.press(getByTestId("register-button"));

  expect(
    await findByText("We have sent you an email to verify your account"),
  ).toBeOnTheScreen();

  fireEvent.press(getByText("OK"));

  expect(queryAllByText("Register")).toHaveLength(1);
});

it("handles correctly type FORGOT_PASSWORD", async () => {
  renderWithProviders(
    <AuthModal />,
    {
      preloadedState: {
        app: {
          ...MOCK_APP_STATE,
          authModal: {
            isVisible: true,
            type: AUTH_MODAL_TYPES.FORGOT_PASSWORD,
          },
        },
        user: {
          ...MOCK_USER_STATE,
          me: null,
        },
      },
    },
    false,
  );

  const {
    getByText,
    getAllByText,
    getAllByTestId,
    queryByText,
    getByTestId,
    findByText,
  } = screen;

  await waitFor(async () => {
    expect(getByText("Type your email")).toBeOnTheScreen();
    expect(getAllByText("Email")).toHaveLength(2);
  });

  const inputs = getAllByTestId("text-input-flat-label-active");

  fireEvent.changeText(inputs[0], "test@email.com");
  fireEvent.press(getByTestId("confirm-button"));

  expect(
    await findByText(
      "We have sent you an email to reset your password. Please check your inbox.",
    ),
  ).toBeOnTheScreen();

  fireEvent.press(getByText("OK"));

  expect(queryByText("Type your email")).not.toBeOnTheScreen();
});

it("handles correctly type SET_PASSWORD", async () => {
  renderWithProviders(
    <AuthModal />,
    {
      preloadedState: {
        app: {
          ...MOCK_APP_STATE,
          authModal: {
            isVisible: true,
            type: AUTH_MODAL_TYPES.SET_PASSWORD,
          },
        },
        user: MOCK_USER_STATE,
      },
    },
    false,
  );

  const {
    getByText,
    getAllByText,
    getAllByTestId,
    getByTestId,
    queryAllByText,
    findByText,
  } = screen;

  await waitFor(async () => {
    expect(getAllByText("Set password")).toHaveLength(2);
    expect(getAllByText("Password")).toHaveLength(2);
    expect(getAllByText("Repeat password")).toHaveLength(2);
  });

  const inputs = getAllByTestId("text-input-flat-label-active");

  fireEvent.changeText(inputs[0], "password");
  fireEvent.changeText(inputs[1], "password");
  fireEvent.press(getByTestId("set-password-button"));

  expect(await findByText("Password updated")).toBeOnTheScreen();

  fireEvent.press(getByText("OK"));

  expect(queryAllByText("Set password")).toHaveLength(0);
});
