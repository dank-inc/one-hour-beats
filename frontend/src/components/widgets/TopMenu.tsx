import { Avatar, Spinner, useToast } from '@chakra-ui/react'
import { requestInvite } from 'api'
import { useUserContext } from 'contexts/UserContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Invitation } from 'types/Invitation'

export const TopMenu = () => {
  const navigate = useNavigate()
  const { user, handleLogout } = useUserContext()
  const [invite, setInvite] = useState<Invitation | null>(null)
  const [modal, setModal] = useState(false)
  const toast = useToast()

  const handleInvite = async () => {
    if (!invite) {
      // @ts-ignore
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

    if (key[0] === '/') navigate(key)
  }

  return <div>DO MENU</div>

  // return (
  //   <>
  //     <Dropdown
  //       overlay={
  //         <Menu onClick={handleNav}>
  //           <Menu.Item onSelect={() => {}}>
  //             Welcome, {user?.name || 'Guest'}
  //           </Menu.Item>
  //           <Menu.Divider />
  //           <Menu.Item key="/">Home</Menu.Item>
  //           <Menu.Item key="/about">About</Menu.Item>
  //           {user && <Menu.Item key="/preferences">Preferences</Menu.Item>}
  //           {user && <Menu.Divider />}
  //           {user && <Menu.Item key="$invite">Invite A Friend!</Menu.Item>}
  //           {user && <Menu.Divider />}
  //           {user && <Menu.Item key="$logout">Log Out</Menu.Item>}
  //         </Menu>
  //       }
  //     >
  //       <Avatar name="🤌" />
  //     </Dropdown>
  //     <Modal
  //       visible={modal}
  //       onOk={() => setModal(!modal)}
  //       onCancel={() => setModal(!modal)}
  //     >
  //       {invite ? (
  //         <>
  //           <h3>Copy paste this link and share!</h3>
  //           <input
  //             onClick={async () => {
  //               await navigator.clipboard.writeText(
  //                 `http://onehourbeats.com/invite/${invite?.token}`,
  //               )
  //               toast({ title: 'Copied!' })
  //             }}
  //             style={{ width: `100%` }}
  //             defaultValue={`http://onehourbeats.com/invite/${invite?.token}`}
  //           />
  //         </>
  //       ) : (
  //         <Spinner title="Requesting Invite..." />
  //       )}
  //     </Modal>
  //   </>
  // )
}
