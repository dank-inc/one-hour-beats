import React from 'react'
import { Card, Divider, Tag } from 'antd'
import { useHistory } from 'react-router'
import moment from 'moment'

import { JamView } from 'types/Jam'
import { useAppContext } from 'contexts/AppContext'

type Props = { jam: JamView }

export const JamCard = ({ jam }: Props) => {
  const history = useHistory()
  const { jamRoomUsers } = useAppContext()

  const handleClick = () => {
    history.push(`/jams/${jam.id}`)
  }

  // TODO: colors of users

  return (
    <Card
      extra={
        jam.started_at &&
        !jam.ended && (
          <p>
            ends in{' '}
            {moment(jam.started_at).add(jam.time_limit, 'minutes').fromNow()!}
          </p>
        )
      }
      style={{ flex: 1 }}
      title={jam.name}
      hoverable
      onClick={handleClick}
    >
      <Divider>Participants</Divider>
      {jamRoomUsers[jam.id]?.map((u) => (
        <Tag color="volcano">{u}</Tag>
      ))}
    </Card>
  )
}
