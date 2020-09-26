import React from 'react'
import { CoreLayout } from './CoreLayout'
import { UserContextProvider } from './contexts/UserContext'
import { ActionCableContextProvider } from 'contexts/ActionCableContext'

import 'antd/dist/antd.css'
import './App.scss'

function App() {
  // TODO: auth context - handles login
  // TODO: User Context - handles user login and subscriber
  // TODO:
  console.log('app mount!')

  return (
    <UserContextProvider>
      <ActionCableContextProvider>
        <CoreLayout />
      </ActionCableContextProvider>
    </UserContextProvider>
  )
}

export default App
