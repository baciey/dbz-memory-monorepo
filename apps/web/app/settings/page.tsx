"use client";

import React from "react";
import {
  SettingsPage,
  useGetUser,
  useSetLanguage,
  useSetTheme,
} from "@repo/ui";

export default function Settings() {
  useSetLanguage();
  useSetTheme();
  useGetUser();

  return (
    <div className="pageContainer">
      <SettingsPage />
    </div>
  );
}
