import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'
import { call, when, hasIn } from 'ramda'
import 'normalize.css'

import { processor } from '@core'
import { Database } from '@service'
import { i18n } from '@ui/shared-store'

import starter from './starter'

const tasks = [
  // mobx settings
  () => Promise.resolve().then(() => configure({ enforceActions: 'observed' })),
  // ua detect for i18n
  () => Promise.resolve().then(() => i18n.setLanguage(navigator.language)),
  // database
  async () => new Promise((resolve) => new Database().init().then(() => { processor.setDatabase(Database.database); resolve(1) })),
]

starter(...tasks)
  .then(() => {
    import('./ui').then((module) => {
      const App = module.default
      render(<App />, document.getElementById('root'))
    })
  })

// hmr
call(when(hasIn('hot'), (o) => { o.hot?.accept() }), module)
