import { useTheme, TextInput } from "react-native-paper";
import { TextField } from "../components/Textfield";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { Button } from "../components/Button";
import { User, registerUser } from "../service/UserService";

/**
 * This component renders the Register screen.
 *
 * The Register screen takes a `navigation` prop, which is expected to be an
 * instance of the `Stack.Navigator` component from the `@react-navigation/stack`
 * library. The `navigation` prop is used to navigate between screens.
 *
 * The Register screen renders a form with fields for first name, last name,
 * email, birthday, and password. It also renders a "Register Now" button that,
 * when pressed, calls the `registerUser` function from the
 * `../service/UserService` module with the values of the form fields as its
 * argument. If the `registerUser` function resolves without error, the
 * `navigation` prop is used to navigate to the "Login" screen.
 *
 * The Register screen also renders a footer with a link to the "Login" screen.
 * The footer is styled with the `styles.footer` and `styles.linkText` styles.
 */
export function Register({ navigation }) {
  const handleRegister = async () => {
    try {
      const credentials: User = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        birthday: birthday,
        password: password,
      };
      const response = await registerUser(credentials);
    } catch (error) {}
    navigation.navigate("Login");
  };

  const theme = useTheme();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ backgroundColor: theme.colors.onSurface }}>
        <TextField
          label={"Firstname"}
          value={firstname}
          onChangeText={setFirstname}
          placeholder="Enter your first name"
          pattern={/^[A-Za-z\s'-]+$/}
          errorText={"Only letters are allowed"}
        />
        <TextField
          label={"Lastname"}
          value={lastname}
          onChangeText={setLastname}
          placeholder="Enter your last name"
          pattern={/^[A-Za-z\s'-]+$/}
          errorText={"Only letters are allowed"}
        />
        <TextField
          label={"E-mail"}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
          errorText={"Enter a valid email address"}
        />
        <TextField
          label={"Birthday"}
          value={birthday}
          onChangeText={setBirthday}
          placeholder="MM/DD/YYYY"
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
          title={"Register Now"}
          style={styles.registerButton}
          onPress={handleRegister}
        />
        <View style={styles.footer}>
          <Text
            style={[styles.footerText, { color: theme.colors.onBackground }]}
          >
            Have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>
              sign in
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
  registerButton: {
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
