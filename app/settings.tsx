import React, { createContext, useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';

type Settings = {
    startingPoints: number;
    onePlayer: boolean;
    individualReset: boolean;
};

type SettingsContextType = {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>({
        startingPoints: 30,
        onePlayer: false,
        individualReset: false,
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
    const { settings, updateSettings } = useSettings();

    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>
                <Text style={styles.settingsText}>Starting Points</Text>
                <TextInput
                    style={styles.settingsInput}
                    inputMode="numeric"
                    value={settings.startingPoints.toString()}
                    onChangeText={text => updateSettings({ startingPoints: parseInt(text) || 0 })}
                />
            </View>
            <View style={styles.settingsContainer}>
                <Text style={styles.settingsText}>One Player</Text>
                <Switch
                    value={settings.onePlayer}
                    onValueChange={value => updateSettings({ onePlayer: value })}
                />
            </View>
            <View style={styles.settingsContainer}>
                <Text style={styles.settingsText}>Individual Reset</Text>
                <Switch
                    value={settings.individualReset}
                    onValueChange={value => updateSettings({ individualReset: value })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        gap: 10,
    },
    settingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    settingsText: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '50%',
    },
    settingsInput: {
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        width: '50%',
        textAlign: 'right',
    },
});