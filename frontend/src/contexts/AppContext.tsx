import React, { createContext, useContext, useState, useEffect } from 'react'
import { keyBy } from 'lodash'
import { Spin, message } from 'antd'

import * as api from 'api'
import { JamView, UserView, SystemMessage } from 'types/view'
import { mockJams } from 'api/mock/jams'

import { useUserContext } from 'contexts/UserContext'
import { useActionCableContext } from 'contexts/ActionCableContext'

type Props = {
  children: React.ReactNode
}

type JamRoomUsers = Record<string, string[]>

type Context = {
  jamIndex: Record<string, JamView>
  jamRoomUsers: JamRoomUsers
}

const AppContext = createContext<Context | null>(null)

export const AppContextProvider = ({ children }: Props) => {
  const { user, setUser } = useUserContext()
  const { consumer } = useActionCableContext()
  const [jamIndex, setJamIndex] = useState<Record<string, JamView> | null>(null)
  const [jamRoomUsers, setJamRoomUsers] = useState<JamRoomUsers>({})

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('loading mock jams =>', mockJams)
      const jamIndex = keyBy(mockJams, 'id')
      setJamIndex(jamIndex)
      return
    }

    const userLocationSubscription = consumer.subscriptions.create(
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

    const userContextSubscription = consumer.subscriptions.create(
      {
        channel: 'UserContextChannel',
        user_id: user.id,
      },
      {
        received: (user: UserView) => {
          console.log('user updating', user)
          setUser(user)
        },
      }
    )

    const appContextSubscription = consumer.subscriptions.create(
      {
        channel: 'AppContextChannel',
      },
      {
        received: ({ jam }) => {
          if (jam) {
            setJamIndex((jamIndex) => {
              console.log('jams updated', jam, jamIndex)

              return {
                ...jamIndex,
                [jam.id]: jam,
              }
            })
          }
        },
      }
    )

    const notificationsSubscription = consumer.subscriptions.create(
      {
        channel: 'NotificationsChannel',
      },
      {
        received: ({ status, body }: SystemMessage) => {
          if (status === 'error') message.error(body)
          if (status === 'ok') message.success(body)
        },
      }
    )

    const get = async () => {
      const data = await api.getJamIndex()
      if (data) setJamIndex(data)
    }
    get()

    return () => {
      notificationsSubscription.unsubscribe()
      userContextSubscription.unsubscribe()
      userLocationSubscription.unsubscribe()
      appContextSubscription.unsubscribe()
    }
  }, [user.id])

  return jamIndex ? (
    <AppContext.Provider
      value={{
        jamIndex,
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
