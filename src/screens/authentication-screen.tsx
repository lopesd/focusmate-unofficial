import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native'
import { fetchAndStoreNewTokensFromNetwork, TokenData } from '../logic/auth-helper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Logo } from '../components/logo'
import { SafeAreaView } from 'react-native-safe-area-context'

type AuthFormState = 'ENABLED' | 'DISABLED'

interface AuthenticationScreenProps {
  signIn: (tokenData: TokenData) => void
}

export function AuthenticationScreen(props: AuthenticationScreenProps) {
  const [emailInputStr, setEmailInputStr] = React.useState('')
  const [passwordInputStr, setPasswordInputStr] = React.useState('')
  const [statusMessage, setStatusMessage] = React.useState('')
  const [authFormState, setAuthFormState] = React.useState<AuthFormState>('ENABLED')

  async function onLoginButtonPress() {
    setAuthFormState('DISABLED')
    setStatusMessage('Signing you in...')
    let tokenData
    try {
      tokenData = await fetchAndStoreNewTokensFromNetwork(emailInputStr, passwordInputStr)
      if (tokenData) {
        props.signIn(tokenData)
        return
      }
    } catch (e) {
      console.error(e)
    }
    setStatusMessage('Failed to authorize. Check console for details.')
    setAuthFormState('ENABLED')
  }

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={'position'}
        style={{ flex: 1, position: 'relative' }}
      >

        <Logo />

        <View style={styles.formContainer}>
          <TextInput 
            editable={authFormState === 'ENABLED'}
            style={styles.input}
            placeholder="email"
            onChangeText={setEmailInputStr}
            placeholderTextColor={'grey'}
            autoCompleteType={'email'}
            autoCorrect={false}
            importantForAutofill={'yes'}
            keyboardType={'email-address'}
          />
          <TextInput
            editable={authFormState === 'ENABLED'}
            style={styles.input}
            placeholder="password"
            onChangeText={setPasswordInputStr}
            placeholderTextColor={'grey'}
            autoCompleteType={'password'}
            autoCorrect={false}
            importantForAutofill={'yes'}
            secureTextEntry={true}
          />

          <TouchableOpacity
            disabled={authFormState === 'DISABLED'} 
            style={styles.signInButton}
            onPress={onLoginButtonPress}
          >
            <Text style={styles.signInText}>LOG IN</Text>
            <MaterialIcons name="trending-flat" size={30} color={'#fff'}/>
          </TouchableOpacity>

          <View style={styles.statusTextContainer}>
            <Text style={styles.statusText}>
              {statusMessage}
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4648aa'
  },
  formContainer: {
    position: 'absolute',
    top: 350,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  input: {
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'monospace',
    fontSize: 15,
    color: 'black',
    backgroundColor: 'white',
    height: 55
  },
  signInButton: {
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
  },
  signInText: {
    fontFamily: 'monospace',
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  statusTextContainer: {
    marginTop: 20,
    width: '100%'
  },
  statusText: {
    fontSize: 17,
    fontFamily: 'monospace',
    color: 'white',
  }
})