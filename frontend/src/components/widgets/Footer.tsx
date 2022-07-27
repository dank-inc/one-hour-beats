import React from 'react'
import { useDankAmpContext } from 'contexts/DankAmpContext'
import { Row } from 'components/elements/Row'
import { Box } from '@chakra-ui/react'

export const Footer = () => {
  const { song } = useDankAmpContext()

  return (
    <Row padding="1rem" bgColor="gray.800" color="white" alignItems="center">
      <Box>Copyright 2020 - onehourbeats.com</Box>
      <Box>{song ? `${song.artist_name} - ${song.title}` : 'Load a song!'}</Box>
      <Box>
        <audio controls autoPlay src={song ? `/api/${song.link}` : ''} />
      </Box>
    </Row>
  )
}
