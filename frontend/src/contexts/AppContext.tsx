import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUserContext } from './UserContext'
import { JamView, Chat, EntryView } from '../types/view'
import { Spin } from 'antd'
import * as api from 'prod/api'
import { useActionCableContext } from './ActionCableContext'

type Props = {
  children: React.ReactNode
}

type JamRoomUsers = Record<string, string[]>

type JamRoomChannelRes = {
  entry: EntryView
  chat: Chat
}

type Context = {
  jamIndex: Record<string, JamView>
  jamRoomUsers: JamRoomUsers
  chatIndex: Record<string, Chat[]>
  subscribeToJam: (id: string) => ActionCable.Channel
  unsubscribeFromJam: (id: string) => void
}

const AppContext = createContext<Context | null>(null)

export const AppContextProvider = ({ children }: Props) => {
  const { user } = useUserContext()
  const { consumer } = useActionCableContext()
  const [jamIndex, setJamIndex] = useState<Record<string, JamView> | null>(null)
  const [jamRoomUsers, setJamRoomUsers] = useState<JamRoomUsers>({})
  const [chatIndex, setChatIndex] = useState<Record<string, Chat[]>>({})

  useEffect(() => {
    // fetch all jams w/ entries w/ votes
    // get user's voteTokens
    // set up jam socket listeners (attendance, status, blah)

    // jamIndex listener - global jam creations and events

    const subscription = consumer.subscriptions.create(
      {
        channel: 'UserLocationChannel',
        user_id: user.id,
      },
      {
        received: (data: JamRoomUsers) => {
          setJamRoomUsers(data)
        },
      }
    )

    const get = async () => {
      const data = await api.getJamIndex()
      if (data) setJamIndex(data)
    }
    get()

    return () => {
      subscription.unsubscribe()
    }

    // const jamRoomListener = consumer.subscriptions.create({channel: 'jam'})
  }, [])

  const subscribeToJam = (jam_id: string) => {
    // get initial state of jam here
    // chat

    return consumer.subscriptions.create(
      {
        channel: 'JamroomChannel',
        jam_id,
        user_id: user.id,
      },
      {
        received: ({ entry, chat }: JamRoomChannelRes) => {
          if (!jamIndex) return

          if (entry) {
            console.log('entry was uploaded!', jamIndex[jam_id], entry)
            setJamIndex((jamIndex) => {
              if (!jamIndex) return {}

              return {
                ...jamIndex,
                [jam_id]: {
                  ...jamIndex[jam_id],
                  entries: [...jamIndex[jam_id].entries, entry],
                },
              }
            })
          } else if (chat) {
            // TODO: make a chat context yo
            console.log('chat has been updated', chat)
            // append to chat log
            setChatIndex((chatIndex) => {
              if (!chatIndex) return {}

              return {
                ...chatIndex,
                [jam_id]: [...(chatIndex[jam_id] || []), chat],
              }
            })
          }
        },
      }
    )
  }

  const unsubscribeFromJam = (id: string) => {}

  return jamIndex ? (
    <AppContext.Provider
      value={{
        jamIndex,
        subscribeToJam,
        unsubscribeFromJam,
        jamRoomUsers,
        chatIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  ) : (
    <Spin size="large" tip="Loading Jams..." />
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context)
    throw new Error(
      'AppContext must be called from within the AppContextProvider'
    )

  return context
}
