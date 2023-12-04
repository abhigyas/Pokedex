import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PokemonInfo from './components/PokemonInfo';

export default function App() {
  return (
    <View style={styles.container}>
      <PokemonInfo />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3a58b0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
