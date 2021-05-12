import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthenticationScreen } from './screens/authentication-screen'
import { HomeTabBar } from './screens/home-tab-bar'
import { Text, View } from 'react-native'
import { TokenData, clearStoredTokens, getAndRefreshStoredTokenData } from './logic/auth-helper'
import { clearAllScheduledNotifications } from './logic/notification-helpers'
import { SplashScreen } from './screens/splash-screen'

type AuthState = 
  | { state: 'LOADING' }
  | { state: 'AUTHORIZING' }
  | { state: 'AUTHORIZED', tokenData: TokenData }

const App = () => {
  const [authState, setAuthState] = React.useState<AuthState>({ state: 'LOADING' })

  function setTokenData (tokenData: TokenData) {
    setAuthState({ state: 'AUTHORIZED', tokenData })
  }
  
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      // fetch access token from storage
      let tokenData = await getAndRefreshStoredTokenData()
      if (tokenData) {
        setAuthState({ state: 'AUTHORIZED', tokenData })
      } else {
        setAuthState({ state: 'AUTHORIZING' })
      }
    }
    bootstrapAsync()
  }, [])

  async function signOut () {
    clearStoredTokens()
    clearAllScheduledNotifications()
    setAuthState({ state: 'AUTHORIZING' })
  }
  
  return (
    <NavigationContainer>
      {authState.state === 'LOADING'
        ? (
          <SplashScreen />
        )
        : authState.state === 'AUTHORIZING' ? (
          <AuthenticationScreen setTokenData={setTokenData} />
        )
        : (
          <HomeTabBar tokenData={authState.tokenData} signOut={signOut} />
        )
      }
    </NavigationContainer>
  )
}

export default App