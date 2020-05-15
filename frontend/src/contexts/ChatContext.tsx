import React, { createContext, useContext, useState, useEffect } from 'react'
import { Chat } from 'types/view'
import { chatIndex } from 'mock/chats'
import { Spin } from 'antd'

type Props = {
  children: React.ReactNode
  jamId: string
}
type Context = {
  chats: Chat[]
  handleSubmit: (user_id: string, message: string) => void
}

const ChatContext = createContext<Context | null>(null)

export const ChatContextProvider = ({ children, jamId }: Props) => {
  // MAYBE THIS SHOULD BE A HOOK
  const [chats, setChats] = useState<Chat[] | null>()

  useEffect(() => {
    // add socket listener
    // socket payload ([{user_id: string, message: string}])
    // setChats(payload)
    const get = () => {
      setChats(chatIndex[jamId] || [])
    }
    setTimeout(get, 1000)
  }, [jamId])

  const handleSubmit = (user_id: string, message: string) => {
    // submit chat
    // socket will do the thing
  }

  // possibly global, so you can subscribe to chatrooms and get global notifications? would be cool

  return chats ? (
    <ChatContext.Provider value={{ chats, handleSubmit }}>
      {children}
    </ChatContext.Provider>
  ) : (
    <Spin size="large" tip="Loading Chats..." />
  )
}

export const useChatContext = () => {
  const context = useContext(ChatContext)

  if (!context)
    throw new Error(
      'ChatContext must be called from within the ChatContextProvider'
    )

  return context
}
