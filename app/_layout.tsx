import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { SettingsProvider } from './settings';

export default function AppWrapper() {
    return (
        <SettingsProvider>
            <SafeAreaProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="settings" options={{ headerShown: false }} />
                </Stack>
            </SafeAreaProvider>
        </SettingsProvider>
    );
}