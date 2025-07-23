import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import {
    DeviceEventEmitter,
    Image,
    StyleSheet,
    Text,
    View,
    type ViewStyle,
} from "react-native";
import {
    GestureDetector,
    type GestureStateChangeEvent,
    type GestureUpdateEvent,
    type PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { useSettings } from "../app/settings";
import { SwipeGesture, TapGesture } from "../gestures";
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

    const leftSwipeGesture = SwipeGesture({
        handleSwipeBegin: () => {
            setIsSwiping(true);
        },
        handleSwipeChange: (
            event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
        ) => {
            const translationX = flip
                ? -Math.round(event.translationX)
                : Math.round(event.translationX);
            if (translationX < 0) {
                offset.value = 0;
            } else {
                offset.value = translationX;
            }
            if (offsetIncrement !== Math.round(offset.value / 10)) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
            }
            setOffsetIncrement(Math.round(offset.value / 10));
        },
        handleSwipeEnd: (
            _event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
        ) => {
            offset.value = 0;
            setOffsetIncrement(0);
            setCount(count - offsetIncrement);
            setIsSwiping(false);
        },
    });

    const leftTapGesture = TapGesture({
        handleTapBegin: () => {
            if (!isSwiping) {
                setCount(count + 1);
            }
        },
    });

    const rightSwipeGesture = SwipeGesture({
        handleSwipeBegin: () => {
            setIsSwiping(true);
        },
        handleSwipeChange: (
            event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
        ) => {
            const translationX = flip
                ? -Math.round(event.translationX)
                : Math.round(event.translationX);
            if (translationX > 0) {
                offset.value = 0;
            } else {
                offset.value = translationX;
            }
            if (offsetIncrement !== -Math.round(offset.value / 10)) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
            }
            setOffsetIncrement(-Math.round(offset.value / 10));
        },
        handleSwipeEnd: (
            _event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
        ) => {
            offset.value = 0;
            setOffsetIncrement(0);
            setCount(count + offsetIncrement);
            setIsSwiping(false);
        },
    });

    const rightTapGesture = TapGesture({
        handleTapBegin: () => {
            if (!isSwiping) {
                setCount(count + 1);
            }
        },
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
            <View style={styles.bottomContainer}>
                <BackgroundGradient
                    colors={player === 1 ? p1_colors : p2_colors}
                    locations={[0, 0.66, 1]}
                />
                <View style={styles.offsetContainer}>
                    <View style={styles.offsetLeft}>
                        <Text
                            style={styles.offsetLeftText}
                        >
                            {offsetIncrement}
                        </Text>
                    </View>
                    <View style={styles.offsetRight}>
                        <Text
                            style={styles.offsetRightText}
                        >
                            {offsetIncrement}
                        </Text>
                    </View>
                </View>
            </View>
            <Animated.View style={[styles.topContainer, animatedStyle]}>
                <BackgroundGradient
                    colors={player === 1 ? p1_colors : p2_colors}
                    locations={[0, 0.66, 1]}
                    style={{
                        left: -1,
                        right: -1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: "white",
                    }}
                />
                <View style={styles.counterContainer}>
                    <Text style={styles.count}>{count}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <GestureDetector gesture={leftTapGesture}>
                        <View style={[styles.buttonLeft, styles.button]}>
                            <Animated.Text
                                style={[
                                    styles.buttonLeftText,
                                    animatedTextStyle,
                                ]}
                            >
                                -
                            </Animated.Text>
                        </View>
                    </GestureDetector>
                    <GestureDetector gesture={rightTapGesture}>
                        <View style={[styles.buttonRight, styles.button]}>
                            <Animated.Text
                                style={[
                                    styles.buttonRightText,
                                    animatedTextStyle,
                                ]}
                            >
                                +
                            </Animated.Text>
                        </View>
                    </GestureDetector>
                    <GestureDetector gesture={leftSwipeGesture}>
                        <View style={[styles.slider]}>
                            <Image
                                source={require("../assets/icons/right_pointing_arrow.png")}
                                style={styles.sliderImage}
                            />
                        </View>
                    </GestureDetector>
                    <GestureDetector gesture={rightSwipeGesture}>
                        <View style={[styles.slider]}>
                            <Image
                                source={require("../assets/icons/left_pointing_arrow.png")}
                                style={styles.sliderImage}
                            />
                        </View>
                    </GestureDetector>
                </View>
            </Animated.View>
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
    topContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
    },
    bottomContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
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
        paddingBottom: "10%",
        margin: 0,
    },
    
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
    },
    button: {
        width: "50%",
        height: "70%",
        paddingTop: "20%",
    },
    slider: {
        width: "50%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        // borderTopWidth: 1,
        paddingBottom: "15%",
    },
    sliderImage: {
        width: 100,
        resizeMode: "contain",
    },
    offsetContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        paddingBottom: "10%",
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
    buttonLeftText: {
        fontSize: 60,
        textAlign: "center",
        padding: 0,
        margin: 0,
    },
    buttonRightText: {
        fontSize: 60,
        textAlign: "center",
        padding: 0,
        margin: 0,
    },
    buttonLeft: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
        paddingLeft: 20,
        margin: 0,
    },
    buttonRight: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 0,
        paddingRight: 20,
        margin: 0,
    },
    floatingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    floatingText: {
        fontSize: 100,
        textAlign: "center",
        padding: 0,
        margin: 0,
    },
});
