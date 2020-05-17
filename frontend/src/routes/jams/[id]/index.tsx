import React, { useEffect, useState } from 'react'
import { PageHeader, Button, message } from 'antd'
import { RoutedProps } from 'types/router'
import { Redirect } from 'react-router'
import { Clock } from 'components/Clock'
import { useAppContext } from 'contexts/AppContext'
import './style.scss'
import * as api from 'prod/api'
import { EntryCard } from 'components/EntryCard'
import { FrownOutlined } from '@ant-design/icons'
import { EntryForm } from 'components/EntryForm'
import { Chat } from 'types/database'
import { Chatroom } from 'components/Chatroom'

type Props = RoutedProps & {}

export const JamDetails = ({ match }: Props) => {
  const { jamIndex, subscribeToJam } = useAppContext()
  const [chats, setChats] = useState<Chat[] | null>([])
  const jam = jamIndex[match.params.id]

  useEffect(() => {
    const subscription = subscribeToJam(match.params.id)

    console.log('subscription created for ', jam.id, subscription)

    return () => {
      subscription.unsubscribe()
    }
  }, [match.params.id])

  const handleStart = async () => {
    await api.startJam(jam.id)
    message.loading('Starting challenge...')
  }

  const handleStop = async () => {
    await api.stopJam(jam.id)
    message.loading('Stopping challenge...')
  }

  if (!jam) return <Redirect to="/jams" />

  console.log('Jam Room Render', jam.id, jam.entries)

  return (
    <main>
      <PageHeader title={jam.name} subTitle={jam.description} />
      <div className="main-content jam-details">
        <div className="jam-left">
          <div className="jam-info">
            <p>Name: {jam.name}</p>
            <p>Description: {jam.description}</p>
            <p>time limit: {jam.time_limit} minutes</p>

            {jam.started_at && <p>started at: {jam.started_at}</p>}
          </div>

          {jam.started_at ? (
            <>
              <Clock jam={jam} />
              <Button type="primary" onClick={handleStop}>
                Stop Jam Now!
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={handleStart}>
              Start Jam Now!
            </Button>
          )}
        </div>
        <div className="jam-right">
          {jam.entries ? (
            jam.entries.map((entry) => (
              <EntryCard
                entry={entry}
                key={`jam-entry-${jam.id}-${entry.id}`}
              />
            ))
          ) : (
            <div>
              No entries... yet! <FrownOutlined />
            </div>
          )}

          <EntryForm jam_id={jam.id} />

          {chats && <Chatroom jam_id={jam.id} chats={chats} />}
        </div>
      </div>
    </main>
  )
}
