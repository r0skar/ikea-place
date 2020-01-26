import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useContent, Status } from './context/Content'
import { CategoryList } from './views/CategoryList'
import { ModelList } from './views/ModelList'
import { ModelDetails } from './views/ModelDetails'

const RouteContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const Loader: React.FC = () => (
  <div>
    <h1>Loading...</h1>
  </div>
)

const Error: React.FC = () => (
  <div>
    <h1>Error...</h1>
  </div>
)

const Router: React.FC = () => {
  const location = useLocation()

  const routeMotion = {
    initial: 'initial',
    animate: 'in',
    exit: 'out',
    variants: {
      initial: {
        x: 20,
        opacity: 0
      },
      in: {
        x: 0,
        opacity: 1
      },
      out: {
        x: -20,
        opacity: 0
      }
    },
    transition: {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.5
    }
  } as const

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <RouteContainer {...routeMotion}>
            <CategoryList />
          </RouteContainer>
        </Route>
        <Route exact path="/:categoryId">
          <RouteContainer {...routeMotion}>
            <ModelList />
          </RouteContainer>
        </Route>
        <Route exact path="/:categoryId/:modelId">
          <RouteContainer {...routeMotion}>
            <ModelDetails />
          </RouteContainer>
        </Route>
      </Switch>
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
