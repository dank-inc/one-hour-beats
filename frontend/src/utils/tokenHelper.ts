import { AxiosRequestConfig } from 'axios'

export const setToken = (): AxiosRequestConfig => {
  const token = window.localStorage.getItem('ohb-jwt-token')
  return { headers: { Authorization: token! } }
}
