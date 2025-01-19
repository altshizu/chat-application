"use client"

import { useState } from "react"
import { useAppContext } from "@/context/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const { setState } = useAppContext()
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setState((prevState) => ({
        ...prevState,
        username,
        isLoggedIn: true,
      }))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join the Chat Forum</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mb-4"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Join
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
