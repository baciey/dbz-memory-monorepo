import React, { useEffect, useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { GameBoard } from "../../modules/Board/GameBoard/";
import { GAME_BOARD_MODE } from "../../modules/Board/GameBoard/GameBoard.types";
import { ThemedButton } from "../../components/ThemedButton";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { Image, View } from "react-native";
import { useAppSelector } from "../../redux/store";
import { boardSelectors } from "../../modules/Board/selectors";
import { IMAGES } from "../../constants/images";
import { ThemedAlert } from "../../components/ThemedAlert/ThemedAlert";
import { styles } from "./HomePage.styles";
import { Platform } from "react-native";
import { Loader } from "../../components/Loader/";
import { NamesModal } from "../../modules/Board/NamesModal";
import { useGetPlayerName } from "../../hooks/useGetPlayerName";

export const HomePage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  useGetPlayerName();

  const [gameMode, setGameMode] = useState<GAME_BOARD_MODE | null>(null);
  const [backgroundImageWidth, setBackgroundImageWidth] = useState<number>(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isNamesModalVisible, setIsNamesModalVisible] = useState(true);

  const imagesPercentageLoaded = useAppSelector(
    boardSelectors.getImagesPercentageLoaded,
  );

  useEffect(() => {
    setBackgroundImageWidth(GLOBAL_STYLES.window.width);
  }, []);

  const handleSetGameMode = (mode: GAME_BOARD_MODE | null) => {
    setGameMode(mode);
  };

  const handleShowModal = () => setIsAlertVisible(true);

  useEffect(() => {
    if (gameMode !== null) {
      setIsNamesModalVisible(true);
    }
  }, [gameMode]);

  return (
    <ThemedView style={styles.container}>
      <ThemedAlert
        actionButtonOnPress={() => setGameMode(null)}
        isVisible={isAlertVisible}
        setIsVisible={setIsAlertVisible}
      />
      <Loader isVisible={gameMode !== null && imagesPercentageLoaded !== 100} />
      <View
        style={[
          styles.backgroundImageContainer,
          {
            width: backgroundImageWidth,
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
            },
          ]}
          source={{
            uri: IMAGES.sonHQImage,
          }}
        />
      </View>

      {gameMode !== null && imagesPercentageLoaded === 100 && (
        <ThemedButton
          text="Return"
          mode="contained"
          type="primary"
          onPress={handleShowModal}
          style={[
            GLOBAL_STYLES.m.mt16,
            GLOBAL_STYLES.m.mb16,
            Platform.OS === "web" ? styles.returnButton : {},
          ]}
        />
      )}

      {gameMode === null && (
        <View>
          <ThemedButton
            text="1 player"
            mode="contained"
            onPress={() => handleSetGameMode(GAME_BOARD_MODE.player1)}
            style={GLOBAL_STYLES.m.mb8}
          />
          <ThemedButton
            text="2 players"
            mode="contained"
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
        />
      )}
      {gameMode !== null && (
        <GameBoard mode={gameMode} isVisible={!isNamesModalVisible} />
      )}
    </ThemedView>
  );
};
