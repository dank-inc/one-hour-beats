import React from 'react'
import { User } from '../types/database'
import { Row, Col, Avatar } from 'antd'
import * as colors from '@ant-design/colors'

const palette = [
  [colors.cyan[5], '#fff'],
  [colors.magenta[6], '#fff'],
  [colors.lime[6], '#fff'],
  [colors.gold[6], '#fff'],
  [colors.red[4], '#fff'],
  [colors.blue[4], '#fff'],
  [colors.purple[4], '#fff'],
  [colors.volcano[5], '#fff'],
]

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
              color: palette[7][1],
              backgroundColor: palette[7][0],
              fontSize: 'xxx-large',
            }}
          >
            {user.id[0]}
          </Avatar>
        </div>
      </Row>

      <Row
        align="middle"
        gutter={[16, 16]}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {palette.map(([background, font]) => (
          <Col span={2}>
            <Avatar
              size="default"
              style={{
                color: font,
                backgroundColor: background,
                fontSize: 'default',
              }}
            >
              {user.id[0]}
            </Avatar>
          </Col>
        ))}
      </Row>
    </Col>
  )
}
