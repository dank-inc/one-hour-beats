import React, { useRef, useEffect } from 'react'
import { Tag, Card, Alert } from 'antd'

import { ChatCard } from 'components/molecules/ChatCard'
import { ChatForm } from 'components/organisms/ChatForm'
import { ResultHandler } from 'components/organisms/ResultHandler'

import { useUserContext } from 'contexts/UserContext'
import { useAppContext } from 'contexts/AppContext'
import { useGet } from 'hooks/useGet'
import { useSubscription } from 'hooks/useSubscription'

import { ChatView } from 'types/Chat'

import 'scss/chat.scss'

type Props = { jamId: string }

export const Chatroom = ({ jamId }: Props) => {
  const { user } = useUserContext()
  const chats = useGet<ChatView[]>(`jams/${jamId}/chat`)

  useSubscription(
    'ChatContextChannel',
    { user_id: user.id, jam_id: jamId },
    chats.refetch
  )

  const { jamRoomUsers } = useAppContext()
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!logRef?.current) return

    logRef.current.scrollTo(0, logRef.current.scrollHeight) // (logRef.current.scrollHeight)
  }, [chats])

  if (chats.loading || chats.error)
    return <ResultHandler loading={chats.loading} error={chats.error} />

  return (
    <>
      <Card
        title="Chatroom"
        extra={jamRoomUsers[jamId]?.map((user_id) => (
          <Tag key={`active-users-${user_id}`} color="magenta">
            {user_id}
          </Tag>
        ))}
      >
        <div
          ref={logRef}
          style={{
            height: 400,
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {chats.data.length ? (
            chats.data.map((chat) => (
              <ChatCard key={`chat-${chat.id}`} chat={chat} />
            ))
          ) : (
            <Alert message="All Quiet... Break The Ice!" type="info" />
          )}
          <ChatForm jamId={jamId} userId={user.id} />
        </div>
      </Card>
    </>
  )
}
