import React from 'react'
import { Chat } from '../types/view'
import { Row, Col, Avatar, Tooltip } from 'antd'

type Props = {
  chat: Chat
}

export const ChatCard = ({ chat }: Props) => {
  //If the chat id equals login user, reverse chat bubbles
  if (chat.userId === 'eli7vh') {
    return (
      <Row align="bottom" justify="end" gutter={[2, 16]}>
        <Col span={19}>
          <div
            style={{ borderRadius: 15, backgroundColor: '#cfdcfd', padding: 5 }}
          >
            {chat.message}
          </div>
        </Col>
      </Row>
    )
  } else {
    return (
      <Row align="bottom" gutter={[2, 16]}>
        <Col span={3}>
          <Tooltip placement="left" title={chat.userId}>
            <Avatar
              style={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              }}
            >
              {chat.userId[0]}
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
