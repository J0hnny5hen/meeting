import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history'
import { Router, Route } from 'react-router'

import { HomePage } from './home'
import BasicLayout from './basic-layout'
import './index.styl'

export default function App() {
  return (
    <BasicLayout>
      <Router history={createBrowserHistory()}>
        <Route exact path='/' component={HomePage} />
      </Router>
    </BasicLayout>
  )
}
