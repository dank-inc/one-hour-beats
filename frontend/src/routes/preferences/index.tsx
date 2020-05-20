import React from 'react'
import './style.scss'
import { Store } from 'antd/lib/form/interface'
import { Button, Card, message, Row, Col, Form } from 'antd'
import axios from 'axios'
import { useUserContext } from 'contexts/UserContext'
import { ColorPicker } from 'components/ColorPicker'
import { AccountDetails } from 'components/AccountDetails'
import { updateUser } from 'api'

type Props = {}
export const Preferences = (props: Props) => {
  const { user } = useUserContext()

  const onFinish = async ({
    name,
    username,
    email,
    password,
    color,
  }: Store) => {
    message.loading('Saving preferences', 0.5)
    try {
      await updateUser(user.id, { name, username, email, password, color })
      message.success('Preferences updated')
    } catch (err) {
      message.error(`Couldn't update preferences`)
    }
  }

  const onFinishFailed = () => {
    message.error('Read the errors, dum dum')
  }

  return (
    <main>
      <div className="main-header">
        <h2>Preferences</h2>
        <p>Customize how others see you</p>
      </div>
      <div className="main-content">
        <Form
          onFinish={onFinish}
          initialValues={{ time_limit: 60 }}
          onFinishFailed={onFinishFailed}
        >
          <Row
            align="middle"
            gutter={[16, 16]}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="flex-container">
              <div className="column">
                <Card title="Account Information">
                  <AccountDetails user={user} />
                </Card>
              </div>
              <div className="column">
                <Card title="Color Picker" style={{ height: '100%' }}>
                  <ColorPicker user={user} />
                </Card>
              </div>
            </div>
          </Row>
          <Row
            align="middle"
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </main>
  )
}
