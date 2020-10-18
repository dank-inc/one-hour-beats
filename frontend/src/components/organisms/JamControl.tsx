import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Tooltip, Button, message, Popconfirm } from 'antd'
import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons'
import moment from 'moment'

import { JamView } from 'types/Jam'

import { useUserContext } from 'contexts/UserContext'
import { deleteJam, startJam, stopJam } from 'api'

type Props = { jam: JamView }
export const JamControl = ({ jam }: Props) => {
  const user_id = useUserContext().user?.id
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

  const handleDelete = async () => {
    try {
      await deleteJam(jam.id)
      history.push('/jams')
    } catch (err) {
      message.error("couldn't delete jam!")
    }
  }

  if (user_id !== jam.user_id) return null

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
        <Tooltip title="Stop the Jam!">
          <Button type="primary" onClick={handleStop}>
            Stop Jam Now!
          </Button>
        </Tooltip>
      </>
    )

  return (
    <>
      <Popconfirm title="This is irreversable!" onConfirm={handleDelete}>
        <Button danger>Delete</Button>
      </Popconfirm>
      <Tooltip title="Pump Up The Jam">
        <Button type="primary" onClick={handleStart}>
          Start Jam Now!
        </Button>
      </Tooltip>
    </>
  )
}
