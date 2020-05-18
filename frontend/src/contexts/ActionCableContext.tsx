import React, { createContext, useContext, useState, useEffect } from 'react'
import ActionCable from 'actioncable'
import { Spin, message } from 'antd'
import { useUserContext } from './UserContext'

type Props = {
  children: React.ReactNode
}
type Context = {
  consumer: ActionCable.Cable
}

const ActionCableContext = createContext<Context | null>(null)

export const ActionCableContextProvider = ({ children }: Props) => {
  const { user } = useUserContext()
  const [consumer, setConsumer] = useState<ActionCable.Cable | null>(null)

  useEffect(() => {
    const consumer = ActionCable.createConsumer()
    consumer.connect()
    message.success('action consumer connected!', 0.5)
    setConsumer(consumer)

    return () => {
      consumer.disconnect()
    }
  }, [])

  return consumer ? (
    <ActionCableContext.Provider value={{ consumer }}>
      {children}
    </ActionCableContext.Provider>
  ) : (
    <Spin tip="Connecting Action Cable" />
  )
}

export const useActionCableContext = () => {
  const context = useContext(ActionCableContext)

  if (!context)
    throw new Error(
      'ActionCableContext must be called from within the XContextProvider'
    )

  return context
}
