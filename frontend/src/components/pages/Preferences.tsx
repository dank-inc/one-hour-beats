import React from 'react'
import { Store } from 'antd/lib/form/interface'
import {
  Button,
  Card,
  message,
  Row,
  Form,
  PageHeader,
  Layout,
  Typography,
  Divider,
} from 'antd'
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
    <Layout.Content className="preferences">
      <Typography.Title>Preferences</Typography.Title>
      <p>Customize how others will see you</p>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className="flex-container">
          <Card title="Account Information">
            <AccountDetails user={user} />
          </Card>
          <Card title="Color Picker" style={{ height: '100%' }}></Card>
        </div>
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
    </Layout.Content>
  )
}
