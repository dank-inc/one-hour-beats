import React from 'react'
import { ReactComponent as Facebook } from 'assets/svg/facebook.svg'
import { ReactComponent as Discord } from 'assets/svg/discord.svg'
import Singing from 'assets/images/sincerely-media-singing-into-mic-unsplash-sm.jpg'
import Ableton from 'assets/images/tamas-pap-ableton-unsplash-sm.jpg'
import Cabin from 'assets/images/soundtrap-cabin-unsplash-sm.jpg'
import { ReactComponent as InfoGraphic } from 'assets/svg/infographic.svg'
import { Box, Heading } from '@chakra-ui/react'

export const Home = () => {
  return (
    <div className="home-page">
      <Box className="title top-fold">
        <Heading>Inspiration</Heading>
        <p>Welcome to your new safe space.</p>
      </Box>
      <Box
        className="title singing"
        style={{ backgroundImage: `url(${Singing})` }}
      >
        <Heading>One Hour Beats</Heading>
      </Box>
      <Box className="message">
        <p>
          One Hour Beats was created in order for people to expand their{' '}
          <b>creativity</b> and <b>musicality</b>
        </p>
        <p>
          Get comfortable making mistakes, meet fellow musicians, and just
          generally have a grand ole' time.
        </p>
      </Box>
      <Box className="title" style={{ backgroundImage: `url(${Ableton})` }}>
        <Heading>How does it work?</Heading>
      </Box>
      <Box className="message">
        <InfoGraphic className="infographic" width="900" />
      </Box>
      <Box
        className="title"
        id="invite"
        style={{ backgroundImage: `url(${Cabin})` }}
      >
        <Heading>Get an Invite</Heading>
      </Box>
      <Box className="message">
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
      </Box>
    </div>
  )
}
