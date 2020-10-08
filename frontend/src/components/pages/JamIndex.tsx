import React from 'react'
import { RouteChildrenProps } from 'react-router'
import { PageHeader, Empty, Button, Row } from 'antd'
import moment from 'moment'

import { JamCard } from 'components/JamCard'

import { useUserContext } from 'contexts/UserContext'
import { useAppContext } from 'contexts/AppContext'

window.moment = moment

export const JamIndex = ({ history }: RouteChildrenProps) => {
  const { user } = useUserContext()
  const { jamIndex, jamRoomUsers } = useAppContext()

  return (
    <>
      <PageHeader
        title="Jams"
        subTitle={`Welcome ${user.name}, Pick a challenge and get jammin!`}
      />
      <Row>
        {Object.values(jamIndex)?.length ? (
          Object.values(jamIndex).map((jam) => (
            <JamCard
              jam={jam}
              key={`jam-list-${jam.id}`}
              users={jamRoomUsers[jam.id]}
            />
          ))
        ) : (
          <Empty description="No Jams here!">
            <Button onClick={() => history.push('/create')}>
              Go Make One!
            </Button>
          </Empty>
        )}
      </Row>
    </>
  )
}
