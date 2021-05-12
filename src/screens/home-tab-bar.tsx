import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { AuthContext } from '../contexts'
import { TokenData } from '../logic/auth-helper'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MainScreen from './main-screen'
import SettingsScreen from './settings-screen'
import { FocusmateSession } from '../types'
import { getSortedFutureFocusmateSessions } from '../logic/fm-api-helpers'
import { AppState, AppStateStatus } from 'react-native'
import { updateNotifications } from '../logic/notification-helpers'

interface HomeTabBarProps {
  tokenData: TokenData,
  signOut: () => void
}

function settingsIcon ({focused, color, size}: { focused: boolean, color: string, size: number }) {
  const name = 'settings' //focused ? 'pencil' : 'pencil-outline'
  return <Feather name={name} color={color} size={size} />
}

function mainIcon ({focused, color, size}: { focused: boolean, color: string, size: number }) {
  const name = focused? 'person' : 'person-outline'
  return <MaterialIcons name={name} color={color} size={size} />
}

const REFRESH_SESSION_INTERVAL_MILLIS = 1000 * 5 // every 5 seconds

export function HomeTabBar(props: HomeTabBarProps) {
  const [sessions, setSessions] = React.useState<FocusmateSession[]>([])

  // refresh sessions every 1 minute if the app is in the foreground
  React.useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    // refresh sessions on initial load
    refreshSessionsAndNotifications()

    // refresh them on an interval too
    const refreshSessionsInterval = setInterval(refreshSessionsAndNotifications, REFRESH_SESSION_INTERVAL_MILLIS)

    return () => {
      clearInterval(refreshSessionsInterval)
      AppState.removeEventListener("change", handleAppStateChange)
    }
  }, [])

  // handle coming to the foreground
  const appState = React.useRef(AppState.currentState)
  function handleAppStateChange (nextAppState: AppStateStatus) {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      refreshSessionsAndNotifications()
    }
    appState.current = nextAppState
  }

  const Tab = createBottomTabNavigator()

  const authContext = { 
    accessToken: async () => {
      // TODO: check if token is stale
      return props.tokenData.accessToken
    },
    signOut: props.signOut
  }

  async function refreshSessionsAndNotifications () {
    console.log('refreshing sessions')
    const newSessions = await getSortedFutureFocusmateSessions(props.tokenData.accessToken)
    updateNotifications(newSessions)
    setSessions(newSessions)
  }

  return (
    <AuthContext.Provider value={authContext}>
      <Tab.Navigator tabBarOptions={{ showLabel: false }} >
        <Tab.Screen name="Main" options={{ tabBarIcon: mainIcon }}>
          {() => <MainScreen sessions={sessions} refreshSessions={refreshSessionsAndNotifications}/>}
        </Tab.Screen>

        <Tab.Screen name="Settings"  options={{ tabBarIcon: settingsIcon }}>
          {() => <SettingsScreen />}
        </Tab.Screen>
      </Tab.Navigator>
    </AuthContext.Provider>
  )
}