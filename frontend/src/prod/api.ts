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

export const startJam = async (id: string): Promise<boolean> => {
  try {
    await axios.post(`/api/jams/${id}/start`)
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  }
}

export const stopJam = async (id: string): Promise<boolean> => {
  try {
    await axios.post(`/api/jams/${id}/stop`)
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  }
}

// export const login = async (): Promise<User> => {}
