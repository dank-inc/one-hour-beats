import React from 'react'
import { useDankAmpContext } from 'contexts/DankAmpContext'

export const Footer = () => {
  const { song } = useDankAmpContext()

  return (
    <footer>
      <h3>{song ? `${song.artist_name} - ${song.title}` : 'Load a song!'}</h3>
      {song && <audio controls autoPlay src={`/api/${song.link}`} />}
    </footer>
  )
}
