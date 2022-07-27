import React from 'react'
import { useNavigate } from 'react-router'

import { JamView } from 'types/Jam'
import { useAppContext } from 'contexts/AppContext'
import { Tag, Tooltip } from '@chakra-ui/react'
import { Card } from 'components/elements/Card'
import { DateTime } from 'luxon'
import { Row } from 'components/elements/Row'

type Props = { jam: JamView }

export const JamCard = ({ jam }: Props) => {
  const navigate = useNavigate()
  const { jamRoomUsers } = useAppContext()

  const handleClick = () => {
    navigate(`/jams/${jam.id}`)
  }

  const inProgress = jam.started_at && !jam.ended

  const startedAt = DateTime.fromISO(jam.started_at!)

  return (
    <Tooltip title={`${jam.created_by} - ${jam.name}`}>
      <Card
        bgColor="gray.200"
        padding="1rem"
        cursor="pointer"
        extra={
          inProgress ? (
            <p>
              ends in {startedAt.plus({ minutes: jam.time_limit }).toRelative()}
              !
            </p>
          ) : jam.ended ? (
            <p>
              ended {startedAt.plus({ minutes: jam.time_limit }).toRelative()}
            </p>
          ) : (
            <p>starts {DateTime.fromISO(jam.scheduled_at).toRelative()}</p>
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
