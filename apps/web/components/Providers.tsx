"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PaperProviderWrapper, store } from "@repo/ui";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PaperProviderWrapper>{children}</PaperProviderWrapper>
    </Provider>
  );
};
