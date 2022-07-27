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
  Grid,
  Heading,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { Row } from 'components/elements/Row'
import { Col } from 'components/elements/Col'
import { Card } from 'components/elements/Card'
import { Link } from 'react-router-dom'

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
      <Grid marginBottom="1rem" bgColor="gray.100" gap="1rem">
        <Row bgColor="gray.200" py="1rem">
          <Link to="/jams">Back</Link>
          <JamControl key={`JamControl-${jam.data.id}`} jam={jam.data} />,
          <Heading size="md">Jam Room: {jam.data.name}</Heading>
        </Row>
        <Row>
          <Text>Time Limit: {jam.data.time_limit} minutes</Text>
          {jam.data.started_at ? (
            <>
              <Row gridGap="0.5rem">
                <Text>Start:</Text>
                <Text>
                  {DateTime.fromISO(jam.data.started_at).toFormat(
                    'DD @ hh:mm a',
                  )}
                </Text>
              </Row>
              <Row gridGap="0.5rem">
                <Text>End:</Text>
                <Text>
                  {DateTime.fromISO(jam.data.started_at)
                    .plus({ minutes: jam.data.time_limit })
                    .toRelative()}
                </Text>
              </Row>
            </>
          ) : (
            <Tooltip
              closeDelay={1000}
              title={DateTime.fromISO(jam.data.scheduled_at).toRelative()!}
            >
              <Box>
                Starts:
                {DateTime.fromISO(jam.data.scheduled_at).toFormat(
                  'MMM DD, YYYY - hh:mm a',
                )}
              </Box>
            </Tooltip>
          )}
        </Row>
        <Row>
          <Text>Prompt:</Text>
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
        </Row>
      </Grid>
      <Row>
        {jamInProgress(jam.data) && (
          <Card
            title="Time Remaining"
            extra={
              <p>
                <b>Note:</b> You will have 20 minutes after the timer expires to
                upload your track! Good luck and have fun!
              </p>
            }
          >
            <Clock jam={jam.data} />
          </Card>
        )}
        <EntriesWidget jam={jam.data} />

        <Col>
          <Chatroom jamId={params.id!} />
        </Col>
      </Row>
    </Grid>
  )
}
