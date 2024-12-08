import React, { useEffect, useState } from "react";
import { Modal, Portal, useTheme } from "react-native-paper";
import { NamesModalProps } from "./NamesModal.types";
import { styles } from "./NamesModal.styles";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedView } from "../../../components/ThemedView";
import { GAME_BOARD_MODE } from "../GameBoard";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { boardSliceActions } from "../slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";
import { validateName } from "../../../utils/validateName";
import { ThemedTextInput } from "../../../components/ThemedTextInput";

export const NamesModal = ({
  isVisible,
  setIsVisible,
  mode,
  setGameMode,
}: NamesModalProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [playerName, setPlayerName] = useState("");
  const [playersNames, setPlayersNames] = useState(["", ""]);
  const [errorText, setErrorText] = useState(["", ""]);

  const player1Name = useAppSelector((state) => state.board.playersNames[0]);
  const player2Name = useAppSelector((state) => state.board.playersNames[1]);
  const singlePlayerName = useAppSelector((state) => state.board.playerName);

  const { isMobile } = useGetScreenDimensions();

  useEffect(() => {
    if (singlePlayerName) setPlayerName(singlePlayerName);
    if (player1Name || player2Name) setPlayersNames([player1Name, player2Name]);
  }, [player1Name, player2Name, singlePlayerName]);

  const isPlayer2Mode = mode === GAME_BOARD_MODE.player2;

  const validateNames = () => {
    const names = isPlayer2Mode ? playersNames : [playerName];
    const errors = names.map((name) => validateName(name));
    setErrorText(errors);
    return errors;
  };

  const handleSaveName = () => {
    const hasErrors = validateNames().some((error) => error !== "");
    if (hasErrors) return;

    setIsVisible(false);
    if (isPlayer2Mode) {
      const names = playersNames.map((name) => name.trim());
      dispatch(boardSliceActions.setPlayersNames(names));
      AsyncStorage.setItem("playersNames", JSON.stringify(names));
    } else {
      const name = playerName.trim();
      dispatch(boardSliceActions.setPlayerName(name));
      AsyncStorage.setItem("playerName", JSON.stringify(name));
    }
  };

  const handleInputChange = (index: number, text: string) => {
    const trimmedText = text.trimStart();

    if (isPlayer2Mode) {
      setPlayersNames((prev) => {
        const updatedNames = [...prev];
        updatedNames[index] = trimmedText;
        return updatedNames;
      });
    } else {
      setPlayerName(trimmedText);
    }
  };

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        contentContainerStyle={[
          styles.contentContainer,
          {
            backgroundColor: theme.colors.surface,
            alignSelf: isMobile ? "stretch" : "center",
            minWidth: isMobile ? "auto" : 300,
          },
        ]}
      >
        <ThemedText
          variant="titleMedium"
          text={`Enter your ${isPlayer2Mode ? "names" : "name"}`}
          type="onSurface"
        />

        <ThemedView type="surface" style={styles.inputsContainer}>
          <ThemedTextInput
            label={isPlayer2Mode ? "Player 1 name" : "Name"}
            value={isPlayer2Mode ? playersNames[0] : playerName}
            onChangeText={(text) => handleInputChange(0, text)}
            errorText={errorText[0]}
          />
          {isPlayer2Mode ? (
            <ThemedTextInput
              label="Player 2 name"
              value={playersNames[1]}
              onChangeText={(text) => handleInputChange(1, text)}
              errorText={errorText[1]}
            />
          ) : null}
        </ThemedView>
        <ThemedView type="surface" style={styles.buttonsContainer}>
          <ThemedButton
            text="Confirm"
            type="primary"
            onPress={handleSaveName}
          />
          <ThemedButton
            text="Cancel"
            type="primary"
            onPress={() => {
              setIsVisible(false);
              setGameMode(null);
            }}
          />
        </ThemedView>
      </Modal>
    </Portal>
  );
};
