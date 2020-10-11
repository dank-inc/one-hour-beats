import React from 'react'
import { useDankAmpContext } from 'contexts/DankAmpContext'
import { Layout, Row } from 'antd'
import 'scss/footer.scss'

export const Footer = () => {
  const { song } = useDankAmpContext()

  return (
    <Layout.Footer className="ohb-footer">
      <Row align="middle" justify="space-between">
        <h3>{song ? `${song.artist_name} - ${song.title}` : 'Load a song!'}</h3>
        {song && <audio controls autoPlay src={`/api/${song.link}`} />}
      </Row>
    </Layout.Footer>
  )
}
