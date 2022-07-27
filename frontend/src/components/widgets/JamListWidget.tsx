import { Box, Grid, Heading, Text } from '@chakra-ui/react'
import { Row } from 'components/elements/Row'
import { JamCard } from 'components/widgets/JamCard'
import React from 'react'
import { JamView } from 'types/Jam'

type Props = {
  jams: JamView[]
  title: string
}
export const JamListWidget = ({ jams, title }: Props) => {
  console.log('jams', title, jams.length)
  return (
    <Grid gap="1rem">
      <Heading>{title}</Heading>
      <Row gridGap="1rem" flexWrap="wrap">
        {jams.length ? (
          jams.map((jam) => <JamCard jam={jam} key={`jam-list-${jam.id}`} />)
        ) : (
          <Text>Nothing Here...</Text>
        )}
      </Row>
    </Grid>
  )
}
