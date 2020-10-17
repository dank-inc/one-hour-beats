import React, { useEffect } from 'react'
import { Typography, Layout, Row } from 'antd'

import 'scss/app-header.scss'
import { TopMenu } from './TopMenu'
import { Link } from 'react-router-dom'

export const AppHeader = () => {
  // get location
  // set active menu item

  useEffect(() => {
    // match location
  }, [])

  return (
    <Layout.Header className="app-header">
      <Row justify="space-between" align="middle">
        <Link to="/">
          <Typography.Title style={{ color: '#fff' }}>
            One Hour Beats
          </Typography.Title>
        </Link>
        <TopMenu />
      </Row>
    </Layout.Header>
  )
}
