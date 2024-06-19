"use client";

import Link from "next/link";
import styles from "./style.module.css";
import { COLORS, getTheme } from "@repo/ui";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();
  const theme = getTheme();
  const bgColor = COLORS[theme].background2;
  const textColor = COLORS[theme].text;

  return (
    <nav className={styles.container} style={{ backgroundColor: bgColor }}>
      <ul className={styles.list}>
        <li
          className={`${styles.listItem} ${path === "/" ? styles.active : ""}`}
        >
          <Link className={styles.anchor} href="/" style={{ color: textColor }}>
            Home
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${path === "/settings" ? styles.active : ""}`}
        >
          <Link
            className={styles.anchor}
            href="/settings"
            style={{ color: textColor }}
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
};
