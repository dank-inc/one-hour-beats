import React from 'react'
import { useUserContext } from 'contexts/UserContext'
import { AccountDetails } from 'components/pages/AccountDetails'
import { updateUser } from 'api'
import { Navigate } from 'react-router'
import { useFormik } from 'formik'
import { Button, Grid, Heading, useToast } from '@chakra-ui/react'
import { Card } from 'components/elements/Card'

export const Preferences = () => {
  const { user } = useUserContext()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      username: user?.username,
      password: '',
      confirm: '',
    },
    onSubmit: async ({ name, username, email, password }) => {
      toast({ title: 'Saving preferences' })
      try {
        await updateUser(user?.id!, { name, username, email, password })
        toast({ title: 'Preferences updated' })
      } catch (err) {
        toast({ title: `Couldn't update preferences` })
      }
    },
  })

  if (!user) return <Navigate to="/" />

  return (
    <Grid>
      <Heading>Preferences</Heading>
      <p>Customize how others will see you</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex-container">
          <Card title="Account Information">
            <AccountDetails user={user} />
          </Card>
        </div>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </form>
    </Grid>
  )
}
