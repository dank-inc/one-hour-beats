import React from 'react'
import { Card } from 'antd'
import { Jam } from '../types/database'
import { useHistory } from 'react-router'

type Props = { jam: Jam }

export const JamCard = ({ jam }: Props) => {
  const history = useHistory()
  // would be cool if we used unsplash to randomize entry cover art!

  const handleClick = () => {
    console.log('Going to jam...', jam.id)
    history.push(`/jams/${jam.id}`)
  }

  return (
    <Card title={jam.name} hoverable onClick={handleClick}>
      <div className="jam-card">
        <p>active: true</p>
        <p>participants: 5 {jam.id}</p>
      </div>
    </Card>
  )
}
