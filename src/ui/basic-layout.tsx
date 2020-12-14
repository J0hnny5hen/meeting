import { ThemeProvider } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import theme from './theme'

export default function BasicLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider theme={theme}>
      { children }
    </ThemeProvider>
  )
}
