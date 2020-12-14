import UaParser from 'ua-parser-js'

const ua = new UaParser()

export function isMobile() {
  return ua.getDevice().type === 'mobile'
}

export function getBrowser() {
  return ua.getBrowser().name
}
