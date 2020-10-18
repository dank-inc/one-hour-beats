import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  message,
  Upload,
  Card,
  Typography,
} from 'antd'

import { useUserContext } from '../../contexts/UserContext'
import { InboxOutlined } from '@ant-design/icons'
import { Store } from 'antd/lib/form/interface'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { submitEntry } from 'api'
import { Entry } from 'types/Entry'

type Props = { jam_id: string }
export const EntryForm = ({ jam_id }: Props) => {
  const { user } = useUserContext()
  const [link, setLink] = useState<string | null>(null)
  // const [canUpload, setCanUpload] = useState(false)

  const handleUpload = (uploadHandler: UploadChangeParam<UploadFile<any>>) => {
    // check for MP3 ONLy

    if (uploadHandler.file.error) {
      message.error('error uploading file!')
    } else {
      // message.loading('uploading file...', 0.2)
      if (uploadHandler.fileList.length) {
        const path = uploadHandler.fileList[0].response?.path
        if (path) setLink(path)
        message.success('file uploaded!')
      }
    }

    // send file to backend (if file is valid)
    // throw file in static hosting
  }

  const handleChange = (e: Store) => {
    // setCanUpload(!e.target.value)
    // setCanUpload(!!val)
  }

  const onFinish = (form: Store) => {
    if (!link) {
      message.error('please upload a file!')
      return
    }

    if (!form.rights) {
      message.error('acknowledge you own all rights to the file!')
      return
    }
    const body = { ...form, link, jam_id, user_id: user.id } as Entry

    submitEntry(body)
    message.loading('submitting entry')
  }

  const onFinishFailed = (error: any) => {
    console.error(error)
    message.error('please complete all required fields')
  }

  return (
    <Card title="Submit Your Entry!">
      <Form
        onChange={handleChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Song Name"
          name="title"
          rules={[{ required: true, message: 'This needs a title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="I own rights"
          name="rights"
          valuePropName="checked"
          rules={[{ required: true, message: 'Sign this legal document!' }]}
        >
          <Checkbox />
        </Form.Item>
        <Upload.Dragger
          action={`/api/jams/${jam_id}/upload`}
          multiple={false}
          name="file"
          onChange={handleUpload}
          headers={{
            Authorization: window.localStorage.getItem('ohb-jwt-token') || '',
          }}
        >
          <InboxOutlined />
          <p>Click to select file!</p>
          <p>Size Limit: 10MB</p>
        </Upload.Dragger>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submitt
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
