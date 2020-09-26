import { JamView } from 'types/view'

export const mockJams: JamView[] = [
  {
    id: 'jam1',
    name: 'Test Jam 1',
    description: 'do the thing',
    entries: [
      {
        id: 'entry1',
        artist_name: 'Dank Man',
        jam_id: 'jam1',
        link: 'none',
        title: 'Dank Jam',
        user_id: 'testuser',
      },
    ],
    time_limit: 60,
    user_id: 'testuser',
    started_at: new Date().toISOString(),
  },
  {
    id: 'jam2',
    name: 'Rock Song',
    description: 'do the thing',
    entries: [],
    time_limit: 60,
    user_id: 'testuser',
  },
  {
    id: 'jam3',
    name: 'The Friday Challenge - 3:00pm UTC',
    description: 'do the thing',
    entries: [],
    time_limit: 60,
    user_id: 'testuser',
  },
  {
    id: 'jam4',
    name: 'Revolucian',
    description: 'do the thing',
    entries: [],
    time_limit: 60,
    user_id: 'testuser',
  },
  {
    id: 'jam5',
    name: 'Impoerfect',
    description: 'do the thing',
    entries: [],
    time_limit: 60,
    user_id: 'testuser',
  },
  {
    id: 'jam6',
    name: 'Test Jam 6',
    description: 'do the thing',
    entries: [],
    time_limit: 60,
    user_id: 'testuser',
  },
]
