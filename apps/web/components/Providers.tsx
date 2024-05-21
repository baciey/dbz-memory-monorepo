"use client";

import React from "react";
import { Provider } from "react-redux";
import { PaperProviderWrapper, store } from "@repo/ui";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <PaperProviderWrapper>{children}</PaperProviderWrapper>
    </Provider>
  );
};
