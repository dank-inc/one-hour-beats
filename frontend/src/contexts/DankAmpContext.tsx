import React, { createContext, useContext, useState, useEffect } from 'react'
import { message } from 'antd'
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

  useEffect(() => {}, [])

  const selectSong = (song: EntryView) => {
    message.loading(`queueing up ${song.artist_name} - ${song.title}`, 0.2)
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
      'DankAmpContext must be called from within the DankAmpContextProvider'
    )

  return context
}
