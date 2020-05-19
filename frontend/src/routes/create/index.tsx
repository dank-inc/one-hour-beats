import React from 'react'
import { Store } from 'antd/lib/form/interface'
import { Form, Input, Button, InputNumber, message } from 'antd'
import axios from 'axios'
import { useUserContext } from 'contexts/UserContext'
import { createJam } from 'prod/api'

type Props = {}
export const Create = (props: Props) => {
  const { user } = useUserContext()

  const onFinish = async ({ id, name, time_limit, description }: Store) => {
    message.loading('Creating Challenge', 0.5)
    await createJam({ id, name, time_limit, user_id: user.id, description })

    message.success('Challenge Created!')
  }

  const onFinishFailed = () => {
    message.error('Read the errors, dum dum')
  }

  return (
    <main>
      <div className="main-header">
        <h2>Create Challenge!</h2>
        <p>Make your very own challenge here</p>
      </div>
      <div className="main-content">
        <Form
          onFinish={onFinish}
          initialValues={{ time_limit: 60 }}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name Of Challenge"
            name="name"
            rules={[{ required: true, message: 'Provide a challenge name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time Limit (in minutes)"
            name="time_limit"
            rules={[
              {
                required: true,
                message: 'Enter a time in minutes between 60 * 4800!',
              },
            ]}
          >
            <InputNumber min={60} max={4800} />
          </Form.Item>
          <Form.Item
            label="Challenge Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Provide a prompt to help people get creative!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  )
}
