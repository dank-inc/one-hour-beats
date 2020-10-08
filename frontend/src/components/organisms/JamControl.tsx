import React, { useState, useEffect } from 'react'
import { JamView } from 'types/view'
import moment from 'moment'
import { Tooltip, Button, message } from 'antd'
import { useUserContext } from 'contexts/UserContext'
import { startJam, stopJam } from 'api'
import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons'
import { useHistory } from 'react-router'

type Props = { jam: JamView }
export const JamControl = ({ jam }: Props) => {
  const user_id = useUserContext().user.id
  const history = useHistory()

  const [inProgress, setInProgress] = useState(false)
  const [ended, setEnded] = useState(false)

  const handleStart = async () => {
    await startJam(jam.id)
    message.loading('Starting challenge...', 0.25)
  }

  const handleStop = async () => {
    await stopJam(jam.id)
    message.loading('Stopping challenge...', 0.25)
  }

  useEffect(() => {
    const updateProgress = () => {
      // TODO: SERVER SHOULD HANDLE THE TIMERS
      const current = +moment()
      const endsAt = +moment(jam.started_at).add(jam.time_limit, 'minutes')
      const timeRemaining = endsAt - current
      const ip = !!(jam.started_at && timeRemaining > 0)
      setEnded(timeRemaining < 0)
      setInProgress(ip)
      if (!ended) return () => clearTimeout(timer)
    }

    updateProgress()
    const timer = setInterval(updateProgress, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [jam.started_at, jam.time_limit, ended])

  const jamOwner = user_id === jam.user_id

  if (ended)
    return (
      <>
        <Button onClick={() => history.push('/create')}>
          The Challenge Is Over! <FrownTwoTone /> Make A New One!{' '}
          <SmileTwoTone />
        </Button>
      </>
    )

  if (inProgress)
    return (
      <>
        <Tooltip
          title={
            jamOwner ? 'Stop the Jam!' : 'Only the owner can stop the jam!'
          }
        >
          <Button type="primary" disabled={!jamOwner} onClick={handleStop}>
            Stop Jam Now!
          </Button>
        </Tooltip>
      </>
    )

  return (
    <Tooltip
      title={jamOwner ? 'Start the Jam!' : 'Only the owner can start the jam!'}
    >
      <Button type="primary" disabled={!jamOwner} onClick={handleStart}>
        Start Jam Now!
      </Button>
    </Tooltip>
  )
}
