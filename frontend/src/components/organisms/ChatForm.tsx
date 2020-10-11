import React from 'react'

import { Button, Form, Input } from 'antd'
import { Store } from 'antd/lib/form/interface'

import { submitChatMessage } from 'api'

type Props = {
  userId: string
  jamId: string
}
export const ChatForm = ({ userId, jamId }: Props) => {
  const [form] = Form.useForm()

  const onFinish = async ({ message }: Store) => {
    await submitChatMessage({ message, jam_id: jamId, user_id: userId })
    form.resetFields()
  }

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="message" rules={[{ required: true }]}>
        <div className="chat-input">
          <Input placeholder="Send a chat message..." size="large" autoFocus />
          <Button htmlType="submit" type="primary">
            Send
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
