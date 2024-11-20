import React from "react";
import { Modal, Portal, useTheme } from "react-native-paper";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { ThemedButton } from "../ThemedButton";
import { ThemedAlertProps } from "./ThemedAlert.types";
import { styles } from "./ThemedAlert.styles";

export const ThemedAlert = ({
  isVisible,
  setIsVisible,
  actionButtonText = "OK",
  actionButtonOnPress,
}: ThemedAlertProps) => {
  const theme = useTheme();

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
          text="Do you want to return to main menu?"
          type="onSurface"
        />
        <ThemedView type="surface" style={styles.buttonsContainer}>
          <ThemedButton
            text={actionButtonText}
            mode="contained"
            type="primary"
            onPress={() => {
              setIsVisible(false);
              actionButtonOnPress();
            }}
          />
          <ThemedButton
            text="Cancel"
            mode="contained"
            type="primary"
            onPress={() => setIsVisible(false)}
          />
        </ThemedView>
      </Modal>
    </Portal>
  );
};
