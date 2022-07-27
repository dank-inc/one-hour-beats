import { useToast } from '@chakra-ui/react'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { EntryView } from 'types/Entry'

type Props = {
  children: React.ReactNode
}
type Context = {
  song: EntryView | null
  selectSong: (song: EntryView) => void
}

const DankAmpContext = createContext<Context | null>(null)

export const DankAmpContextProvider = ({ children }: Props) => {
  const [song, setSong] = useState<EntryView | null>(null)
  const toast = useToast()

  useEffect(() => {}, [])

  const selectSong = (song: EntryView) => {
    toast({ description: `queueing up ${song.artist_name} - ${song.title}` })
    setSong(song)
  }

  // TODO: transport controls

  return (
    <DankAmpContext.Provider value={{ song, selectSong }}>
      {children}
    </DankAmpContext.Provider>
  )
}

export const useDankAmpContext = () => {
  const context = useContext(DankAmpContext)

  if (!context)
    throw new Error(
      'DankAmpContext must be called from within the DankAmpContextProvider',
    )

  return context
}
