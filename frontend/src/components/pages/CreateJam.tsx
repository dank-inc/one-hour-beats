import React from 'react'
import { useUserContext } from 'contexts/UserContext'
import { createJam } from 'api'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Grid, Heading, Input, useToast } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Card } from 'components/elements/Card'
import { Field, useFormik } from 'formik'

export const CreateJam = () => {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      time_limit: 60,
      description: '',
      scheduledDate: DateTime.local(),
      scheduledTime: DateTime.local().plus({ hours: 6 }),
    },
    onSubmit: async ({
      id,
      name,
      time_limit,
      description,
      scheduledDate,
      scheduledTime,
    }) => {
      toast({ title: 'Creating Challenge' })

      scheduledDate.set({
        hour: scheduledTime.get('hour'),
        minute: scheduledTime.get('minute'),
        second: scheduledTime.get('second'),
      })

      if (scheduledDate < DateTime.local()) {
        toast({
          title:
            'Cannot set time for the past... We must forge ahead to the big, bright future. Only there can we truly face our fears and grow to be better humans in general.',
        })
        return
      }

      try {
        await createJam({
          id,
          name,
          time_limit,
          user_id: user?.id!,
          description,
          scheduled_at: scheduledDate.toISO(),
        })
        navigate('/jams')
      } catch (err: any) {
        console.log('error!', err.response.data)
        toast({ title: err.response.data.message }) // want to log message from serve}r
      }
    },
  })

  if (!user) return <Navigate to="/" />

  return (
    <Grid>
      <Heading>Create A Challenge</Heading>
      <p>Let's give 'em something to jam about</p>
      <Card title="New Challenge">
        <form onSubmit={formik.handleSubmit}>
          <Field
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Provide a challenge name!' }]}
          >
            <Input />
          </Field>
          <Field
            label="Time Limit (minutes)"
            name="time_limit"
            rules={[
              {
                required: true,
                message: 'Enter a time in minutes between 60 * 4800!',
              },
            ]}
          >
            <Input type="number" min={60} max={4800} />
          </Field>
          <Field
            label="Prompt"
            name="description"
            rules={[
              {
                required: true,
                message: 'Provide a prompt to help people get creative!',
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter a prompt that people will need to follow"
            />
          </Field>
          <Field
            rules={[{ required: true, message: 'schedule a date' }]}
            label="Date"
            name="scheduledDate"
          >
            TODO: DatePicker
          </Field>
          <Field
            rules={[{ required: true, message: 'schedule a time!' }]}
            label="Start Time"
            name="scheduledTime"
          >
            TODO: Better Date Time Picker
            {/* <TimePicker minuteStep={15} format="HH:mm" /> */}
          </Field>
          <Field>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Field>
        </form>
      </Card>
    </Grid>
  )
}
