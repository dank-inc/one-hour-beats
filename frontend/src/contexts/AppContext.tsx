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
  subscribeToJam: (id: string) => ActionCable.Channel
  unsubscribeFromJam: (id: string) => void
}

const AppContext = createContext<Context | null>(null)

export const AppContextProvider = ({ children }: Props) => {
  const { user } = useUserContext()
  const { consumer } = useActionCableContext()
  const [jamIndex, setJamIndex] = useState<Record<string, JamView> | null>(null)
  const [jamRoomUsers, setJamRoomUsers] = useState<JamRoomUsers>({})

  useEffect(() => {
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
  }, [user.id])

  const subscribeToJam = (jam_id: string) => {
    return consumer.subscriptions.create(
      {
        channel: 'JamroomChannel',
        jam_id,
        user_id: user.id,
      },
      {
        received: ({ entry }: JamRoomChannelRes) => {
          if (!jamIndex) return

          if (entry) {
            setJamIndex((jamIndex) => {
              if (!jamIndex) return {}

              return {
                ...jamIndex,
                [jam_id]: {
                  ...jamIndex[jam_id],
                  entries: [...(jamIndex[jam_id].entries || []), entry],
                },
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
