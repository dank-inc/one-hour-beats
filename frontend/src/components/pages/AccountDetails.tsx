import React from 'react'
import { User } from 'types/User'
import { Input, Form } from 'antd'

type Props = {
  user: User
}

export const AccountDetails = ({ user }: Props) => {
  return (
    <>
      <Form.Item label="Username" name="username">
        <Input defaultValue={user.username} />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input defaultValue={user.name} />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input defaultValue={user.email} />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input.Password placeholder="Enter new password..." />
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password placeholder="Confirm password..." />
      </Form.Item>
    </>
  )
}
