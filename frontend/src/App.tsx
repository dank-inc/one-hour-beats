import React from 'react'
import { CoreLayout } from './CoreLayout'
import 'antd/dist/antd.css'
import './App.scss'
import { UserContextProvider } from './contexts/UserContext'
import { ActionCableContextProvider } from 'contexts/ActionCableContext'

function App() {
  // TODO: Store
  // jamcontext
  // - holds chat listener
  // - holds all jam updates
  // - holds jam room state (users, active, timeleft?)

  return (
    <UserContextProvider>
      <ActionCableContextProvider>
        <CoreLayout />
      </ActionCableContextProvider>
    </UserContextProvider>
  )
}

export default App
