import { JamView } from 'types/Jam'

export const mockJams: JamView[] = [
  {
    id: 'jam1',
    name: 'Test Jam 1',
    description: 'do the thing',
    entries: 1,
    time_limit: 60,
    user_id: 'testuser',
    created_by: 'testuser',
    ended: false,
    started_at: new Date().toISOString(),
    scheduled_at: new Date().toISOString(),
  },
]
