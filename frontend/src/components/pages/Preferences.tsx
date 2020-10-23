import React from 'react'
import { Store } from 'antd/lib/form/interface'
import { Button, Card, message, Form, Layout, Typography } from 'antd'
import { useUserContext } from 'contexts/UserContext'
import { AccountDetails } from 'components/pages/AccountDetails'
import { updateUser } from 'api'
import { Redirect } from 'react-router'

type Props = {}
export const Preferences = (props: Props) => {
  const { user } = useUserContext()

  if (!user) return <Redirect to="/" />

  const onFinish = async ({ name, username, email, password }: Store) => {
    message.loading('Saving preferences', 0.5)
    try {
      await updateUser(user.id, { name, username, email, password })
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
        </div>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Layout.Content>
  )
}