"use client";

import React from "react";
import {
  StatisticsPage,
  useGetUser,
  useSetLanguage,
  useSetTheme,
} from "@repo/ui";

export default function Statistics() {
  useSetLanguage();
  useSetTheme();
  useGetUser();

  return (
    <div className="pageContainer">
      <StatisticsPage />
    </div>
  );
}
