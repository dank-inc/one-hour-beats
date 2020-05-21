import React from 'react'
import { User } from '../types/database'
import { Row, Col, Avatar, Form, Button, Input, Tooltip } from 'antd'
import { BRAND, ColorName } from 'components/ColorPalette'

type Props = {
  user: User
  parentCallback: any
}

export const ColorPicker = ({ user, parentCallback }: Props) => {
  const [colorChoice, setColorChoice] = React.useState(user.color)

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
              color: '#fff',
              backgroundColor: BRAND.colors[colorChoice as ColorName],
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
        {Object.entries(BRAND.colors).map(([key, value]) => (
          <Tooltip placement="top" title={key}>
            <Button
              name={key}
              shape="circle"
              style={{
                color: '#fff',
                backgroundColor: value,
                cursor: 'pointer',
                margin: 6,
              }}
              onClick={() => {
                setColorChoice(key)
                parentCallback(key)
              }}
            >
              {user.name[0]}
            </Button>
          </Tooltip>
        ))}
      </Row>
    </Col>
  )
}
