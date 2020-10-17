import React, { useEffect } from 'react'
import { Typography, Layout, Row, Col } from 'antd'

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
        <Col>
          <Link to="/">
            <Typography.Title>One Hour Beats</Typography.Title>
          </Link>
        </Col>
        <Col className="top-nav">
          <Link to="/jams">Jams</Link>
          <Link to="/create">New</Link>
          <TopMenu />
        </Col>
      </Row>
    </Layout.Header>
  )
}
