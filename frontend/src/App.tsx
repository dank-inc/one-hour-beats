import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { UserContextProvider } from './contexts/UserContext'
import { ActionCableContextProvider } from 'contexts/ActionCableContext'
import { DankAmpContextProvider } from 'contexts/DankAmpContext'

import { CoreLayout } from './components/layouts/CoreLayout'
import { ChakraProvider } from '@chakra-ui/react'

export const App = () => {
  return (
    <BrowserRouter>
      <ActionCableContextProvider>
        <UserContextProvider>
          <DankAmpContextProvider>
            <ChakraProvider>
              <CoreLayout />
            </ChakraProvider>
          </DankAmpContextProvider>
        </UserContextProvider>
      </ActionCableContextProvider>
    </BrowserRouter>
  )
}
