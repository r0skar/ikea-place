import React from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/Content'

export const CategoryList: React.FC = () => {
  const { data } = useContent()

  return (
    <div>
      <ul>
        {data.map(c => (
          <li key={c.id}>
            <Link to={`/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
