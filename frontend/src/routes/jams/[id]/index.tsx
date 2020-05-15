import React from 'react'
import { PageHeader, Card, Input, Row, Col } from 'antd'
import { RoutedProps } from 'types/router'
import { Redirect } from 'react-router'
import { Clock } from 'components/Clock'
import { useAppContext } from 'contexts/AppContext'
import './style.scss'
import { ChatCard } from 'components/ChatCard'
import { chatIndex } from 'mock/chats'
import { EntryCard } from 'components/EntryCard'
import { FrownOutlined } from '@ant-design/icons'
import { EntryForm } from 'components/EntryForm'

type Props = RoutedProps & {}

export const JamDetails = ({ match }: Props) => {
  const { jamIndex } = useAppContext()
  const chats = chatIndex[match.params.id] // TODO: ChatContext
  const jam = jamIndex[match.params.id]

  const { Search } = Input

  if (!jam) return <Redirect to="/jams" />

  console.log(jam)

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

          {jam.started_at ? <Clock jam={jam} /> : <p>Jam Not Started...</p>}
        </div>
        <div className="jam-right">
          {jam.entries ? (
            jam.entries.map((entry, i) => (
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
                chats.map((chat, i) => <ChatCard chat={chat} />)
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
            <Search
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
