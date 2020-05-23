import React from 'react'
import './style.scss'
import { Store } from 'antd/lib/form/interface'
import { Button, Card, message, Row, Form } from 'antd'
import { useUserContext } from 'contexts/UserContext'
import { ColorPicker } from 'components/ColorPicker'
import { AccountDetails } from 'components/AccountDetails'
import { updateUser } from 'api'
import { ColorName } from 'components/ColorPalette'

type Props = {}
export const Preferences = (props: Props) => {
  const { user } = useUserContext()
  const [color, setColor] = React.useState<ColorName>(user.color)

  const onFinish = async ({ name, username, email, password }: Store) => {
    message.loading('Saving preferences', 0.5)
    try {
      await updateUser(user.id, { name, username, email, password, color })
      console.log(color)
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
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                  <ColorPicker
                    color={color}
                    setColor={setColor}
                    letter={user.name[0]}
                  />
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
