import React from "react";
import { ThemedView } from "../../components/ThemedView";
import { styles } from "./AboutPage.styles";
import { Avatar, Card, Text } from "react-native-paper";
import { globalStyles } from "../../styles/globalStyles";
import { useGetScreenDimensions } from "../../hooks/useGetScreenDimensions";
import { View } from "react-native";
import { description, technologies } from "./AboutPage.const";

export const AboutPage = () => {
  const { isMobile } = useGetScreenDimensions();

  const technologiesList = technologies.map((technology) => {
    return (
      <Card.Title
        key={technology.id}
        style={styles.cardTitle}
        title={technology.name}
        left={() => (
          <Avatar.Image
            source={{ uri: technology.image }}
            style={styles.avatar}
            size={40}
          />
        )}
      />
    );
  });

  return (
    <ThemedView style={globalStyles.pageContainer}>
      <Text variant="headlineSmall" style={globalStyles.heading}>
        About this project
      </Text>
      <View
        style={{
          flexDirection: isMobile ? "column" : "row",
          gap: 16,
        }}
      >
        <Card style={styles.cardLeft}>
          <Text variant="titleLarge" style={globalStyles.heading}>
            Used technologies
          </Text>
          {technologiesList}
        </Card>
        <Card style={styles.cardRight}>
          <Text variant="titleLarge" style={globalStyles.heading}>
            Description
          </Text>
          <Text variant="bodyLarge" style={globalStyles.heading}>
            {description}
          </Text>
        </Card>
      </View>
    </ThemedView>
  );
};
