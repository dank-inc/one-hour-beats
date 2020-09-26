import React from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import { Footer } from 'components/Footer'

import { CreateJam } from 'components/pages/CreateJam'
import { About } from 'components/pages/About'
import { Preferences } from 'components/pages/Preferences'
import { JamDetails } from 'components/pages/JamPage'
import { JamPopout } from 'components/pages/JamPopout'
import { JamIndex } from 'components/pages/JamIndex'

import { AppContextProvider } from 'contexts/AppContext'
import { DankAmpContextProvider } from 'contexts/DankAmpContext'
import { JamContextProvider } from 'contexts/JamContext'
import { AppHeader } from 'components/templates/AppHeader'

export const CoreLayout = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <DankAmpContextProvider>
          <JamContextProvider>
            <Layout className="layout">
              <AppHeader />
              <Layout.Content>
                <Switch>
                  <Route path="/jams/:id/:popout" component={JamPopout} />
                  <Route path="/jams/:id" component={JamDetails} />
                  <Route exact path="/jams" component={JamIndex} />

                  <Route path="/create" component={CreateJam} />
                  <Route path="/about" component={About} />
                  <Route path="/preferences" component={Preferences} />

                  <Redirect to="/jams" />
                </Switch>
              </Layout.Content>
              <Footer />
            </Layout>
          </JamContextProvider>
        </DankAmpContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  )
}
