import { mockJams } from './jams'

export const mockApi: Record<string, any> = {
  jams: mockJams,
  'jams/jam1': {
    id: 'jam1',
    name: 'Test Jam 1',
    description: 'do the thing',
    time_limit: 60,
    user_id: 'testuser',
    ended: false,
    started_at: new Date().toISOString(),
  },
  'jams/jam6': {
    id: 'jam6',
    name: 'Test Jam 6',
    description: 'do the thing',
    entries: [],
    time_limit: 60,
    user_id: 'testuser',
    ended: false,
  },
  'jams/jam6/entries': [],
  'jams/jam6/chat': [],
  'jams/jam1/entries': [
    {
      id: 'entry1',
      artist_name: 'Dank Man',
      jam_id: 'jam1',
      link: 'none',
      title: 'Dank Jam',
      user_id: 'testuser',
    },
  ],
  'jams/jam1/chat': [],
}
