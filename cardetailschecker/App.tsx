import { StyleSheet, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import { PaperProvider } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import Nav from "./components/NavBar";
import { Login } from "./tabs/Login";
import { Register } from "./tabs/Register";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

/**
 * The main app component.
 *
 * This component is responsible for rendering the entire app. It uses the
 * {@link PaperProvider} to provide the theme to all of its children, and it
 * uses the {@link AuthProvider} to provide authentication state to all of its
 * children.
 *
 * The app renders a navigation stack with two possible states: a logged-in
 * state and a logged-out state. When the user is logged in, the app renders the
 * {@link Nav} component. When the user is logged out, the app renders a stack
 * with two screens: the {@link Login} screen and the {@link Register} screen.
 *
 * @returns The app component.
 */
export default function App() {
  const currentTheme = useColorScheme();
  const theme = currentTheme === "dark" ? darkTheme : lightTheme;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch (error) {}
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <Stack.Screen name="Home" component={Nav} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
