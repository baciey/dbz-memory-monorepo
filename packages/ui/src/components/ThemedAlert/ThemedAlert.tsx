import React from "react";
import { Modal, Portal, Text, useTheme } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { ThemedButton } from "../ThemedButton";
import { ThemedAlertProps } from "./ThemedAlert.types";
import { styles } from "./ThemedAlert.styles";

export const ThemedAlert = ({
  isVisible,
  actionButtonText = "OK",
  actionButtonOnPress,
  text,
  withCancel = false,
  onDismiss,
  dismissable = false,
}: ThemedAlertProps) => {
  const theme = useTheme();
  if (!isVisible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        dismissable={dismissable}
        visible={isVisible}
        onDismiss={onDismiss}
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
              onDismiss?.();
              actionButtonOnPress?.();
            }}
          />
          {withCancel && (
            <ThemedButton
              text="Cancel"
              type="primary"
              onPress={() => onDismiss?.()}
            />
          )}
        </ThemedView>
      </Modal>
    </Portal>
  );
};
