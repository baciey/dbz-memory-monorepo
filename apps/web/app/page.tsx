"use client";

import React from "react";
import { HomePage, useSetLanguage, useSetTheme } from "@repo/ui";
import styles from "./style.module.css";

export default function Home() {
  useSetLanguage();
  useSetTheme();

  return (
    <div className="pageContainer">
      <HomePage />
    </div>
  );
}
