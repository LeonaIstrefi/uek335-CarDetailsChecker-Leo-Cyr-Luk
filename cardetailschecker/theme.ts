import { DefaultTheme, MD3DarkTheme } from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    outline: "#151712", //Also text color MD3 does not support text
    background: "#eff0eb",
    primary: "#484d3d",
    secondary: "#9eb3a4",
    surface: "#627a70", //Also text color MD3 does not support accent
    secondaryContainer: "#627a70",
    onSurface: "rgba(98,122,112,0.25)",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    outline: "#ebede8", //Also text color MD3 does not support text
    background: "#13140f",
    primary: "#bdc2b2",
    secondary: "#4c6152",
    surface: "#859d93", //Also text color MD3 does not support accent
  },
};
