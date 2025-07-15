import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Counter from "../components/Counter";
import Menu from "../components/Menu";
import { useSettings } from "./settings";

export default function App() {
    const { settings } = useSettings();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            height: "100%",
            width: "100%",
        },
    });

    return (
        // <GestureHandlerRootView>
        <View style={styles.container}>
            {!settings.onePlayer && <Counter flip={true} player={2} />}
            <Counter player={1} />
            <Menu />
            <StatusBar style="auto" />
        </View>
        // </GestureHandlerRootView>
    );
}
