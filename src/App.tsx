import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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

const Content: React.FC = () => (
  <Router>
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
  </Router>
)

export const App: React.FC = () => {
  const { status } = useContent()

  switch (status) {
    case Status.FETCHED:
      return <Content />
    case Status.FAILED:
      return <Error />
    case Status.FETCHING:
    default:
      return <Loader />
  }
}
