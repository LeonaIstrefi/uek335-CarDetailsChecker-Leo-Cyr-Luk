import React from 'react';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface CustomTextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const TextField: React.FC<CustomTextInputProps> = ({ label, value, onChangeText, placeholder }) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <PaperTextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                mode="outlined"
                style={[styles.textInput, { borderColor: theme.colors.outline }, {backgroundColor: theme.colors.secondary}]}
                outlineColor={theme.colors.secondary}
                activeOutlineColor={theme.colors.primary}
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
        borderRadius: 8,
    },
});
