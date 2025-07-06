import { Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from "react-native";

interface FloatingButtonProps {
    onPress: () => void;
    imageSource: ImageSourcePropType;
}

export default function FloatingButton({ onPress, imageSource }: FloatingButtonProps) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        backgroundColor: 'lightgray',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30, // Distance from bottom - adjust this value
        right: 30,
        borderRadius: 30,
        fontSize: 40,
        fontWeight: 'bold',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        width: 30,
        height: 30,
    },
});