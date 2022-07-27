import React, { createContext, useContext, useState, useEffect } from 'react'
import ActionCable from 'actioncable'
import { Spinner, useToast } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}
type Context = {
  consumer: ActionCable.Cable
}

const ActionCableContext = createContext<Context | null>(null)

export const ActionCableContextProvider = ({ children }: Props) => {
  // TODO this can be a hook maybe?
  // simplify subscriptions
  const [consumer, setConsumer] = useState<ActionCable.Cable | null>(null)
  const toast = useToast()

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setConsumer(ActionCable.createConsumer())
      return
    }

    const consumer = ActionCable.createConsumer()
    consumer.connect()
    toast({ description: 'action consumer connected!', duration: 500 })
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
    <Spinner label="Connecting Action Cable" />
  )
}

export const useActionCableContext = () => {
  const context = useContext(ActionCableContext)

  if (!context)
    throw new Error(
      'ActionCableContext must be called from within its Provider',
    )

  return context
}
