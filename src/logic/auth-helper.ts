import EncryptedStorage from "react-native-encrypted-storage"
import { getTokensCall, refreshAccessTokenCall } from "../interfaces/network-interface"
import { getEncryptedJson, storeEncryptedJson } from "../interfaces/encrypted-storage-interface"

const TOKEN_DATA_STORAGE_KEY = 'FM:tokens'
const TOKEN_STALENESS_GUARD_MINUTES = 10 // how many minutes before staleness should we refresh?

export interface TokenData {
  accessToken: string,
  refreshToken: string,
  validUntil: number
}

// fetch both an access and a refresh token using an email and password. store both.
export async function fetchAndStoreNewTokensFromNetwork(email: string, password: string) {
  const idCallResp = await getTokensCall(email, password)
  console.log('idCallResp', idCallResp)
  const tokenData = getTokenDataFromIdCallResponse(idCallResp)
  if (!tokenData.accessToken) {
    throw 'Could not retrieve access token. Inspect the network call' // TODO IMPROVE ERROR HANDLING
  }
  await storeTokenData(tokenData)
  console.log('stored!')
  return tokenData
}

export async function getAndRefreshStoredTokenData() {
  let tokenData = await getStoredTokenData()
  console.log('retrieved stored token data:', tokenData)
  if (tokenData) {
    return refreshTokenDataIfStale(tokenData)
  }
}

export function getStoredTokenData() {
  return getEncryptedJson<TokenData | undefined>(TOKEN_DATA_STORAGE_KEY)
}

export async function refreshTokenDataIfStale(tokenData: TokenData): Promise<TokenData> {
  const staleAt = tokenData.validUntil - (TOKEN_STALENESS_GUARD_MINUTES * 60 * 1000)
  const now = Date.now()
  if (now >= staleAt) {
    const refreshCallResponse = await refreshAccessTokenCall(tokenData.refreshToken)
    console.log('REFRESHING TOKEN. refreshCallResponse:', refreshCallResponse)
    const newTokenData = getTokenDataFromRefreshCallResponse(refreshCallResponse)
    if (!tokenData.accessToken) {
      throw 'Could not retrieve access token. Inspect the network call' // TODO IMPROVE ERROR HANDLING, invalid password/username sitch
    }
    await storeTokenData(newTokenData)
    return newTokenData
  }
  return tokenData
}

// clear access and refresh tokens from storage
export async function clearStoredTokens() {
  return EncryptedStorage.removeItem(TOKEN_DATA_STORAGE_KEY)
}

async function storeTokenData(tokenData: TokenData) {
  console.log('storing token data:', tokenData)
  return storeEncryptedJson(TOKEN_DATA_STORAGE_KEY, tokenData)
}

function getTokenDataFromIdCallResponse(callResponse: any): TokenData {
  const expiresInMillis = parseInt(callResponse.expiresIn) * 1000
  const validUntil = Date.now() + expiresInMillis
  return { 
    accessToken: callResponse.idToken,
    refreshToken: callResponse.refreshToken,
    validUntil
  }
}

function getTokenDataFromRefreshCallResponse(callResponse: any): TokenData {
  const expiresInMillis = parseInt(callResponse.expires_in) * 1000
  const validUntil = Date.now() + expiresInMillis
  return { 
    accessToken: callResponse.access_token,
    refreshToken: callResponse.refresh_token,
    validUntil
  }
}