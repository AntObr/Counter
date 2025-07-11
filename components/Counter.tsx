import { useEffect, useState } from "react";
import {
    DeviceEventEmitter,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    type ViewStyle,
} from "react-native";
import { useSettings } from "../app/settings";
import BackgroundGradient from "./BackgroundGradient";

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
            <BackgroundGradient
                colors={player === 1 ? p1_colors : p2_colors}
                locations={[0, 0.66, 1]}
            />
            <View style={styles.counterContainer}>
                <Text style={styles.count}>{count}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonLeft}
                    onPress={() => setCount(count - 1)}
                >
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonRight}
                    onPress={() => setCount(count + 1)}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
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
    },
    counterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
    },
    count: {
        fontSize: 100,
        textAlign: "center",
        padding: 0,
        margin: 0,
    },
    buttonContainer: {
        flexDirection: "row",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
    },
    buttonText: {
        fontSize: 60,
        textAlign: "center",
        padding: 0,
        margin: 0,
    },
    buttonLeft: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
        paddingLeft: 20,
        margin: 0,
    },
    buttonRight: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 0,
        paddingRight: 20,
        margin: 0,
    },
});
