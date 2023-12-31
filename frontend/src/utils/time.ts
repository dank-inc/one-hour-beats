import { JamView } from 'types/Jam'
import { EntryView } from 'types/Entry'
import { DateTime } from 'luxon'

export const isStarted = (started_at?: string) => {
  return !!started_at
}

export const isInProgress = (started_at: string, duration: number) => {
  const startTime = DateTime.fromISO(started_at)
  const endTime = startTime.plus({ minutes: duration })
  const currentTime = DateTime.local()

  return currentTime < endTime
}

export const isEnded = (started_at: string, duration: number) => {
  const startTime = DateTime.fromISO(started_at)
  const endTime = startTime.plus({ minutes: duration })
  const currentTime = DateTime.local()

  return currentTime > endTime
}

export const timeLeft = (started_at: string, duration: number) => {
  const startTime = DateTime.fromISO(started_at)
  const endTime = startTime.plus({ minutes: duration })
  const currentTime = DateTime.local()

  return endTime.diff(currentTime).milliseconds / 60000
}

export const jamEnded = (jam: JamView) => {
  if (!jam.started_at) return false
  return isEnded(jam.started_at, jam.time_limit)
}

export const jamInProgress = (jam: JamView) => {
  if (!jam.started_at) return false
  return isInProgress(jam.started_at, jam.time_limit)
}

export const canSubmit = (
  jam: JamView,
  entries: EntryView[] | null,
  user_id?: string,
): boolean => {
  // NOTE: 20 min leeway

  // console.log('started?', !!jam.started_at)
  // console.log('has submitted?', !entries?.find((e) => e.user_id === user_id))
  // console.log(
  //   'time left?',
  //   jam.started_at && timeLeft(jam.started_at, jam.time_limit)
  // )

  return (
    !!jam.started_at &&
    !entries?.find((e) => e.user_id === user_id) &&
    timeLeft(jam.started_at, jam.time_limit) > -20
  )
}
