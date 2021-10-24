import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Carousel from "../components/Carousel"

function Onboarding() {
  return (
    <SafeAreaView style={styles.container}>
        <Carousel />
        
    </SafeAreaView>
  );
}

const styles= StyleSheet.create({
    container: {
        backgroundColor: `#fff`,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
    }
})

export default Onboarding;