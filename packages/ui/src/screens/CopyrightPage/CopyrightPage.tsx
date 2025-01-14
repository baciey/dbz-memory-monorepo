import React from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./CopyrightPage.styles";
import { Avatar, Card, Text } from "react-native-paper";
import { globalStyles } from "../../styles/globalStyles";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { Linking, Pressable, View } from "react-native";
import { authors, description } from "./CopyrightPage.const";
import { Link } from "./Link";

export const CopyrightPage = () => {
  const { isMobile } = useGetScreenDimensions();

  const authorsList = authors.map((author) => {
    return (
      <Card style={styles.card} key={author.name}>
        <Link text="Author: " url={author.authorUrl} name={author.name} />
        <Link
          text="License: "
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
        Copyright
      </Text>
      <Text style={globalStyles.heading}>{description}</Text>
      <View
        style={{
          flexDirection: isMobile ? "column" : "row",
          flexWrap: isMobile ? "nowrap" : "wrap",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {authorsList}
      </View>
    </ThemedView>
  );
};
