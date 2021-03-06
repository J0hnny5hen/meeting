import { createMuiTheme } from '@material-ui/core/styles'
import { Shadows } from '@material-ui/core/styles/shadows'

export default createMuiTheme({
  shadows: Array(25).fill('none') as Shadows,
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, \\"Segoe UI\\", \\"Roboto\\", \\"Oxygen\\",
      \\"Ubuntu\\", \\"Cantarell\\", \\"Fira Sans\\", \\"Droid Sans\\", \\"Helvetica Neue\\", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },

  overrides: {
    MuiRadio: { root: { padding: '4px' } },
    MuiSvgIcon: {
      root: {
        width: '1rem',
        height: '1rem',
      },
    },
    MuiFormControl: { root: { margin: '0.3rem 0' } },
    MuiInput: {
      underline: {
        '&:before': { borderBottom: '1px solid #EAEAEA' },
        '&:hover:not($disabled):not($focused):not($error):before': { borderBottom: '2px solid #EAEAEA' },
        '&$focused': { '&:after': { borderBottom: '2px solid #44a2fc' } },
      },
    },
  },
})
