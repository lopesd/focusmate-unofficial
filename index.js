import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import PushNotification from "react-native-push-notification"
import BackgroundFetch from 'react-native-background-fetch'
import { handleTask } from './src/logic/notification-refresh-logic'

// set up notification channel
PushNotification.createChannel({
    channelId: "UnofficialFocusmateAppNotificationChannel", // (required)
    channelName: "Unofficial Focusmate App", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
)

// set up background activity (headlessjs)
BackgroundFetch.registerHeadlessTask(async (event) => {
  let taskId = event.taskId
  let isTimeout = event.timeout
  if (isTimeout) {
    console.log('[BackgroundFetch] Headless TIMEOUT:', taskId)
    BackgroundFetch.finish(taskId)
    return
  }
  console.log('[BackgroundFetch HeadlessTask] start: ', taskId)
  handleTask(taskId)
  BackgroundFetch.finish(taskId)
})

AppRegistry.registerComponent(appName, () => App)
