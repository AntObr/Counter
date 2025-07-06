import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSettings } from "../app/settings";
import { useState } from "react";
import FloatingButton from "./FloatingButton";

export default function Counter() {
    const { settings } = useSettings();
    const [count, setCount] = useState(settings.startingPoints);

    return (
        <View style={styles.container}>
            <View style={styles.counterContainer}>
                <Text style={styles.count}>{count}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => setCount(count - 1)}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRight} onPress={() => setCount(count + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FloatingButton
                text="Reset"
                onPress={() => setCount(settings.startingPoints)}
                style={{
                    bottom: 30,
                    right: '50%',
                    transform: [{ translateX: 30 }],
                }}
            />
            {/* <Button title="Reset" onPress={() => setCount(settings.startingPoints)} /> */}
        </View >
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
        padding: 0,
        margin: 0,
    },
    counterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        padding: 0,
        margin: 0,
    },
    count: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 0,
        margin: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        padding: 0,
        margin: 0,
    },
    buttonText: {
        fontSize: 60,
        textAlign: 'center',
        padding: 0,
        margin: 0,
    },
    buttonLeft: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 0,
        paddingLeft: 20,
        margin: 0,
    },
    buttonRight: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 0,
        paddingRight: 20,
        margin: 0,
    },
});