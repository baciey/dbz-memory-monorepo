"use client";

import React from "react";
import { SettingsPage, useSetLanguage, useSetTheme } from "@repo/ui";

export default function Settings() {
  useSetLanguage();
  useSetTheme();

  return (
    <>
      <SettingsPage />
    </>
  );
}
