import { observable, action, makeAutoObservable } from 'mobx'
import { cond, equals, path, always, map, Pred } from 'ramda'
import { LANG } from '@declare'
import Locales from '@ui/locale'
import { toPairs } from 'lodash'

export default class I18n {
  @observable.ref
  language: LANG = LANG.EN

  constructor() {
    makeAutoObservable(this)
  }

  getLanguage() {
    return this.language
  }

  @action
  setLanguage(language: LANG) {
    this.language = language
  }

  t = (paths: string) => cond(
    map(([locale, json]) => [
      equals(locale), always(path(paths.split('.'), json)),
    ] as [Pred, () => string], toPairs(Locales)),
  )(this.getLanguage())
}
