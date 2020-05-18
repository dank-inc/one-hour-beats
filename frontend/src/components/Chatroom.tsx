import React from 'react'
import { useAppContext } from 'contexts/AppContext'
import { Tag, Card, Input, Row, Col, Form } from 'antd'
import { ChatCard } from './ChatCard'
import { Store } from 'antd/lib/form/interface'
import { useForm } from 'antd/lib/form/util'
import { useChatContext } from 'contexts/ChatContext'

type Props = { jam_id: string }
export const Chatroom = ({ jam_id }: Props) => {
  const { chats, handleSubmit } = useChatContext()

  const { jamRoomUsers } = useAppContext()
  const [form] = useForm()

  const onFinish = ({ message }: Store) => {
    handleSubmit(message)
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
        {chats.length ? (
          chats.map((chat, i) => (
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
