// eslint-disable-next-line import/no-webpack-loader-syntax
import destyle from '!!raw-loader!@r0skar/destyle.css/destyle.css'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${destyle}

  html {
    font-size: calc(10px + 0.75vmin);
    line-height: 1.5;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  body {
    background-color: #ffffff;
    color: #777676;
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
  }

  #root {
    min-height: 100vh;
    min-height: fill-available;
    position: relative;
  }
`
