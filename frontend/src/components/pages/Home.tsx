import React from 'react'
import { ReactComponent as Facebook } from 'assets/svg/facebook.svg'
import { ReactComponent as Discord } from 'assets/svg/discord.svg'
// import Singing from 'assets/images/sincerely-media-singing-into-mic-unsplash-sm.jpg'
// import Ableton from 'assets/images/tamas-pap-ableton-unsplash-sm.jpg'
// import Cabin from 'assets/images/soundtrap-cabin-unsplash-sm.jpg'
// import { ReactComponent as InfoGraphic } from 'assets/svg/infographic.svg'
import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { Row } from 'components/elements/Row'

export const Home = () => {
  return (
    <Grid>
      <Box>
        <Heading>Inspiration</Heading>
        <p>Welcome to your new safe space.</p>
      </Box>
      {/* <Box style={{ backgroundImage: `url(${Singing})` }}> */}
      <Heading>One Hour Beats</Heading>
      {/* </Box> */}
      <Box>
        <p>
          One Hour Beats was created in order for people to expand their{' '}
          <b>creativity</b> and <b>musicality</b>
        </p>
        <p>
          Get comfortable making mistakes, meet fellow musicians, and just
          generally have a grand ole' time.
        </p>
      </Box>
      {/* <Box style={{ backgroundImage: `url(${Ableton})` }}>
        <Heading>How does it work?</Heading>
      </Box>
      <Box>
        <InfoGraphic width="900" />
      </Box> */}
      {/* <Box id="invite" style={{ backgroundImage: `url(${Cabin})` }}> */}
      <Heading>Get an Invite</Heading>
      {/* </Box> */}
      <Row>
        <Text>
          If you are feeling up to the challenge, just hit up our Discord server
          or Facebook group and ask for an invite!
        </Text>

        <Text>
          Once you are a part of the site, you can invite as many people as you
          like!
        </Text>
      </Row>
      <Row justifyContent="flex-start">
        <a href="https://discord.gg/8qQY4mA" target="_new">
          <Discord className="svg-link" width="50px" height="50px" />
        </a>
        <a href="https://www.facebook.com/groups/371494887355851" target="_new">
          <Facebook className="svg-link" width="50px" height="50px" />
        </a>
      </Row>
    </Grid>
  )
}
