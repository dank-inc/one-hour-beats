import { Input } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'
import { User } from 'types/User'

type Props = {
  user: User
}

export const AccountDetails = ({ user }: Props) => {
  return (
    <>
      <Field label="Username" name="username">
        <Input defaultValue={user.username} />
      </Field>
      <Field label="Name" name="name">
        <Input defaultValue={user.name} />
      </Field>
      <Field label="Email" name="email">
        <Input defaultValue={user.email} />
      </Field>
      <Field label="Password" name="password">
        <Input type="password" placeholder="Enter new password..." />
      </Field>
      <Field label="Password">
        <Input type="password" placeholder="Confirm password..." />
      </Field>
    </>
  )
}
