import React from 'react'
import { Button, Card, message, Avatar, Popconfirm } from 'antd'
import {
  UserOutlined,
  FireTwoTone,
  CustomerServiceOutlined,
} from '@ant-design/icons'
import { useUserContext } from 'contexts/UserContext'
import { deleteEntry, voteForEntry } from 'api'
import { EntryView } from 'types/Entry'
import { useDankAmpContext } from 'contexts/DankAmpContext'

type Props = {
  entry: EntryView
  jam_id: string
}

export const EntryCard = ({ entry, jam_id }: Props) => {
  const { user } = useUserContext()
  const { song, selectSong } = useDankAmpContext()

  const castVote = () => {
    message.loading('casting vote!')
    voteForEntry(entry.id)
  }

  const listenToEntry = () => {
    selectSong(entry)
  }

  const handleDelete = () => {
    deleteEntry(entry.id)
  }

  const vote_token = user?.vote_tokens?.find((token) => token.jam_id === jam_id)
  const canVote =
    vote_token && !vote_token.entry_id && entry.user_id !== user?.id

  return (
    <Card
      actions={[
        <Button onClick={listenToEntry}>
          <CustomerServiceOutlined
            className={song?.id === entry.id ? 'song-playing' : ''}
          />{' '}
          Listen To Entry
        </Button>,
        entry.user_id === user?.id ? (
          <Popconfirm title="Really Delete?" onConfirm={handleDelete}>
            <Button danger>Delete</Button>
          </Popconfirm>
        ) : null,
        <Popconfirm
          disabled={!canVote}
          title="Cast your vote?"
          onConfirm={castVote}
        >
          <Button disabled={!canVote}>Vote!</Button>
        </Popconfirm>,
      ]}
      title={`${entry.artist_name} - ${entry.title}`}
      extra={entry.votes?.map((user_id) => (
        <FireTwoTone
          twoToneColor="#fa541c"
          key={`vote-${jam_id}-${entry.id}-${user_id}`}
        />
      ))}
    >
      <Card.Meta
        description={`some metdata`}
        // todo: user icon
        avatar={<Avatar icon={<UserOutlined />} />}
      ></Card.Meta>
    </Card>
  )
}
