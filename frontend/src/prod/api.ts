import axios from 'axios'
import _ from 'lodash'
import { Jam, User } from 'types/database'

export const getJamIndex = async (): Promise<Record<string, Jam>> => {
  try {
    const { data } = await axios.get('/api/jams')
    return Promise.resolve(_.keyBy(data, 'id'))
  } catch (err) {
    return Promise.resolve({})
  }
}

// export const login = async (): Promise<User> => {}
