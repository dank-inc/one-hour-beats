import { PageHeader, Typography } from 'antd'
import React from 'react'

type Props = {}
export const Home = (props: Props) => {
  // if ! user account direct to discord / fb group for invite

  return (
    <PageHeader title="One Hour Beats" subTitle="Where inspiration happens!">
      <Typography.Title style={{ color: '#333' }}>Welcome</Typography.Title>
      <p>
        One Hour Beats (http://onehourbeats.com/) is a free platform that was
        created in order for people to expand their creativity and musicality,
        get comfortable making mistakes, meet fellow musicians, and just
        generally have a grand ole' time.
      </p>
      <Typography.Title style={{ color: '#333' }}>
        What happens on OHB?
      </Typography.Title>
      <p>...stays on OHB... jk</p>
      <p>
        It's simple. After you receive an invite from a current member, sign up
        for a jam, and make sure you are there for the start time. You will have
        one hour to make a beat, jingle, song, musical phrase, or whatever,
        based on the prompt given to you and the rest of the jam members.
      </p>
      <p>
        Record that piece of music on your phone, or with any recording
        equipment you have handy. When the hour is done, you will have ten
        minutes to upload what you've created to the website.
      </p>
      <p>
        Afterwards, you can listen to what your fellow jam members have created
        and vote on your favourite! But remember, it doesn't really matter who
        gets the most votes. What's important is that you step out of your
        comfort zone, and try something new :)
      </p>
      <Typography.Title style={{ color: '#333' }}>
        How to use the site
      </Typography.Title>
      <ol>
        <li> Create an account.</li>
        <li>Join a jam.</li>
        <li>
          Invite friends: the only way people can actually create an account is
          by first receiving an invite from a current member.
        </li>
      </ol>
    </PageHeader>
  )
}
