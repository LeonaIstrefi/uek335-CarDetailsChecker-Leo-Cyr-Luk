import React from "react";
import { View, StyleSheet } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { lightTheme } from "../theme";

/**
 * Converts a date string in 'YYYY-MM-DD' format to a Date object.
 *
 * @param {string} date The date string in 'YYYY-MM-DD' format.
 * @returns {Date} The corresponding Date object.
 */
const dateToDatePicker = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Converts a Date object to a string in 'YYYY-MM-DD' format.
 *
 * @param {Date} date The Date object to convert.
 * @returns {string} The date as a string in 'YYYY-MM-DD' format.
 */
const datePickerToDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
};

/**
 * A date picker component that accepts a date string in 'YYYY-MM-DD' format,
 * and emits a date string in the same format when the user selects a date.
 *
 * This component uses the react-native-paper-dates library to render the date
 * picker.
 *
 * @param {string} value The initial date string value. If not provided, the
 * current date will be used.
 * @param {function} onChange The function to call when the user selects a date.
 * The function will receive the selected date as a string in 'YYYY-MM-DD'
 * format.
 *
 * @returns A JSX element representing the date picker component.
 */
export default function DatePicker({ value, onChange }) {
  const [internalValue, setInternalValue] = React.useState(
    value ? dateToDatePicker(value) : new Date()
  );

  /**
   * Handle the change event emitted by the date picker.
   *
   * If the selected date is undefined, do nothing. Otherwise, update the
   * internal state with the selected date, and emit the selected date as a
   * string in 'YYYY-MM-DD' format to the onChange callback.
   *
   * @param {Date | undefined} date The selected date, or undefined if the
   * user cancelled the date picker.
   * @returns {void}
   */
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
