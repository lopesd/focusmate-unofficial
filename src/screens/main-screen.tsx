import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from "react-native"
import { PushNotificationScheduledLocalObject, PushNotificationScheduleObject } from 'react-native-push-notification'
import { AuthContext } from '../contexts'
import { getScheduledNotifications } from '../interfaces/notification-interface'
import { simpleTimeFormat } from '../logic/date-helpers'
import { FocusmateSession } from '../types'
import IonIcons from 'react-native-vector-icons/Ionicons'

const FIFTY_MINUTES_IN_MILLIS = 1000 * 60 * 50

function Session(props: { session: FocusmateSession }) {
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

interface MainScreenProps {
  sessions: FocusmateSession[]
}

export default function MainScreen(props: MainScreenProps) {
  return (
    <View style={styles.gutters}>
      {props.sessions.map(session =>
        <Session session={session} key={session.session_time} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  gutters: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
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
  },
  buttonNoEmphasis: {
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
  buttonNoEmphasisText: {
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold'
  },
  buttonEmphasis: {
    width: '100%',
    height: 55,
    backgroundColor: '#c49969',
    borderColor: '#c49969',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    flexDirection: 'row'
  }
})