import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'
import { call, when, hasIn } from 'ramda'
import 'normalize.css'

import { i18n } from '@ui/shared-store'

import starter from './starter'
import App from './ui'

const tasks = [
  // mobx settings
  () => Promise.resolve().then(() => configure({ enforceActions: 'observed' })),
  // ua detect for i18n
  () => Promise.resolve().then(() => i18n.setLanguage(navigator.language)),
]

starter(...tasks)
  .then(() => { render(<App />, document.getElementById('root')) })

// hmr
call(when(hasIn('hot'), (o) => { o.hot?.accept() }), module)
