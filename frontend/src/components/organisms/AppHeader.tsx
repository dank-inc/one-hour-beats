import React, { useEffect, useState } from 'react'
import {
  Typography,
  Avatar,
  Button,
  Layout,
  message,
  Modal,
  Spin,
  Row,
  Tooltip,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useUserContext } from 'contexts/UserContext'
import { requestInvite } from 'api'
import { Invitation } from 'types/Invitation'
import { Link, useHistory } from 'react-router-dom'

export const AppHeader = () => {
  const { user } = useUserContext()
  const history = useHistory()
  const [invite, setInvite] = useState<Invitation | null>(null)
  const [modal, setModal] = useState(false)

  const handleInvite = async () => {
    if (!invite) {
      setInvite(await requestInvite())
    }
    setModal(!modal)
  }

  // get location
  // set active menu item

  useEffect(() => {
    // match location
  }, [])

  return (
    <Layout.Header>
      <Row justify="space-between" align="middle">
        <Typography.Title style={{ color: '#fff' }}>
          One Hour Beats
        </Typography.Title>

        <nav className="page-links">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/about">About</Link>
          <Link to="/jams">Jams</Link>
          <Link to="/preferences">Preferences</Link>
          <Button type="primary" onClick={handleInvite}>
            Invite A Friend!
          </Button>
        </nav>

        <Tooltip title={`Welcome, ${user.name}`}>
          <Button
            style={{ marginTop: '-0.5rem' }}
            onClick={() => history.push('/preferences')}
            type="link"
          >
            <Avatar
              style={{ backgroundColor: '#fffbe6', color: '#faad14' }}
              icon={<UserOutlined />}
            />
          </Button>
        </Tooltip>
      </Row>
      <Modal
        visible={modal}
        onOk={() => setModal(!modal)}
        onCancel={() => setModal(!modal)}
      >
        {invite ? (
          <>
            <h3>Copy paste this link and share!</h3>
            <input
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `http://onehourbeats.com/invite/${invite?.token}`
                )
                message.success('Copied!', 0.5)
              }}
              style={{ width: `100%` }}
              defaultValue={`http://onehourbeats.com/invite/${invite?.token}`}
            />
          </>
        ) : (
          <Spin tip="Requesting Invite..." />
        )}
      </Modal>
    </Layout.Header>
  )
}
