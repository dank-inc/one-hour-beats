import React from 'react'
import { Layout, Row, Typography } from 'antd'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'

import { Login } from 'components/pages/Login'
import { Invite } from 'components/pages/Invite'
import { About } from 'components/pages/About'
import { Home } from 'components/pages/Home'

import { AppContextProvider } from 'contexts/AppContext'

type Props = {
  handleLogin: (u: string, p: string) => void
}

export const UnauthedLayout = ({ handleLogin }: Props) => {
  // TODO: add public jam view

  return (
    <AppContextProvider userId="guest">
      <BrowserRouter>
        <Layout>
          <Layout.Header>
            <Row justify="space-between" align="middle">
              <Typography.Title>One Hour Beats</Typography.Title>
              <nav className="page-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/about">About</Link>
              </nav>
            </Row>
          </Layout.Header>
          <Switch>
            <Route path="/invite/:token" component={Invite} />
            <Route path="/about" component={About} />
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
          <Layout.Footer>copyright 2020 - One Hour Beats</Layout.Footer>
        </Layout>
      </BrowserRouter>
    </AppContextProvider>
  )
}
