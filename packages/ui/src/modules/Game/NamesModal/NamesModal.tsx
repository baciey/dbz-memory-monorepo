import React, { useEffect, useState } from "react";
import { IconButton, Modal, Portal, Text, useTheme } from "react-native-paper";
import { NamesModalProps } from "./NamesModal.types";
import { styles } from "./NamesModal.styles";
import { ThemedButton } from "../../../components/ThemedButton";
import { ThemedView } from "../../../components/ThemedView";
import { GAME_BOARD_MODE } from "../GameBoard";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { gameSliceActions } from "../slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetScreenDimensions } from "../../../hooks/useGetScreenDimensions";
import { ThemedTextInput } from "../../../components/ThemedTextInput";
import { useTranslation } from "react-i18next";
import { STORAGE_KEYS } from "../../../constants/storage";
import { capitalizeFirst } from "../../../utils/capitalizeFirst";
import { useValidation } from "../../../hooks/useValidation";
import { gameSelectors } from "../selectors";
import { View } from "react-native";

export const NamesModal = ({
  isVisible,
  mode,
  onCancel,
  onConfirm,
}: NamesModalProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { validateName } = useValidation();

  const [playerName, setPlayerName] = useState("");
  const [playersNames, setPlayersNames] = useState(["", ""]);
  const [errorText, setErrorText] = useState(["", ""]);

  const player1Name = useAppSelector(gameSelectors.getPlayersNames)[0];
  const player2Name = useAppSelector(gameSelectors.getPlayersNames)[1];
  const singlePlayerName = useAppSelector(gameSelectors.getPlayerName);
  const cardsVanishTime = useAppSelector(gameSelectors.getCardsVanishTime);

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

  const handleConfirm = () => {
    const hasErrors = validateNames().some((error) => error !== "");
    if (hasErrors) return;

    onConfirm();
    if (isPlayer2Mode) {
      const names = playersNames.map((name) => name.trim());
      dispatch(gameSliceActions.setPlayersNames(names));
      AsyncStorage.setItem(STORAGE_KEYS.playersNames, JSON.stringify(names));
    } else {
      const name = playerName.trim();
      dispatch(gameSliceActions.setPlayerName(name));
      AsyncStorage.setItem(STORAGE_KEYS.playerName, JSON.stringify(name));
    }

    if (mode === GAME_BOARD_MODE.player1) {
      AsyncStorage.setItem(
        STORAGE_KEYS.cardsVanishTime,
        JSON.stringify(cardsVanishTime),
      );
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

  const handleSetVanishTime = (operation: string) => {
    if (operation === "+") {
      if (cardsVanishTime >= 5) return;
      dispatch(gameSliceActions.setCardsVanishTime(cardsVanishTime + 0.1));
    } else {
      if (cardsVanishTime <= 0.1) return;
      dispatch(gameSliceActions.setCardsVanishTime(cardsVanishTime - 0.1));
    }
  };

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={isVisible}
        contentContainerStyle={[
          styles.contentContainer,
          {
            backgroundColor: theme.colors.surface,
            alignSelf: isMobile ? "stretch" : "center",
            minWidth: isMobile ? "auto" : 300,
          },
        ]}
      >
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
          {t("game.enterYour")}{" "}
          {isPlayer2Mode ? t("game.names") : t("game.name")}
        </Text>
        <ThemedView type="surface" style={styles.inputsContainer}>
          <ThemedTextInput
            label={
              isPlayer2Mode
                ? t("game.player1Name")
                : capitalizeFirst(t("game.name"))
            }
            value={isPlayer2Mode ? playersNames[0] : playerName}
            onChangeText={(text) => handleInputChange(0, text)}
            errorText={errorText[0]}
            testID="player1Name"
          />
          {mode === GAME_BOARD_MODE.player1 ? (
            <>
              <ThemedView style={styles.rowAligned}>
                <View style={styles.rowAligned}>
                  <Text>{t("game.cardsVanishTime")}: </Text>
                  <Text
                    style={[
                      styles.vanishTimeValue,
                      {
                        backgroundColor: theme.colors.secondaryContainer,
                      },
                    ]}
                  >
                    {cardsVanishTime.toFixed(1)}
                  </Text>
                </View>
                <View style={styles.vanishTimeIconsContainer}>
                  <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => handleSetVanishTime("+")}
                    style={[
                      styles.vanishTimeIcon,
                      {
                        backgroundColor: theme.colors.secondaryContainer,
                      },
                    ]}
                  />
                  <IconButton
                    icon="minus"
                    size={20}
                    onPress={() => handleSetVanishTime("-")}
                    style={[
                      styles.vanishTimeIcon,
                      {
                        backgroundColor: theme.colors.secondaryContainer,
                      },
                    ]}
                  />
                </View>
              </ThemedView>
              <View style={styles.rowAligned}>
                <Text>{t("game.movesInfo")}: </Text>
              </View>
            </>
          ) : null}
          {isPlayer2Mode ? (
            <ThemedTextInput
              label={t("game.player2Name")}
              value={playersNames[1]}
              onChangeText={(text) => handleInputChange(1, text)}
              errorText={errorText[1]}
              testID="player2Name"
            />
          ) : null}
        </ThemedView>
        <ThemedView type="surface" style={styles.buttonsContainer}>
          <ThemedButton
            text={t("buttons.confirm")}
            type="primary"
            onPress={handleConfirm}
          />
          <ThemedButton
            text={t("buttons.cancel")}
            type="primary"
            onPress={onCancel}
          />
        </ThemedView>
      </Modal>
    </Portal>
  );
};
