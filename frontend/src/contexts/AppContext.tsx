import React, { createContext, useContext, useState, useEffect } from 'react'

import { useActionCableContext } from 'contexts/ActionCableContext'
import { useSubscription } from 'hooks/useSubscription'
import { useToast } from '@chakra-ui/react'

type Props = {
  userId?: string
  children: React.ReactNode
}

type JamRoomUsers = Record<string, string[]>

type Context = {
  jamRoomUsers: JamRoomUsers
}

const AppContext = createContext<Context | null>(null)

export const AppContextProvider = ({ userId, children }: Props) => {
  // TODO pass in user from context, so we can add "Guest#2395857"
  const { consumer } = useActionCableContext()
  const [jamRoomUsers, setJamRoomUsers] = useState<JamRoomUsers>({})
  const toast = useToast()

  useSubscription('AppChannel', {}, () => {
    toast({ description: 'app context channel update' })
  })

  useEffect(() => {
    const userLocationSubscription = consumer.subscriptions.create(
      {
        channel: 'UserLocationChannel',
      },
      {
        received: (data: JamRoomUsers) => {
          console.log('User Locations Updated', data)
          setJamRoomUsers(data)
        },
      },
    )

    const get = async () => {}
    get()

    return () => {
      userLocationSubscription.unsubscribe()
    }
  }, [userId, consumer.subscriptions])

  return (
    <AppContext.Provider
      value={{
        jamRoomUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context)
    throw new Error(
      'AppContext must be called from within the AppContextProvider',
    )

  return context
}
