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

export type JamView = Jam & {
  // jam.entries
  ended: boolean
  started_by: string
  entries: number
}
