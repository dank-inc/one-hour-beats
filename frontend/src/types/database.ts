import { ColorName } from 'components/ColorPalette'

export type Jam = {
  id: string
  name: string
  description: string
  started_at?: string
  time_limit: number
  user_id: string // created By
  created_at?: string
  updated_at?: string
}

export type Entry = {
  id: string
  link: string
  title: string
  user_id: string // FK
  jam_id: string // FK
  created_at?: string
  updated_at?: string
}

export type User = {
  id: string
  username: string
  password: string
  name: string // full name
  email: string
  color: ColorName
  created_at?: string
  updated_at?: string
}

export type VoteToken = {
  jam_id: string
  user_id: string
  entry_id: string // entry that user_id cast the vote on
}

export type Chat = {
  jam_id: string
  user_id: string
  message: string
  created_at?: string
  updated_at?: string
}

export type Invitation = {
  invited_by: string
  claimed_by: string
  token: string
}
