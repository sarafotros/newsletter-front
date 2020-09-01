import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import Theme from '../../theme/theme'

const index = ({ children }) => {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
}
export default index

