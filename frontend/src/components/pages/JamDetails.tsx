import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { jamInProgress } from 'utils/time'
import { JamControl } from 'components/widgets/JamControl'
import { Clock } from 'components/widgets/Clock'
import { useGet } from 'hooks/useGet'
import { JamView } from 'types/Jam'

import { Chatroom } from 'components/widgets/Chatroom'
import { EntriesWidget } from 'components/widgets/EntriesWidget'
import { useSubscription } from 'hooks/useSubscription'
import { useUserContext } from 'contexts/UserContext'
import { useParams } from 'react-router'
import { DateTime } from 'luxon'
import {
  Box,
  Button,
  Grid,
  Heading,
  Spinner,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { Row } from 'components/elements/Row'
import { Col } from 'components/elements/Col'
import { Card } from 'components/elements/Card'

export const JamDetails = () => {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const params = useParams<{ id: string }>()
  const jam = useGet<JamView>(`jams/${params.id}`)
  const toast = useToast()

  useSubscription(
    'JamroomChannel',
    { jam_id: params.id, user_id: user?.id },
    jam.refetch,
  )

  useEffect(() => {
    return () => {
      document.title = `One Hour Beats - ${jam.data?.name}`
    }
  }, [jam.data])

  if (jam.loading) return <Spinner />
  if (jam.error) {
    toast({ title: `Couldn't find jam: ${params.id}, please contact support!` })
    return <Navigate to="/jams" />
  }

  return (
    <Grid>
      <Heading>Jam Room: {jam.data.name}</Heading>
      <Box>
        <Row>
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Heading>Back To Challenge Listing</Heading>
          <JamControl key={`JamControl-${jam.data.id}`} jam={jam.data} />,
        </Row>
        <p>Time Limit: {jam.data.time_limit} minutes</p>
        {jam.data.started_at ? (
          <>
            <p>
              Started At{' '}
              {DateTime.fromISO(jam.data.started_at).toFormat(
                'MMM DD, YYYY @ hh:mm a',
              )}
            </p>
            <p>
              Ends{' '}
              {DateTime.fromISO(jam.data.started_at)
                .plus({ minutes: jam.data.time_limit })
                .toRelative()}
            </p>
          </>
        ) : (
          <Tooltip
            closeDelay={1000}
            title={DateTime.fromISO(jam.data.scheduled_at).toRelative()!}
          >
            <div>
              Starts{' '}
              {DateTime.fromISO(jam.data.scheduled_at).toFormat(
                'MMM DD, YYYY - hh:mm a',
              )}
            </div>
          </Tooltip>
        )}
      </Box>
      <Row>
        <Col>
          <Card title="Challenge Prompt">
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
              extra={
                <p>
                  <b>Note:</b> You will have 20 minutes after the timer expires
                  to upload your track! Good luck and have fun!
                </p>
              }
            >
              <Clock jam={jam.data} />
            </Card>
          )}
          <EntriesWidget jam={jam.data} />
        </Col>

        <Col>
          <Chatroom jamId={params.id!} />
        </Col>
      </Row>
    </Grid>
  )
}
