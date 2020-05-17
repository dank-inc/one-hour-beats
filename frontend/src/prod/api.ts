import axios from 'axios'
import _ from 'lodash'
import { Entry } from 'types/database'
import { JamView } from 'types/view'

// GET - gets data
// PUT - update a given record with body (can be partial)
// POST - CREATE a record with body (must be full record)

// JAM ENDPOINTS

export const getJamIndex = async (): Promise<Record<string, JamView>> => {
  try {
    const { data } = await axios.get('/api/jams')
    return Promise.resolve(_.keyBy(data, 'id'))
  } catch (err) {
    return Promise.resolve({})
  }
}

export const startJam = async (id: string) => {
  try {
    await axios.post(`/api/jams/${id}/start`)
    return Promise.resolve(true)
  } catch (error) {
    console.error('startjam', error)
  }
}

export const stopJam = async (id: string) => {
  try {
    await axios.post(`/api/jams/${id}/stop`)
    return Promise.resolve(true)
  } catch (error) {
    console.error('stopJam', error)
  }
}

export const getEntriesForJam = async (jam_id: string) => {
  try {
    const { data } = await axios.get(`/api/jams/${jam_id}/entries`)
    return Promise.resolve(data)
  } catch (error) {
    console.error('getEntriesForJam', error)
  }
}

export const getChatForJam = async (jam_id: string) => {
  try {
    const { data } = await axios.get(`/api/jams/${jam_id}/chat`)
    return Promise.resolve(data)
  } catch (error) {
    console.error('getChatForJam', error)
  }
}

// ENTRY ENDPOINTS

export const submitEntry = async (body: Entry) => {
  try {
    await axios.post(`/api/entries`, body)
  } catch (error) {
    console.error('submitEntry', error)
  }
}

export const voteForEntry = async (entry_id: string, user_id: string) => {
  try {
    await axios.post(`/api/entries/${entry_id}`, { user_id })
  } catch (error) {
    console.error('vote for entry', error)
  }
}

// export const login = async (): Promise<User> => {}
