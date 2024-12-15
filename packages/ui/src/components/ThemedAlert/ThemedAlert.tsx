import React from "react";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { ThemedButton } from "../ThemedButton";
import { ThemedAlertProps } from "./ThemedAlert.types";
import { styles } from "./ThemedAlert.styles";

export const ThemedAlert = ({
  isVisible,
  setIsVisible,
  actionButtonText = "OK",
  actionButtonOnPress,
  text,
  withCancel = false,
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
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
          {text}
        </Text>
        <ThemedView type="surface" style={styles.buttonsContainer}>
          <ThemedButton
            text={actionButtonText}
            type="primary"
            onPress={() => {
              setIsVisible(false);
              if (!actionButtonOnPress) return;
              actionButtonOnPress();
            }}
          />
          {withCancel && (
            <ThemedButton
              text="Cancel"
              type="primary"
              onPress={() => setIsVisible(false)}
            />
          )}
        </ThemedView>
      </Modal>
    </Portal>
  );
};
