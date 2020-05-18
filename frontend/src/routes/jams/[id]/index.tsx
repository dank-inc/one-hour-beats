import React, { useEffect, useState } from 'react'
import { PageHeader, Button, message, Popover, Tooltip } from 'antd'
import { RoutedProps } from 'types/router'
import { Redirect } from 'react-router'
import { Clock } from 'components/Clock'
import { useAppContext } from 'contexts/AppContext'
import * as api from 'prod/api'
import { EntryCard } from 'components/EntryCard'
import { FrownOutlined, MessageTwoTone } from '@ant-design/icons'
import { EntryForm } from 'components/EntryForm'
import { Chatroom } from 'components/Chatroom'
import { ChatContextProvider } from 'contexts/ChatContext'
import { useUserContext } from 'contexts/UserContext'
import './style.scss'

type Props = RoutedProps & {}

export const JamDetails = ({ match }: Props) => {
  const { user } = useUserContext()
  const { jamIndex, subscribeToJam } = useAppContext()
  const [chatOpen, setChatOpen] = useState(false)
  const jam = jamIndex[match.params.id]

  useEffect(() => {
    const subscription = subscribeToJam(match.params.id)

    return () => {
      subscription.unsubscribe()
    }
  }, [match.params.id])

  const handleStart = async () => {
    await api.startJam(jam.id)
    message.loading('Starting challenge...', 0.25)
  }

  const handleStop = async () => {
    await api.stopJam(jam.id)
    message.loading('Stopping challenge...', 0.25)
  }

  const toggleChat = () => {
    setChatOpen(!chatOpen)
  }

  if (!jam) return <Redirect to="/jams" />
  const jamOwner = jam.user_id === user.id

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
              <Tooltip
                title={
                  jamOwner
                    ? 'Stop the Jam!'
                    : 'Only the owner can stop the jam!'
                }
              >
                <Button
                  type="primary"
                  disabled={!jamOwner}
                  onClick={handleStop}
                >
                  Stop Jam Now!
                </Button>
              </Tooltip>
            </>
          ) : (
            <Tooltip
              title={
                jamOwner
                  ? 'Start the Jam!'
                  : 'Only the owner can start the jam!'
              }
            >
              <Button type="primary" disabled={!jamOwner} onClick={handleStart}>
                Start Jam Now!
              </Button>
            </Tooltip>
          )}
        </div>
        <div className="jam-right">
          <div className="entries-wrapper">
            {jam.entries ? (
              jam.entries.map((entry) => (
                <EntryCard
                  jam_id={jam.id}
                  entry={entry}
                  key={`jam-entry-${jam.id}-${entry.id}`}
                />
              ))
            ) : (
              <div>
                No entries... yet! <FrownOutlined />
              </div>
            )}
          </div>

          {!jam.entries.find((entry) => entry.user_id === user.id) && (
            <EntryForm jam_id={jam.id} />
          )}
        </div>
      </div>
      <ChatContextProvider jam_id={match.params.id}>
        <Popover
          style={{ width: '500px' }}
          content={<Chatroom jam_id={match.params.id} />}
          title="Chatroom"
          trigger="click"
          visible={chatOpen}
        >
          <Button onClick={toggleChat}>
            <MessageTwoTone />
          </Button>
        </Popover>
      </ChatContextProvider>
    </main>
  )
}
