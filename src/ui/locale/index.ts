import { LANG } from '@declare'
import zh from './zh-CN.json'
import en from './en-US.json'

export const LanguageRegMap = new Map<RegExp, LANG>([
  [/^zh\b/, LANG.ZH],
  [/^en\b/, LANG.EN],
])

export const Locales = new Map<LANG, typeof zh | typeof en>([
  [LANG.ZH, zh],
  [LANG.EN, en],
])
