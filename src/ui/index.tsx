import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router'

import { HomePage } from './home'
import MeetingPage from './meeting'
import BasicLayout from './basic-layout'
import './index.styl'

export default function App() {
  return (
    <BasicLayout>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path='/meeting' component={MeetingPage} />
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    </BasicLayout>
  )
}
