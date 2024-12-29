export type ThemedAlertProps = {
  actionButtonText?: string;
  actionButtonOnPress?: () => void;
  isVisible: boolean;
  onDismiss?: () => void;
  dismissable?: boolean;
  text: string;
  withCancel?: boolean;
};
