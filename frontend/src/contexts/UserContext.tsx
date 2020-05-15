import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from 'types/database'
import { Login } from 'routes/login'
import { message } from 'antd'
import axios from 'axios'

type Props = {
  children: React.ReactNode
}
type Context = {
  user: User
  handleLogin: (username: string, password: string) => void
  handleLogout: () => void
}

const UserContext = createContext<Context | null>(null)

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // some kind of JWT
  }, [])

  const handleLogin = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(`/api/login`, { username, password })
      setUser(data)
      message.success(`logged in as ${username}`, 0.5)
    } catch (err) {
      message.error('Login Failed!')
    }
  }

  const handleLogout = () => {
    setUser(null)
    message.success('logged out!', 0.5)
  }

  return user ? (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  ) : (
    <>
      <header>
        <h2>One Hour Beats</h2>
      </header>
      <Login handleLogin={handleLogin} />
    </>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context)
    throw new Error(
      'UserContext must be called from within the UserContextProvider'
    )

  return context
}
