import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { Footer } from 'components/organisms/Footer'
import { CreateJam } from 'components/pages/CreateJam'
import { About } from 'components/pages/About'
import { Preferences } from 'components/pages/Preferences'
import { JamDetails } from 'components/pages/JamDetails'
import { JamPopout } from 'components/pages/JamPopout'
import { JamList } from 'components/pages/JamList'

import { AppHeader } from 'components/organisms/AppHeader'
import { Home } from 'components/pages/Home'
import { AppContextProvider } from 'contexts/AppContext'
import { useUserContext } from 'contexts/UserContext'

export const CoreLayout = () => {
  // TODO: on app mount, change icon to random music emoji
  const { user } = useUserContext()

  return (
    <AppContextProvider userId={user?.id}>
      <Layout className="layout">
        <AppHeader />
        <Switch>
          <Route path="/jams/:id/:popout" component={JamPopout} />
          <Route path="/jams/:id" component={JamDetails} />
          <Route exact path="/jams" component={JamList} />

          <Route path="/create" component={CreateJam} />
          <Route path="/about" component={About} />
          <Route path="/preferences" component={Preferences} />

          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Layout>
    </AppContextProvider>
  )
}
