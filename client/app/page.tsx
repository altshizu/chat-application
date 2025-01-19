"use client"

import { io, type Socket } from "socket.io-client"
import Login from "@/components/login"
import Chat from "@/components/chat"
import { useAppContext, AppProvider } from "@/context/app-context"

export const socket: Socket = io("http://localhost:3001")

function AppContent() {
  const { state } = useAppContext()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      {state.isLoggedIn ? <Chat /> : <Login />}
    </main>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
