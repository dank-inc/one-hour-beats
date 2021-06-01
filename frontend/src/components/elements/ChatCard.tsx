import React from 'react'
import { Avatar, Comment } from 'antd'
import moment from 'moment'

import { ChatView } from 'types/Chat'
import { useUserContext } from 'contexts/UserContext'

type Props = {
  chat: ChatView
}

export const ChatCard = ({ chat }: Props) => {
  const { user } = useUserContext()

  return (
    <Comment
      avatar={
        <Avatar
          className={`chat-avatar ${
            chat.user_id === user?.id ? 'you' : 'them'
          }`}
        >
          {chat.username?.[0]}
        </Avatar>
      }
      author={chat.username}
      content={chat.message}
      datetime={moment(chat.created_at).fromNow()}
    />
  )
}
