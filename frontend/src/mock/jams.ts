import { Jam } from '../types/database'
import moment from 'moment'
import _ from 'lodash'

export const jams: Jam[] = [
  {
    id: 'dankJam',
    name: 'Friday Test Jam!',
    description: 'Make a song that reminds you of "Friday"!',
    user_id: 'eli7vh',
    started_at: moment().subtract(20, 'minutes').toISOString(),
    timeLimit: 60,
  },
  {
    id: 'dank-rhinos',
    name: 'Four Twenty Jam',
    description: 'make a song about WEEED!',
    user_id: 'eli7vh',
    time_limit: 60,
  },
]

export const jamIndex = _.keyBy(jams, 'id')
