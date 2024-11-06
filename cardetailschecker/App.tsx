import { StyleSheet, useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from "./theme";
import { PaperProvider } from "react-native-paper";
import {createStackNavigator} from "@react-navigation/stack";
import Nav from "./components/NavBar";


const Stack = createStackNavigator();


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
