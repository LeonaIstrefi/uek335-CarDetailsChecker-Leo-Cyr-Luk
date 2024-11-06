import React from "react";
import { View, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { lightTheme } from "../theme";

// Convert the date string 'YYYY-MM-DD' to a Date object
const dateToDatePicker = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Convert a Date object to 'YYYY-MM-DD' format
const datePickerToDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

export default function DatePicker({ value, onChange }) {
  const [internalValue, setInternalValue] = React.useState(
    value ? dateToDatePicker(value) : new Date()
  );

  const handleOnChange = (date: Date | undefined) => {
    if (!date) return;
    setInternalValue(date);
    onChange(datePickerToDate(date));
  };

  return (
    <SafeAreaProvider>
      <View
        style={{
          justifyContent: "center",
          flex: 0,
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <DatePickerInput
          locale="en"
          value={internalValue}
          onChange={handleOnChange}
          inputMode="start"
          style={styles.inputStyle}
          iconStyle={styles.iconCircle}
        />
      </View>
    </SafeAreaProvider>
  );
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
  },
});
