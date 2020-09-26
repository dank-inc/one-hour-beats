import React from 'react'
import { PageHeader, Layout } from 'antd'
import { Link } from 'react-router-dom'

export const About = () => {
  return (
    <>
      <PageHeader
        title="About One Hour Beats!"
        subTitle="Why having so much fun?"
      />
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
      <h3>History:</h3>
      <p>
        Elijah Lucian started "one hour beating" in 2010, and found it to be a
        great way to create a jump-off point for a song!
      </p>
      <p>
        Check out the original one hour beats{' '}
        <Link to="http://elijahlucian.blogspot.com/">here</Link>{' '}
      </p>
      <p>
        TODO: add an inspiring speech about how working within limitations can
        spark creativity and shit.
      </p>
      <h3>Discord:</h3>
      Want to jam w/ us?
      <Link to="https://discord.gg/8qQY4mA">
        Join our discord for an invite!
      </Link>
    </>
  )
}
