import { TextInput as PaperTextInput, useTheme } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  pattern?: RegExp;
  errorText?: string;
  keyboardType?: KeyboardTypeOptions;
}

export const TextField: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  pattern,
  errorText,
}) => {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTextChange = (text: string) => {
    onChangeText(text);
    if (pattern) {
      if (!pattern.test(text)) {
        setErrorMessage(errorText || "Invalid input");
      } else {
        setErrorMessage(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        mode="flat"
        style={[
          styles.textInput,
          { borderColor: theme.colors.background },
          { backgroundColor: theme.colors.secondary },
        ]}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
        textColor={theme.colors.surface}
        keyboardType={keyboardType ? keyboardType : "default"}
        placeholderTextColor={theme.colors.outline}
      />
      {errorMessage ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    paddingHorizontal: 16,
    height: 50,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
