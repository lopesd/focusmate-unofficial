import { clearJson, getJson, storeJson } from "../interfaces/storage-interface";

const SETTINGS_STORAGE_KEY = "FM:settings"

export interface FMAppSettings {
  notificationOffset: number
}

export type PartialFMAppSettings = Partial<FMAppSettings>

export async function getStoredSettingsOrDefaults(): Promise<FMAppSettings> {
  const stored = (await getJson<PartialFMAppSettings>(SETTINGS_STORAGE_KEY)) || {}
  return { ...defaultSettings(), ...stored }
}

export async function mergeSettings(partialSettings: PartialFMAppSettings) {
  const stored = (await getJson<PartialFMAppSettings>(SETTINGS_STORAGE_KEY)) || {}
  const newStored = { ...stored, ...partialSettings }
  await storeJson(SETTINGS_STORAGE_KEY, newStored)
  return { ...defaultSettings(), ...newStored }
}

export async function clearStoredSettings() {
  return clearJson(SETTINGS_STORAGE_KEY)
}

export const defaultSettings = (): FMAppSettings => ({
  notificationOffset: 10
})