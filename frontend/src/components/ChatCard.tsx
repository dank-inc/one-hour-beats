import React from 'react'
import { Chat } from '../types/view'
import { Row, Col, Avatar, Tooltip } from 'antd'
import { useUserContext } from 'contexts/UserContext'

type Props = {
  chat: Chat
}

export const ChatCard = ({ chat }: Props) => {
  const { user } = useUserContext()

  //If the chat id equals login user, reverse chat bubbles
  if (chat.user_id === user.id) {
    return (
      <Row align="bottom" justify="end" gutter={[2, 16]}>
        <Col span={19}>
          <div
            style={{ borderRadius: 15, backgroundColor: '#cfdcfd', padding: 5 }}
          >
            {chat.message}
          </div>
        </Col>
        <Col span={3}>
          <Tooltip placement="left" title={chat.user_id}>
            <Avatar
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              }}
            >
              {chat.user_id[0]}
            </Avatar>
          </Tooltip>
        </Col>
      </Row>
    )
  } else {
    return (
      <Row align="bottom" gutter={[2, 16]}>
        <Col span={3}>
          <Tooltip placement="left" title={chat.user_id}>
            <Avatar
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              }}
            >
              {chat.user_id[0]}
            </Avatar>
          </Tooltip>
        </Col>
        <Col span={19}>
          <div
            style={{ borderRadius: 15, backgroundColor: '#fde3cf', padding: 5 }}
          >
            {chat.message}
          </div>
        </Col>
      </Row>
    )
  }
}
