"use client";

import styles from "./style.module.css";
import {
  ROUTES,
  useTheme,
  useTranslation,
  Icon,
  useGetScreenDimensions,
} from "@repo/ui";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent } from "react";

export const Navbar = () => {
  const path = usePathname();
  const theme = useTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const { isMobile } = useGetScreenDimensions();

  const bgColor = theme.colors.surfaceVariant;
  const textColor = theme.colors.onSurface;

  const homePath = `/`;
  const settingsPath = `/${ROUTES.settings}`;
  const statisticsPath = `/${ROUTES.statistics}`;
  const privacyPolicyPath = `/${ROUTES.privacyPolicy}`;
  const contactPath = `/${ROUTES.contact}`;

  const homeIcon = "home" as const;
  const homeIconOutline = "home-outline" as const;
  const settingsIcon = "cog" as const;
  const settingsIconOutline = "cog-outline" as const;
  const statisticsIcon = "chart-box" as const;
  const statisticsIconOutline = "chart-box-outline" as const;
  const contactIcon = "email" as const;
  const contactIconOutline = "email-outline" as const;
  const privacyPolicyIcon = "information" as const;
  const privacyPolicyIconOutline = "information-outline" as const;

  const pages = [
    {
      name: t("home.home"),
      path: homePath,
      icon: homeIcon,
      iconOutline: homeIconOutline,
    },
    {
      name: t("settings.settings"),
      path: settingsPath,
      icon: settingsIcon,
      iconOutline: settingsIconOutline,
    },
    {
      name: t("statistics.statistics"),
      path: statisticsPath,
      icon: statisticsIcon,
      iconOutline: statisticsIconOutline,
    },
    {
      name: t("contact.contact"),
      path: contactPath,
      icon: contactIcon,
      iconOutline: contactIconOutline,
    },
    {
      name: t("privacyPolicy.privacyPolicy"),
      path: privacyPolicyPath,
      icon: privacyPolicyIcon,
      iconOutline: privacyPolicyIconOutline,
    },
  ];

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <nav className={styles.container} style={{ backgroundColor: bgColor }}>
      <ul className={`${styles.list} ${isMobile ? styles.listMobile : ""}`}>
        {pages.map((page) => (
          <li
            key={page.path}
            className={styles.listItem}
            style={{
              backgroundColor:
                path === page.path ? theme.colors.inversePrimary : "",
            }}
          >
            <a
              className={styles.anchor}
              onClick={(e) => handleClick(e, page.path)}
              style={{
                color: textColor,
              }}
            >
              {!isMobile && page.name}
              {isMobile && (
                <Icon
                  source={path === page.path ? page.icon : page.iconOutline}
                  size={24}
                  color={textColor}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
