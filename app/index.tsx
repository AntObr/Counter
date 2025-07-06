import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import Counter from '../components/Counter';

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
        <ScrollView style={styles.container}>
            <Button title="Settings" onPress={() => router.push('/settings')} />
            <Counter />
            <Counter />
            <StatusBar style="auto" />
        </ScrollView>
    );
}

