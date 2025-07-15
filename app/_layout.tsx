import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SettingsProvider } from "./settings";

export default function AppWrapper() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SettingsProvider>
                <SafeAreaProvider>
                    <Stack>
                        <Stack.Screen
                            name="index"
                            options={{ title: "Home", headerShown: false }}
                        />
                        <Stack.Screen
                            name="settings"
                            options={{ title: "Settings", headerShown: true }}
                        />
                    </Stack>
                </SafeAreaProvider>
            </SettingsProvider>
        </GestureHandlerRootView>
    );
}
