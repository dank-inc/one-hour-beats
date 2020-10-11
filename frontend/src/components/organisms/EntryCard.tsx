import React, { useState, useEffect } from 'react'
import { Button, Card, message, Avatar, Tooltip } from 'antd'
import {
  CustomerServiceOutlined,
  UserOutlined,
  FireTwoTone,
} from '@ant-design/icons'
import { useUserContext } from 'contexts/UserContext'
import { voteForEntry } from 'api'
import { EntryView } from 'types/Entry'
import { useDankAmpContext } from 'contexts/DankAmpContext'

type Props = {
  entry: EntryView
  jam_id: string
}

export const EntryCard = ({ entry, jam_id }: Props) => {
  const { user } = useUserContext()
  const { selectSong } = useDankAmpContext()
  const [canVote, setCanVote] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState('')

  const castVote = () => {
    message.loading('casting vote!')
    voteForEntry(entry.id)
  }

  const listenToEntry = () => {
    selectSong(entry)
  }

  useEffect(() => {
    const vote_token = user.vote_tokens.find((token) => token.jam_id === jam_id)
    if (!vote_token) {
      setTooltipTitle('you must submit a song before you can vote')
    } else if (vote_token.entry_id) {
      setTooltipTitle('you have already voted!')
      setCanVote(false)
    } else if (user.id === entry.user_id) {
      setTooltipTitle('You cannot vote on yourself!')
    } else {
      setCanVote(true)
      setTooltipTitle('Cast your vote!')
    }
  }, [user.vote_tokens, user.id, jam_id, entry.user_id])

  return (
    <Card
      actions={[
        <Button onClick={listenToEntry}>
          <CustomerServiceOutlined /> Listen To Entry
        </Button>,
        <Tooltip title={tooltipTitle}>
          <Button disabled={!canVote} type="primary" onClick={castVote}>
            Vote!
          </Button>
        </Tooltip>,
      ]}
      title={entry.artist_name}
      extra={entry.votes?.map((user_id) => (
        <FireTwoTone
          twoToneColor="#fa541c"
          key={`vote-${jam_id}-${entry.id}-${user_id}`}
        />
      ))}
    >
      <Card.Meta
        description={entry.title}
        avatar={<Avatar icon={<UserOutlined />} />}
      ></Card.Meta>
    </Card>
  )
}
