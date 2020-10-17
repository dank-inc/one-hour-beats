import React, { useEffect } from 'react'
import moment from 'moment'

import {
  PageHeader,
  Card,
  Tooltip,
  Descriptions,
  Tag,
  Row,
  Col,
  Spin,
  message,
  Layout,
} from 'antd'
import { Redirect, RouteComponentProps, useHistory } from 'react-router'
import { jamInProgress } from 'utils/time'
import { JamControl } from 'components/organisms/JamControl'
import { Clock } from 'components/organisms/Clock'
import { useAppContext } from 'contexts/AppContext'
import { useGet } from 'hooks/useGet'
import { JamView } from 'types/Jam'

import { Chatroom } from 'components/widgets/Chatroom'
import { EntriesWidget } from 'components/widgets/EntriesWidget'
import { useSubscription } from 'hooks/useSubscription'
import { useUserContext } from 'contexts/UserContext'

type Props = RouteComponentProps<{ id: string }> & {}

// TODO: rename
export const JamDetails = ({ match }: Props) => {
  const history = useHistory()
  const { user } = useUserContext()
  const { jamRoomUsers } = useAppContext()

  const jam = useGet<JamView>(`jams/${match.params.id}`)
  useSubscription(
    'JamroomChannel',
    { jam_id: match.params.id, user_id: user.id },
    jam.refetch
  )

  useEffect(() => {
    return () => {
      document.title = `One Hour Beats - ${jam.data?.name}`
    }
  }, [jam.data])

  if (jam.loading) return <Spin />
  if (jam.error) {
    message.error(
      `Couldn't find jam: ${match.params.id}, please contact support!`
    )
    return <Redirect to="/jams" />
  }

  // TODO: add "started by"

  return (
    <Layout.Content>
      <PageHeader
        onBack={() => history.goBack()}
        className="site-page-header"
        title={jam.data.name}
        subTitle={jamRoomUsers[match.params.id]?.map((user) => (
          <Tag key={`user-list-${user}`}>{user}</Tag>
        ))}
        extra={[
          <JamControl key={`JamControl-${jam.data.id}`} jam={jam.data} />,
        ]}
      >
        <Descriptions column={3}>
          <Descriptions.Item label="Time Limit">
            {jam.data.time_limit} minutes
          </Descriptions.Item>
          <Descriptions.Item label="Started At">
            {jam.data.started_at
              ? moment(jam.data.started_at).format('MMM DD, YYYY @ HH:mm:ss')
              : `Challenge Has Not Started!`}
          </Descriptions.Item>
          <Descriptions.Item label="Ends">
            {jam.data.started_at
              ? moment(jam.data.started_at)
                  .add(jam.data.time_limit, 'minutes')
                  .fromNow()
              : `Challenge Has Not Started!`}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Row justify="space-between">
        <Col span={12}>
          <Card title="Prompt">
            <Tooltip
              title={
                jam.data.started_at
                  ? 'This is your prompt! There are many prompts like it, but this one is yours!'
                  : 'You have to wait till the jam starts to see the prompt!'
              }
            >
              <h2 className={jam.data.started_at ? 'bouncing' : 'blurred'}>
                {jam.data.started_at
                  ? jam.data.description
                  : 'This prompt is hidden, stop trying to cheat, you dirty cheater!'}
              </h2>
            </Tooltip>
          </Card>
          {jamInProgress(jam.data) && (
            <Card title="Time Remaining">
              <Clock jam={jam.data} />
            </Card>
          )}
          <Chatroom jamId={match.params.id} />
        </Col>

        <Col span={12}>
          <EntriesWidget jam={jam.data} />
        </Col>
      </Row>
    </Layout.Content>
  )
}
