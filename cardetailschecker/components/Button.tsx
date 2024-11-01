import React from 'react';
import {Button as MyButton, useTheme} from 'react-native-paper';

interface MyButtonProps {
    title: string;
    onPress: () => void;
}

export const Button: React.FC<MyButtonProps> = ({ title, onPress }) => {
    const theme = useTheme();
    return (
        <MyButton
            mode="contained"
            onPress={onPress}
            style={{backgroundColor: theme.colors.secondary}}
            labelStyle={{color: theme.colors.onSecondary}}
        >{title}
        </MyButton>
    );
}