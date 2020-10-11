import { VoteToken } from 'types/VoteToken'

export type Entry = {
  id: string
  link: string
  title: string
  user_id: string // FK
  jam_id: string // FK
  created_at?: string
  updated_at?: string
}

export type EntryView = Entry & {
  // entry.votes
  artist_name: string
  votes?: VoteToken[]
}
