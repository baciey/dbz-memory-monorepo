"use client";

import React from "react";
import { HomePage, useSetLanguage, useSetTheme } from "@repo/ui";
import { Navbar } from "../components/Navbar";

export default function Home() {
  useSetLanguage();
  useSetTheme();

  return (
    <>
      <HomePage />
    </>
  );
}
