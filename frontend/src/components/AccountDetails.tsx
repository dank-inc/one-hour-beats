import React from 'react'
import { User } from '../types/database'
import { Row, Col, Tooltip, Input } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type Props = {
  user: User
}

export const AccountDetails = ({ user }: Props) => {
  return (
    <Col>
      <Row align="middle" gutter={[2, 12]}>
        <Col span={6}>
          <div style={{ float: 'left' }}>Username:</div>
        </Col>
        <Col span={12}>
          <Input defaultValue={user.username}></Input>
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col span={6}>
          <div style={{ float: 'left' }}>Public name:</div>
        </Col>
        <Col span={12}>
          <Input defaultValue={user.name}></Input>
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col span={6}>
          <div style={{ float: 'left' }}>Password:</div>
        </Col>
        <Col span={12}>
          <Input.Password placeholder="Enter new password..." />
        </Col>
      </Row>
      <Row align="middle" gutter={[2, 12]}>
        <Col span={6}>
          <div style={{ float: 'left' }}>Password:</div>
        </Col>
        <Col span={12}>
          <Input.Password placeholder="Confirm password..." />
        </Col>
      </Row>
    </Col>
  )
}
