import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useContent, Status } from './context/Content'
import { CategoryList } from './views/CategoryList'
import { ModelList } from './views/ModelList'
import { ModelDetails } from './views/ModelDetails'

const ViewContainer = styled.div`
  min-height: 100%;
  padding: 2rem;
`

const Loader: React.FC = () => (
  <ViewContainer>
    <h1>Loading...</h1>
  </ViewContainer>
)

const Error: React.FC = () => (
  <ViewContainer>
    <h1>Error...</h1>
  </ViewContainer>
)

const Router: React.FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence exitBeforeEnter>
      <ViewContainer>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <CategoryList />
          </Route>
          <Route exact path="/:categoryId">
            <ModelList />
          </Route>
          <Route exact path="/:categoryId/:modelId">
            <ModelDetails />
          </Route>
        </Switch>
      </ViewContainer>
    </AnimatePresence>
  )
}

export const App: React.FC = () => {
  const { status } = useContent()

  switch (status) {
    case Status.FETCHED:
      return <Router />
    case Status.FAILED:
      return <Error />
    case Status.FETCHING:
    default:
      return <Loader />
  }
}
