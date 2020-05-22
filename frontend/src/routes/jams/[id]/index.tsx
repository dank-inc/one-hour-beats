import React, { useEffect, useState } from 'react'

import { PageHeader, Button, Popover, Card } from 'antd'
import { RoutedProps } from 'types/router'
import { Redirect } from 'react-router'
import { useAppContext } from 'contexts/AppContext'
import { EntryCard } from 'components/EntryCard'
import { FrownOutlined, MessageTwoTone } from '@ant-design/icons'
import { EntryForm } from 'components/EntryForm'
import { Chatroom } from 'components/Chatroom'
import { ChatContextProvider } from 'contexts/ChatContext'
import { useUserContext } from 'contexts/UserContext'
import { JamControl } from '../JamControl'

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

  const toggleChat = () => {
    setChatOpen(!chatOpen)
  }

  const handleClick = () => {
    if (chatOpen) setChatOpen(false)
  }

  if (!jam) return <Redirect to="/jams" />
  const hasSubmitted = jam.entries.find((entry) => entry.user_id === user.id)

  return (
    <>
      <main onClick={handleClick}>
        <PageHeader
          className="site-page-header"
          title={jam.name}
          subTitle={jam.description}
        />
        <Card>
          <div className="main-content jam-details">
            <div className="jam-left">
              <div className="jam-info">
                <p>Name: {jam.name}</p>
                <p>Description: {jam.description}</p>
                <p>time limit: {jam.time_limit} minutes</p>

                {jam.started_at && <p>started at: {jam.started_at}</p>}
              </div>

              <JamControl jam={jam} />
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

              {!hasSubmitted && jam.started_at && <EntryForm jam_id={jam.id} />}
            </div>
          </div>
        </Card>
      </main>
      <ChatContextProvider jam_id={match.params.id}>
        <Popover
          style={{ width: '500px' }}
          placement="topLeft"
          content={<Chatroom jam_id={match.params.id} />}
          title="Chatroom"
          trigger="click"
          visible={chatOpen}
        >
          <Button type="link" onClick={toggleChat} className="chat-button">
            <MessageTwoTone />
          </Button>
        </Popover>
      </ChatContextProvider>
    </>
  )
}
