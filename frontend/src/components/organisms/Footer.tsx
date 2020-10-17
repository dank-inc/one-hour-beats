import React from 'react'
import { useDankAmpContext } from 'contexts/DankAmpContext'
import { Col, Layout, Row } from 'antd'
import 'scss/footer.scss'

export const Footer = () => {
  const { song } = useDankAmpContext()

  return (
    <Row className="app-footer" align="middle" justify="space-between">
      <Col>
        <p>Copyright 2020 - onehourbeats.com</p>
      </Col>
      <Col className="flex-right">
        <p>{song ? `${song.artist_name} - ${song.title}` : 'Load a song!'}</p>
        <audio controls autoPlay src={song ? `/api/${song.link}` : ''} />
      </Col>
    </Row>
  )
}
