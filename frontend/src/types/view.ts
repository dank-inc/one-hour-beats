import { Jam, Entry, VoteToken } from './database'

export type JamView = Jam & {
  // jam.entries
  entries?: EntryView[]
}

export type EntryView = Entry & {
  // entry.votes
  votes?: VoteToken[]
}

export type Chat = {
  user_id: string
  message: string
}
