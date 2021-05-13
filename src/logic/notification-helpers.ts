import { scheduleSessionReminderNotification, unscheduleAllNotifications } from "../interfaces/notification-interface";
import { FocusmateSession } from "../types";

export async function updateNotifications(sessions: FocusmateSession[], notificationOffset: number) {
  unscheduleAllNotifications()
  for (let i = 0; i < sessions.length; ++i) {
    await scheduleSessionReminderNotification(sessions[i].session_time, notificationOffset)
  }
}

export async function clearAllScheduledNotifications() {
  unscheduleAllNotifications() 
}