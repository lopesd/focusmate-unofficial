import React from 'react' 
import { StyleSheet, Text, View } from 'react-native'

export function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>
        <Text style={{ fontWeight: 'bold' }}>Focus</Text>mate
      </Text>
      <Text style={styles.subLogoText}>
        (unofficial)
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'sans-serif'
  },
  subLogoText: {
    fontSize: 20,
    color: 'white'
  },
})