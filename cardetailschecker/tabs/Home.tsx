import * as React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import { Text, Card } from "react-native-paper";

/**
 * The App component renders the landing page of the application.
 *
 * The component displays the logo of CarCrux Industries and a welcome message.
 * The logo is displayed in the center of the screen, with the welcome message
 * below the logo. The component also renders a status bar with a dark theme.
 */
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.companyName}>Welcome to</Text>
            <Text style={styles.companyName}>CarCrux Industries</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  cardContainer: {
    width: "85%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#D8D8D8",
    borderRadius: 20,
  },
  content: {
    alignItems: "center",
    paddingVertical: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: "contain",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#4D4D4D",
    marginBottom: 5,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4D4D4D",
  },
});
