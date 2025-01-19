"use client";

import styles from "./style.module.css";
import { ROUTES, useTheme, useTranslation } from "@repo/ui";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = () => {
  const path = usePathname();
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const bgColor = theme.colors.surfaceVariant;
  const textColor = theme.colors.onSurface;

  const homePath = `/`;
  const settingsPath = `/${ROUTES.settings}`;
  const statisticsPath = `/${ROUTES.statistics}`;
  const copyrightPath = `/${ROUTES.copyright}`;
  const contactPath = `/${ROUTES.contact}`;

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
    {
      name: t("copyright.copyright"),
      path: copyrightPath,
    },
    {
      name: t("contact.contact"),
      path: contactPath,
    },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

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
            <a
              className={styles.anchor}
              onClick={(e) => handleClick(e, page.path)}
              style={{ color: textColor }}
            >
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
