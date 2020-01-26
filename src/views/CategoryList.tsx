import React from 'react'
import { useContent } from '../context/Content'

export const CategoryList: React.FC = () => {
  const { data } = useContent()
  return <div>{JSON.stringify(data)}</div>
}
