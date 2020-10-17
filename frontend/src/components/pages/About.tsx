import React from 'react'
import { Layout, Typography } from 'antd'

export const About = () => {
  return (
    <Layout.Content>
      <Typography.Title>About One Hour Beats</Typography.Title>
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
      <Typography.Title>History</Typography.Title>
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
      <Typography.Title>Need an Invite?</Typography.Title>
      Want to jam w/ us?
      <a href="https://discord.gg/8qQY4mA" target="_new">
        Join our discord for an invite!
      </a>
    </Layout.Content>
  )
}
