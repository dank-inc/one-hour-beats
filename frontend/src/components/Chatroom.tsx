import React, { useRef, useEffect } from 'react'
import { useAppContext } from 'contexts/AppContext'
import { Tag, Card, Input, Button, Form } from 'antd'
import { ChatCard } from './ChatCard'
import { Store } from 'antd/lib/form/interface'
import { useForm } from 'antd/lib/form/util'
import { useChatContext } from 'contexts/ChatContext'
import './chat.scss'

type Props = { jam_id: string }
export const Chatroom = ({ jam_id }: Props) => {
  const { chats, handleSubmit } = useChatContext()
  const { jamRoomUsers } = useAppContext()
  const [form] = useForm()
  const logRef = useRef<HTMLDivElement | null>(null)

  const onFinish = ({ message }: Store) => {
    handleSubmit(message)
    form.resetFields()
  }

  useEffect(() => {
    if (!logRef?.current) return

    logRef.current.scrollTo(0, logRef.current.scrollHeight) // (logRef.current.scrollHeight)
  }, [chats])

  console.log('chatroom - rendered!')

  return (
    <>
      <Card
        title="Chatroom"
        extra={jamRoomUsers[jam_id]?.map((user_id) => (
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
          {chats.length ? (
            chats.map((chat) => (
              <ChatCard key={`chat-${chat.id}`} chat={chat} />
            ))
          ) : (
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
          )}
          <Form onFinish={onFinish} form={form}>
            <Form.Item name="message" rules={[{ required: true }]}>
              <div className="chat-input">
                <Input
                  placeholder="Send a chat message..."
                  size="large"
                  autoFocus
                />
                <Button htmlType="submit" type="primary">
                  Send
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </>
  )
}
