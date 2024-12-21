import React, { PropsWithChildren, StrictMode } from "react";
import { type RenderOptions, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../redux/store";
import { PaperProvider } from "react-native-paper";
import { I18nextProvider } from "react-i18next";
import { i18n } from "../locales";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PaperProvider>{children}</PaperProvider>
        </I18nextProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
