import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MainScreen from './main-screen'
import SettingsScreen from './settings-screen'
import { FocusmateSession } from '../types'
import { getSortedFutureFocusmateSessions } from '../logic/fm-api-helpers'
import { AppState, AppStateStatus } from 'react-native'
import { updateNotifications } from '../logic/notification-helpers'
import { AuthContext, SettingsContext } from '../contexts'

function settingsIcon ({focused, color, size}: { focused: boolean, color: string, size: number }) {
  const name = 'settings' //focused ? 'pencil' : 'pencil-outline'
  return <Feather name={name} color={color} size={size} />
}

function mainIcon ({focused, color, size}: { focused: boolean, color: string, size: number }) {
  const name = focused? 'person' : 'person-outline'
  return <MaterialIcons name={name} color={color} size={size} />
}

const REFRESH_SESSION_INTERVAL_MILLIS = 1000 * 5

export function HomeTabBar() {
  const authContext = React.useContext(AuthContext)
  const settingsContext = React.useContext(SettingsContext)

  const [sessions, setSessions] = React.useState<FocusmateSession[]>([])

  // handle coming to the foreground
  const appState = React.useRef(AppState.currentState)

  React.useEffect(() => {
    console.log('settings change detected in home tab bar')
    const offset = settingsContext.settings.notificationOffset

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("foreground. notification offset: ", offset)
        refreshSessionsAndNotifications(offset)
      }
      appState.current = nextAppState
    }
    AppState.addEventListener("change", handleAppStateChange)

    const refreshInterval = setInterval(() => refreshSessionsAndNotifications(offset), REFRESH_SESSION_INTERVAL_MILLIS)

    return () => {
      AppState.removeEventListener("change", handleAppStateChange)
      clearInterval(refreshInterval)
    }
  }, [settingsContext.settings.notificationOffset])



  const Tab = createBottomTabNavigator()

  async function refreshSessionsAndNotifications(notificationOffset: number) {
    console.log('refreshing sessions. notification offset:', notificationOffset)
    const newSessions = await getSortedFutureFocusmateSessions(await authContext.accessToken())
    updateNotifications(newSessions, notificationOffset)
    setSessions(newSessions)
  }

  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }} >
      <Tab.Screen name="Main" options={{ tabBarIcon: mainIcon }}>
        {() => <MainScreen sessions={sessions} />}
      </Tab.Screen>

      <Tab.Screen name="Settings"  options={{ tabBarIcon: settingsIcon }}>
        {() => <SettingsScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}