import { scheduleSessionReminderNotification, unscheduleAllNotifications } from "../interfaces/notification-interface";
import { getJson, storeJson } from "../interfaces/storage-interface";
import { FocusmateSession } from "../types";

const SCHEDULED_NOTIFICATIONS_STORAGE_KEY = 'FM:ScheduledNotifications'

interface ScheduledNotification {
  sessionTime: number
  notificationOffset: number // we expect these to be the same across notifications - but this could change (feature request?)
}

export async function updateNotifications(sessions: FocusmateSession[], notificationOffset: number) {
  const existingScheduledNotifications = await getScheduledNotifications()

  // notifications objects to insert into the DB
  const newNotificationsToStore: ScheduledNotification[] = []

  // notifications to schedule with the OS. these two arrays might not match exactly in some cases.
  const newNotificationsToSchedule: ScheduledNotification[] = []

  const now = Date.now()
  sessions.forEach(session => {
    const newNotif = { sessionTime: session.session_time, notificationOffset }
    newNotificationsToStore.push(newNotif)
    const notif = existingScheduledNotifications.find(n => n.sessionTime === session.session_time)
    if (notif) {
      // a notification exists but the user has changed the desired offset. check if a new notification is appropriate.
      const prevNotifTime = notif.sessionTime - (notif.notificationOffset * 60 * 1000)
      const newNotifTime = session.session_time - (notificationOffset * 60 * 1000)
      if (prevNotifTime < now && newNotifTime < now) {
        // we've already notified, and the new offset is also in the past. keep the data object but do not schedule a notif with the OS. 
        return
      }
    }
    newNotificationsToSchedule.push(newNotif)
  })

  // we've determined the new state of our notifications.
  unscheduleAllNotifications()
  for (let i = 0; i < newNotificationsToSchedule.length; ++i) {
    await scheduleSessionReminderNotification(newNotificationsToSchedule[i].sessionTime, notificationOffset)
  }
  storeScheduledNotifications(newNotificationsToStore)
}

export async function clearAllScheduledNotifications() {
  unscheduleAllNotifications()
}

async function getScheduledNotifications(): Promise<ScheduledNotification[]> {
  return (await getJson<ScheduledNotification[]>(SCHEDULED_NOTIFICATIONS_STORAGE_KEY)) || []
}


function storeScheduledNotifications(notifications: ScheduledNotification[]) {
  return storeJson(SCHEDULED_NOTIFICATIONS_STORAGE_KEY, notifications)
}