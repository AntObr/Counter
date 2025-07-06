import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { SettingsProvider } from './settings';

export default function AppWrapper() {
    return (
        <SettingsProvider>
            <SafeAreaProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
                    <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: true }} />
                </Stack>
            </SafeAreaProvider>
        </SettingsProvider>
    );
}