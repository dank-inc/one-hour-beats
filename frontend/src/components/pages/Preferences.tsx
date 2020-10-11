import React from 'react'
import { Store } from 'antd/lib/form/interface'
import { Button, Card, message, Row, Form, PageHeader } from 'antd'
import { useUserContext } from 'contexts/UserContext'
import { ColorPicker } from 'components/organisms/ColorPicker'
import { AccountDetails } from 'components/pages/AccountDetails'
import { updateUser } from 'api'
import { ColorName } from 'constants/ColorPalette'

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
    <>
      <PageHeader title="Preferences" subTitle="Customize how others see you" />
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
    </>
  )
}
