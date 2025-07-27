import { useEffect, useState } from "react";
import {
    DeviceEventEmitter,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSettings } from "../app/settings";
import CounterUI from "./CounterUI";
import SliderDisplay from "./SliderDisplay";

interface CounterProps {
    style?: ViewStyle;
    flip?: boolean;
    player?: number;
}

export default function Counter({
    style,
    flip = false,
    player = 1,
}: CounterProps) {
    const { settings } = useSettings();
    const [count, setCount] = useState(settings.startingPoints);
    const offset = useSharedValue(0);
    const [offsetIncrement, setOffsetIncrement] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            left: offset.value,
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            fontSize: 60 + Math.abs(offset.value / 8),
        };
    });

    useEffect(() => {
        const handleCounterReset = () => {
            setCount(settings.startingPoints);
        };

        // Add event listener
        const subscription = DeviceEventEmitter.addListener(
            "counterReset",
            handleCounterReset,
        );

        // Cleanup subscription on unmount
        return () => {
            subscription.remove();
        };
    }, [settings.startingPoints]);

    const p1_colors = ["#A2264B", "#D3212D", "#F62D2D"] as const;
    const p2_colors = ["#A2264B", "#722B6A", "#412F88"] as const;

    return (
        <View
            style={[
                styles.container,
                style,
                { transform: [{ rotate: flip ? "180deg" : "0deg" }] },
            ]}
        >
            <SliderDisplay
                colors={player === 1 ? p1_colors : p2_colors}
                displayValue={offsetIncrement}
                style={{
                    paddingBottom: "10%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            />
            <CounterUI
                count={count}
                animatedStyle={animatedStyle}
                animatedTextStyle={animatedTextStyle}
                offsetIncrement={offsetIncrement}
                setOffsetIncrement={setOffsetIncrement}
                setCount={setCount}
                offset={offset}
                flip={flip}
                isSwiping={isSwiping}
                setIsSwiping={setIsSwiping}
                player={player}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        margin: 0,
        backgroundColor: "red",
    },
});
