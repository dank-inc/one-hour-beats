import axios from 'axios'

import { Jam } from 'types/Jam'
import { Chat } from 'types/Chat'
import { Entry } from 'types/Entry'
import { User, UserView } from 'types/User'
import { Invitation } from 'types/Invitation'
import { message } from 'antd'

// TODO: put all these in a fancy api with a decorator and shit

// USER ENDPONTS
const cfg = () => {
  const token = window.localStorage.getItem('ohb-jwt-token')
  return { headers: { Authorization: token } }
}

export const getUser = async (id: string): Promise<UserView | null> => {
  try {
    const { data } = await axios.get<UserView>(`/api/users/${id}`, cfg())
    return Promise.resolve(data)
  } catch (err) {
    return Promise.resolve(null)
  }
}

export const updateUser = async (id: string, body: Partial<User>) => {
  try {
    await axios.put(`/api/users/${id}`, body, cfg())
    return Promise.resolve(true)
  } catch (error) {
    console.error('startjam', error)
  }
}

// JAM ENDPOINTS
export const requestInvite = async () => {
  try {
    const { data } = await axios.post<Invitation>(`/api/invite`, {}, cfg())
    return Promise.resolve(data)
  } catch (err) {
    return Promise.resolve(null)
  }
}

export const createJam = async (jam: Jam) => {
  return await axios.post(`/api/jams/`, jam, cfg())
}

export const deleteJam = async (id: string) => {
  return await axios.delete(`/api/jams/${id}`, cfg())
}

export const updateJam = async (id: string, body: Partial<Jam>) => {
  try {
    await axios.put(`/api/jams/${id}`, body, cfg())
  } catch (err) {
    console.error('jam update', err)
  }
}

export const startJam = async (id: string) => {
  try {
    await axios.post(`/api/jams/${id}/start`, {}, cfg())
    return Promise.resolve(true)
  } catch (error) {
    console.error('startjam', error)
  }
}

export const stopJam = async (id: string) => {
  try {
    await axios.post(`/api/jams/${id}/stop`, {}, cfg())
    return Promise.resolve(true)
  } catch (error) {
    console.error('stopJam', error)
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

export const deleteEntry = async (id: string) => {
  try {
    return await axios.delete(`/api/entries/${id}`, cfg())
  } catch (error) {
    console.error('submitEntry', error)
  }
}

export const voteForEntry = async (entry_id: string) => {
  try {
    return await axios.post(`/api/entries/${entry_id}/vote`, {}, cfg())
  } catch (error) {
    message.error('Vote Failed, vote token not found!')
  }
}
