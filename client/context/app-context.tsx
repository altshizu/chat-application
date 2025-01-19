"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import type { AppContextType, AppState } from "@/lib/types"

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    messages: [],
    username: "",
    isLoggedIn: false,
  })

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
