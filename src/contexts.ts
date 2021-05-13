import React from "react"
import { defaultSettings, FMAppSettings, PartialFMAppSettings } from './logic/settings-helper'

export interface AuthContext {
  accessToken: () => Promise<string>,
  signOut: () => void
}

export const AuthContext = React.createContext<AuthContext>({} as AuthContext)

export interface FMAppSettingsContext {
  settings: FMAppSettings,
  updateSettings: (settings: PartialFMAppSettings) => void,
}

export const SettingsContext = React.createContext<FMAppSettingsContext>({} as FMAppSettingsContext)