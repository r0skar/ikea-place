import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useContent } from '../context/Content'

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const pageVariants = {
  enter: {
    transition: { staggerChildren: 0.4 }
  }
}

const coverImageVariants = {
  initial: {
    opacity: 0,
    scale: 1.2
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: { ...transition, duration: 1.5 }
  },
  exit: {
    opacity: 0,
    transition
  }
}

const titleVariants = {
  initial: {
    y: 20,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition
  },
  exit: {
    y: 20,
    opacity: 0,
    transition
  }
}

const descriptionVariants = {
  initial: {
    y: -20,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition
  },
  exit: {
    y: -20,
    opacity: 0,
    transition
  }
}

const ImgContainer = styled.div`
  height: 50vh;
  position: relative;
  overflow: hidden;

  @media (min-width: 568px) {
    padding: 4rem;
    height: 100vh;
  }
`

const CoverImage = styled(motion.img)`
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
  height: 100%;
  width: 100%;
  will-change: transform, opacity;

  @media (min-width: 568px) {
    margin: auto;
    width: auto;
  }
`

const Content = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  padding: 4rem 2rem;
  will-change: transform, opacity;
`

const Title = styled(motion.h1)`
  color: #333333;
  font-size: 2rem;
  will-change: transform, opacity;
`

const Description = styled(motion.p)`
  will-change: transform, opacity;
`

export const ModelDetails: React.FC = () => {
  const { data } = useContent()
  const { categoryId, modelId } = useParams()
  const { models } = data.find(c => c.id === categoryId)!
  const { name, image_large } = models.find(m => m.id === modelId)!

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>
      <ImgContainer>
        <CoverImage src={image_large} alt={name} variants={coverImageVariants} />
      </ImgContainer>
      <Content>
        <Title variants={titleVariants}>{name}</Title>
        <Description variants={descriptionVariants}>
          Eiusmod eu esse eu ad irure exercitation. Irure sit non laboris reprehenderit duis ex amet voluptate et
          exercitation esse commodo incididunt incididunt. Voluptate nulla cillum est nostrud.
        </Description>
      </Content>
    </motion.div>
  )
}
