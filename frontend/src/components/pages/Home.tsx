import { Row, Typography } from 'antd'
import React from 'react'
import 'scss/home.scss'
import { ReactComponent as Facebook } from 'assets/svg/facebook.svg'
import { ReactComponent as Discord } from 'assets/svg/discord.svg'

export const Home = () => {
  return (
    <div className="home-page">
      <Row className="title top-fold">
        <Typography.Title>Inspiration</Typography.Title>
        <p>Welcome to your new safe space.</p>
      </Row>
      <Row className="title">
        <Typography.Title>One Hour Beats</Typography.Title>
      </Row>
      <Row className="message">
        <p>
          One Hour Beats was created in order for people to expand their{' '}
          <b>creativity</b> and <b>musicality</b>
        </p>
        <p>
          get comfortable making mistakes, meet fellow musicians, and just
          generally have a grand ole' time.
        </p>
      </Row>
      <Row className="title">
        <Typography.Title>What Next?</Typography.Title>
      </Row>
      <Row className="message">
        <p>
          It's simple. After you receive an invite from a current member, sign
          up for a jam, and make sure you are there for the start time. You will
          have one hour to make a beat, jingle, song, musical phrase, or
          whatever, based on the prompt given to you and the rest of the jam
          members.
        </p>
        <p>
          Record that piece of music on your phone, or with any recording
          equipment you have handy. When the hour is done, you will have ten
          minutes to upload what you've created to the website.
        </p>
        <p>
          Afterwards, you can listen to what your fellow jam members have
          created and vote on your favourite! But remember, it doesn't really
          matter who gets the most votes. What's important is that you step out
          of your comfort zone, and try something new :)
        </p>
      </Row>
      <Row className="title">
        <Typography.Title>How to use the site</Typography.Title>
      </Row>
      <Row className="message">
        <p>1. Get an Invite</p>
        <p>2. Create an account</p>
        <p>3. Join a Jam!</p>
      </Row>
      <Row className="title" id="invite">
        <Typography.Title>Get an Invite</Typography.Title>
      </Row>
      <Row className="message">
        <p>
          If you are feeling up to the challenge, just hit up our Discord server
          or Facebook group and ask for an invite!
        </p>
        <p>
          <a href="https://discord.gg/8qQY4mA" target="_new">
            <Discord />
          </a>
          <a
            href="https://www.facebook.com/groups/371494887355851"
            target="_new"
          >
            <Facebook />
          </a>
        </p>
        <p>
          Once you are a part of the site, you can invite as many people as you
          like!
        </p>
      </Row>
    </div>
  )
}
