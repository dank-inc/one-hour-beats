import React from 'react'
import { Spin, Result, Layout } from 'antd'
import { useGet } from 'hooks/useGet'
import { JamView } from 'types/Jam'
import { JamListWidget } from 'components/widgets/JamListWidget'
import { useSubscription } from 'hooks/useSubscription'

export const JamList = () => {
  const jams = useGet<JamView[]>('jams')
  useSubscription('JamsChannel', {}, jams.refetch)

  if (jams.loading) return <Spin />
  if (jams.error) return <Result title="error fetching jams" />

  return (
    <Layout.Content>
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
    </Layout.Content>
  )
}
