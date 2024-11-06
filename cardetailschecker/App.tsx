import {StyleSheet, useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from "./theme";
import {PaperProvider} from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import Nav from "./components/NavBar";
import {Login} from "./tabs/Login";
import {Register} from "./tabs/Register";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {useState} from "react";


const Stack = createStackNavigator();


export default function App() {
    const currentTheme = useColorScheme();
    const theme = currentTheme === 'dark' ? darkTheme : lightTheme;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <PaperProvider theme={theme}>

            {!isAuthenticated ? (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Login"}>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                </Stack.Navigator>
            </NavigationContainer>
            ):<Nav></Nav>}
        </PaperProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
