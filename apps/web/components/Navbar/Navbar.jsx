"use client";

import Link from "next/link";
import styles from "./style.module.css";
import { COLORS, ROUTES, getTheme, useTranslation } from "@repo/ui";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();
  const theme = getTheme();
  const { t } = useTranslation();

  const bgColor = COLORS[theme].background2;
  const textColor = COLORS[theme].text;

  const settingsPath = `/${ROUTES.settings}`;
  const homePath = `/`;

  return (
    <nav className={styles.container} style={{ backgroundColor: bgColor }}>
      <ul className={styles.list}>
        <li
          className={`${styles.listItem} ${path === homePath ? styles.active : ""}`}
        >
          <Link
            className={styles.anchor}
            href={homePath}
            style={{ color: textColor }}
          >
            {t("home.home")}
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${path === settingsPath ? styles.active : ""}`}
        >
          <Link
            className={styles.anchor}
            href={settingsPath}
            style={{ color: textColor }}
          >
            {t("settings.settings")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
