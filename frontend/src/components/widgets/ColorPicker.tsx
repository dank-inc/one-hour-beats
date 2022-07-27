import React, { Dispatch, SetStateAction } from 'react'
import { BRAND, ColorName } from 'constants/ColorPalette'
import { Col } from 'components/elements/Col'
import { Row } from 'components/elements/Row'
import { Avatar, Button, Tooltip } from '@chakra-ui/react'

type Props = {
  color: ColorName
  setColor: Dispatch<SetStateAction<ColorName>>
  letter: string
}

export const ColorPicker = ({ color, setColor, letter }: Props) => {
  return (
    <Col>
      <Row
        alignContent="middle"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <div>
          <Avatar
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
        alignContent="middle"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        {Object.entries(BRAND.colors).map(([key, value]) => (
          <Tooltip placement="top" key={`color-picker-${key}`} title={key}>
            <Button
              name={key}
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
