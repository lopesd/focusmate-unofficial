import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { simpleTimeFormat } from '../logic/date-helpers'
import { FocusmateSession } from '../types'
import IonIcons from 'react-native-vector-icons/Ionicons'

const FIFTY_MINUTES_IN_MILLIS = 1000 * 60 * 50

export function SessionListItem(props: { session: FocusmateSession }) {
  const startTime = simpleTimeFormat(new Date(props.session.session_time))
  const endTime = simpleTimeFormat(new Date(props.session.session_time + FIFTY_MINUTES_IN_MILLIS))
  const sessionTimeStr = `${startTime} - ${endTime}`

  const partnerStr = props.session.user === '' ? 'Matching...' : props.session.user
  return (
    <View style={styles.sessionContainer}>
      <Text style={styles.sessionTimeText}>
        {sessionTimeStr}
      </Text>
      <Text style={styles.sessionPartnerText}>
        <IonIcons name="people" size={17}/> {partnerStr}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sessionContainer: {
    borderColor: '#4648aa',
    backgroundColor: '#f2f3fe',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10
  },
  sessionTimeText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  sessionPartnerText: {
    color: '#4648aa',
    fontSize: 15,
    fontWeight: 'bold'
  }
})