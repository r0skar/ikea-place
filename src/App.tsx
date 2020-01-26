import React from 'react'
import { useContent, Status } from './context/Content'
import { Categories } from './views/Categories'
import { Items } from './views/Items'
import { Item } from './views/Item'

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
  <div>
    <Categories />
    <Items />
    <Item />
  </div>
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
