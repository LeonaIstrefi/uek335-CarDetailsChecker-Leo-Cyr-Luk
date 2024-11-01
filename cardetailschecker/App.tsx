import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './components/NavBar';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      
        <Nav></Nav>
     </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
