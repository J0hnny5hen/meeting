import React from 'react'
import { render } from 'react-dom'
import { configure } from 'mobx'
// import { } from 'rxjs/observable'

import { i18n } from '@ui/shared-store'
import { LANG } from '@declare'

import App from './ui'
// 用户检测
// const tasks = [

// ]
// mobx settings
configure({ enforceActions: 'always' })
// ua detect for i18n
i18n.setLanguage(navigator.language as LANG)
render(<App />, document.getElementById('root'))
if (module.hot) {
  module.hot.accept()
}
