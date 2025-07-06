import { Button, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../app/settings";
import { useState } from "react";

export default function Counter() {
    const { settings } = useSettings();
    const [count, setCount] = useState(settings.startingPoints);

    return (
        <View style={styles.container}>
            <Text style={styles.count}>{count}</Text>
            <View style={styles.buttonContainer}>
                <Button title="-" onPress={() => setCount(count - 1)} />
                <Button title="+" onPress={() => setCount(count + 1)} />
            </View>
            <Button title="Reset" onPress={() => setCount(settings.startingPoints)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    count: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});