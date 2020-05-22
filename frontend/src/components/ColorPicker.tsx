import React, { Dispatch, SetStateAction } from 'react'
import { Row, Col, Avatar, Button, Tooltip } from 'antd'
import { BRAND, ColorName } from 'components/ColorPalette'

type Props = {
  color: ColorName
  setColor: Dispatch<SetStateAction<ColorName>>
  letter: string
}

export const ColorPicker = ({ color, setColor, letter }: Props) => {
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
              backgroundColor: BRAND.colors[color],
              fontSize: 'xxx-large',
              cursor: 'default',
            }}
          >
            {letter}
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
              onClick={() => setColor(key as ColorName)}
            >
              {letter}
            </Button>
          </Tooltip>
        ))}
      </Row>
    </Col>
  )
}
