import React, { createContext, useContext, useState, useEffect } from 'react'
import actioncable from 'actioncable'
import { Spin, message } from 'antd'

type Props = {
  children: React.ReactNode
}
type Context = {
  cable: ActionCable.Cable
}

const ActionCableContext = createContext<Context | null>(null)

export const ActionCableContextProvider = ({ children }: Props) => {
  const [cable, setCable] = useState<ActionCable.Cable | null>(null)

  useEffect(() => {
    const consumer = actioncable.createConsumer()
    consumer.connect()
    message.success('action cable connected!', 0.5)
    setCable(consumer)

    return () => {
      consumer.disconnect()
    }
  }, [])

  return cable ? (
    <ActionCableContext.Provider value={{ cable }}>
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
