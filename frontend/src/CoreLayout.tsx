import React, { useState } from 'react'

import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom'
import { Create } from './routes/create'
import { Jams } from './routes/jams'
import { About } from './routes/about'
import { JamDetails } from './routes/jams/[id]'
import { Preferences } from './routes/preferences'
import { useUserContext } from './contexts/UserContext'
import { Button, Avatar, Modal, Spin, message } from 'antd'
import { JamPopout } from './routes/jams/[id]/JamPopout'
import { AppContextProvider } from './contexts/AppContext'
import { Footer } from 'components/Footer'
import { DankAmpContextProvider } from 'contexts/DankAmpContext'
import { UserOutlined } from '@ant-design/icons'
import { Invitation } from 'types/database'
import { requestInvite } from 'api'

export const CoreLayout = () => {
  const userContext = useUserContext()
  const [modal, setModal] = useState(false)
  const [invite, setInvite] = useState<Invitation | null>(null)

  const handleInvite = async () => {
    if (!invite) {
      setInvite(await requestInvite())
    }
    setModal(!modal)
  }

  return (
    <BrowserRouter>
      <AppContextProvider>
        <DankAmpContextProvider>
          <header>
            <Link to="/">
              <h2
                style={{
                  fontWeight: 'bold',
                  marginTop: '0.5rem',
                  marginLeft: '0.5rem',
                }}
              >
                One Hour Beats
              </h2>
            </Link>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/create">Create</Link>
              <Link to="/about">About</Link>
              <Link to="/jams">Jams</Link>
              <Button onClick={handleInvite}>Invite A Friend!</Button>
              <Link to="/preferences">Preferences</Link>

              <Button
                style={{ marginTop: '-0.5rem' }}
                onClick={userContext.handleLogout}
                type="link"
              >
                <Avatar
                  style={{ backgroundColor: '#fffbe6', color: '#faad14' }}
                  icon={<UserOutlined />}
                />
              </Button>
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
          <Modal
            visible={modal}
            onOk={() => setModal(!modal)}
            onCancel={() => setModal(!modal)}
          >
            {invite ? (
              <>
                <h3>Copy paste this link and share!</h3>
                <Button
                  type="link"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `http://onehourbeats.com/invite/${invite?.token}`
                    )
                    message.success('Copied!', 0.5)
                  }}
                >
                  http://onehourbeats.com/invite/{invite?.token}
                </Button>
                <input
                  style={{ width: `100%` }}
                  defaultValue={`http://onehourbeats.com/invite/${invite?.token}`}
                />
              </>
            ) : (
              <Spin tip="Requesting Invite..." />
            )}
          </Modal>
        </DankAmpContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  )
}
