import {
    Image,
    type ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    type ViewStyle,
} from "react-native";

interface FloatingButtonProps {
    text?: string;
    onPress: () => void;
    imageSource?: ImageSourcePropType;
    style: ViewStyle;
}

export default function FloatingButton({
    text,
    onPress,
    imageSource,
    style,
}: FloatingButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, style]}
            onPress={onPress}
        >
            {text && <Text style={styles.text}>{text}</Text>}
            {imageSource && <Image source={imageSource} style={styles.image} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonContainer: {
        backgroundColor: "lightgray",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 30,
        fontSize: 40,
        fontWeight: "bold",
        elevation: 5, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderColor: "black",
        borderWidth: 2,
    },
    image: {
        width: 30,
        height: 30,
    },
});
