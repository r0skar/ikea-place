import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContent } from '../context/Content'

export const ModelList: React.FC = () => {
  const { data } = useContent()
  const { categoryId } = useParams()
  const { name, models } = data.find(c => c.id === categoryId)!

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {models.map(m => (
          <li key={m.id}>
            <Link to={`/${categoryId}/${m.id}`}>{m.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
