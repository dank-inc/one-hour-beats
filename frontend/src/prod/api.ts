import axios from 'axios'
import _ from 'lodash'
import { Entry, Chat } from 'types/database'
import { JamView, UserView } from 'types/view'
import { message } from 'antd'

// GET - gets data
// PUT - update a given record with body (can be partial)
// POST - CREATE a record with body (must be full record)

// USER ENDPONTS
const cfg = () => {
  const token = window.localStorage.getItem('ohb-jwt-token')
  return { headers: { Authorization: token } }
}

export const getUser = async (username: string): Promise<UserView | null> => {
  try {
    const { data } = await axios.get(`/api/users/${username}`, cfg())
    return Promise.resolve(data)
  } catch (err) {
    return Promise.resolve(null)
  }
}

// JAM ENDPOINTS

export const getJamIndex = async (): Promise<Record<string, JamView>> => {
  try {
    const { data } = await axios.get('/api/jams', cfg())
    return Promise.resolve(_.keyBy(data, 'id'))
  } catch (err) {
    return Promise.resolve({})
  }
}

export const startJam = async (id: string) => {
  try {
    await axios.post(`/api/jams/${id}/start`, cfg())
    return Promise.resolve(true)
  } catch (error) {
    console.error('startjam', error)
  }
}

export const stopJam = async (id: string) => {
  try {
    await axios.post(`/api/jams/${id}/stop`, cfg())
    return Promise.resolve(true)
  } catch (error) {
    console.error('stopJam', error)
  }
}

export const getEntriesForJam = async (jam_id: string) => {
  try {
    const { data } = await axios.get(`/api/jams/${jam_id}/entries`, cfg())
    return Promise.resolve(data)
  } catch (error) {
    console.error('getEntriesForJam', error)
  }
}

export const submitChatMessage = async (chat: Chat) => {
  try {
    return axios.post(`/api/jams/${chat.jam_id}/chat`, chat, cfg())
  } catch (error) {
    message.error('chat message did not send!')
    console.error('chat messge submission failed', error)
  }
}

// ENTRY ENDPOINTS

export const submitEntry = async (body: Entry) => {
  try {
    return await axios.post(`/api/entries`, body, cfg())
  } catch (error) {
    console.error('submitEntry', error)
  }
}

export const voteForEntry = async (entry_id: string, user_id: string) => {
  try {
    return await axios.post(`/api/entries/${entry_id}/vote`, { user_id }, cfg())
  } catch (error) {
    message.error('Vote Failed, vote token not found!')
  }
}

// CHAT ENDPOINTS

export const getChatForJam = async (jam_id: string) => {
  try {
    const { data } = await axios.get(`/api/jams/${jam_id}/chat`, cfg())
    return Promise.resolve(data)
  } catch (error) {
    console.error('getChatForJam', error)
  }
}
