import { Jam } from '../types/database'
import moment from 'moment'
import _ from 'lodash'

export const jams: Jam[] = [
  {
    id: 'dankJam',
    name: 'Friday Test Jam!',
    description: 'Make a song that reminds you of "Friday"!',
    userId: 'eli7vh',
    startedAt: moment().subtract(20, 'minutes'),
    timeLimit: 60,
  },
  {
    id: 'dank-rhinos',
    name: 'Four Twenty Jam',
    description: 'make a song about WEEED!',
    userId: 'eli7vh',
    timeLimit: 60,
  },
]

export const jamIndex = _.keyBy(jams, 'id')
