import React from 'react'
import { Entry } from 'types/database'
import { Button, Card, message, Avatar } from 'antd'
import { CustomerServiceOutlined, UserOutlined } from '@ant-design/icons'
import { useUserContext } from 'contexts/UserContext'
import { voteForEntry } from 'prod/api'

type Props = {
  entry: Entry
}

export const EntryCard = ({ entry }: Props) => {
  const { user } = useUserContext()
  // cast vote! - app context - or just here?

  const castVote = () => {
    message.loading('casting vote!')
    // TODO: remove user id params
    voteForEntry(entry.id, user.id)
  }

  const listenToEntry = () => {
    message.loading('listening to entry!')
    // queue up song in footer player
  }

  return (
    <Card
      actions={[
        <Button onClick={listenToEntry}>
          <CustomerServiceOutlined /> Listen To Entry
        </Button>,
        <Button
          disabled={user.id === entry.user_id}
          type="primary"
          onClick={castVote}
        >
          Vote!
        </Button>,
      ]}
    >
      <Card.Meta
        title={entry.user_id}
        description={entry.title}
        avatar={<Avatar icon={<UserOutlined />} />}
      ></Card.Meta>
    </Card>
  )
}
