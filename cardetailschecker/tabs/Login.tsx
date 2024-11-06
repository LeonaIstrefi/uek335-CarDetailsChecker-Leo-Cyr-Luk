import { useTheme } from "react-native-paper";
import { TextField } from "../components/Textfield";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Button } from "../components/Button";
import { LoginRequest, loginUser } from "../service/UserService";
import {
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useAuth } from "../context/AuthenticationContext";

export function Login() {
  const { setIsAuthenticated } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const credentials: LoginRequest = {
        email: email,
        password: password,
      };
      const response = await loginUser(credentials);
      if (response) {
        setIsAuthenticated(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[{ backgroundColor: theme.colors.surface }]}>
        <TextField
          label={"E-mail"}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          errorText={"Enter a valid email address"}
        />
        <TextField
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          pattern={/^.{8,}$/}
          errorText={"Password must be at least 8 characters long"}
        />

        <Button
          title={"Sign in"}
          style={styles.signInButton}
          onPress={handleLogin}
        />

        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.onBackground }]}
          >
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  signInButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    marginBottom: 4,
  },
  linkText: {
    fontSize: 16,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
