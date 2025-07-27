import * as Haptics from "expo-haptics";
import {
    type StyleProp,
    StyleSheet,
    Text,
    type TextStyle,
    View,
    type ViewStyle,
} from "react-native";
import {
    GestureDetector,
    type GestureStateChangeEvent,
    type GestureUpdateEvent,
    type PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, { type SharedValue } from "react-native-reanimated";
import { SwipeGesture, TapGesture } from "../gestures";
import BackgroundGradient from "./BackgroundGradient";
import SlideInput from "./SlideInput";

interface CounterUIProps {
    count: number;
    animatedStyle: StyleProp<ViewStyle>;
    animatedTextStyle: StyleProp<TextStyle>;
    offsetIncrement: number;
    setOffsetIncrement: (value: number) => void;
    setCount: (value: number | ((prev: number) => number)) => void;
    offset: SharedValue<number>;
    flip: boolean;
    isSwiping: boolean;
    setIsSwiping: (value: boolean) => void;
    player: number;
    style?: ViewStyle;
}

export default function CounterUI({
    count,
    animatedStyle,
    animatedTextStyle,
    offsetIncrement,
    setOffsetIncrement,
    setCount,
    offset,
    flip,
    isSwiping,
    setIsSwiping,
    player,
    style,
}: CounterUIProps) {
    const p1_colors = ["#A2264B", "#D3212D", "#F62D2D"] as const;
    const p2_colors = ["#A2264B", "#722B6A", "#412F88"] as const;

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
            const finalOffsetIncrement = Math.round(offset.value / 10);
            offset.value = 0;
            setOffsetIncrement(0);
            setCount(count - finalOffsetIncrement);
            setIsSwiping(false);
        },
    });

    const leftTapGesture = TapGesture({
        handleTapBegin: () => {
            if (!isSwiping) {
                setCount(count - 1);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
            const finalOffsetIncrement = -Math.round(offset.value / 10);
            offset.value = 0;
            setOffsetIncrement(0);
            setCount(count + finalOffsetIncrement);
            setIsSwiping(false);
        },
    });

    const rightTapGesture = TapGesture({
        handleTapBegin: () => {
            if (!isSwiping) {
                setCount(count + 1);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
        },
    });

    return (
        <Animated.View style={[styles.topContainer, animatedStyle, style]}>
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
                            style={[styles.buttonLeftText, animatedTextStyle]}
                        >
                            -
                        </Animated.Text>
                    </View>
                </GestureDetector>
                <GestureDetector gesture={rightTapGesture}>
                    <View style={[styles.buttonRight, styles.button]}>
                        <Animated.Text
                            style={[styles.buttonRightText, animatedTextStyle]}
                        >
                            +
                        </Animated.Text>
                    </View>
                </GestureDetector>
                <SlideInput
                    gesture={leftSwipeGesture}
                    imageSource={require("../assets/icons/right_pointing_arrow.png")}
                />
                <SlideInput
                    gesture={rightSwipeGesture}
                    imageSource={require("../assets/icons/left_pointing_arrow.png")}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
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
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 0,
        paddingLeft: 20,
        margin: 0,
    },
    buttonRight: {
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 0,
        paddingRight: 20,
        margin: 0,
    },
});
