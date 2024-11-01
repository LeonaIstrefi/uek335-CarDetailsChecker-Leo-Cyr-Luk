import { StatusBar } from 'expo-status-bar';
import Nav from './components/NavBar';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {darkTheme, lightTheme} from "./theme";
import {PaperProvider, Button, Text} from "react-native-paper";


export default function App() {
  const currentTheme = useColorScheme();
  const theme = currentTheme  === 'dark' ? darkTheme : lightTheme;

  return (
      <PaperProvider theme={theme}>
       <Nav></Nav>
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
