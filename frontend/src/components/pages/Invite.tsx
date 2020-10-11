import React, { useEffect, useState } from 'react'
import { RoutedProps } from 'types/router'
import { Spin, Input, Form, Button, PageHeader, Card, message } from 'antd'
import Axios from 'axios'
import { FrownOutlined, SmileOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { Store } from 'antd/lib/form/interface'

type Props = RoutedProps<{ token: string }> & {}
export const Invite = ({ match }: Props) => {
  const history = useHistory()

  const [valid, setValid] = useState<boolean | null>(null)
  const [confirmedPass, setConfirmedPass] = useState<string | undefined>()

  useEffect(() => {
    const get = async () => {
      try {
        await Axios.get(`/api/check_invite/${match.params.token}`)
        setValid(true)
      } catch (err) {
        setValid(false)
      }
    }

    get()
  }, [match.params.token])

  const onFinish = async ({ username, email, name, password }: Store) => {
    if (password !== confirmedPass) {
      message.error('passwords do not match')
      return
    }
    const { data } = await Axios.post(
      `/api/accept_invite/${match.params.token}`,
      {
        username,
        email: (email as string).trim(),
        name,
        password,
      }
    )
    console.log('user created', data)
    message.success('user created, please log in!')
    history.push('/')
  }

  if (valid === null)
    return (
      <>
        <header>
          <h2>One Hour Beats</h2>
        </header>
        <Spin size="large" tip="checking token..." />
      </>
    )

  if (!valid)
    return (
      <>
        <header>
          <h2>One Hour Beats</h2>
        </header>
        <main>
          <p>
            Your token is invalid <FrownOutlined />
          </p>
          <p>
            <Link to="https://twitter.com/onehourbeats">
              hit us up on twitter
            </Link>{' '}
            and tell us why you would like to join!
            <SmileOutlined />
          </p>
        </main>
      </>
    )

  return (
    <>
      <header>
        <h2>One Hour Beats</h2>
      </header>
      <main>
        <PageHeader
          className="site-page-header"
          title="Welcome To The Jam!"
          subTitle="Create a user!"
        />
        <Card>
          <Form onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Enter a username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Enter an email!',
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Artist Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Enter an Artist Name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Enter Your Password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Password Confirmation"
              name="passwordconfirm"
              rules={[
                {
                  required: true,
                  message: 'Confirm Your Password!',
                },
              ]}
            >
              <Input.Password
                onChange={(e) => {
                  setConfirmedPass(e.target.value)
                }}
              />
            </Form.Item>
            <Button htmlType="submit" type="primary">
              Join The Jam
            </Button>
          </Form>
        </Card>
      </main>
    </>
  )
}

// export type User = {
//   id: string
//   password: string
// }
