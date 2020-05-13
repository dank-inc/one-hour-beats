import React from 'react'
import { CoreLayout } from './CoreLayout'
import 'antd/dist/antd.css'
import './App.scss'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  // TODO: Store
  // jamcontext
  // - holds chat listener
  // - holds all jam updates
  // - holds jam room state (users, active, timeleft?)

  return (
    <UserContextProvider>
      <CoreLayout />
    </UserContextProvider>
  )
}

export default App
