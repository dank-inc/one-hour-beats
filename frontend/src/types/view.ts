import { Jam, Entry, VoteToken } from './database'

export type JamView = Jam & {
  // jam.entries
  entries: EntryView[]
  chat?: Chat[]
}

export type EntryView = Entry & {
  // entry.votes
  artist_name: string
  votes?: VoteToken[]
}

export type Chat = {
  user_id: string
  username?: string
  jam_id: string
  message: string
}
