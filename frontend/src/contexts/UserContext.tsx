import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { User } from 'types/database'
import { Login } from 'routes/login'
import { message, Spin } from 'antd'
import axios from 'axios'
import { UserView } from 'types/view'
import { getUser } from 'prod/api'

type JWT = {
  username: string | null
  token: string | null
  exp: string | null
}

type Props = {
  children: React.ReactNode
}

type Context = {
  user: UserView
  setUser: Dispatch<SetStateAction<UserView | null>>
  handleLogin: (username: string, password: string) => void
  handleLogout: () => void
}

const UserContext = createContext<Context | null>(null)

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserView | null>(null)
  const [triedJWT, setTriedJWT] = useState(false)

  useEffect(() => {
    const username = window.localStorage.getItem('ohb-jwt-username')

    const login = async (username: string) => {
      const user = await getUser(username)
      try {
        setUser(user)
        message.success(`logged in as ${user?.username}`, 0.5)
      } catch {
        message.error('Login Failed!')
        window.localStorage.removeItem('ohb-jwt-token')
        window.localStorage.removeItem('ohb-jwt-username')
        window.localStorage.removeItem('ohb-jwt-exp')
      }
    }

    if (!username) {
      setTriedJWT(true)
      return
    } else {
      login(username)
    }
  }, [])

  const handleLogin = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(`/api/login`, { username, password })
      window.localStorage.setItem('ohb-jwt-username', data.username)
      window.localStorage.setItem('ohb-jwt-token', data.token)
      window.localStorage.setItem('ohb-jwt-exp', data.exp)

      const user = await getUser(data.id)
      setUser(user)
      message.success(`logged in as ${user?.username}`, 0.5)
    } catch (err) {
      message.error('Login Failed!')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('ohb-jwt-token')
    window.localStorage.removeItem('ohb-jwt-username')
    window.localStorage.removeItem('ohb-jwt-exp')

    message.success('logged out!', 0.5)
  }

  return user ? (
    <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  ) : triedJWT ? (
    <>
      <header>
        <h2>One Hour Beats</h2>
      </header>
      <Login handleLogin={handleLogin} />
    </>
  ) : (
    <Spin tip="Loading..." />
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
