import React from 'react'
import { Form, Input, Button, Layout, PageHeader } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { useUserContext } from 'contexts/UserContext'

export const Login = () => {
  const { handleLogin } = useUserContext()

  const onFinish = ({ username, password }: Store) =>
    handleLogin(username, password)

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
