import React, { useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { useTranslation } from "react-i18next";
import { GameBoard } from "../../modules/Game/GameBoard";
import { GAME_BOARD_MODE } from "../../modules/Game/GameBoard/GameBoard.types";
import { ThemedButton } from "../../components/ThemedButton";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { Image, View } from "react-native";
import { useAppSelector } from "../../redux/store";
import { gameSelectors } from "../../modules/Game/selectors";
import { ThemedAlert } from "../../components/ThemedAlert/ThemedAlert";
import { styles } from "./HomePage.styles";
import { Loader } from "../../components/Loader/";
import { NamesModal } from "../../modules/Game/NamesModal";
import { useGetPlayerNameFromAsyncStorage } from "../../hooks/useGetPlayerNameFromAsyncStorage";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { useGetImages } from "../../hooks/useGetImages";

export const HomePage = () => {
  const { t } = useTranslation();
  const { images } = useGetImages();
  const { width: backgroundImageWidth, isMobile } = useGetScreenDimensions();

  useGetPlayerNameFromAsyncStorage();

  const [gameMode, setGameMode] = useState<GAME_BOARD_MODE | null>(null);
  const [alert, setAlert] = useState<string>("");

  const [isNamesModalVisible, setIsNamesModalVisible] = useState(false);

  const imagesPercentageLoaded = useAppSelector(
    gameSelectors.getImagesPercentageLoaded,
  );

  const handleSetGameMode = (mode: GAME_BOARD_MODE | null) => {
    setGameMode(mode);
    if (mode !== null) setIsNamesModalVisible(true);
  };

  return (
    <ThemedView
      type="surface"
      style={[
        styles.container,
        { justifyContent: gameMode === null ? "center" : "flex-start" },
      ]}
    >
      <ThemedAlert
        actionButtonOnPress={() => setGameMode(null)}
        isVisible={Boolean(alert)}
        onDismiss={() => setAlert("")}
        text={alert}
        withCancel
      />
      <Loader
        isVisible={
          gameMode !== null &&
          imagesPercentageLoaded !== 100 &&
          !isNamesModalVisible
        }
      />
      <View
        style={[
          styles.backgroundImageContainer,
          {
            opacity:
              imagesPercentageLoaded !== 100 || isNamesModalVisible ? 1 : 0,
          },
        ]}
      >
        <Image
          style={[
            styles.backgroundImage,
            {
              width: backgroundImageWidth,
              opacity:
                imagesPercentageLoaded < 10
                  ? 0.1
                  : imagesPercentageLoaded / 100,
              aspectRatio: isMobile ? 0.5 : 1.5,
            },
          ]}
          source={{
            uri: images.main.bgWeb || undefined,
          }}
        />
      </View>

      {gameMode !== null &&
        imagesPercentageLoaded === 100 &&
        !isNamesModalVisible && (
          <ThemedButton
            text={t("home.goBack")}
            type="primary"
            onPress={() => setAlert(t("home.returnAlert"))}
            style={[
              GLOBAL_STYLES.m.mt16,
              GLOBAL_STYLES.m.mb16,
              isMobile ? {} : styles.returnButton,
            ]}
          />
        )}

      {gameMode === null && (
        <View>
          <ThemedButton
            text={t("statistics.player1")}
            onPress={() => handleSetGameMode(GAME_BOARD_MODE.player1)}
            style={GLOBAL_STYLES.m.mb8}
          />
          <ThemedButton
            text={t("statistics.player2")}
            type="primary"
            onPress={() => handleSetGameMode(GAME_BOARD_MODE.player2)}
          />
        </View>
      )}

      {gameMode !== null && (
        <NamesModal
          isVisible={isNamesModalVisible}
          setIsVisible={setIsNamesModalVisible}
          mode={gameMode}
          setGameMode={setGameMode}
        />
      )}
      {gameMode !== null && !isNamesModalVisible && (
        <GameBoard mode={gameMode} handleSetGameMode={handleSetGameMode} />
      )}
    </ThemedView>
  );
};
