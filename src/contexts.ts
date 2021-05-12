import React from "react";

export interface AuthContext {
  accessToken: () => Promise<string>,
  signOut: () => void
}

export const AuthContext = React.createContext<AuthContext>({
  accessToken: async () => '', // dummy defaults
  signOut: () => {}
})