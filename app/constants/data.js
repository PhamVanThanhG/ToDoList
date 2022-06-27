import { Dimensions, StatusBar } from "react-native";
const androidHeightWithStatusBar = {
    device: Dimensions.get('screen').height,
    window: Dimensions.get('window').height,
    statusBar: StatusBar.currentHeight,
    bottomTap: Dimensions.get('screen').height - (Dimensions.get('window').height + StatusBar.currentHeight),
}
const androidWidth = {
    device: Dimensions.get('screen').width,
    window: Dimensions.get('window').width
}
const { width, height } = Dimensions.get("window");

export const SIZES = {
    // Global size
    base: 8,
    font: 14,
    radius: 15,
    padding: 24,

    // Font size
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 20,
    body4: 16,
    body5: 14,

    // App dimension
    width,
    height,
    androidHeightWithStatusBar,
    androidWidth
};


//export const appTheme = { SIZES };
