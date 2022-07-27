import React, { useRef, useEffect } from 'react'

import { ChatCard } from 'components/elements/ChatCard'
import { ChatForm } from './ChatForm'
import { ResultHandler } from './ResultHandler'

import { useUserContext } from 'contexts/UserContext'
import { useAppContext } from 'contexts/AppContext'
import { useGet } from 'hooks/useGet'
import { useSubscription } from 'hooks/useSubscription'
import { ChatView } from 'types/Chat'

import { Alert, Box, Spinner, Tag } from '@chakra-ui/react'

type Props = { jamId: string }

export const Chatroom = ({ jamId }: Props) => {
  const { user } = useUserContext()
  const chats = useGet<ChatView[]>(`jams/${jamId}/chat`)

  useSubscription('ChatChannel', { jam_id: jamId }, chats.refetch)

  const { jamRoomUsers } = useAppContext()
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!logRef?.current) return

    logRef.current.scrollTo(0, logRef.current.scrollHeight)
  }, [chats])

  if (chats.error)
    return <ResultHandler loading={chats.loading} error={chats.error} />

  if (chats.loading) return <Spinner />

  return (
    <Box title="Chatroom">
      <div ref={logRef}>
        {chats.data.length ? (
          chats.data.map((chat) => (
            <ChatCard key={`chat-${chat.id}`} chat={chat} />
          ))
        ) : (
          <Alert title="All Quiet... Break The Ice!" status="info" />
        )}
      </div>
      {user && <ChatForm jamId={jamId} userId={user.id} />}
      {jamRoomUsers[jamId]?.map((user_id) => (
        <Tag key={`active-users-${user_id}`} color="magenta">
          {user_id}
        </Tag>
      ))}
    </Box>
  )
}
