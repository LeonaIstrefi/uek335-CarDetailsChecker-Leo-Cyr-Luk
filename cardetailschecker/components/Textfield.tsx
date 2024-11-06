import React from "react";
import { TextInput as PaperTextInput, useTheme } from "react-native-paper";
import { KeyboardTypeOptions, StyleSheet, View } from "react-native";

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

export const TextField: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
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
});
