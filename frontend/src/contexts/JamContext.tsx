import React, { createContext, useContext, useState, useEffect } from 'react'
import { keyBy } from 'lodash'
import { EntryView } from 'types/view'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { getEntriesForJam } from 'api'
import { useActionCableContext } from './ActionCableContext'
import { useUserContext } from './UserContext'

type Props = {
  children: React.ReactNode
}
type Context = {
  entryIndex: Record<string, EntryView> | null
  entries: EntryView[] | null
}
type Match = {
  id: string
  view?: string
}

type JamContextResponse = {
  entry: EntryView
}

const JamContext = createContext<Context | null>(null)

export const JamContextProvider = ({ children }: Props) => {
  const match = useRouteMatch<Match>()
  const { user } = useUserContext()
  const { consumer } = useActionCableContext()
  const location = useLocation()
  const [entryIndex, setEntryIndex] = useState<Record<
    string,
    EntryView
  > | null>(null)

  useEffect(() => {
    // use route to see where the user is
    const get = async (id: string) => {
      const entries = await getEntriesForJam(id)
      setEntryIndex(keyBy(entries, 'id'))
    }

    if (location.pathname.includes('/jams/')) {
      const jam_id = location.pathname.split('/jams/')[1]
      get(jam_id)
      const subscription = consumer.subscriptions.create(
        {
          channel: 'JamroomChannel',
          jam_id,
          user_id: user.id,
        },
        {
          received: ({ entry }: JamContextResponse) => {
            console.log('entries updated', entry)

            setEntryIndex((entryIndex) => {
              return { ...entryIndex, [entry.id]: entry }
            })
          },
        }
      )

      return () => {
        subscription.unsubscribe()
      }
    } else {
      setEntryIndex(null)
    }

    return () => {}
  }, [match.params.id, location.pathname])

  return (
    <JamContext.Provider
      value={{
        entryIndex,
        entries: entryIndex ? Object.values(entryIndex) : null,
      }}
    >
      {children}
    </JamContext.Provider>
  )
}

export const useJamContext = () => {
  const context = useContext(JamContext)

  if (!context)
    throw new Error(
      'JamContext must be called from within the JamContextProvider'
    )

  return context
}
