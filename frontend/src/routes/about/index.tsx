import React from 'react'
import { PageHeader } from 'antd'

type Props = {}
export const About = (props: Props) => {
  return (
    <main>
      <PageHeader
        className="site-page-header"
        title="About One Hour Beats!"
        subTitle="Why having so much fun?"
      />
      <div className="main-content">
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

        <p>
          TODO: add an inspiring speech about how working within limitations can
          spark creativity and shit.
        </p>
      </div>
    </main>
  )
}
