import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import { Login } from 'routes/login'
import { message, Spin } from 'antd'
import axios from 'axios'
import { UserView } from 'types/view'
import { getUser } from 'api'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Invite } from 'routes/invite'

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
    const user_id = window.localStorage.getItem('ohb-jwt-id')
    const token = window.localStorage.getItem('ohb-jwt-token')

    const login = async (user_id: string) => {
      try {
        const { data } = await axios.get<UserView>(`/api/users/${user_id}`, {
          headers: { Authorization: token },
        })
        setUser(data)
        message.success(`logged in as ${data?.username}`, 0.5)
      } catch {
        message.error('Login Failed!')
        window.localStorage.removeItem('ohb-jwt-token')
        window.localStorage.removeItem('ohb-jwt-username')
        window.localStorage.removeItem('ohb-jwt-id')
        window.localStorage.removeItem('ohb-jwt-exp')
        window.location.reload()
      }
    }

    if (!user_id) {
      setTriedJWT(true)
      return
    } else {
      login(user_id)
    }
  }, [])

  const handleLogin = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(`/api/login`, { username, password })
      window.localStorage.setItem('ohb-jwt-username', data.username)
      window.localStorage.setItem('ohb-jwt-id', data.id)
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
    window.localStorage.removeItem('ohb-jwt-id')
    window.localStorage.removeItem('ohb-jwt-exp')

    message.success('logged out!', 0.5)
  }

  return user ? (
    <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  ) : triedJWT ? (
    <BrowserRouter>
      <Switch>
        <Route path="/invite/:token" component={Invite} />
        <Login handleLogin={handleLogin} />
      </Switch>
    </BrowserRouter>
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
