import React, { createContext, useContext, useState, useEffect } from 'react'
import { Chat } from 'types/view'
import { Spin } from 'antd'
import { getChatForJam, submitChatMessage } from 'prod/api'
import { useActionCableContext } from './ActionCableContext'
import { useUserContext } from './UserContext'

type Props = {
  children: React.ReactNode
  jam_id: string
}
type Context = {
  chats: Chat[]
  handleSubmit: (message: string) => void
}

const ChatContext = createContext<Context | null>(null)

export const ChatContextProvider = ({ children, jam_id }: Props) => {
  const { user } = useUserContext()
  const { consumer } = useActionCableContext()
  const [chats, setChats] = useState<Chat[] | null>(null)

  useEffect(() => {
    consumer.subscriptions.create(
      { channel: 'ChatContextChannel', user_id: user.id, jam_id },
      {
        received: (chat: Chat) => {
          setChats((chats) => {
            if (!chats) return []

            return [...chats, chat]
          })
        },
      }
    )

    const get = async () => {
      setChats(await getChatForJam(jam_id))
    }

    setTimeout(get, 1000)
  }, [jam_id])

  const handleSubmit = async (message: string) => {
    await submitChatMessage({ message, jam_id, user_id: user.id })

    // socket will do the thing
  }

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
