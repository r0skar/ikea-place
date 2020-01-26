import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { App } from './App'
import { Provider as ContentProvider } from './context/Content'
import { GlobalStyle } from './globalStyles'
import * as serviceWorker from './serviceWorker'

const Root: React.FC = () => (
  <ContentProvider>
    <GlobalStyle />
    <RouterProvider>
      <App />
    </RouterProvider>
  </ContentProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
