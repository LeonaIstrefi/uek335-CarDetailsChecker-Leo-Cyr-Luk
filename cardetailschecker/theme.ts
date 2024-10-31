import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: '#151712',
        background: '#eff0eb',
        primary: '#484d3d',
        secondary: '#9eb3a4',
        accent: '#627a70',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        text: '#ebede8',
        background: '#13140f',
        primary: '#bdc2b2',
        secondary: '#4c6152',
        accent: '#859d93',
    },
};
