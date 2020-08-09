import React from 'react'
import { PageHeader, Empty, Button } from 'antd'
import './style.scss'
import { JamCard } from 'components/JamCard'
import moment from 'moment'
import { useUserContext } from 'contexts/UserContext'
import { useAppContext } from 'contexts/AppContext'
import { RouteChildrenProps } from 'react-router'

window.moment = moment

export const Jams = ({ history }: RouteChildrenProps) => {
  const { user } = useUserContext()
  const { jamIndex, jamRoomUsers } = useAppContext()

  return (
    <main>
      <PageHeader
        className="site-page-header"
        title="Jams"
        subTitle={`Welcome ${user.name}, Pick a challenge and get jammin!`}
      />
      <div className="main-content jam-cards">
        {Object.values(jamIndex)?.length ? (
          Object.values(jamIndex).map((jam) => (
            <JamCard
              jam={jam}
              key={`jam-list-${jam.id}-${jam.user_id}`}
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
      </div>
    </main>
  )
}
