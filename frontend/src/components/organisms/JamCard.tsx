import React from 'react'
import { Card, Row, Tag, Tooltip } from 'antd'
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

  const inProgress = jam.started_at && !jam.ended

  return (
    <Tooltip title={`${jam.created_by} - ${jam.name}`}>
      <Card
        className="jam-card"
        extra={
          inProgress ? (
            <p>
              ends in{' '}
              {moment(jam.started_at).add(jam.time_limit, 'minutes').fromNow()}!
            </p>
          ) : jam.ended ? (
            <p>
              ended{' '}
              {moment(jam.started_at).add(jam.time_limit, 'minutes').fromNow()}
            </p>
          ) : (
            <p>starts {moment(jam.scheduled_at).fromNow()}</p>
          )
        }
        title={jam.name}
        hoverable
        onClick={handleClick}
      >
        <Row>Created by {jam.created_by}</Row>
        <Row>
          In Room Now:
          {jamRoomUsers[jam.id]?.map((u) => (
            <Tag color="volcano">{u}</Tag>
          ))}
        </Row>
      </Card>
    </Tooltip>
  )
}
