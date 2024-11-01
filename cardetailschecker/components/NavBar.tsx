import * as React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from "react-native-paper";
import Profile from '../tabs/Profile';


function Homepage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Homepage!</Text>
    </View>
  );
}

function Overview() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Overview</Text>
    </View>
  );
}


const Tab = createMaterialBottomTabNavigator();

export default function Nav() {
    const theme = useTheme()
  return (

    <NavigationContainer>
        <Tab.Navigator
            activeColor={theme.colors.outline}
            inactiveColor={theme.colors.outline}
            barStyle={{ backgroundColor: theme.colors.secondary}}
        >
        <Tab.Screen
          name="Home"
          component={Homepage}
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
              <MaterialIcons name="directions-car" size={24} color={theme.colors.outline} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={24} color={theme.colors.outline} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
