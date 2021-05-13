import BackgroundFetch from "react-native-background-fetch"
import { getAndRefreshStoredTokenData, getStoredTokenData } from "./auth-helper"
import { getSortedFutureFocusmateSessions } from "./fm-api-helpers"
import { updateNotifications } from "./notification-helpers"
import { getStoredSettingsOrDefaults } from "./settings-helper"
import { sleep } from "./util"

export async function configureAndStartBackgroundExecution() {
  BackgroundFetch.configure({ 
    minimumFetchInterval: 1,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true
    // forceAlarmManager: true // could be used for more reliable refresh on android at the cost of battery life
  }, handleTask, handleTimeout)
}

export function stopBackgroundExecution() {
  return BackgroundFetch.stop()
}

export async function handleTask(taskId: string) {
  console.log('RUNNING IN THE BACKGROUND')
  const tokenData = await getAndRefreshStoredTokenData()
  if (tokenData) {
    const sessions = await getSortedFutureFocusmateSessions(tokenData.accessToken)
    const settings = await getStoredSettingsOrDefaults()
    updateNotifications(sessions, settings.notificationOffset)
    await sleep(100) // just making sure the app isn't put back to sleep before we can update notifications
  } else {
    // cancel future job executions?
  }
  BackgroundFetch.finish(taskId)
}

export async function handleTimeout(taskId: string) {
  BackgroundFetch.finish(taskId)
}