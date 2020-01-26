import React from 'react'
import { useParams } from 'react-router-dom'
import { useContent } from '../context/Content'

export const ModelDetails: React.FC = () => {
  const { data } = useContent()
  const { categoryId, modelId } = useParams()
  const { models } = data.find(c => c.id === categoryId)!
  const { name } = models.find(m => m.id === modelId)!

  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}
