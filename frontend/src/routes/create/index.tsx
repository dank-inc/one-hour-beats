import React from 'react'
import { Store } from 'antd/lib/form/interface'
import { Form, Input, Button, InputNumber, message } from 'antd'

type Props = {}
export const Create = (props: Props) => {
  const onFinish = (values: Store) => {
    message.loading('Creating Challenge')
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
          initialValues={{ timeLimit: 60 }}
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
            name="timeLimit"
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
