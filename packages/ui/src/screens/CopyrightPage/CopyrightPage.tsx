import React from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./CopyrightPage.styles";
import { Avatar, Card, Text } from "react-native-paper";
import { globalStyles } from "../../styles/globalStyles";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { Linking, Pressable, View } from "react-native";
import { authors } from "./CopyrightPage.const";
import { Link } from "./Link";
import { useTranslation } from "react-i18next";

export const CopyrightPage = () => {
  const { t } = useTranslation();
  const { isMobile, width } = useGetScreenDimensions();

  const mobileCardWidth =
    width / 2 - globalStyles.pageContainer.padding - styles.cardContainer.gap;

  const authorsList = authors.map((author) => {
    return (
      <Card
        style={[styles.card, { width: isMobile ? mobileCardWidth : "auto" }]}
        key={author.name}
      >
        <Link
          text={`${t("copyright.author")}: `}
          url={author.authorUrl}
          name={author.name}
        />
        <Link
          text={`${t("copyright.license")}: `}
          url={author.licenseUrl}
          name={author.licenseShort}
        />

        {author.images.map((image) => {
          return (
            <Card.Title
              key={image.originalUrl}
              style={styles.cardTitle}
              title={image.name}
              left={() => (
                <Pressable onPress={() => Linking.openURL(image.originalUrl)}>
                  <Avatar.Image
                    source={{ uri: image.myUrl }}
                    style={styles.avatar}
                    size={40}
                  />
                </Pressable>
              )}
            />
          );
        })}
      </Card>
    );
  });

  return (
    <ThemedView style={globalStyles.pageContainer}>
      <Text variant="headlineSmall" style={globalStyles.heading}>
        {t("copyright.copyright")}
      </Text>
      <Text style={globalStyles.heading}>{t("copyright.description")}</Text>
      <View style={styles.cardContainer}>{authorsList}</View>
    </ThemedView>
  );
};
