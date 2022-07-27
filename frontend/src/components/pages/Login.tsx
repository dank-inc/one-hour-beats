import React from 'react'
import { useUserContext } from 'contexts/UserContext'
import { Navigate } from 'react-router-dom'
import { Box, Button, Grid, Heading, Input } from '@chakra-ui/react'
import { Field, useFormik } from 'formik'

export const Login = () => {
  const { user, handleLogin } = useUserContext()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => handleLogin(username, password),
  })

  if (user) return <Navigate to="/jams" />

  return (
    <Grid>
      <Box>
        <Heading>Login</Heading>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Field
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Field>
        <Field
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" />
        </Field>
        <Field>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Field>
      </form>
    </Grid>
  )
}
