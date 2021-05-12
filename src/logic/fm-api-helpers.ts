import { FocusmateSession } from "../types"
import { getSessionsCall } from "../interfaces/network-interface"

export async function getSortedFutureFocusmateSessions(accessToken: string): Promise<FocusmateSession[]> {
  const sessionsCallResp = await getSessionsCall(accessToken)
  const sessions = sessionsCallResp.sessions
  return sortFutureSessions(sessions)
}

function sortFutureSessions(sessions: FocusmateSession[]) {
  const currentEpoch = Date.now()
  return sessions
    .filter(session => session.session_time > currentEpoch)
    .sort((s1, s2) => s1.session_time > s2.session_time ? 1 : -1)
}