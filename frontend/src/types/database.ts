export type Jam = {
  id: string
  name: string
  description: string
  started_at?: String
  time_limit: number
  user_id: string // created By
  created_at?: String
  updated_at?: String
}

export type Entry = {
  id: string
  link: string
  title: string
  user_id: string // FK
  jam_id: string // FK
  created_at?: String
  updated_at?: String
}

export type User = {
  id: string
  username: string
  password: string
  name: string // full name
  email: string
  created_at?: String
  updated_at?: String
}

export type VoteToken = {
  jam_id: string
  user_id: string
  entryId: string // entry that user_id cast the vote on
}

export type Chat = {
  jam_id: string
  user_id: string
  message: string
  created_at?: String
  updated_at?: String
}
