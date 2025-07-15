import {
    Gesture,
    type GestureStateChangeEvent,
    type GestureUpdateEvent,
    type PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

type SwipeGestureProps = {
    handleSwipeBegin: () => void;
    handleSwipeChange: (
        event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
    ) => void;
    handleSwipeEnd: (
        event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
    ) => void;
};

export const SwipeGesture = ({
    handleSwipeBegin,
    handleSwipeChange,
    handleSwipeEnd,
}: SwipeGestureProps) => {
    return Gesture.Pan()
        .onBegin(() => {
            runOnJS(handleSwipeBegin)();
        })
        .onUpdate(
            (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
                runOnJS(handleSwipeChange)(event);
            },
        )
        .onEnd(
            (event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
                runOnJS(handleSwipeEnd)(event);
            },
        )
};
