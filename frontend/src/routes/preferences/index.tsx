import React from 'react'
import { Store } from 'antd/lib/form/interface'
import { Button, Card, message, Row, Col } from 'antd'
import axios from 'axios'
import { useUserContext } from 'contexts/UserContext'
import { ColorPicker } from 'components/ColorPicker'
import { AccountDetails } from 'components/AccountDetails'

type Props = {}
export const Preferences = (props: Props) => {
  const { user } = useUserContext()

  const onFinish = async (values: Store) => {
    message.loading('Creating Challenge', 0.5)
    try {
      const body = { ...values, user_id: user.id }
      await axios.post('/api/jams', body)
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
        <Row
          align="middle"
          gutter={[16, 16]}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Col span={9}>
            <Card title="Account Information">
              <AccountDetails user={user} />
            </Card>
          </Col>
          <Col span={9}>
            <Card title="Color Picker">
              <ColorPicker user={user} />
            </Card>
          </Col>
        </Row>
        <Row
          align="middle"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Button type="primary" disabled>
            Save
          </Button>
        </Row>
      </div>
      <div className="main-content"></div>
    </main>
  )
}
