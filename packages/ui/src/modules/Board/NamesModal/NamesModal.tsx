import React, { useState } from "react";
import { Modal, Portal, TextInput, useTheme } from "react-native-paper";
import { NamesModalProps } from "./NamesModal.types";
import { styles } from "./NamesModal.styles";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedView } from "../../../components/ThemedView";
import { GAME_BOARD_MODE } from "../GameBoard";
import { useAppDispatch } from "../../../redux/store";
import { boardSliceActions } from "../slice";

export const NamesModal = ({
  isVisible,
  setIsVisible,
  mode,
}: NamesModalProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [playerName, setPlayerName] = useState("");
  const [playersNames, setPlayersNames] = useState(["", ""]);
  const [error, setError] = useState(["", ""]);

  const isPlayer2Mode = mode === GAME_BOARD_MODE.player2;

  const validateInput = (text: string) => {
    const trimmedText = text.trim();
    if (!/^[a-zA-Z0-9 ]*$/.test(trimmedText)) {
      return "Only letters, numbers, and spaces are allowed.";
    }
    if (trimmedText.length > 10) {
      return "Maximum length is 20 characters.";
    }
    if (/\s{2,}/.test(trimmedText)) {
      return "No consecutive spaces allowed.";
    }
    return "";
  };

  const handleSaveName = () => {
    setIsVisible(false);
    if (isPlayer2Mode) {
      dispatch(
        boardSliceActions.setPlayersNames(
          playersNames.map((name) => name.trim()),
        ),
      );
    } else {
      dispatch(boardSliceActions.setPlayerName(playerName.trim()));
    }
  };

  const handleInputChange = (index: number, text: string) => {
    const trimmedText = text.trimStart();
    const errorText = validateInput(trimmedText);
    setError((prev) => {
      const updatedErrors = [...prev];
      updatedErrors[index] = errorText;
      return updatedErrors;
    });
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

  const isConfirmButtonDisabled = () => {
    if (isPlayer2Mode) {
      return (
        playersNames.some((name) => validateInput(name) !== "") ||
        error.some((e) => e !== "")
      );
    }
    return validateInput(playerName) !== "";
  };

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        contentContainerStyle={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <ThemedText
          variant="titleMedium"
          text={`Enter your ${isPlayer2Mode ? "names" : "name"}`}
          type="onSurface"
        />

        <ThemedView type="surface" style={styles.inputsContainer}>
          <TextInput
            label={isPlayer2Mode ? "Player 1 name" : "Name"}
            value={isPlayer2Mode ? playersNames[0] : playerName}
            onChangeText={(text) => handleInputChange(0, text)}
            error={!!error[0]}
          />
          {error[0] ? (
            <ThemedText type="error" text={error[0]} style={styles.errorText} />
          ) : null}
          {isPlayer2Mode ? (
            <>
              <TextInput
                label="Player 2 name"
                value={playersNames[1]}
                onChangeText={(text) => handleInputChange(1, text)}
                error={!!error[1]}
              />
              {error[1] ? (
                <ThemedText
                  type="error"
                  text={error[1]}
                  style={styles.errorText}
                />
              ) : null}
            </>
          ) : null}
        </ThemedView>
        <ThemedView type="surface" style={styles.buttonsContainer}>
          <ThemedButton
            text="Confirm"
            mode="contained"
            type="primary"
            onPress={handleSaveName}
            disabled={isConfirmButtonDisabled()}
          />
        </ThemedView>
      </Modal>
    </Portal>
  );
};
