import React, { useState, useEffect, useContext } from 'react'
import { Category, Model } from '../types'

type CategoriesResponse = { data: {}; tree: Category[] }
type ModelsResponse = { models: Model[] }
type Content = (Category & ModelsResponse)[]
type State = { status: Status; data: Content }

export enum Status {
  FAILED = 'FAILED',
  FETCHED = 'FETCHED',
  FETCHING = 'FETCHING'
}

const CACHE = window.sessionStorage
const MODELS_ENDPOINT = 'https://dev2.viewar.com/api10/models/ids:'
const CATEGORIES_ENDPOINT = 'https://dev2.viewar.com/api40/tree/channel:3265/version:1579872378'
const Context = React.createContext({} as State)

export const useContent = () => {
  return useContext(Context)
}

export const Provider: React.FC = props => {
  const [status, setStatus] = useState()
  const [data, setData] = useState<Content>([])

  const fetchData = async () => {
    const cached = CACHE.getItem('content')

    setStatus(Status.FETCHING)

    if (cached) {
      setData((JSON.parse(cached) as unknown) as Content)
      setStatus(Status.FETCHED)
      return
    }

    try {
      const categoriesReq = await fetch(CATEGORIES_ENDPOINT)
      const { tree: categories } = (await categoriesReq.json()) as CategoriesResponse
      const modelIds = categories.flatMap(c => c.models.map(m => m.id)).join(',')
      const modelsReq = await fetch(MODELS_ENDPOINT + modelIds)
      const { models } = (await modelsReq.json()) as ModelsResponse
      const content = categories.map(c => ({ ...c, models: models.filter(m => m.category_name === c.name) }))

      setData(content)
      setStatus(Status.FETCHED)
      CACHE.setItem('content', JSON.stringify(content))
    } catch (e) {
      console.error(e)
      setStatus(Status.FAILED)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <Context.Provider value={{ data, status }}>{props.children}</Context.Provider>
}
