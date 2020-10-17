import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { UserContextProvider } from './contexts/UserContext'
import { ActionCableContextProvider } from 'contexts/ActionCableContext'
import { DankAmpContextProvider } from 'contexts/DankAmpContext'

import { CoreLayout } from './components/layouts/AuthedLayout'

import 'scss/app.less'
import 'scss/app.scss'

export default () => {
  return (
    <BrowserRouter>
      <ActionCableContextProvider>
        <UserContextProvider>
          <DankAmpContextProvider>
            <CoreLayout />
          </DankAmpContextProvider>
        </UserContextProvider>
      </ActionCableContextProvider>
    </BrowserRouter>
  )
}
