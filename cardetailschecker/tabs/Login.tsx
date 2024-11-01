import {useTheme} from "react-native-paper";
import {TextField} from "../components/Textfield";
import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Text, Alert} from "react-native";
import {Button} from "../components/Button";
import {LoginRequest, loginUser, UserResponse} from "../service/UserService";



export default function Login() {
    const handleLogin = async () => {
        try {
            const credentials: LoginRequest = {
                email: email,
                password: password,
            };
            const response= await loginUser(credentials);
            if (response) {

            }
        } catch (error) {
            console.error("hello", error);
        }
    };

    const theme = useTheme()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <View style={{backgroundColor: theme.colors.onSurface}}>
            <TextField label={"E-mail"} value={email} onChangeText={setEmail}></TextField>
            <TextField label={"Password"} value={password} onChangeText={setPassword} ></TextField>

            <Button title={"Sign in"} style={{backgroundColor: theme.colors.surface}}
                    onPress={handleLogin}></Button>
            <View style={styles.footer}>
                <Text style={[styles.footerText, { color: theme.colors.primary}]}>
                    Don’t have an account?
                </Text>
                <TouchableOpacity onPress={() => console.log("Register Now Pressed")}>
                    <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                        register here
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 24,
        },
        footer: {
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: 'center',
            marginTop: 20,
        },
        footerText: {
            fontSize: 16,
            marginBottom: 4,
        },
        linkText: {
            fontSize: 16,
            marginLeft: 4,
            textDecorationLine: "underline"
        },
    });
