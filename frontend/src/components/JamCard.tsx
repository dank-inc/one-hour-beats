import React from 'react'
import { Card, Tag } from 'antd'
import { useHistory } from 'react-router'
import { Jam } from 'types/database'

type Props = { jam: Jam; users?: string[] }

export const JamCard = ({ jam, users }: Props) => {
  const history = useHistory()
  // would be cool if we used unsplash to randomize entry cover art!

  const handleClick = () => {
    history.push(`/jams/${jam.id}`)
  }

  return (
    <Card title={jam.name} hoverable onClick={handleClick}>
      <div className="jam-card">
        <p>active: true</p>
        <p>
          participants:{' '}
          {users?.map((u) => (
            <Tag color="volcano">{u}</Tag>
          ))}
        </p>
      </div>
    </Card>
  )
}
