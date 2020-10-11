import React from 'react'
import { Store } from 'antd/lib/form/interface'
import {
  Form,
  Input,
  Button,
  InputNumber,
  message,
  PageHeader,
  DatePicker,
  TimePicker,
} from 'antd'
import { useUserContext } from 'contexts/UserContext'
import { createJam } from 'api'
import { useHistory } from 'react-router'

export const CreateJam = () => {
  const { user } = useUserContext()
  const history = useHistory()

  // TODO: Time picker - schedule jams
  // one open jam per person

  const onFinish = async ({ id, name, time_limit, description }: Store) => {
    message.loading('Creating Challenge', 0.5)
    await createJam({ id, name, time_limit, user_id: user.id, description })
    history.push('/jams')
  }

  const onFinishFailed = () => {
    message.error('Read the errors, dum dum')
  }

  return (
    <>
      <PageHeader
        title="Create Challenge!"
        subTitle="Make your very own challenge here"
      />
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
          label="Challenge Prompt"
          name="description"
          rules={[
            {
              required: true,
              message: 'Provide a prompt to help people get creative!',
            },
          ]}
        >
          <Input.TextArea placeholder="Enter a prompt that people will need to follow" />
        </Form.Item>
        <Form.Item label="Challenge Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Start Time">
          <TimePicker minuteStep={15} format="HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
