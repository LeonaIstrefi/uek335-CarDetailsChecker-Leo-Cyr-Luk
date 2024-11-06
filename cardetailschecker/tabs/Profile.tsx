import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextField } from '../components/Textfield';
import { Button } from '../components/Button';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import { getCurrentUser, loginUser, putUser, cancelPutUser } from '../service/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile() {
  const [originalFirstName, setOriginalFirstName] = React.useState('');
  const [originalLastName, setOriginalLastName] = React.useState('');
  const [originalBirthday, setOriginalBirthday] = React.useState('');
  const [originalEmail, setOriginalEmail] = React.useState('');

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [email, setEmail] = React.useState('');

  const theme = useTheme();
  const navigation = useNavigation();

  const loadProfileData = async () => {
    try {
      await loginUser({
        email: 'olivier@mail.com',
        password: 'bestPassw0rd',
      });
  
      const id = await AsyncStorage.getItem("id");
      console.log('User ID from AsyncStorage:', id);
  
      if (!id) {
        throw new Error("No user ID found in AsyncStorage");
      }
  
      const response = await getCurrentUser();
      const rawResponse = response.request._response;
      console.log('Raw response:', rawResponse);
  
      const parsedData = JSON.parse(rawResponse);
      console.log('Parsed user data:', parsedData);
  
     
      if (parsedData) {
        setOriginalFirstName(parsedData.firstname || '');
        setOriginalLastName(parsedData.lastname || '');
        setOriginalBirthday(parsedData.birthday || '');
        setOriginalEmail(parsedData.email || '');
  
        setFirstName(parsedData.firstname || '');
        setLastName(parsedData.lastname || '');
        setBirthday(parsedData.birthday || '');
        setEmail(parsedData.email || '');
      } else {
        console.error('No user data returned after parsing');
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };
  
  
  
  
  const handleSave = async () => {
    try {
      await putUser({
        firstname: firstName,
        lastname: lastName,
        email: email,
        birthday: birthday,
        password: '', 
      });
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    setBirthday(originalBirthday);
    setEmail(originalEmail);
    cancelPutUser();
  };

  React.useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <MaterialIcons name="account-circle" size={100} color={theme.colors.surface} />
          <Button title="Log Out" onPress={() => navigation.navigate('../tabs/Login')} />
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

          <DatePicker />

          <TextField
            label="E-Mail"
            value={email}
            onChangeText={setEmail}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
