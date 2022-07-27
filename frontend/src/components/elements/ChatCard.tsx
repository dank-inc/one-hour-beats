import React from 'react'

import { ChatView } from 'types/Chat'
import { useUserContext } from 'contexts/UserContext'
import { Avatar, Box, Heading, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'

type Props = {
  chat: ChatView
}

export const ChatCard = ({ chat }: Props) => {
  const { user } = useUserContext()

  return (
    <Box textAlign={user?.id === chat.user_id ? 'right' : 'left'}>
      <Avatar name={chat.username} />
      <Text>{chat.username}</Text>
      <Heading size="sm">{chat.message}</Heading>
      <Text>{DateTime.fromISO(chat.created_at!).toRelative()}</Text>
    </Box>
  )
}
