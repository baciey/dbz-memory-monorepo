"use client";

import React from "react";
import { SettingsPage, useSetLanguage, useSetTheme } from "@repo/ui";
import { Providers } from "../../components/Providers";

export default function Settings() {
  useSetLanguage();
  useSetTheme();

  return (
    <Providers>
      <SettingsPage />
    </Providers>
  );
}
