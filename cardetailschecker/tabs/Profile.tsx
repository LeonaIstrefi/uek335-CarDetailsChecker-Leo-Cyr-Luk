import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextField } from "../components/Textfield";
import { Button } from "../components/Button";
import { useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "../components/DatePicker";
import { getCurrentUser, loginUser, putUser } from "../service/UserService";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * A screen to display and edit the user's profile information.
 *
 * The information is fetched from the API and stored in the component state.
 * The user can edit the information and save it to the API.
 *
 * @function Profile
 * @returns {React.ReactElement} A JSX element representing the Profile screen.
 */
function Profile() {
  const [originalFirstName, setOriginalFirstName] = React.useState("");
  const [originalLastName, setOriginalLastName] = React.useState("");
  const [originalBirthday, setOriginalBirthday] = React.useState("");
  const [originalEmail, setOriginalEmail] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [email, setEmail] = React.useState("");

  const theme = useTheme();
  const navigation = useNavigation();

  const loadProfileData = async () => {
    try {
      const id = await AsyncStorage.getItem("id");

      if (!id) {
        throw new Error("No user ID found in AsyncStorage");
      }

      const response = await getCurrentUser();
      const rawResponse = response.request._response;

      const parsedData = JSON.parse(rawResponse);

      if (parsedData) {
        setOriginalFirstName(parsedData.firstname || "");
        setOriginalLastName(parsedData.lastname || "");
        setOriginalBirthday(parsedData.birthday || "");
        setOriginalEmail(parsedData.email || "");

        setFirstName(parsedData.firstname || "");
        setLastName(parsedData.lastname || "");
        setBirthday(parsedData.birthday || "");
        setEmail(parsedData.email || "");
      } else {
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    try {
      await putUser({
        firstname: firstName,
        lastname: lastName,
        email: email,
        birthday: birthday,
        password: "",
      });
    } catch (error) {}
  };

  const handleCancel = () => {
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    setBirthday(originalBirthday);
    setEmail(originalEmail);
  };

  React.useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <SafeAreaProvider>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <MaterialIcons
            name="account-circle"
            size={100}
            color={theme.colors.surface}
          />
          <Button
            title="Log Out"
            onPress={async () => {
              await AsyncStorage.removeItem("token");
            }}
          />
        </View>

        <View style={styles.formContainer}>
          <TextField
            label="Firstname"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextField
            label="Lastname"
            value={lastName}
            onChangeText={setLastName}
          />

          <DatePicker value={birthday} onChange={setBirthday} />

          <TextField label="E-Mail" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={handleCancel} />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    paddingHorizontal: 70,
    paddingVertical: 30,
    marginBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
