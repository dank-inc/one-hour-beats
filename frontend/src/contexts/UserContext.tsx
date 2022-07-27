import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import axios from 'axios'

import { UserView } from 'types/User'
import { getUser } from 'api'
import { mockUser } from 'api/mock/user'

import { useActionCableContext } from './ActionCableContext'
import { useNavigate } from 'react-router'
import { useToast } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

type Context = {
  user: UserView | null
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
  const navigate = useNavigate()
  const toast = useToast()
  const { consumer } = useActionCableContext()
  const [user, setUser] = useState<UserView | null>(null)

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
          headers: { Authorization: token! },
        })
        setUser(data)
        toast({ description: `logged in as ${data?.username}`, duration: 500 })
      } catch {
        toast({ description: 'Login Failed!', status: 'error' })
        wipeLocalStorage()
        window.location.reload()
      }
    }

    if (!user_id) {
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
      },
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
      toast({ description: `logged in as ${user?.username}`, duration: 500 })
      navigate('/jams')
    } catch (err) {
      toast({ description: 'Login Failed!' })
    }
  }

  const handleLogout = () => {
    setUser(null)
    wipeLocalStorage()
    toast({ description: 'logged out!', duration: 500 })
    navigate('/')
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

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context)
    throw new Error(
      'UserContext must be called from within the UserContextProvider',
    )

  return context
}
