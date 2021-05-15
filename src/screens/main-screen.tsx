import React from 'react'
import { StyleSheet, View, Text, SectionList } from "react-native"
import { FocusmateSession } from '../types'
import { SessionListItem } from '../components/session-list-item'
import { simpleDayFormat } from '../logic/date-helpers'

interface MainScreenProps {
  sessions: FocusmateSession[]
}

export default function MainScreen(props: MainScreenProps) {
  const sessionsGroupedByDate = groupSessionsByDateForSectionList(props.sessions)

  return (
    <View style={styles.gutters}>
      <SectionList 
        sections={sessionsGroupedByDate}
        keyExtractor={item => item.session_time.toString()}
        renderItem={data => <SessionListItem session={data.item} />}
        renderSectionHeader={data => <Text style={styles.sessionSectionTitleText}>{data.section.title}</Text>}
        ListHeaderComponent={<Text style={styles.listHeader}>Upcoming sessions</Text>}
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
    marginLeft: 10,
    marginRight: 10
  },
  listHeader: {
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