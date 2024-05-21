"use client";

import { Board, Button } from "@repo/ui";

import styles from "../styles/index.module.css";

import { useEffect, useState } from "react";

export default function Web() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => console.log("Pressed!")} text="Web button" />
    </div>
  );
}
