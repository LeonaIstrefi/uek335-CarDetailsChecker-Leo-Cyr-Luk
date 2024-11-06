import * as React from "react";
import { Text, useColorScheme, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";
import Overview from "../tabs/Overview";
import Profile from "../tabs/Profile";
import Home from "../tabs/Home";

const Tab = createMaterialBottomTabNavigator();

export default function Nav() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor={theme.colors.outline}
        inactiveColor={theme.colors.outline}
        barStyle={{ backgroundColor: theme.colors.secondary }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Overview"
          component={Overview}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="directions-car"
                size={24}
                color={theme.colors.outline}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="person"
                size={24}
                color={theme.colors.outline}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
