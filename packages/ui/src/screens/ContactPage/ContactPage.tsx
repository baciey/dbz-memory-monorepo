import React, { useState } from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./ContactPage.styles";
import { Text } from "react-native-paper";
import { globalStyles } from "../../styles/globalStyles";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { View } from "react-native";
import { useValidation } from "../../hooks/useValidation";
import { ThemedTextInput } from "../../components/ThemedTextInput";
import { useTranslation } from "react-i18next";
import { ThemedButton } from "../../components/ThemedButton";
import {
  send as sendMobile,
  EmailJSResponseStatus,
} from "@emailjs/react-native";
import { send as sendWeb } from "@emailjs/browser";

import { ThemedAlert } from "../../components/ThemedAlert";
import { Loader } from "../../components/Loader";

export const ContactPage = () => {
  const { t } = useTranslation();

  const { isMobile, isWeb } = useGetScreenDimensions();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<string>("");

  const { validateEmail } = useValidation();

  const validateInputs = () => {
    const emailErrorText = validateEmail(email);
    const messageErrorText =
      message.length === 0 ? t("contact.messageError") : "";
    setEmailError(emailErrorText);
    setMessageError(messageErrorText);
    return emailErrorText || messageErrorText;
  };

  const sendMessage = async () => {
    const hasError = validateInputs();
    if (hasError) return;
    setLoading(true);
    const fn = isWeb ? sendWeb : sendMobile;
    try {
      await fn(
        "service_5sewsvj",
        "template_5pe7ea5",
        {
          email,
          message,
        },
        {
          publicKey: "J-1BsC4ohkaDBlN-X",
        },
      );

      setAlert("Email sent successfully");
      setEmail("");
      setMessage("");
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        setAlert(err.text);
      } else {
        setAlert("An error occurred. Please try again later.");
      }
    }
    setLoading(false);
  };

  return (
    <ThemedView style={globalStyles.pageContainer}>
      <ThemedAlert
        isVisible={Boolean(alert)}
        onDismiss={() => setAlert("")}
        text={alert}
      />
      <Loader isVisible={loading} withBackground />
      <Text variant="headlineSmall" style={globalStyles.heading}>
        {t("contact.contactUs")}
      </Text>
      <View
        style={{
          width: isMobile ? "100%" : "50%",
        }}
      >
        <ThemedTextInput
          label={t("contact.yourEmail")}
          value={email}
          onChangeText={setEmail}
          errorText={emailError}
        />
        <ThemedTextInput
          label={t("contact.message")}
          value={message}
          onChangeText={setMessage}
          errorText={messageError}
          multiline={true}
          contentStyle={styles.messageInput}
          mode="outlined"
        />
        <ThemedButton
          text={t("contact.send")}
          disabled={loading}
          onPress={sendMessage}
          testID="send-button"
        />
      </View>
    </ThemedView>
  );
};
