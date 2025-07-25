import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    Text,
    View,
    type ViewStyle,
} from "react-native";
import BackgroundGradient from "./BackgroundGradient";

interface SliderDisplayProps {
    style?: StyleProp<ViewStyle>;
    colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
    displayValue: number;
}

export default function SliderDisplay({
    style,
    colors,
    displayValue,
}: SliderDisplayProps) {
    return (
        <View style={[styles.container, style]}>
            <BackgroundGradient colors={colors} locations={[0, 0.66, 1]} />
            <View style={styles.offsetLeft}>
                <Text style={styles.offsetLeftText}>{displayValue}</Text>
            </View>
            <View style={styles.offsetRight}>
                <Text style={styles.offsetRightText}>{displayValue}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        padding: 0,
        margin: 0,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    offsetLeft: {
        width: "50%",
        height: "100%",
        padding: 0,
        margin: 0,
        justifyContent: "center",
    },
    offsetRight: {
        width: "50%",
        height: "100%",
        padding: 0,
        margin: 0,
        justifyContent: "center",
    },
    offsetLeftText: {
        fontSize: 60,
        textAlign: "left",
        paddingLeft: 10,
        margin: 0,
    },
    offsetRightText: {
        fontSize: 60,
        textAlign: "right",
        paddingRight: 10,
        margin: 0,
    },
});
