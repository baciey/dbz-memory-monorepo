import { Image, StyleSheet, Platform, Dimensions } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Board } from "@repo/ui";

import goku from "./../../assets/images/cards/goku.jpg";
import vegita from "./../../assets/images/cards/vegita.jpg";
import bulma from "./../../assets/images/cards/bulma.jpg";
import beerus from "./../../assets/images/cards/beerus.jpg";
import buu from "./../../assets/images/cards/buu.jpg";
import haiya from "./../../assets/images/cards/haiya.jpg";
import picolo from "./../../assets/images/cards/picolo.jpg";
import frieza from "./../../assets/images/cards/frieza.jpg";
import mutenroshi from "./../../assets/images/cards/mutenroshi.jpg";
import pilaf from "./../../assets/images/cards/pilaf.jpg";
import CardBackSrc from "./../../assets/images/cards/cardBack.jpg";

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

const screenWidth = Dimensions.get("window").width;


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <Board
        imageList={imageList}
        cardBackSrc={CardBackSrc}
        screenWidth={screenWidth}
      />

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">4!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
