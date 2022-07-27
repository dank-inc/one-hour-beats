import React from 'react'
import { useGet } from 'hooks/useGet'
import { JamView } from 'types/Jam'
import { JamListWidget } from 'components/widgets/JamListWidget'
import { useSubscription } from 'hooks/useSubscription'
import { Alert, Grid, Spinner } from '@chakra-ui/react'

export const JamList = () => {
  const jams = useGet<JamView[]>('jams')
  useSubscription('JamsChannel', {}, jams.refetch)

  if (jams.loading) return <Spinner />
  if (jams.error) return <Alert title="error fetching jams" />

  return (
    <Grid>
      <JamListWidget
        title="Upcoming Jams"
        jams={jams.data.filter((j) => !j.started_at && !j.ended)}
      />
      <JamListWidget
        title="In Progress"
        jams={jams.data.filter((j) => j.started_at && !j.ended)}
      />
      <JamListWidget
        title="Finished Jams"
        jams={jams.data.filter((j) => j.ended)}
      />
    </Grid>
  )
}
