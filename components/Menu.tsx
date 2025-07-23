import { router } from "expo-router";
import {
    DeviceEventEmitter,
    Dimensions,
    Image,
    type ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSettings } from "../app/settings";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width:
            Dimensions.get("window").width +
            Dimensions.get("window").height * 0.1,
        height: Dimensions.get("window").height * 0.1,
        position: "absolute",
        top:
            Dimensions.get("window").height * 0.5 -
            (Dimensions.get("window").height * 0.1) / 2,
        left: -(Dimensions.get("window").height * 0.1) / 2,
        zIndex: 1000,
        backgroundColor: "transparent",
        pointerEvents: "box-none",
    },
    singlePlayerContainer: {
        top:
            Dimensions.get("window").height * 0.25 -
            (Dimensions.get("window").height * 0.1) / 2,
        paddingHorizontal: Dimensions.get("window").width * 0.3,
    },
    item: {
        backgroundColor: "transparent",
        borderRadius: 1000000,
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        zIndex: 1000,
    },
    image: {
        height: "100%",
        aspectRatio: 1,
        resizeMode: "contain",
    },
    gradient: {
        position: "absolute",
        top: -10,
        left: 0,
        right: 0,
        bottom: -10,
    },
    horizontalLine: {
        width:
            Dimensions.get("window").width -
            Dimensions.get("window").height * 0.1,
        height: 2,
        backgroundColor: "black",
        position: "absolute",
        left: Dimensions.get("window").height * 0.1,
    },
});

export default function Menu() {
    const { settings } = useSettings();

    return (
        <View
            style={[
                styles.container,
                settings.onePlayer ? styles.singlePlayerContainer : {},
            ]}
        >
            <MenuItem
                onPress={() => DeviceEventEmitter.emit("counterReset")}
                imageSource={require("../assets/icons/reset.png")}
            />
            <MenuItem
                onPress={() => router.push("/settings")}
                imageSource={require("../assets/icons/settings.png")}
            />
            {!settings.onePlayer && <HorizontalLine />}
        </View>
    );
}

function MenuItem({
    text,
    onPress,
    imageSource,
}: {
    text?: string;
    onPress: () => void;
    imageSource?: ImageSourcePropType;
}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            {imageSource && <Image source={imageSource} style={styles.image} />}
            {text && <Text>{text}</Text>}
        </TouchableOpacity>
    );
}

function HorizontalLine() {
    return <View style={styles.horizontalLine} />;
}
