import {
    Image,
    type ImageSourcePropType,
    StyleSheet,
    View,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

interface SlideInputProps {
    gesture: any;
    imageSource: ImageSourcePropType;
    style?: any;
}

export default function SlideInput({
    gesture,
    imageSource,
    style,
}: SlideInputProps) {
    return (
        <GestureDetector gesture={gesture}>
            <View style={[styles.slider, style]}>
                <Image source={imageSource} style={styles.sliderImage} />
            </View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    slider: {
        width: "50%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "15%",
    },
    sliderImage: {
        width: 100,
        resizeMode: "contain",
    },
});
