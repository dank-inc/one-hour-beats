import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, message, Modal, Spin } from 'antd'
import { requestInvite } from 'api'
import { useUserContext } from 'contexts/UserContext'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Invitation } from 'types/Invitation'

export const TopMenu = () => {
  const history = useHistory()
  const { user, handleLogout } = useUserContext()
  const [invite, setInvite] = useState<Invitation | null>(null)
  const [modal, setModal] = useState(false)

  const handleInvite = async () => {
    if (!invite) {
      setInvite(await requestInvite())
    }
    setModal(!modal)
  }

  const handleNav = ({ key }: any) => {
    if (!key) return

    if (key[0] === '$') {
      if (key === '$invite') handleInvite()
      if (key === '$logout') handleLogout()
      // do function
    }

    if (key[0] === '/') history.push(key)
  }

  return (
    <>
      <Dropdown
        overlay={
          <Menu className="dropdown-menu" onClick={handleNav}>
            <Menu.Item onSelect={() => {}}>
              Welcome, {user?.name || 'Guest'}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="/">Home</Menu.Item>
            <Menu.Item key="/about">About</Menu.Item>
            {user && (
              <>
                <Menu.Item key="/preferences">Preferences</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="$invite">Invite A Friend!</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="$logout">Log Out</Menu.Item>
              </>
            )}
          </Menu>
        }
      >
        <Avatar className="avatar" icon={<UserOutlined />} />
      </Dropdown>
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
    </>
  )
}
