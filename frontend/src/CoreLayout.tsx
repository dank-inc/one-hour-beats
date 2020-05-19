import React from 'react'

import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import { Create } from './routes/create'
import { Jams } from './routes/jams'
import { About } from './routes/about'
import { JamDetails } from './routes/jams/[id]'
import { Preferences } from './routes/preferences'
import { useUserContext } from './contexts/UserContext'
import { Button } from 'antd'
import { JamPopout } from './routes/jams/[id]/JamPopout'
import { AppContextProvider } from './contexts/AppContext'
import { Footer } from 'components/Footer'
import { DankAmpContextProvider } from 'contexts/DankAmpContext'

export const CoreLayout = () => {
  const userContext = useUserContext()
  // use location for highlighting linked thingy

  return (
    <BrowserRouter>
      <AppContextProvider>
        <DankAmpContextProvider>
          <header>
            <Link to="/">
              <h2>One Hour Beats</h2>
            </Link>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/about">About</Link>
              <Link to="/jams">Jams</Link>
              <Link to="/preferences">Preferences</Link>
              <Button onClick={userContext.handleLogout}>Logout</Button>
            </nav>
          </header>
          <Switch>
            <Route path="/jams/:id/:view" component={JamPopout} />

            <Route path="/create" component={Create} />
            <Route path="/about" component={About} />

            <Route path="/jams/:id" component={JamDetails} />
            <Route exact path="/jams" component={Jams} />

            <Route path="/preferences" component={Preferences} />

            <Redirect to="/jams" />
          </Switch>
          <Footer />
        </DankAmpContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  )
}
