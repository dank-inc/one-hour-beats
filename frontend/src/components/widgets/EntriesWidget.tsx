import React from 'react'
import { Card, Result, Spin } from 'antd'
import { FrownOutlined } from '@ant-design/icons'

import { EntryCard } from 'components/organisms/EntryCard'
import { EntryForm } from 'components/organisms/EntryForm'

import { useUserContext } from 'contexts/UserContext'
import { useGet } from 'hooks/useGet'

import { JamView } from 'types/Jam'
import { EntryView } from 'types/Entry'
import { canSubmit } from 'utils/time'
import { useSubscription } from 'hooks/useSubscription'

type Props = {
  jam: JamView
}

export const EntriesWidget = ({ jam }: Props) => {
  const { user } = useUserContext()

  const entries = useGet<EntryView[]>(`jams/${jam.id}/entries`)
  useSubscription('EntriesChannel', { jam_id: jam.id }, entries.refetch)

  if (entries.loading) return <Spin />
  if (entries.error)
    return <Result status="error" title="error getting entries" />

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
        <Card>
          No entries... yet! <FrownOutlined />
        </Card>
      )}
      {canSubmit(jam, user.id, entries.data) && <EntryForm jam_id={jam.id} />}
    </>
  )
}
