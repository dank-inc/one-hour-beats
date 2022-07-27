import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { Footer } from 'components/widgets/Footer'
import { CreateJam } from 'components/pages/CreateJam'
import { About } from 'components/pages/About'
import { Preferences } from 'components/pages/Preferences'
import { JamDetails } from 'components/pages/JamDetails'
import { JamPopout } from 'components/pages/JamPopout'
import { JamList } from 'components/pages/JamList'
import { AppHeader } from 'components/widgets/AppHeader'
import { Home } from 'components/pages/Home'
import { AppContextProvider } from 'contexts/AppContext'
import { useUserContext } from 'contexts/UserContext'
import { Login } from 'components/pages/Login'
import { Invite } from 'components/pages/Invite'
import { Box, Grid } from '@chakra-ui/react'

export const CoreLayout = () => {
  const { user } = useUserContext()

  return (
    <AppContextProvider userId={user?.id}>
      <Grid gridTemplateRows="60px auto 60px" height="100vh">
        <AppHeader />
        <Box padding="1rem">
          <Routes>
            <Route path="/invite/:token" element={<Invite />} />
            <Route path="/jams/:id/:popout" element={<JamPopout />} />
            <Route path="/jams/:id" element={<JamDetails />} />
            <Route path="/jams/*" element={<JamList />} />
            <Route path="/about" element={<About />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/create" element={<CreateJam />} />
            <Route path="/login" element={<Login />} />
            s <Route path="/" element={<Home />} />
          </Routes>
        </Box>
        <Footer />
      </Grid>
    </AppContextProvider>
  )
}
