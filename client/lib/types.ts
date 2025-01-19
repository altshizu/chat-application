export type Message = {
    id: string
    text: string
    sender: string
    timestamp: string
}

export type AppState = {
  messages: Message[]
  username: string
  isLoggedIn: boolean
}

export type AppContextType = {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}
