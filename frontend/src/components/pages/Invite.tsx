import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Heading,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import { Card } from 'components/elements/Card'
import { Field, useFormik } from 'formik'
import { useParams } from 'react-router'

export const Invite = () => {
  const navigate = useNavigate()
  const params = useParams<{ token: string }>()

  const [valid, setValid] = useState<boolean | null>(null)
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
      email: '',
      name: '',
    },
    onSubmit: async ({ username, email, name, password, confirm }) => {
      if (password !== confirm) {
        toast({ title: 'passwords do not match' })
        return
      }
      const { data } = await Axios.post(`/api/accept_invite/${params.token}`, {
        username,
        email: (email as string).trim(),
        name,
        password,
      })
      console.log('user created', data)
      toast({ title: 'user created, please log in!' })
      navigate('/')
    },
  })

  useEffect(() => {
    const get = async () => {
      try {
        await Axios.get(`/api/check_invite/${params.token}`)
        setValid(true)
      } catch (err) {
        setValid(false)
      }
    }

    get()
  }, [params.token])

  if (valid === null)
    return (
      <>
        <header>
          <h2>One Hour Beats</h2>
        </header>
        <Spinner size="large" title="checking token..." />
      </>
    )

  if (!valid)
    return (
      <>
        <header>
          <h2>One Hour Beats</h2>
        </header>
        <main>
          <p>Your token is invalid 😭</p>
          <p>
            <a href="https://discord.gg/8qQY4mA">hit us up on discord</a> and
            tell us why you would like to join! 😀
          </p>
        </main>
      </>
    )

  return (
    <>
      <header>
        <h2>One Hour Beats</h2>
      </header>
      <main>
        <Box />
        <Heading>Welcome To The Jam!</Heading>
        <Heading size="md">Create A User</Heading>
        <Card>
          <form onSubmit={formik.handleSubmit}>
            <Field
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Enter a username!',
                },
              ]}
            >
              <Input />
            </Field>
            <Field
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Enter an email!',
                },
              ]}
            >
              <Input type="email" />
            </Field>
            <Field
              label="Artist Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Enter an Artist Name!',
                },
              ]}
            >
              <Input />
            </Field>
            <Field
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Enter Your Password!',
                },
              ]}
            >
              <Input type="password" />
            </Field>

            <Field
              label="Password Confirmation"
              name="confirm"
              rules={[
                {
                  required: true,
                  message: 'Confirm Your Password!',
                },
              ]}
            >
              <Input type="password" />
            </Field>
            <Button type="submit" variant="primary">
              Join The Jam
            </Button>
          </form>
        </Card>
      </main>
    </>
  )
}

// export type User = {
//   id: string
//   password: string
// }
