import { Moment } from 'moment'

export type Jam = {
  id: string
  name: string
  description: string
  startedAt?: Moment
  timeLimit: number
  userId: string // created By
  createdAt?: Moment
  updatedAt?: Moment
}

export type Entry = {
  id: string
  link: string
  title: string
  artist: string // artist name if they want to change it
  userId: string // FK
  jamId: string // FK
  createdAt?: Moment
  updatedAt?: Moment
}

export type User = {
  id: string
  username: string
  password: string
  name: string // full name
  email: string
  createdAt?: Moment
  updatedAt?: Moment
}

export type VoteToken = {
  jamId: string
  userId: string
  entryId: string // entry that userId cast the vote on
}

export type Chat = {
  jamId: string
  userId: string
  message: string
  createdAt?: Moment
  updatedAt?: Moment
}
