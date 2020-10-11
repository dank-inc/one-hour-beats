import { Result, Spin } from 'antd'
import React from 'react'

type Props = {
  loading: boolean
  error: boolean
  refetch?: () => void
}
export const ResultHandler = ({ loading, error, refetch }: Props) => {
  // NOTE: will probably never use, just an idea

  // this returns loading spinners, error handlers, or null depending on the
  // state of the data

  if (loading) return <Spin />
  if (error) return <Result title="Error getting chats" />

  return null
}
