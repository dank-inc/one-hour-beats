import React from 'react'
import { submitChatMessage } from 'api'
import { Field, useFormik } from 'formik'
import { Button, Input } from '@chakra-ui/react'

type Props = {
  userId: string
  jamId: string
}
export const ChatForm = ({ userId, jamId }: Props) => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      await submitChatMessage({ message, jam_id: jamId, user_id: userId })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Field name="message" rules={[{ required: true }]}>
        <Input placeholder="Send a chat message..." size="large" autoFocus />
      </Field>
      <Button type="submit" variant="primary">
        Send
        {/* <SendOutlined /> */}
      </Button>
    </form>
  )
}
