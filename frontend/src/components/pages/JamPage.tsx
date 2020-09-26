import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { PageHeader, Card, Tooltip, Descriptions, Tag, Row, Col } from 'antd'
import { Redirect, RouteComponentProps } from 'react-router'
import { jamInProgress, canSubmit } from 'utils/time'
import { FrownOutlined, MessageTwoTone } from '@ant-design/icons'

import { EntryCard } from 'components/EntryCard'
import { EntryForm } from 'components/EntryForm'
import { Chatroom } from 'components/Chatroom'
import { Clock } from 'components/Clock'
import { JamControl } from 'components/organisms/JamControl'

import { ChatContextProvider } from 'contexts/ChatContext'
import { useUserContext } from 'contexts/UserContext'
import { useAppContext } from 'contexts/AppContext'
import { useJamContext } from 'contexts/JamContext'

type Props = RouteComponentProps<{ id: string }> & {}

export const JamDetails = ({ match }: Props) => {
  const { user } = useUserContext()
  const { entries } = useJamContext()
  const { jamIndex, jamRoomUsers } = useAppContext()

  const jam = jamIndex[match.params.id]
  const users = jamRoomUsers[match.params.id]

  useEffect(() => {
    // ya
    return () => {
      document.title = `One Hour Beats - ${jam.name}`
    }
  }, [])

  if (!jam) return <Redirect to="/jams" />

  const hasSubmitted = entries?.find((entry) => entry.user_id === user.id)

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={jam.name}
        subTitle={users?.map((user) => (
          <Tag key={`user-list-${user}`}>{user}</Tag>
        ))}
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
              ? moment(jam.started_at).add(jam.time_limit, 'minutes').fromNow()
              : `Challenge Has Not Started!`}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Row justify="space-between">
        <Col span={12}>
          <Card>
            <Tooltip
              title={
                jam.started_at
                  ? 'This is your prompt! There are many prompts like it, but this one is yours!'
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
          <ChatContextProvider jam_id={match.params.id}>
            <Chatroom jam_id={match.params.id} />
          </ChatContextProvider>
        </Col>
        <Col span={12}>
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

          {canSubmit(jam, user.id, entries) && <EntryForm jam_id={jam.id} />}
        </Col>
      </Row>
    </>
  )
}
