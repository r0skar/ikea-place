import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../context/Content'

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const listVariants = {
  enter: {
    transition: { staggerChildren: 0.1 }
  }
}

const listItemVariants = {
  initial: {
    y: '25%',
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition
  },
  exit: {
    y: '25%',
    opacity: 0,
    transition
  }
}

const List = styled(motion.ul)`
  display: grid;
  grid-gap: 2rem;
  padding: 2rem;

  @media (min-width: 568px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ListItem = styled(motion.li)`
  display: block;
  height: 50vh;
  will-change: transform, opacity;
`

const ItemLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: block;
  position: relative;
`

const ItemImg = styled.img`
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const ItemTitle = styled.h1`
  color: #ffffff;
  font-size: 1.75rem;
  display: block;
  padding: 0 1rem;
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
`

export const CategoryList: React.FC = () => {
  const { data } = useContent()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // TODO: use observer to trigger animations when in view instead of staggered on start.
  return (
    <List initial="initial" animate="enter" exit="exit" variants={listVariants}>
      {data
        .filter(c => c.models.length > 0)
        .map((c, i) => (
          <ListItem key={c.id} variants={listItemVariants}>
            <ItemLink to={`/${c.id}`}>
              <ItemImg src={`/img/unsplash_${Math.min(i + 1, 6)}.webp`} alt={c.name} />
              <ItemTitle>{c.name}</ItemTitle>
            </ItemLink>
          </ListItem>
        ))}
    </List>
  )
}
