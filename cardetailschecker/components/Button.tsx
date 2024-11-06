import React from 'react';
import {Button as MyButton, useTheme} from 'react-native-paper';
import {StyleProp, TextStyle, ViewStyle} from "react-native";

interface MyButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<MyButtonProps> = ({ title, onPress, style, labelStyle }) => {
    const theme = useTheme();
    return (
        <MyButton
            mode="contained"
            onPress={onPress}
            style={[{backgroundColor: theme.colors.secondary}, style]}
            labelStyle={[{color: theme.colors.outline}, labelStyle]}
        >{title}
        </MyButton>
    );
}