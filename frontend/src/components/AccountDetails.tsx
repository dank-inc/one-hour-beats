import React from 'react'
import { User } from '../types/database'
import { Row, Col, Tooltip, Input, Form } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type Props = {
  user: User
}

export const AccountDetails = ({ user }: Props) => {
  return (
    <Col>
      <Row align="middle" gutter={[2, 12]}>
        <Col>
          <Form.Item label="Username" name="username">
            <Input defaultValue={user.username} />
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col>
          <Form.Item label="Name" name="name">
            <Input defaultValue={user.name} />
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col>
          <Form.Item label="Email" name="email">
            <Input defaultValue={user.email} />
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter new password..." />
          </Form.Item>
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col>
          <Form.Item label="Password">
            <Input.Password placeholder="Confirm password..." />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  )
}
