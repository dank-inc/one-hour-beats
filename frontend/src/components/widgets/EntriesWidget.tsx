import React from 'react'
import { EntryCard } from 'components/widgets/EntryCard'
import { EntryForm } from 'components/widgets/EntryForm'

import { useUserContext } from 'contexts/UserContext'
import { useGet } from 'hooks/useGet'

import { JamView } from 'types/Jam'
import { EntryView } from 'types/Entry'
import { canSubmit } from 'utils/time'
import { useSubscription } from 'hooks/useSubscription'
import { Link } from 'react-router-dom'
import { Alert, Box, Spinner } from '@chakra-ui/react'

type Props = {
  jam: JamView
}

export const EntriesWidget = ({ jam }: Props) => {
  const { user } = useUserContext()

  const entries = useGet<EntryView[]>(`jams/${jam.id}/entries`)
  useSubscription('EntriesChannel', { jam_id: jam.id }, entries.refetch)

  if (entries.loading) return <Spinner />
  if (entries.error)
    return <Alert status="error" title="error getting entries" />

  return (
    <>
      {entries.data.length ? (
        entries.data.map((entry) => (
          <EntryCard
            jam_id={jam.id}
            entry={entry}
            key={`jam-entry-${jam.id}-${entry.id}`}
          />
        ))
      ) : (
        <Box>No entries... yet! 😭</Box>
      )}
      {!user ? (
        <Box>
          You must be logged in to enter! <Link to="/about">Find out more</Link>
        </Box>
      ) : (
        canSubmit(jam, entries.data, user?.id) && <EntryForm jam_id={jam.id} />
      )}
    </>
  )
}
