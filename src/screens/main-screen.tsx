import React from 'react'
import { StyleSheet, View, Text, SectionList, ActivityIndicator, TouchableOpacity } from "react-native"
import { FocusmateSession } from '../types'
import { SessionListItem } from '../components/session-list-item'
import { simpleDayFormat } from '../logic/date-helpers'
import IonIcons from 'react-native-vector-icons/Ionicons'

interface MainScreenProps {
  sessions: FocusmateSession[]
  refresh: () => void
  isRefreshing: boolean
}

export default function MainScreen(props: MainScreenProps) {
  const sessionsGroupedByDate = groupSessionsByDateForSectionList(props.sessions)

  function HeaderComponent() {
    return (
      <View style={styles.headerFlexContainer}>
        <Text style={styles.listHeaderText}>Upcoming sessions</Text>
        <TouchableOpacity onPress={props.refresh}>
            {props.isRefreshing
            ? <ActivityIndicator color={'#4648aa'} size={27}/>
            : <IonIcons name='md-refresh' size={30} color={'#4648aa'}/>
            }
        </TouchableOpacity>
      </View>
    )
  }

  function EmptyComponent() {
    return (
      <Text>
        {props.isRefreshing
          ? 'Checking your sessions...'
          : 'No upcoming sessions. Why not book a few?'
        }
      </Text>
    )
  }

  return (
    <View style={styles.gutters}>
      <SectionList 
        sections={sessionsGroupedByDate}
        keyExtractor={item => item.session_time.toString()}
        renderItem={data => <SessionListItem session={data.item} />}
        renderSectionHeader={data => <Text style={styles.sessionSectionTitleText}>{data.section.title}</Text>}
        ListHeaderComponent={HeaderComponent}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  )
}

function groupSessionsByDateForSectionList(sessions: FocusmateSession[]) {
  const reduced = sessions.reduce<Record<string, FocusmateSession[]>>((rv, session) => {
    const dateStr = simpleDayFormat(new Date(session.session_time));
    (rv[dateStr] = rv[dateStr] || []).push(session)
    return rv
  }, {})

  const grouped = Object.keys(reduced).map(dateStr => ({
    title: dateStr,
    data: reduced[dateStr]
  })).sort((a, b) => a.data[0].session_time > b.data[0].session_time ? 1 : -1)

  return grouped
}

const styles = StyleSheet.create({
  gutters: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  headerFlexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
  sessionSectionTitleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 10
  }
})