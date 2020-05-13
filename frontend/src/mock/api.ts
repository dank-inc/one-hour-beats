import { jams } from './jams'
import { entriesByJam, entries } from './entries'
import _ from 'lodash'
import { User } from 'types/database'

export const getJamIndex = () => {
  console.log('API', entriesByJam)
  const jamsView = jams.map((jam) => {
    return { ...jam, entries: entriesByJam[jam.id] }
  })

  return _.keyBy(jamsView, 'id')
}

export const getEntries = () => {
  return entries.map((entry) => {
    return { ...entry } // add votes
  })
}

export const createUser = (body: User) => {
  return {}
}
export const updateUser = (body: Partial<User>) => {
  return {}
}
