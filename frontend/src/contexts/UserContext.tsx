import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from 'types/database'
import { Login } from 'routes/login'
import { userByUsername } from 'mock/users'
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
    // const login = () => {
    //   setUser(userByUsername['eli7vh'])
    //   message.success('logged in as eli7vh')
    // }
    // setTimeout(login, 500)
  }, [])

  const handleLogin = (username: string, password: string) => {
    const user = userByUsername[username]
    if (user?.password === password) {
      setUser(user)
      message.success(`logged in as ${username}`)
    } else {
      // say user login failed
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
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
