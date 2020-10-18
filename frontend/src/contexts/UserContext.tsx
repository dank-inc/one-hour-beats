import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import axios from 'axios'
import { message, Spin } from 'antd'

import { UserView } from 'types/User'
import { getUser } from 'api'
import { mockUser } from 'api/mock/user'

import { UnauthedLayout } from 'components/layouts/UnauthedLayout'
import { useActionCableContext } from './ActionCableContext'
import { useHistory } from 'react-router'

type Props = {
  children: React.ReactNode
}

type Context = {
  user: UserView
  setUser: Dispatch<SetStateAction<UserView | null>>
  handleLogin: (username: string, password: string) => void
  handleLogout: () => void
}

type Login = {
  username: string
  token: string
  id: string
  exp: string
}

const UserContext = createContext<Context | null>(null)

export const UserContextProvider = ({ children }: Props) => {
  const history = useHistory()
  const { consumer } = useActionCableContext()
  const [user, setUser] = useState<UserView | null>(null)
  const [triedJWT, setTriedJWT] = useState(false)

  useEffect(() => {
    const user_id = window.localStorage.getItem('ohb-jwt-id')
    const token = window.localStorage.getItem('ohb-jwt-token')

    const env = process.env.REACT_APP_ENV

    if (env === 'local') {
      console.log('using test user')
      setUser(mockUser)
      return
    }

    const login = async (user_id: string) => {
      try {
        const { data } = await axios.get<UserView>(`/api/users/${user_id}`, {
          headers: { Authorization: token },
        })
        setUser(data)
        message.success(`logged in as ${data?.username}`, 0.5)
      } catch {
        message.error('Login Failed!')
        wipeLocalStorage()
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

  useEffect(() => {
    if (!user) return

    const subscription = consumer.subscriptions.create(
      { channel: 'UserChannel', user_id: user.id },
      {
        received: (user: UserView) => {
          console.log('UserChannel Update', user)
          setUser(user)
        },
      }
    )
    console.log('subscribed to user channel', subscription)

    return () => {
      subscription.unsubscribe()
    }
  }, [user, consumer.subscriptions])

  const handleLogin = async (username: string, password: string) => {
    try {
      const { data } = await axios.post<Login>(`/api/login`, {
        username,
        password,
      })

      setLocalStorage(data)
      setUser(await getUser(data.id))
      message.success(`logged in as ${user?.username}`, 0.5)
      history.push('/')
    } catch (err) {
      message.error('Login Failed!')
    }
  }

  const handleLogout = () => {
    setUser(null)
    wipeLocalStorage()
    message.success('logged out!', 0.5)
    history.push('/')
  }

  const setLocalStorage = (data: Login) => {
    window.localStorage.setItem('ohb-jwt-username', data.username)
    window.localStorage.setItem('ohb-jwt-id', data.id)
    window.localStorage.setItem('ohb-jwt-token', data.token)
    window.localStorage.setItem('ohb-jwt-exp', data.exp)
  }

  const wipeLocalStorage = () => {
    window.localStorage.removeItem('ohb-jwt-token')
    window.localStorage.removeItem('ohb-jwt-username')
    window.localStorage.removeItem('ohb-jwt-id')
    window.localStorage.removeItem('ohb-jwt-exp')
  }

  return user ? (
    <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  ) : triedJWT ? (
    <UnauthedLayout handleLogin={handleLogin} />
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
