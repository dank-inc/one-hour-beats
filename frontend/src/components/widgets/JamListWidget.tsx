import { Empty, Row, Typography } from 'antd'
import { JamCard } from 'components/organisms/JamCard'
import React from 'react'
import { JamView } from 'types/Jam'

type Props = {
  jams: JamView[]
  title: string
}
export const JamListWidget = ({ jams, title }: Props) => {
  return (
    <>
      <Typography.Title style={{ color: '#333' }}>{title}</Typography.Title>
      <Row>
        {jams.length ? (
          jams.map((jam) => <JamCard jam={jam} key={`jam-list-${jam.id}`} />)
        ) : (
          <Empty description="No Jams 😭" />
        )}
      </Row>
    </>
  )
}
