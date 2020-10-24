import { Row, Typography } from 'antd'
import React from 'react'
import 'scss/home.scss'
import { ReactComponent as Facebook } from 'assets/svg/facebook.svg'
import { ReactComponent as Discord } from 'assets/svg/discord.svg'
import Singing from 'assets/images/sincerely-media-singing-into-mic-unsplash-sm.jpg'
import Ableton from 'assets/images/tamas-pap-ableton-unsplash-sm.jpg'
import Cabin from 'assets/images/soundtrap-cabin-unsplash-sm.jpg'
import { ReactComponent as InfoGraphic } from 'assets/svg/infographic.svg'

export const Home = () => {
  return (
    <div className="home-page">
      <Row className="title top-fold">
        <Typography.Title>Inspiration</Typography.Title>
        <p>Welcome to your new safe space.</p>
      </Row>
      <Row
        className="title singing"
        style={{ backgroundImage: `url(${Singing})` }}
      >
        <Typography.Title>One Hour Beats</Typography.Title>
      </Row>
      <Row className="message">
        <p>
          One Hour Beats was created in order for people to expand their{' '}
          <b>creativity</b> and <b>musicality</b>
        </p>
        <p>
          Get comfortable making mistakes, meet fellow musicians, and just
          generally have a grand ole' time.
        </p>
      </Row>
      <Row className="title" style={{ backgroundImage: `url(${Ableton})` }}>
        <Typography.Title>How does it work?</Typography.Title>
      </Row>
      <Row className="message">
        <InfoGraphic className="infographic" width="900" />
      </Row>
      <Row
        className="title"
        id="invite"
        style={{ backgroundImage: `url(${Cabin})` }}
      >
        <Typography.Title>Get an Invite</Typography.Title>
      </Row>
      <Row className="message">
        <p>
          If you are feeling up to the challenge, just hit up our Discord server
          or Facebook group and ask for an invite!
        </p>
        <p>
          <a href="https://discord.gg/8qQY4mA" target="_new">
            <Discord className="svg-link" />
          </a>
          <a
            href="https://www.facebook.com/groups/371494887355851"
            target="_new"
          >
            <Facebook className="svg-link" />
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
