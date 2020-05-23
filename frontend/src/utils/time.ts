import moment from 'moment'
import { JamView } from 'types/view'

export const isStarted = (started_at?: string) => {
  return !!started_at
}

export const isInProgress = (started_at: string, duration: number) => {
  const startTime = moment(started_at)
  const endTime = startTime.add(duration, 'minutes')
  const currentTime = moment()

  return currentTime < endTime
}

export const isEnded = (started_at: string, duration: number) => {
  const startTime = moment(started_at)
  const endTime = startTime.add(duration, 'minutes')
  const currentTime = moment()

  return currentTime > endTime
}

export const timeLeft = (started_at: string, duration: number) => {
  const startTime = moment(started_at)
  const endTime = +startTime.add(duration, 'minutes')
  const currentTime = +moment()

  return endTime - currentTime
}

export const jamEnded = (jam: JamView) => {
  if (!jam.started_at) return false
  return isEnded(jam.started_at, jam.time_limit)
}

export const jamInProgress = (jam: JamView) => {
  if (!jam.started_at) return false
  return isInProgress(jam.started_at, jam.time_limit)
}
