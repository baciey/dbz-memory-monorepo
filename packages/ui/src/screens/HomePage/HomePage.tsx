import React, { useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { useTranslation } from "react-i18next";
import { GameBoard } from "../../modules/Game/GameBoard";
import { GAME_BOARD_MODE } from "../../modules/Game/GameBoard/GameBoard.types";
import { ThemedButton } from "../../components/ThemedButton";
import { GLOBAL_STYLES } from "../../styles/globalStyles";
import { Image, View } from "react-native";
import { ThemedAlert } from "../../components/ThemedAlert/ThemedAlert";
import { styles } from "./HomePage.styles";
import { NamesModal } from "../../modules/Game/NamesModal";
import { useGetPlayerNameFromAsyncStorage } from "../../hooks/useGetPlayerNameFromAsyncStorage";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { useGetImages } from "../../hooks/useGetImages";
import { GameBoardMultiplayer } from "../../modules/Game/GameBoardMultiplayer";
import { Lobby } from "../../modules/Game/Lobby";
import { MultiPlayerGame } from "../../modules/Game/slice.types";
import { useGetCardsVanishTimeFromAsyncStorage } from "../../hooks/useGetCardsVanishTimeFromAsyncStorage";

export const HomePage = () => {
  const { t } = useTranslation();
  const { images } = useGetImages();
  const {
    width: backgroundImageWidth,
    isMobile,
    isWeb,
  } = useGetScreenDimensions();

  useGetPlayerNameFromAsyncStorage();
  useGetCardsVanishTimeFromAsyncStorage();

  const [gameMode, setGameMode] = useState<GAME_BOARD_MODE | null>(null);
  const [isLobbyVisible, setIsLobbyVisible] = useState(false);
  const [initialGame, setInitialGame] = useState<MultiPlayerGame | null>(null);
  const [isNamesModalVisible, setIsNamesModalVisible] = useState(false);
  const [alert, setAlert] = useState<string>("");
  const [alertOnPress, setAlertOnPress] = useState<(() => void) | undefined>();
  const [isAlertWithCancel, setIsAlertWithCancel] = useState<boolean>(false);
  const [isTriple, setIsTriple] = useState(false);

  const handleSetGameMode = (mode: GAME_BOARD_MODE | null) => {
    setGameMode(mode);
    if (mode !== null) setIsNamesModalVisible(true);
  };

  const handleReturnToMenu = () => {
    setGameMode(null);
    setIsNamesModalVisible(false);
    setIsLobbyVisible(false);
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
        text={alert}
        isVisible={Boolean(alert)}
        actionButtonOnPress={alertOnPress}
        withCancel={isAlertWithCancel}
        onDismiss={() => {
          setAlert("");
          setIsAlertWithCancel(false);
          setAlertOnPress(undefined);
        }}
      />
      <View style={styles.backgroundImageContainer}>
        <Image
          style={[
            styles.backgroundImage,
            {
              width: backgroundImageWidth,
              aspectRatio: isMobile ? 0.5 : 1.5,
            },
          ]}
          source={{
            uri: images.main.bgWeb || undefined,
          }}
        />
      </View>

      {((gameMode === GAME_BOARD_MODE.player1 ||
        gameMode === GAME_BOARD_MODE.player2) &&
        !isNamesModalVisible) ||
      isLobbyVisible ? (
        <ThemedButton
          icon="arrow-left"
          text={t("home.goBack")}
          onPress={
            isLobbyVisible
              ? () => {
                  setGameMode(null);
                  setIsLobbyVisible(false);
                }
              : () => {
                  setAlert(t("home.returnAlert"));
                  setIsAlertWithCancel(true);
                  setAlertOnPress(() => {
                    return handleReturnToMenu;
                  });
                }
          }
          style={[
            GLOBAL_STYLES.m.mb16,
            isWeb ? {} : { marginTop: 50 },
            isMobile ? {} : styles.returnButtonWeb,
            styles.returnButton,
          ]}
        />
      ) : null}

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
            style={GLOBAL_STYLES.m.mb8}
          />
          <ThemedButton
            text={"multiplayer"}
            type="primary"
            onPress={() => handleSetGameMode(GAME_BOARD_MODE.multiplayer)}
          />
        </View>
      )}

      {gameMode !== null && (
        <NamesModal
          isVisible={isNamesModalVisible}
          mode={gameMode}
          onCancel={() => {
            setIsNamesModalVisible(false);
            setGameMode(null);
          }}
          onConfirm={() => {
            setIsNamesModalVisible(false);
            if (gameMode === GAME_BOARD_MODE.multiplayer)
              setIsLobbyVisible(true);
          }}
          isTriple={isTriple}
          setIsTriple={setIsTriple}
        />
      )}
      {(gameMode === GAME_BOARD_MODE.player1 ||
        gameMode === GAME_BOARD_MODE.player2) && (
        <View style={{ opacity: isNamesModalVisible ? 0 : 1 }}>
          <GameBoard
            mode={gameMode}
            handleSetGameMode={handleSetGameMode}
            setAlert={setAlert}
            setAlertOnPress={setAlertOnPress}
            alertOnPress={alertOnPress}
            isTriple={isTriple}
          />
        </View>
      )}

      {gameMode === GAME_BOARD_MODE.multiplayer &&
        !isNamesModalVisible &&
        !isLobbyVisible &&
        initialGame && (
          <GameBoardMultiplayer
            handleSetGameMode={handleSetGameMode}
            initialGame={initialGame}
            setAlert={setAlert}
            setAlertOnPress={setAlertOnPress}
            setIsAlertWithCancel={setIsAlertWithCancel}
            alertOnPress={alertOnPress}
          />
        )}

      {gameMode === GAME_BOARD_MODE.multiplayer &&
        !isNamesModalVisible &&
        isLobbyVisible && (
          <Lobby
            onJoinOrCreatePublicGame={(game: MultiPlayerGame) => {
              setGameMode(GAME_BOARD_MODE.multiplayer);
              setInitialGame(game);
              setIsLobbyVisible(false);
            }}
            handleSetGameMode={handleSetGameMode}
            setAlert={setAlert}
            setAlertOnPress={setAlertOnPress}
          />
        )}
    </ThemedView>
  );
};
