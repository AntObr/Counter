import { LinearGradient } from "expo-linear-gradient";
import { type ColorValue, StyleSheet } from "react-native";

interface BackgroundGradientProps {
    colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
    locations: readonly [number, number, ...number[]];
    flip?: boolean;
}

export default function BackgroundGradient({
    colors,
    locations,
    flip = false,
}: BackgroundGradientProps) {
    return (
        <LinearGradient
            colors={colors}
            locations={locations}
            style={[
                styles.gradient,
                { transform: [{ rotate: flip ? "180deg" : "0deg" }] },
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
