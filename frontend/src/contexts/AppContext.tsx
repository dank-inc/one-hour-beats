import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUserContext } from './UserContext'
import { Jam, Chat } from '../types/database'
import { JamView } from '../types/view'
import { Spin } from 'antd'
import * as api from 'prod/api'
import { useActionCableContext } from './ActionCableContext'

type Props = {
  children: React.ReactNode
}

type JamRoomUsers = Record<string, string[]>

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
  const [jamIndex, setJamIndex] = useState<Record<string, Jam> | null>(null)
  const [jamRoomUsers, setJamRoomUsers] = useState<JamRoomUsers>({})

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
          console.log('Jam Room User Lists Updated!', data)
          setJamRoomUsers(data)
        },
      }
    )

    const get = async () => {
      setJamIndex(await api.getJamIndex())
    }
    get()

    return () => {
      subscription.unsubscribe()
    }

    // const jamRoomListener = consumer.subscriptions.create({channel: 'jam'})
  }, [])

  const subscribeToJam = (jam_id: string) => {
    return consumer.subscriptions.create(
      {
        channel: 'JamroomChannel',
        jam_id,
        user_id: user.id,
      },
      {
        received: (data: Chat) => {
          console.log('updating chat', data)
          // append to chat log
        },
      }
    )
  }

  const unsubscribeFromJam = (id: string) => {}

  return jamIndex ? (
    <AppContext.Provider
      value={{ jamIndex, subscribeToJam, unsubscribeFromJam, jamRoomUsers }}
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
