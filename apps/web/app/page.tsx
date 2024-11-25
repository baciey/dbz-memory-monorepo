"use client";

import React from "react";
import { HomePage, useGetUser, useSetLanguage, useSetTheme } from "@repo/ui";

export default function Home() {
  useSetLanguage();
  useSetTheme();
  useGetUser();

  return (
    <div className="pageContainer">
      <HomePage />
    </div>
  );
}
