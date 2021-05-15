import Slider from '@react-native-community/slider';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext, SettingsContext } from '../contexts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function SettingsScreen() {
  const authContext = React.useContext(AuthContext)
  const settingsContext = React.useContext(SettingsContext)

  const [notificationOffset, setNotificationOffset] = React.useState(settingsContext.settings.notificationOffset)

  function onNotificationOffsetSliderValueChange(value: number) {
    setNotificationOffset(value)
  }

  function onNotificationOffsetSliderSlidingComplete(value: number) {
    if (value !== settingsContext.settings.notificationOffset) {
      console.log('updating settings')
      settingsContext.updateSettings({ notificationOffset: value })
    }
  }

  return (
    <View style={styles.gutters}>
      <View style={styles.notificationOffsetControlsContainer}>
        <Text style={styles.notificationOffsetText}>
          Notify me <Text style={{ fontWeight: 'bold' }}>{notificationOffset}</Text> minute(s) before a session
        </Text>
        <Slider 
          style={styles.notificationOffsetSlider}
          minimumValue={1}
          maximumValue={15}
          step={1}
          value={notificationOffset}
          onValueChange={onNotificationOffsetSliderValueChange}
          onSlidingComplete={onNotificationOffsetSliderSlidingComplete}
          thumbTintColor={'#4648aa'}
          minimumTrackTintColor={'#595ab7'}
          maximumTrackTintColor={'#c49969'}
        />
      </View>

      <TouchableOpacity
        style={styles.softButton}
        onPress={authContext.signOut}
      >
        <Text style={styles.softButtonText}>
          SIGN OUT
        </Text>
        <MaterialIcons name="trending-flat" size={30} color={'#c49969'}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  gutters: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  notificationOffsetControlsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 50,
  },
  notificationOffsetSlider: {

  },
  notificationOffsetText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'sans-serif',
    marginBottom: 10
  },
  softButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderColor: '#c49969',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  softButtonText: {
    color: '#c49969',
    fontSize: 17,
    fontWeight: 'bold'
  }
})