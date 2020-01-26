// eslint-disable-next-line import/no-webpack-loader-syntax
import destyle from '!!raw-loader!@r0skar/destyle.css/destyle.css'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${destyle}

  html, body {
    height: 100vh;
    height: fill-available;
  }

  html {
    font-size: calc(10px + 0.75vmin);
    line-height: 1.5;
  }

  body {
    background-color: #f5f9ff;
    color: #333333;
    font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
  }

  #root {
    height: 100%;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`
