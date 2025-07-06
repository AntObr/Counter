import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Counter from '../components/Counter';
import FloatingButton from '../components/FloatingButton';
import { useSettings } from './settings';

export default function App() {
    const insets = useSafeAreaInsets();
    const { settings } = useSettings();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: insets.top,
            paddingLeft: '5%',
            paddingRight: '5%',
            height: '100%',
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            {!settings.onePlayer && <Counter />}
            <Counter />
            <FloatingButton
                onPress={() => router.push('/settings')}
                imageSource={require('../assets/settings.png')}
            />
            <StatusBar style="auto" />
        </View>
    );
}

