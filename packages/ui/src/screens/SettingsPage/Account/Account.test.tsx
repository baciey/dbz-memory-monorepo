import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import { Account } from "./Account";
import { renderWithProviders } from "../../../utils/testUtils";
import {
  MOCK_APP_STATE,
  MOCK_USER_STATE,
} from "../../../../__mocks__/mockData";
import lodash from "lodash";

const aboutLogoutWarning =
  "You are about to log out. You are a guest user so you will lose all your data. Are you sure?";

describe("logged in user", () => {
  it("displays correctly for logged in user", () => {
    jest.useFakeTimers();

    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_USER_STATE,
      },
    });
    const { getByText } = screen;

    expect(getByText("You are logged in.")).toBeOnTheScreen();
    expect(getByText("Change password")).toBeOnTheScreen();
    expect(getByText("Logout")).toBeOnTheScreen();
  });

  it("opens AuthModal (type set_password) after CHANGE PASSWORD button is pressed", async () => {
    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_USER_STATE,
      },
    });
    const { getByText, getAllByText } = screen;

    fireEvent.press(getByText("Change password"));

    await waitFor(() => {
      expect(getAllByText("Set password")).toHaveLength(2);
    });
  });

  it("opens AuthModal (type login) after LOGOUT button is pressed", async () => {
    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_USER_STATE,
      },
    });
    const { getByText, getAllByText } = screen;

    fireEvent.press(getByText("Logout"));

    await waitFor(() => {
      expect(getAllByText("Log in")).toHaveLength(2);
    });
  });
});

describe("anonymous user", () => {
  const MOCK_STATE_UPDATED = lodash.cloneDeep(MOCK_USER_STATE);
  if (MOCK_STATE_UPDATED.me) {
    MOCK_STATE_UPDATED.me.isAnonymous = true;
    MOCK_STATE_UPDATED.me.password = "";
    MOCK_STATE_UPDATED.me.email = "";
  }

  it("displays correctly for anonymous user", () => {
    jest.useFakeTimers();

    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    expect(getByText("You are a guest.")).toBeOnTheScreen();
    expect(getByText("Register")).toBeOnTheScreen();
    expect(getByText("Logout")).toBeOnTheScreen();
  });

  it("opens AuthModal (type register) after REGISTER button pressed", async () => {
    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    fireEvent.press(getByText("Register"));

    await waitFor(() => {
      expect(getByText("Register")).toBeOnTheScreen();
    });
  }, 10000);

  it("opens Alert when LOGOUT button is pressed", async () => {
    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    fireEvent.press(getByText("Logout"));

    await waitFor(() => {
      expect(getByText(aboutLogoutWarning)).toBeOnTheScreen();
    });
  });
});

describe("anonymous user with email not confirmed", () => {
  const MOCK_STATE_UPDATED = lodash.cloneDeep(MOCK_USER_STATE);
  if (MOCK_STATE_UPDATED.me) {
    MOCK_STATE_UPDATED.me.isAnonymous = true;
    MOCK_STATE_UPDATED.me.password = "";
    MOCK_STATE_UPDATED.me.email = "";
    MOCK_STATE_UPDATED.me.session.user.new_email = "mock email";
  }

  it("displays correctly for anonymous user with email not confirmed", () => {
    jest.useFakeTimers();

    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    expect(
      getByText("You are still a guest. Confirm your email."),
    ).toBeOnTheScreen();
    expect(getByText("Logout")).toBeOnTheScreen();
  });

  it("opens Alert when LOGOUT button is pressed", async () => {
    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    fireEvent.press(getByText("Logout"));

    await waitFor(() => {
      expect(getByText(aboutLogoutWarning)).toBeOnTheScreen();
    });
  });
});

describe("anonymous user with email confirmed", () => {
  const MOCK_STATE_UPDATED = lodash.cloneDeep(MOCK_USER_STATE);
  if (MOCK_STATE_UPDATED.me) {
    MOCK_STATE_UPDATED.me.isAnonymous = false;
    MOCK_STATE_UPDATED.me.password = "";
    MOCK_STATE_UPDATED.me.email = "mock email";
  }

  it("displays correctly for anonymous user with email confirmed", () => {
    jest.useFakeTimers();

    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    expect(getByText("You are still a guest. Set password")).toBeOnTheScreen();
    expect(getByText("Logout")).toBeOnTheScreen();
  });

  it("opens Alert when LOGOUT button is pressed and dismiss", async () => {
    renderWithProviders(<Account />, {
      preloadedState: {
        app: MOCK_APP_STATE,
        user: MOCK_STATE_UPDATED,
      },
    });
    const { getByText } = screen;

    fireEvent.press(getByText("Logout"));

    await waitFor(() => {
      expect(getByText(aboutLogoutWarning)).toBeOnTheScreen();
    });

    fireEvent.press(getByText("Cancel"));
  });
});
