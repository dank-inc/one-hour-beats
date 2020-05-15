import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUserContext } from './UserContext'
import { Jam } from '../types/database'
import { JamView } from '../types/view'
import { Spin } from 'antd'
import * as api from 'prod/api'
import { useActionCableContext } from './ActionCableContext'

type Props = {
  children: React.ReactNode
}
type Context = {
  jamIndex: Record<string, JamView>
  subscribeToJam: (id: string) => void
  unsubscribeFromJam: (id: string) => void
}

const AppContext = createContext<Context | null>(null)

export const AppContextProvider = ({ children }: Props) => {
  const { user } = useUserContext()
  const { consumer } = useActionCableContext()
  const [jamIndex, setJamIndex] = useState<Record<string, Jam> | null>(null)
  const [jamRoomMeta, setJamRoomMeta] = useState<Record<string, string[]>>({})

  useEffect(() => {
    // fetch all jams w/ entries w/ votes
    // get user's voteTokens
    // set up jam socket listeners (attendance, status, blah)

    // setJamSocket Listener
    // - socket returns an object like {id: jamID, body: jam}
    // setJamIndex({...jamIndex, [id]: body})

    // jamRoom Listener
    // - index of all users in jam rooms
    // - can refresh whole thing, small

    const get = async () => {
      setJamIndex(await api.getJamIndex())
    }
    get()
  }, [])

  const subscribeToJam = (id: string) => {
    consumer.subscriptions.create({
      channel: 'JamroomChannel',
      id,
    })
  }

  const unsubscribeFromJam = (id: string) => {}

  return jamIndex ? (
    <AppContext.Provider
      value={{ jamIndex, subscribeToJam, unsubscribeFromJam }}
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
