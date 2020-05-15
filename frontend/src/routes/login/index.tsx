import React from 'react'
import { Form, Input, Button } from 'antd'
import './style.scss'
import { Store } from 'antd/lib/form/interface'

type Props = {
  handleLogin: (username: string, password: string) => void
}
export const Login = ({ handleLogin }: Props) => {
  const onFinish = (values: Store) => {
    handleLogin(values.username, values.password)
  }

  return (
    <main>
      <div className="main-header">
        <h1>Login</h1>
      </div>
      <div className="main-content">
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
      </div>
    </main>
  )
}
