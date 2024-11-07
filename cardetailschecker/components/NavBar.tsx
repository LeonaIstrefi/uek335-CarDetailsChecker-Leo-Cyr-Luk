import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { Login } from "../tabs/Login";
import { Register } from "../tabs/Register";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Overview from "../tabs/Overview";
import Profile from "../tabs/Profile";
import Home from "../tabs/Home";

const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

/**
 * The Nav component renders the main navigation bar of the app.
 *
 * The navigation bar is implemented as a Material Bottom Tab Navigator from
 * the `react-native-paper` library. It has three tabs: "Home", "Overview", and
 * "Profile". The "Home" tab displays the home screen, the "Overview" tab
 * displays a list of cars, and the "Profile" tab displays the user's profile
 * information.
 *
 * The navigation bar is styled according to the app's theme, which is managed
 * by the `react-native-paper` library.
 *
 * The navigation bar is rendered only if the user is authenticated. If the
 * user is not authenticated, the navigation bar is replaced with a login
 * screen.
 *
 * @returns {React.ReactElement} A JSX element representing the Nav component.
 */
export default function Nav() {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    /**
     * Checks if the user is authenticated.
     *
     * This function checks if the "accessToken" key is set in the AsyncStorage.
     * If the key is set, it means the user is authenticated, so it sets the
     * `isAuthenticated` state to `true`.
     *
     * @returns {void}
     */
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {}
    };
    checkAuthentication();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      activeColor={theme.colors.outline}
      inactiveColor={theme.colors.outline}
      barStyle={{ backgroundColor: theme.colors.secondary }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
