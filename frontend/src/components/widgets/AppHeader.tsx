import React from 'react'
import { TopMenu } from './TopMenu'
import { Link } from 'react-router-dom'
import { useUserContext } from 'contexts/UserContext'
import { Grid, Heading } from '@chakra-ui/react'
import { Row } from 'components/elements/Row'

export const AppHeader = () => {
  const { user } = useUserContext()

  return (
    <Grid bgColor="blue.300" color="white" px="1rem">
      <Row alignItems="center">
        <Link to="/">
          <Heading>One Hour Beats</Heading>
        </Link>
        <Row gridGap="1rem" padding="1rem">
          <Link to="/jams">Jams</Link>
          {!user && <Link to="/login">Login</Link>}
          {user && <Link to="/create">New</Link>}
          <TopMenu />
        </Row>
      </Row>
    </Grid>
  )
}
