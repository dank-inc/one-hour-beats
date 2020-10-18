import React, { useEffect } from 'react'
import moment from 'moment'

import {
  PageHeader,
  Card,
  Tooltip,
  Row,
  Col,
  Spin,
  message,
  Layout,
  Typography,
} from 'antd'
import { Redirect, RouteComponentProps, useHistory } from 'react-router'
import { jamInProgress } from 'utils/time'
import { JamControl } from 'components/organisms/JamControl'
import { Clock } from 'components/organisms/Clock'
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

  const jam = useGet<JamView>(`jams/${match.params.id}`)

  useSubscription(
    'JamroomChannel',
    { jam_id: match.params.id, user_id: user?.id },
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

  return (
    <Layout.Content>
      <Typography.Title>Jam Room: {jam.data.name}</Typography.Title>
      <PageHeader
        onBack={() => history.goBack()}
        className="jam-details-header"
        title="Back To Jam Listing"
        extra={[
          <JamControl key={`JamControl-${jam.data.id}`} jam={jam.data} />,
        ]}
      >
        <p>Time Limit: {jam.data.time_limit} minutes</p>
        {jam.data.started_at ? (
          <>
            <p>
              Started At{' '}
              {moment(jam.data.started_at).format('MMM DD, YYYY @ hh:mm a')}
            </p>
            <p>
              Ends{' '}
              {moment(jam.data.started_at)
                .add(jam.data.time_limit, 'minutes')
                .fromNow()}
            </p>
          </>
        ) : (
          <Tooltip
            mouseLeaveDelay={0.5}
            title={moment(jam.data.scheduled_at).fromNow()}
          >
            <div>
              Starts{' '}
              {moment(jam.data.scheduled_at).format('MMM DD, YYYY - hh:mm a')}
            </div>
          </Tooltip>
        )}
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
              <p className={jam.data.started_at ? 'bouncing' : 'blurred'}>
                {jam.data.started_at
                  ? jam.data.description
                  : 'This prompt is hidden, stop trying to cheat, you dirty cheater!'}
              </p>
            </Tooltip>
          </Card>
          {jamInProgress(jam.data) && (
            <Card
              title="Time Remaining"
              actions={[
                <p>
                  <b>Note:</b> You will have 20 minutes after the timer expires
                  to upload your track! Good luck and have fun!
                </p>,
              ]}
            >
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
