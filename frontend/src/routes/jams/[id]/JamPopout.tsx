import React from 'react'
import { RoutedProps } from 'types/router'
import { Clock } from 'components/Clock'
import { useAppContext } from 'contexts/AppContext'

type Props = RoutedProps & {}
export const JamPopout = ({ match }: Props) => {
  const { jamIndex } = useAppContext()
  const jam = jamIndex[match.params.id]

  // @ts-ignore
  if (match.params.view === 'clock')
    return <Clock jam={jam} width={600} height={600} popout />

  return <div>Invalid view.</div>
}
