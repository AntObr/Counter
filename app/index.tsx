import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function App() {
    const insets = useSafeAreaInsets();

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
        <>
            <ScrollView style={styles.container}>
                <Text>Home</Text>
                <Button title="Settings" onPress={() => router.push('/settings')} />
                <StatusBar style="auto" />
            </ScrollView>
        </>
    );
}

