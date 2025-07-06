import React, { createContext, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Settings = {
    theme: 'light' | 'dark';
    notifications: boolean;
    soundEnabled: boolean;
};

type SettingsContextType = {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>({
        theme: 'light',
        notifications: true,
        soundEnabled: false,
    });

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const { settings, updateSettings } = useSettings();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: insets.top,
            paddingLeft: '5%',
            paddingRight: '5%',
        },
    });

    return (
        <View style={styles.container}>
            <Text>Settings</Text>
            <Text>Theme: {settings.theme}</Text>
            <Text>Notifications: {settings.notifications ? 'Enabled' : 'Disabled'}</Text>
            <Text>Sound: {settings.soundEnabled ? 'Enabled' : 'Disabled'}</Text>
            <Button title="Home" onPress={() => router.push('/')} />
        </View>
    );
}