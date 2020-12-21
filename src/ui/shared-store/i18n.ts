import { observable, action, makeAutoObservable, computed } from 'mobx'
import { ifElse, forEach, test, flip, path, when, isNil, call } from 'ramda'

import { LANG } from '@declare'
import { LanguageRegMap, Locales } from '../locale'

export default class I18n {
  @observable.ref
  private language = LANG.EN

  @computed
  get locale() {
    return Locales.get(this.language)
  }

  constructor() {
    makeAutoObservable(this)
  }

  @action
  setLanguage(language: string) {
    forEach(
      when(
        flip(test)(language) as unknown as (reg: RegExp) => boolean,
        (reg) => { this.language = LanguageRegMap.get(reg)! },
      ),
      [...LanguageRegMap.keys()],
    )
  }

  t = (paths: string, options?: Record<'reason', string>) => call(
    ifElse(
      isNil,
      () => path(paths.split('.'), this.locale),
      (reason) => (path(paths.split('.'), this.locale) as string).replace(/\{.+\}/, reason),
    ),
    options?.reason,
  )
}
