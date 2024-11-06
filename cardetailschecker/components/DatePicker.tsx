import React from "react";
import { View, StyleSheet } from "react-native";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { lightTheme } from "../theme";


export default function DatePicker() {
  const [inputDate, setInputDate] = React.useState(undefined);

  return (
    <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 0, alignItems: 'center', marginTop: 40 }}>
        <DatePickerInput
          locale="en"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
          style={styles.inputStyle}
          iconStyle={styles.iconCircle}
        />
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: lightTheme.colors.secondary,  
    borderWidth: 4,
    borderRadius: 7,
    backgroundColor: lightTheme.colors.background, 
  }, 
  iconCircle: {
    borderRadius: 50,
    backgroundColor: lightTheme.colors.secondary,
    
  }
});
