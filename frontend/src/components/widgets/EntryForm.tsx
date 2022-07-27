import React, { useState } from 'react'

import { useUserContext } from '../../contexts/UserContext'
import { submitEntry } from 'api'
import { Entry } from 'types/Entry'
import { Button, Checkbox, Input, useToast } from '@chakra-ui/react'
import { Card } from 'components/elements/Card'
import { Field, useFormik } from 'formik'

type Props = { jam_id: string }

export const EntryForm = ({ jam_id }: Props) => {
  const { user } = useUserContext()
  const [link, setLink] = useState<string | null>(null)
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      rights: false,
      id: `entry-${Date.now()}`, // jamstub-userstub-timestamp
      title: '',
    },
    onSubmit: async (form) => {
      if (!user) return

      if (!link) {
        toast({ title: 'please upload a file!' })
        return
      }

      if (!form.rights) {
        toast({ title: 'acknowledge you own all rights to the file!' })
        return
      }
      const body = { ...form, link, jam_id, user_id: user.id } as Entry

      submitEntry(body)
      toast({ title: 'submitting entry' })
    },
  })

  const handleUpload = (uploadHandler: any) => {
    // check for MP3 ONLy

    if (uploadHandler.file.error) {
      toast({ title: 'error uploading file!' })
    } else {
      // toast({title: 'uploading file...', 0.2})
      if (uploadHandler.fileList.length) {
        const path = uploadHandler.fileList[0].response?.path
        if (path) setLink(path)
        toast({ title: 'file uploaded!' })
      }
    }
  }

  return (
    <Card title="Submit Your Entry!">
      <form onSubmit={formik.handleSubmit}>
        <Field
          label="Song Name"
          name="title"
          rules={[{ required: true, message: 'This needs a title!' }]}
        >
          <Input />
        </Field>
        <Field
          label="I own rights"
          name="rights"
          valuePropName="checked"
          rules={[{ required: true, message: 'Sign this legal document!' }]}
        >
          <Checkbox />
        </Field>
        {/* <Upload.Dragger
          action={`/api/jams/${jam_id}/upload`}
          multiple={false}
          name="file"
          onChange={handleUpload}
          headers={{
            Authorization: window.localStorage.getItem('ohb-jwt-token') || '',
          }}
        >
          💌
          <p>Click to select file!</p>
          <p>Size Limit: 10MB</p>
        </Upload.Dragger> */}

        <Field>
          <Button variant="primary" type="submit">
            Submitt
          </Button>
        </Field>
      </form>
    </Card>
  )
}
