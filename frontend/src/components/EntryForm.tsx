import React from 'react'
import { Form, Input, Button, Checkbox, message, Upload } from 'antd'
import { useUserContext } from '../contexts/UserContext'
import { InboxOutlined } from '@ant-design/icons'

type Props = {}
export const EntryForm = (props: Props) => {
  const { user } = useUserContext()

  const handleUpload = () => {
    message.loading('uploading file...')
  }

  const onFinish = () => {
    message.loading('submitting entry')
  }

  const onFinishFailed = () => {
    message.error('please complete all required fields')
  }

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ artist: user?.username }}
    >
      <Form.Item
        label="Song Title"
        name="title"
        rules={[{ required: true, message: 'This needs a title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Artist Name"
        name="artist"
        rules={[{ required: true, message: 'This needs a title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="I own all rights to this work"
        name="rights"
        rules={[{ required: true, message: 'Sign this legal document!' }]}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item label="Upload Yo File" name="link">
        <Upload.Dragger name="file" onChange={handleUpload}>
          <InboxOutlined />
        </Upload.Dragger>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
