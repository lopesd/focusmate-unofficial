import React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native'
import { Logo } from '../components/logo'

export function SplashScreen() {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color={"#fff"} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4648aa',
  },
  activityIndicatorContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})