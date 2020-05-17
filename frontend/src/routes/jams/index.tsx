import React from 'react'
import { PageHeader } from 'antd'
import './style.scss'
import { JamCard } from 'components/JamCard'
import moment from 'moment'
import { useUserContext } from 'contexts/UserContext'
import { useAppContext } from 'contexts/AppContext'

window.moment = moment

export const Jams = () => {
  const { user } = useUserContext()
  const { jamIndex, jamRoomUsers } = useAppContext()

  return (
    <main>
      <PageHeader
        title="Jams"
        subTitle={`Welcome ${user.name}, Pick a challenge and get jammin!`}
      />
      <div className="main-content">
        {Object.entries(jamIndex).map(([id, jam]) => (
          <JamCard
            jam={jam}
            key={`jam-list-${id}`}
            users={jamRoomUsers[jam.id]}
          />
        ))}
      </div>
    </main>
  )
}
