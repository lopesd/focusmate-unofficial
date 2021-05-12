import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../contexts';

export default function SettingsScreen() {
  const authContext = React.useContext(AuthContext)

  return (
    <View style={styles.gutters}>
      <TouchableOpacity
        style={styles.buttonNoEmphasis}
        onPress={authContext.signOut}
      >
        <Text style={styles.buttonNoEmphasisText}>
          SIGN OUT
        </Text>
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
    color: '#c49969',
    fontSize: 17,
    fontWeight: 'bold'
  }
})