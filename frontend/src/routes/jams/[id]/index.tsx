import React, { useState } from 'react'
import moment from 'moment'

import { PageHeader, Button, Popover, Card, Tooltip, Descriptions } from 'antd'
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
import { Clock } from 'components/Clock'
import { jamInProgress, canSubmit } from 'utils/time'
import { useJamContext } from 'contexts/JamContext'

import './style.scss'

type Props = RoutedProps & {}

export const JamDetails = ({ match }: Props) => {
  const { user } = useUserContext()
  const { entries } = useJamContext()

  const { jamIndex } = useAppContext()
  const [chatOpen, setChatOpen] = useState(false)

  const jam = jamIndex[match.params.id]

  const toggleChat = () => {
    setChatOpen(!chatOpen)
  }

  const handleClick = () => {
    if (chatOpen) setChatOpen(false)
  }

  if (!jam) return <Redirect to="/jams" />
  const hasSubmitted = entries?.find((entry) => entry.user_id === user.id)

  return (
    <>
      <main onClick={handleClick}>
        <PageHeader
          className="site-page-header"
          title={jam.name}
          extra={[<JamControl key={`JamControl-${jam.id}`} jam={jam} />]}
        >
          <Descriptions column={3}>
            <Descriptions.Item label="Time Limit">
              {jam.time_limit} minutes
            </Descriptions.Item>
            <Descriptions.Item label="Started At">
              {jam.started_at
                ? moment(jam.started_at).format('MMM DD, YYYY @ HH:mm:ss')
                : `Challenge Has Not Started!`}
            </Descriptions.Item>
            <Descriptions.Item label="Ends">
              {jam.started_at
                ? moment(jam.started_at)
                    .add(jam.time_limit, 'minutes')
                    .fromNow()
                : `Challenge Has Not Started!`}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
        <Card>
          <div className="main-content jam-details">
            <div className="jam-left">
              <div className="jam-info">
                <Card>
                  <Tooltip
                    title={
                      jam.started_at
                        ? 'This is your prompt! Make a song that matches this!'
                        : 'You have to wait till the jam starts to see the prompt!'
                    }
                  >
                    <h2 className={jam.started_at ? 'bouncing' : 'blurred'}>
                      {jam.started_at
                        ? jam.description
                        : 'This prompt is hidden, stop trying to cheat, you dirty cheater!'}
                    </h2>
                  </Tooltip>
                </Card>
                {jamInProgress(jam) && (
                  <Card>
                    <Clock jam={jam} />
                  </Card>
                )}
              </div>
            </div>
            <div className="jam-right">
              <div className="entries-wrapper">
                {entries?.length ? (
                  entries.map((entry) => (
                    <EntryCard
                      jam_id={jam.id}
                      entry={entry}
                      key={`jam-entry-${jam.id}-${entry.id}`}
                    />
                  ))
                ) : (
                  <Card>
                    No entries... yet! <FrownOutlined />
                  </Card>
                )}
              </div>

              {canSubmit(jam, user.id, entries) && (
                <EntryForm jam_id={jam.id} />
              )}
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
