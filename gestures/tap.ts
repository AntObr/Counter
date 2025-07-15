import { Gesture } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

type TapGestureProps = {
    handleTapBegin: () => void;
};

export const TapGesture = ({ handleTapBegin }: TapGestureProps) => {
    return Gesture.Tap().onBegin(() => {
        runOnJS(handleTapBegin)();
    });
};
