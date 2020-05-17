import React from 'react'
import { useAppContext } from 'contexts/AppContext'
import { Tag, Card, Input, Row, Col, Form } from 'antd'
import { Chat } from 'types/view'
import { ChatCard } from './ChatCard'
import { useUserContext } from 'contexts/UserContext'
import { Store } from 'antd/lib/form/interface'
import { submitChatMessage } from 'prod/api'
import { useForm } from 'antd/lib/form/util'

type Props = { jam_id: string; chats: Chat[] }
export const Chatroom = ({ jam_id, chats }: Props) => {
  const { jamRoomUsers, chatIndex } = useAppContext()
  const { user } = useUserContext()
  const [form] = useForm()

  const onFinish = ({ message }: Store) => {
    const body = { message, jam_id, user_id: user.id }
    submitChatMessage(body)
    form.resetFields()
  }

  return (
    <div>
      <h1>Chatroom</h1>
      <div>
        Active:
        {jamRoomUsers[jam_id]?.map((user_id) => (
          <Tag key={`active-users-${user_id}`} color="magenta">
            {user_id}
          </Tag>
        ))}
      </div>
      <Card
        style={{
          width: 400,
          height: 400,
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {chatIndex[jam_id] ? (
          chatIndex[jam_id].map((chat, i) => (
            <ChatCard
              key={`chat-message-${i}-${chat.user_id}-${chat.message}`}
              chat={chat}
            />
          ))
        ) : (
          <Row align="bottom" justify="center" gutter={[2, 16]}>
            <Col span={19}>
              <div
                style={{
                  borderRadius: 15,
                  backgroundColor: '#fdfacf',
                  padding: 5,
                  textAlign: 'center',
                }}
              >
                Break the ice!
              </div>
            </Col>
          </Row>
        )}
      </Card>
      <Form onFinish={onFinish} form={form}>
        <Form.Item name="message" rules={[{ required: true }]}>
          <Input
            placeholder="Send a chat message..."
            size="large"
            autoFocus
            style={{
              width: 400,
              margin: 16,
              marginTop: -16,
            }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
