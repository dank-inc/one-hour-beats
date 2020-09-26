import React from 'react'
import { Login } from 'components/pages/Login'
import { Invite } from 'components/pages/Invite'

import { About } from 'components/pages/About'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Layout } from 'antd'

type Props = {
  handleLogin: (username: string, password: string) => void
}
export const UnauthedLayout = ({ handleLogin }: Props) => {
  return (
    <BrowserRouter>
      <Layout>
        <Layout.Header>
          <h2>One Hour Beats</h2>
          <nav>
            <Link to="/">Login</Link>
            <Link to="/about">About</Link>
          </nav>
        </Layout.Header>

        <Switch>
          <Route path="/invite/:token" component={Invite} />
          <Route path="/about" component={About} />
          <Login handleLogin={handleLogin} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
