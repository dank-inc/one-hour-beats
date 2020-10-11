import { useActionCableContext } from 'contexts/ActionCableContext'
import { useEffect } from 'react'

export const useSubscription = (
  channel: string,
  params: Record<string, string>,
  refetch: () => void
) => {
  const { consumer } = useActionCableContext()

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel, ...params },
      {
        received: () => {
          console.info(`${channel} subscription update`)
          refetch()
        },
      }
    )

    console.log('Subscribed to', channel, params)

    return () => {
      console.info('Unsubscribing from', channel)
      subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel, consumer.subscriptions])

  return null
}
