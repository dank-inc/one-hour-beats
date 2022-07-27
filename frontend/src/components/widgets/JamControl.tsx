import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { JamView } from 'types/Jam'

import { useUserContext } from 'contexts/UserContext'
import { deleteJam, startJam, stopJam } from 'api'
import { Button, Tooltip, useToast } from '@chakra-ui/react'
import { DateTime } from 'luxon'

type Props = { jam: JamView }
export const JamControl = ({ jam }: Props) => {
  const user_id = useUserContext().user?.id
  const navigate = useNavigate()
  const toast = useToast()

  const [inProgress, setInProgress] = useState(false)
  const [ended, setEnded] = useState(false)

  const handleStart = async () => {
    await startJam(jam.id)
    toast({ title: 'Starting challenge...' })
  }

  const handleStop = async () => {
    await stopJam(jam.id)
    toast({ title: 'Stopping challenge...' })
  }

  useEffect(() => {
    const updateProgress = () => {
      // TODO: SERVER SHOULD HANDLE THE TIMERS

      const current = DateTime.local()

      const endsAt = DateTime.fromISO(jam.started_at!).plus({
        minutes: jam.time_limit,
      })

      const timeRemaining = endsAt.diff(current)

      const ip = !!(jam.started_at && timeRemaining.minutes > 0)
      setEnded(timeRemaining.minutes < 0)
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
      navigate('/jams')
    } catch (err) {
      toast({ title: "couldn't delete jam!" })
    }
  }

  if (user_id !== jam.user_id) return null

  if (ended)
    return (
      <>
        <Button onClick={() => navigate('/create')}>
          The Challenge Is Over! 😭 Make A New One! 😊
        </Button>
      </>
    )

  if (inProgress)
    return (
      <>
        <Tooltip title="Stop the Jam!">
          <Button variant="primary" onClick={handleStop}>
            Stop Jam Now!
          </Button>
        </Tooltip>
      </>
    )

  return (
    <>
      <Tooltip title="This is irreversable!">
        <Button onClick={handleDelete} bgColor="red.200">
          Delete
        </Button>
      </Tooltip>
      <Tooltip title="Pump Up The Jam">
        <Button variant="primary" onClick={handleStart}>
          Start Jam Now!
        </Button>
      </Tooltip>
    </>
  )
}
