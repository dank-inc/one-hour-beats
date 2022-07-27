import React from 'react'

import { useUserContext } from 'contexts/UserContext'
import { deleteEntry, voteForEntry } from 'api'
import { EntryView } from 'types/Entry'
import { useDankAmpContext } from 'contexts/DankAmpContext'
import { Avatar, Box, Button, Heading, useToast } from '@chakra-ui/react'

type Props = {
  entry: EntryView
  jam_id: string
}

export const EntryCard = ({ entry, jam_id }: Props) => {
  const { user } = useUserContext()
  const { song, selectSong } = useDankAmpContext()
  const toast = useToast()

  const handleVote = () => {
    toast({ title: 'casting vote!' })
    voteForEntry(entry.id)
  }

  const listenToEntry = () => {
    selectSong(entry)
  }

  const handleDelete = () => {
    deleteEntry(entry.id)
  }

  const vote_token = user?.vote_tokens?.find((token) => token.jam_id === jam_id)
  const canVote =
    vote_token && !vote_token.entry_id && entry.user_id !== user?.id

  return (
    <Box>
      <Heading size="sm">
        `${entry.artist_name} - ${entry.title}`
      </Heading>
      {entry.votes?.map((user_id) => (
        <Box key={`vote-${jam_id}-${entry.id}-${user_id}`}>🔥</Box>
      ))}
      <Button onClick={listenToEntry}>Listen To Entry</Button>,{' '}
      {entry.user_id === user?.id ? (
        <Button variant="solid" onClick={handleDelete}>
          Delete
        </Button>
      ) : null}
      <Button disabled={!canVote} onClick={handleVote}>
        Vote!
      </Button>
      <Box>
        <Avatar name="😎" />
      </Box>
    </Box>
  )
}
