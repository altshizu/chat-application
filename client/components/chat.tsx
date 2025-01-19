"use client"

import { useEffect, useRef, useState } from "react"
import { useAppContext } from "@/context/app-context"
import type { Message } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { socket } from "@/app/page"

let messageId = 0

export default function Chat() {
    const { state, setState } = useAppContext()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [input, setInput] = useState("")

    useEffect(() => {
        const savedMessages = localStorage.getItem('messages')
        if (savedMessages) {
            setState(prevState => ({
                ...prevState,
                messages: JSON.parse(savedMessages)
            }))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(state.messages))
    }, [state.messages])

    useEffect(() => {
        socket.on("message", (message: Message) => {
            setState((prevState) => ({
                ...prevState,
                messages: [...prevState.messages, { ...message, id: `server-${messageId++}` }],
            }))
        })

        return () => {
            socket.off("message")
        }
    }, [setState])

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (input.trim() === "") return

        const message: Message = {
            id: `client-${messageId++}`,
            text: input,
            sender: state.username,
            timestamp: new Date().toLocaleTimeString(),
        }

        socket.emit("message", message)
        setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }))
        setInput("")
    }

    return (
        <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
            <CardHeader>
                <CardTitle>Chat Forum</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
                {state.messages.map((message) => (
                    <div key={message.id} className={`mb-4 ${message.sender === state.username ? "text-right" : "text-left"}`}>
                    <div className="inline-block">
                        <span
                            className={`inline-block p-2 rounded-lg ${
                                message.sender === state.username ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            <strong>{message.sender}: </strong>
                            {message.text}
                        </span>
                        <div className={`text-xs text-gray-500 mt-1 ${message.sender === state.username ? "text-right" : "text-left"}`}>
                            {message.timestamp}
                        </div>
                    </div>
                </div>
                ))}
                <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter>
                <form onSubmit={sendMessage} className="flex w-full space-x-2">
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow"
                    />
                    <Button type="submit">Send</Button>
                </form>
            </CardFooter>
        </Card>
    )
}
