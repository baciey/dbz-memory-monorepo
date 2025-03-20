import { useCallback, useEffect, useState } from "react";
import { version as userVersion } from "../../../../package.json";
import { supabase } from "../utils/supabase";
import { DATABASE_TABLE } from "../constants/database";
import { Alert, Linking } from "react-native";
import { GOOGLE_PLAY_URL } from "../constants/config";
import { useTranslation } from "react-i18next";

export const useCheckAppVersion = (withAlert = true) => {
  const { t } = useTranslation();
  const [availableVersion, setAvailableVersion] = useState("");

  const checkAppVersion = useCallback(async () => {
    setAvailableVersion("");
    supabase
      .from(DATABASE_TABLE.app_version)
      .select("app_version")
      .single()
      .then(({ data }) => {
        if (data) {
          const { app_version } = data;
          if (app_version !== userVersion) {
            setAvailableVersion(app_version);
            if (withAlert) {
              Alert.alert(
                "",
                `${t("home.newVersionAvailable")}: ${app_version}. ${t("home.pleaseUpdate")}.`,
                [
                  {
                    text: t("home.update"),
                    onPress: () => {
                      Linking.openURL(GOOGLE_PLAY_URL);
                    },
                  },
                  {
                    text: t("home.cancel"),
                    onPress: () => {},
                    style: "cancel",
                  },
                ],
              );
            }
          }
        }
      });
  }, [t, withAlert]);

  useEffect(() => {
    checkAppVersion();
  }, [checkAppVersion]);

  return { availableVersion, checkAppVersion };
};
