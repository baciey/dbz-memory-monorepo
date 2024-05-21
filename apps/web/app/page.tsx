"use client";

import { Board, Button } from "@repo/ui";

import styles from "../styles/index.module.css";

import goku from "./../assets/images/goku.jpg";
import vegita from "./../assets/images/vegita.jpg";
import bulma from "./../assets/images/bulma.jpg";
import beerus from "./../assets/images/beerus.jpg";
import buu from "./../assets/images/buu.jpg";
import haiya from "./../assets/images/haiya.jpg";
import picolo from "./../assets/images/picolo.jpg";
import frieza from "./../assets/images/frieza.jpg";
import mutenroshi from "./../assets/images/mutenroshi.jpg";
import pilaf from "./../assets/images/pilaf.jpg";
import CardBackSrc from "./../assets/images/cardBack.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

const imageList = [
  goku,
  vegita,
  bulma,
  beerus,
  buu,
  haiya,
  picolo,
  frieza,
  mutenroshi,
  pilaf,
];

export default function Web() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  return (
    <div className={styles.container}>
      <h1>Wes</h1>
      <Button onClick={() => console.log("Pressed!")} text="Boop" />
      {/* <Image src={goku} alt="goku" width={100} height={100} /> */}
      <Board
        imageList={imageList}
        cardBackSrc={CardBackSrc}
        screenWidth={screenWidth}
      />
    </div>
  );
}
