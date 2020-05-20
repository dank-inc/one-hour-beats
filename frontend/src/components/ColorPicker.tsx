import React from 'react'
import { User } from '../types/database'
import { Row, Col, Avatar, Form, Button, Radio, Input } from 'antd'
import { options } from 'components/ColorPalette'

type Props = {
  user: User
}

export const ColorPicker = ({ user }: Props) => {
  return (
    <Col>
      <Row
        align="middle"
        gutter={[2, 36]}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <div>
          <Avatar
            size={96}
            style={{
              color: options[user.color][2].toString(),
              backgroundColor: options[user.color][1].toString(),
              fontSize: 'xxx-large',
              cursor: 'default',
            }}
          >
            {user.name[0]}
          </Avatar>
        </div>
      </Row>

      <Row
        align="middle"
        gutter={[16, 16]}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {options.map(([option, background, font]) => (
          <Button
            shape="circle"
            style={{
              color: font.toString(),
              backgroundColor: background.toString(),
              cursor: 'pointer',
              margin: 6,
            }}
          >
            {user.name[0]}
          </Button>
        ))}
      </Row>
    </Col>
  )
}
