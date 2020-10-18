import React from 'react'
import { Store } from 'antd/lib/form/interface'
import {
  Form,
  Input,
  Button,
  InputNumber,
  message,
  DatePicker,
  TimePicker,
  Layout,
  Typography,
  Card,
} from 'antd'
import { useUserContext } from 'contexts/UserContext'
import { createJam } from 'api'
import { Redirect, useHistory } from 'react-router'
import moment from 'moment'

export const CreateJam = () => {
  const { user } = useUserContext()
  const history = useHistory()

  if (!user) return <Redirect to="/" />

  // TODO: Time picker - schedule jams
  // one open jam per person

  const onFinish = async ({
    id,
    name,
    time_limit,
    description,
    scheduledDate,
    scheduledTime,
  }: Store) => {
    message.loading('Creating Challenge', 0.5)

    scheduledDate.set({
      hour: scheduledTime.get('hour'),
      minute: scheduledTime.get('minute'),
      second: scheduledTime.get('second'),
    })

    if (scheduledDate < moment()) {
      message.error(
        'Cannot set time for the past... We must forge ahead to the big, bright future. Only there can we truly face our fears and grow to be better humans in general.'
      )
      return
    }

    try {
      await createJam({
        id,
        name,
        time_limit,
        user_id: user.id,
        description,
        scheduled_at: scheduledDate,
      })
      history.push('/jams')
    } catch (err) {
      console.log('error!', err.response.data)
      message.error(err.response.data.message) // want to log message from server
    }
  }

  const onFinishFailed = () => {
    message.error('Read the errors, dum dum')
  }

  return (
    <Layout.Content>
      <Typography.Title>Create A Challenge</Typography.Title>
      <p>Let's give 'em something to jam about</p>
      <Card title="New Challenge">
        <Form
          className="form"
          onFinish={onFinish}
          initialValues={{ time_limit: 60 }}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Provide a challenge name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Time Limit (minutes)"
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
            label="Prompt"
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
          <Form.Item
            rules={[{ required: true, message: 'schedule a date' }]}
            label="Date"
            name="scheduledDate"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'schedule a time!' }]}
            label="Start Time"
            name="scheduledTime"
          >
            <TimePicker minuteStep={15} format="HH:mm" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout.Content>
  )
}
