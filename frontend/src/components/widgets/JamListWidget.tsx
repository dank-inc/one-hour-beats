import { Row, Typography } from 'antd'
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
      <Typography.Title>{title}</Typography.Title>
      <Row className="jam-list">
        {jams.length ? (
          jams.map((jam) => <JamCard jam={jam} key={`jam-list-${jam.id}`} />)
        ) : (
          <Typography.Text>Nothing Here...</Typography.Text>
        )}
      </Row>
    </>
  )
}
