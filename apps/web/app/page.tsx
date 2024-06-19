"use client";

import React from "react";
import { HomePage, useSetLanguage, useSetTheme } from "@repo/ui";

export default function Home() {
  useSetLanguage();
  useSetTheme();

  return (
    <>
      <HomePage />
    </>
  );
}
