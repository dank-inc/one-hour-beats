import React, { useEffect } from 'react'
import { PageHeader, Card, Input, Row, Col, Button, message } from 'antd'
import { RoutedProps } from 'types/router'
import { Redirect } from 'react-router'
import { Clock } from 'components/Clock'
import { useAppContext, AppContextProvider } from 'contexts/AppContext'
import './style.scss'
import { ChatCard } from 'components/ChatCard'
import { chatIndex } from 'mock/chats'
import * as api from 'prod/api'
import { EntryCard } from 'components/EntryCard'
import { FrownOutlined } from '@ant-design/icons'
import { EntryForm } from 'components/EntryForm'
import { useActionCableContext } from 'contexts/ActionCableContext'

type Props = RoutedProps & {}

export const JamDetails = ({ match }: Props) => {
  const { jamIndex, subscribeToJam, unsubscribeFromJam } = useAppContext()
  const { consumer } = useActionCableContext()
  const chats = chatIndex[match.params.id] // TODO: ChatContext
  const jam = jamIndex[match.params.id]

  useEffect(() => {
    subscribeToJam(match.params.id)
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
            jam.entries.map((entry, i) => (
              <EntryCard
                entry={entry}
                key={`jam-entry-${jam.id}-${entry.id}-${i}`}
              />
            ))
          ) : (
            <div>
              No entries... yet! <FrownOutlined />
            </div>
          )}

          <EntryForm />

          <h1>Chatroom</h1>
          <div>
            <Card
              style={{
                width: 400,
                height: 400,
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {chats ? (
                chats.map((chat, i) => (
                  <ChatCard
                    key={`chat-message-${chat.user_id}-${i}`}
                    chat={chat}
                  />
                ))
              ) : (
                <Row align="bottom" justify="center" gutter={[2, 16]}>
                  <Col span={19}>
                    <div
                      style={{
                        borderRadius: 15,
                        backgroundColor: '#fdfacf',
                        padding: 5,
                        textAlign: 'center',
                      }}
                    >
                      Break the ice!
                    </div>
                  </Col>
                </Row>
              )}
            </Card>
            <Input.Search
              placeholder="Send a chat message..."
              enterButton="Send"
              size="large"
              onSearch={(value) => console.log(value)}
              style={{
                width: 400,
                margin: 16,
                marginTop: -16,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
