import { SettingsPage } from "@repo/ui";
import * as Linking from "expo-linking";
import { useEffect } from "react";

export default function Settings() {
  // useEffect(() => {
  //   const x = Linking.addEventListener("url", handleGetInitialURL);

  //   return () => {
  //     x.remove();
  //   };
  // }, []);

  // const handleGetInitialURL = async () => {
  //   try {
  //     const initialUrl = await Linking.getInitialURL();
  //     if (initialUrl) {
  //       console.log(`Got initial URL: ${initialUrl}`);
  //     }
  //   } catch (error) {
  //     console.error("Error while getting initial URL:", error);
  //   }
  // };

  const url = Linking.useURL();
  console.log({ url });

  return <SettingsPage />;
}
