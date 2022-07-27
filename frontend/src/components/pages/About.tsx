import { Grid, Heading } from '@chakra-ui/react'
import React from 'react'

export const About = () => {
  return (
    <Grid>
      <Heading>About One Hour Beats</Heading>
      <p>
        Once upon a time, in the early demoscene years, in the days of the
        trackers there existed a compo.
      </p>
      <p>This compo was called OHC. It stood for "one hour competition"</p>
      <p>
        Sadly the modern DAW has taken much from the demoscene days, Including
        our beloved One Hour Compo.
      </p>
      <p>But that all changes here, today!</p>
      <Heading>History</Heading>
      <p>
        Elijah Lucian started "one hour beating" in 2010, and found it to be a
        great way to create a jump-off point for a song!
      </p>
      <p>
        Check out the original one hour beats{' '}
        <a href="http://elijahlucian.blogspot.com/" target="_new">
          here
        </a>
      </p>
      <p>
        TODO: add an inspiring speech about how working within limitations can
        spark creativity and shit.
      </p>
      <Heading>Need an Invite?</Heading>
      <p>
        One Hour Beats is currently in closed beta - but you can still sign up!
      </p>
      <p>
        Simply{' '}
        <a href="https://discord.gg/8qQY4mA" target="_new">
          Join our discord
        </a>
        , tell us about yourself, and ask for an invite 😍. Don't worry, we're
        friendly (and we want to keep it that way)
      </p>
    </Grid>
  )
}
