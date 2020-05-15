import { Entry } from '../types/database'
import _ from 'lodash'

export const entries: Entry[] = [
  {
    id: 'whatsadik4',
    link: 'https://soundcloud.com/vapsquad/vapsquad-whats-a-dik-4',
    title: 'whats a dik 4',
    user_id: 'eli7vh',
    jam_id: 'dank-rhinos',
  },
  {
    id: 'somesong',
    link: 'https://clyp.it/3rqbqfhe?token=b536b5575f827aca5bca752e16bc8e8c',
    title: 'Fixed Hot Garbo',
    user_id: 'metacusis',
    jam_id: 'dank-rhinos',
  },
]

export const entryIndex = _.keyBy(entries, 'id')
export const entriesByJam = _.groupBy(entries, 'jamId')
