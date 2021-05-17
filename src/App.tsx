import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthenticationScreen } from './screens/authentication-screen'
import { HomeTabBar } from './screens/home-tab-bar'
import { TokenData, clearStoredTokens, getAndRefreshStoredTokenData, refreshTokenDataIfStale } from './logic/auth-helper'
import { clearAllScheduledNotificationsAndData } from './logic/notification-helpers'
import { SplashScreen } from './screens/splash-screen'
import { clearStoredSettings, defaultSettings, getStoredSettingsOrDefaults, mergeSettings } from './logic/settings-helper'
import { PartialFMAppSettings } from './logic/settings-helper'
import { AuthContext, FMAppSettingsContext, SettingsContext } from './contexts'
import { configureAndStartBackgroundExecution, stopBackgroundExecution } from './logic/notification-refresh-logic'
import AsyncStorage from '@react-native-async-storage/async-storage'

type AuthState = 
  | { state: 'LOADING' }
  | { state: 'AUTHORIZING' }
  | { state: 'AUTHORIZED', tokenData: TokenData }

const App = () => {
  const [authState, setAuthState] = React.useState<AuthState>({ state: 'LOADING' })
  const [settings, setSettings] = React.useState(defaultSettings())
  
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // fetch access token from storage
      let tokenData = await getAndRefreshStoredTokenData()
      if (tokenData) {
        signIn(tokenData)
      } else {
        setAuthState({ state: 'AUTHORIZING' })
      }
    }
    bootstrapAsync()
  }, [])

  async function signIn (tokenData: TokenData) {
    // fetch stored settings
    let storedSettings = await getStoredSettingsOrDefaults()
    if (storedSettings) {
      setSettings(storedSettings)
    }
    configureAndStartBackgroundExecution()
    setAuthState({ state: 'AUTHORIZED', tokenData })
  }

  async function signOut () {
    await Promise.all([
      clearAllScheduledNotificationsAndData(),
      clearStoredTokens(),
      // clearStoredSettings(), // let's persist settings per-device for now - better user experience than resetting to defaults after signout/signin
      stopBackgroundExecution()
    ])
    setAuthState({ state: 'AUTHORIZING' })
  }
  
  function renderScreen(authState: AuthState) {
    if (authState.state === 'LOADING') {
      return <SplashScreen />

    } else if (authState.state === 'AUTHORIZING') {
      return <AuthenticationScreen signIn={signIn} />

    } else {
      const authContext: AuthContext = {
        accessToken: async () => (await refreshTokenDataIfStale(authState.tokenData)).accessToken,
        signOut
      }

      const settingsContext: FMAppSettingsContext = {
        settings,
        updateSettings: async (partialSettings: PartialFMAppSettings) => {
          const newSettings = await mergeSettings(partialSettings)
          setSettings(newSettings)
        }
      }

      return (
        <AuthContext.Provider value={authContext}>
          <SettingsContext.Provider value={settingsContext}>
            <HomeTabBar />
          </SettingsContext.Provider>
        </AuthContext.Provider>
      )
    }
  }

  return (
    <NavigationContainer>
      {renderScreen(authState)}
    </NavigationContainer>
  )
}

export default App