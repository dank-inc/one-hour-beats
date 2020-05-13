import React from 'react'
import { PageHeader } from 'antd'
import './style.scss'
import { JamCard } from 'components/JamCard'
import moment from 'moment'
import { jams } from 'mock/jams'
import { useUserContext } from 'contexts/UserContext'

window.moment = moment

export const Jams = () => {
  const { user } = useUserContext()

  return (
    <main>
      <PageHeader
        title="Jams"
        subTitle={`Welcome ${user.name}, Pick a challenge and get jammin!`}
      />
      <div className="main-content">
        {jams.map((jam, i) => (
          <JamCard jam={jam} key={jam.id} />
        ))}
      </div>
    </main>
  )
}
