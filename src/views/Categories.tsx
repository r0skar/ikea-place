import React from 'react'
import { useContent } from '../context/Content'

export const Categories: React.FC = () => {
  const { data } = useContent()
  return <div>{JSON.stringify(data)}</div>
}
