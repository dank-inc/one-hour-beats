import React from 'react'
import { Form, Input, Button, Layout, PageHeader } from 'antd'
import { Store } from 'antd/lib/form/interface'

type Props = {
  handleLogin: (username: string, password: string) => void
}
export const Login = ({ handleLogin }: Props) => {
  const onFinish = (values: Store) => {
    handleLogin(values.username, values.password)
  }

  return (
    <Layout.Content>
      <PageHeader title="Login" />
      <Form onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  )
}
