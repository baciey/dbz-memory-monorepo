"use client";

import Link from "next/link";
import styles from "./style.module.css";
import { ROUTES, useTheme, useTranslation } from "@repo/ui";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();
  const theme = useTheme();
  const { t } = useTranslation();

  const bgColor = theme.colors.surfaceVariant;
  const textColor = theme.colors.onSurface;

  const homePath = `/`;
  const settingsPath = `/${ROUTES.settings}`;
  const statisticsPath = `/${ROUTES.statistics}`;

  const pages = [
    {
      name: t("home.home"),
      path: homePath,
    },
    {
      name: t("settings.settings"),
      path: settingsPath,
    },
    {
      name: t("statistics.statistics"),
      path: statisticsPath,
    },
  ];

  return (
    <nav className={styles.container} style={{ backgroundColor: bgColor }}>
      <ul className={styles.list}>
        {pages.map((page) => (
          <li
            key={page.path}
            className={`${styles.listItem} ${
              path === page.path ? styles.active : ""
            }`}
          >
            <Link
              className={styles.anchor}
              href={page.path}
              style={{ color: textColor }}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
