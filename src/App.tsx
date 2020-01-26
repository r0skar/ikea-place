import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useContent, Status } from './context/Content'
import { CategoryList } from './views/CategoryList'
import { ModelList } from './views/ModelList'
import { ModelDetails } from './views/ModelDetails'

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

const Router: React.FC = () => (
  <Switch>
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
)

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
