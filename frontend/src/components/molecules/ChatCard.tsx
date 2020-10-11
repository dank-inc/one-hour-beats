import React from 'react'
import { Avatar, Comment } from 'antd'
import moment from 'moment'

import { ChatView } from 'types/Chat'
import { BRAND } from 'constants/ColorPalette'

type Props = {
  chat: ChatView
}

export const ChatCard = ({ chat }: Props) => {
  // TODO: If the chat id equals login user, reverse chat bubbles

  return (
    <Comment
      avatar={
        <Avatar
          style={{
            color: '#ffffff',
            backgroundColor: BRAND.colors[chat.color],
          }}
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
