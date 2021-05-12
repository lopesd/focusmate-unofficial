import { FM_GOOGLE_IDENTITY_TOOLKIT_API_KEY } from "../DO_NOT_COMMIT"

const GET_TOKENS_ENDPOINT = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FM_GOOGLE_IDENTITY_TOOLKIT_API_KEY}`
const REFRESH_ACCESS_TOKEN_ENDPOINT = `https://securetoken.googleapis.com/v1/token?key=${FM_GOOGLE_IDENTITY_TOOLKIT_API_KEY}`
const FM_SESSIONS_URL = "https://focusmate-api.herokuapp.com/v1/session/"

export async function getTokensCall(email: string, password: string) {
  const resp = await fetch(GET_TOKENS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true })
  })
  return resp.json()
}

export async function refreshAccessTokenCall(refreshToken: string) {
  const resp = await fetch(REFRESH_ACCESS_TOKEN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: refreshToken })
  })
  return resp.json()
}

export async function getSessionsCall(authToken: string) {
  const resp = await fetch(FM_SESSIONS_URL, {
    method: 'GET',
    headers: {
      Authorization: authToken
    }
  })
  return resp.json()
}