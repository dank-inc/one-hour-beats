import React, { useState, useEffect } from 'react'
import { Button, Card, message, Avatar, Tooltip } from 'antd'
import { CustomerServiceOutlined, UserOutlined } from '@ant-design/icons'
import { useUserContext } from 'contexts/UserContext'
import { voteForEntry } from 'prod/api'
import { EntryView } from 'types/view'

type Props = {
  entry: EntryView
  jam_id: string
}

export const EntryCard = ({ entry, jam_id }: Props) => {
  const { user } = useUserContext()
  const [canVote, setCanVote] = useState(false)
  const [tooltipTitle, setTooltipTitle] = useState('')
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

  useEffect(() => {
    const vote_token = user.vote_tokens.find((token) => token.jam_id === jam_id)
    console.log('Vote Has Been Cast!', vote_token)

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
  }, [user.vote_tokens])

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
    >
      <Card.Meta
        title={entry.artist_name}
        description={entry.title}
        avatar={<Avatar icon={<UserOutlined />} />}
      ></Card.Meta>
    </Card>
  )
}
