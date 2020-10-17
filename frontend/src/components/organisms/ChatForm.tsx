import React from 'react'

import { Button, Col, Form, Input, Row } from 'antd'
import { Store } from 'antd/lib/form/interface'

import { submitChatMessage } from 'api'
import { SendOutlined } from '@ant-design/icons'

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
    <Form onFinish={onFinish} form={form} className="chat-form">
      <Form.Item name="message" rules={[{ required: true }]}>
        <Input placeholder="Send a chat message..." size="large" autoFocus />
      </Form.Item>
      <Button className="chat-submit" htmlType="submit" type="primary">
        <SendOutlined />
      </Button>
    </Form>
  )
}
