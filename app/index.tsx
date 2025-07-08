import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DeviceEventEmitter, Dimensions, StyleSheet, View } from 'react-native';
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
            height: '100%',
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            {!settings.onePlayer && <Counter
                showReset={settings.individualReset}
                style={{
                    transform: [{ rotate: '180deg' }],
                    backgroundColor: 'red',
                    borderColor: 'red',
                }}
            />}
            <Counter
                showReset={settings.individualReset}
                style={{
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                }}
            />
            <FloatingButton
                onPress={() => router.push('/settings')}
                imageSource={require('../assets/settings.png')}
                style={{
                    position: 'absolute',
                    bottom: Dimensions.get('window').height / 2,
                    right: Dimensions.get('window').width * 0.66,
                    transform: [{ translateX: 30 }, { translateY: 30 }],
                    zIndex: 1000,
                }}
            />
            {!settings.individualReset && <FloatingButton
                onPress={() => DeviceEventEmitter.emit('counterReset')}
                imageSource={require('../assets/reset.png')}
                style={{
                    position: 'absolute',
                    bottom: Dimensions.get('window').height / 2,
                    right: Dimensions.get('window').width * 0.33,
                    transform: [{ translateX: 30 }, { translateY: 30 }],
                    zIndex: 1000,
                }}
            />}
            <StatusBar style="auto" />
        </View>
    );
}

