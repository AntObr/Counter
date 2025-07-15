import { LinearGradient } from "expo-linear-gradient";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    type ViewStyle,
} from "react-native";

interface BackgroundGradientProps {
    colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
    locations: readonly [number, number, ...number[]];
    flip?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function BackgroundGradient({
    colors,
    locations,
    flip = false,
    style,
}: BackgroundGradientProps) {
    return (
        <LinearGradient
            colors={colors}
            locations={locations}
            style={[
                styles.gradient,
                { transform: [{ rotate: flip ? "180deg" : "0deg" }] },
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
