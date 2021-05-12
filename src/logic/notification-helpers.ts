import { scheduleSessionReminderNotification, unscheduleAllNotifications } from "../interfaces/notification-interface";
import { FocusmateSession } from "../types";

const reminderOffsetMinutes = 10 // TODO: allow user to configure. IDEA: allow configuring on a per-session basis?

export async function updateNotifications(sessions: FocusmateSession[]) {
  unscheduleAllNotifications()
  for (let i = 0; i < sessions.length; ++i) {
    await scheduleSessionReminderNotification(sessions[i].session_time, reminderOffsetMinutes)
  }
}

export async function clearAllScheduledNotifications() {
  unscheduleAllNotifications() 
}