import axios from 'axios'
import _ from 'lodash'
import { Jam, User, Entry } from 'types/database'

// GET - gets data
// PUT - update a given record with body (can be partial)
// POST - CREATE a record with body (must be full record)

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

export const submitEntry = async (body: Entry): Promise<boolean> => {
  try {
    const { data } = await axios.post(`/api/entries`, body)
    console.log('entry submitted', data)
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  }
}

// export const login = async (): Promise<User> => {}
