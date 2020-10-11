import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

// import { Clock } from 'components/organisms/Clock'
// import { useUserContext } from 'contexts/UserContext'

export const JamPopout = ({
  match,
}: RouteComponentProps<{ view: string; id: string }>) => {
  // const { user } = useUserContext()

  // user.currentJam

  // TODO: this based on user opt in
  // TODO: turn into full responsive overlay

  // if (match.params.view === 'clock')
  //   return <Clock jam={jam} width={600} height={600} popout />

  return <div>TODO: this.</div>
}
