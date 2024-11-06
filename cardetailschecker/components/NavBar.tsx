import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from "react-native-paper";
import {Login} from "../tabs/Login";
import {Register} from "../tabs/Register";
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

function Homepage() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Homepage!</Text>
        </View>
    );
}

function Overview() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Overview</Text>
        </View>
    );
}

function Profile() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Profile</Text>
        </View>
    );
}


const Tab = createMaterialBottomTabNavigator();

const Stack = createStackNavigator();

export default function Nav() {
    const theme = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (token) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Failed to retrieve token:", error);
            }
        };
        checkAuthentication();
    }, []);


    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={"Home"}
                activeColor={theme.colors.outline}
                inactiveColor={theme.colors.outline}
                barStyle={{backgroundColor: theme.colors.secondary}}
            >
                <Tab.Screen
                    name="Home"
                    component={Homepage}
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="home" color={color} size={24}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Overview"
                    component={Overview}
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="car" color={color} size={24}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="account-outline" color={color} size={24}/>
                        ),
                    }}
                />
            </Tab.Navigator>


        </NavigationContainer>
    );
}
