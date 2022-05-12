import React from 'react'
import NextApp, {AppInitialProps} from 'next/app'
import {nextReduxWrapper} from 'common/config/nextReduxWrapper'
import {createGlobalStyle, ThemeProvider} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #252526;
    position: relative;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI', 'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
    text-decoration: none;
    color: white;
  }
`

const theme = {
  colors: {
    primary: '#0070F3'
  }
}

class WrappedApp extends NextApp<AppInitialProps> {

  public render() {
        const {Component, pageProps} = this.props
        return (
          <>
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </>
        )
    }
}

export default nextReduxWrapper.withRedux(WrappedApp)
