import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextField } from '../components/Textfield';
import { Button } from '../components/Button';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';

function Profile() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [birthday, setBirthday] = React.useState('');
  const [email, setEmail] = React.useState('');
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <MaterialIcons name="account-circle" size={100} color={theme.colors.surface} />
          <Button title="Log Out" onPress={() => navigation.navigate('Login')} />
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

          <DatePicker
            value={birthday}
            onChangeText={setBirthday}
          />
          
          <TextField
            label="E-Mail"
            value={email}
            onChangeText={setEmail}
            
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => {}} />
          <Button title="Save" onPress={() => {}} />
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
    marginBottom: 90,
    
    
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
