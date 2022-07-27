import React from 'react'

import { ChatView } from 'types/Chat'
import { useUserContext } from 'contexts/UserContext'
import { Avatar, Heading, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Row } from './Row'

type Props = {
  chat: ChatView
}

export const ChatCard = ({ chat }: Props) => {
  const { user } = useUserContext()

  return (
    <Row
      bgColor="gray.100"
      padding="0.25rem"
      borderRadius="0.25rem"
      textAlign={user?.id === chat.user_id ? 'right' : 'left'}
    >
      <Avatar size="xs" name={chat.username} />
      <Row gridGap="1rem">
        <Text>{chat.username}</Text>
        <Heading size="sm">{chat.message}</Heading>
        <Text>{DateTime.fromISO(chat.created_at!).toRelative()}</Text>
      </Row>
    </Row>
  )
}
