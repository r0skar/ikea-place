import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useContent } from '../context/Content'

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const pageVariants = {
  enter: {
    transition: { staggerChildren: 0.15 }
  },
  exit: {
    transition: { staggerChildren: 0.1 }
  }
}

const contentVariants = {
  enter: {
    transition: { delayChildren: 0.5, staggerChildren: 0.2 }
  }
}

const listVariants = {
  enter: {
    transition: { delayChildren: 1, staggerChildren: 0.2 }
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

const contentTitleVariants = {
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

const contentDescriptionVariants = {
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

const listItemVariants = {
  initial: {
    y: 20,
    scale: 0.9,
    opacity: 0
  },
  enter: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition
  }
}

const Intro = styled.div`
  position: relative;
`

const ParallaxContainer = styled.div`
  position: relative;
  overflow: hidden;
`

const ImgContainer = styled(motion.div)`
  height: 50vh;
  position: relative;
  overflow: hidden;

  @media (min-width: 568px) {
    height: 100vh;
  }
`

const ImgOverlay = styled(motion.div)`
  background-color: #000000;
  mix-blend-mode: overlay;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`

const CoverImage = styled(motion.img)`
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
  height: 100%;
  width: 100%;
  will-change: transform, opacity;
`

const Content = styled(motion.div)`
  display: grid;
  grid-row-gap: 1rem;
  padding: 4rem 2rem;

  @media (min-width: 568px) {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`

const Title = styled(motion.h1)`
  color: #333333;
  font-size: 2rem;
  will-change: transform, opacity;

  @media (min-width: 568px) {
    color: #ffffff;
  }
`

const Description = styled(motion.p)`
  will-change: transform, opacity;

  @media (min-width: 568px) {
    color: #ffffff;
    max-width: 50ch;
  }
`

const List = styled(motion.ul)`
  display: grid;
  padding: 0 2rem 6rem;
  grid-row-gap: 4rem;
  grid-column-gap: 2rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 568px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding-top: 6rem;
  }
`

const ListItem = styled(motion.li)`
  display: block;
  backface-visibility: hidden;
  will-change: transform, opacity;
`

const ItemImg = styled.img`
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
  height: 100%;
  width: 100%;
`

const ItemLink = styled(Link)`
  height: 100%;
  display: grid;
  grid-template-rows: 150px min-content;
  grid-row-gap: 1rem;
  align-content: space-between;

  &:active {
    color: #005e9d;
  }
`

export const ModelList: React.FC = () => {
  const { data } = useContent()
  const { categoryId } = useParams()
  const { scrollYProgress } = useViewportScroll()
  const { name, models } = data.find(c => c.id === categoryId)!
  const rndImg = useRef(`/img/unsplash_${Math.floor(Math.random() * 6 + 1)}.webp`)

  const parallaxImgStyle = {
    translateY: useTransform(scrollYProgress, [0, 1], [0, 250]),
    scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
  }

  const parallaxOverlayStyle = {
    opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1])
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // TODO: use observer to trigger animations when in view instead of staggered on start.
  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants}>
      <Intro>
        <ParallaxContainer>
          <ImgContainer style={parallaxImgStyle}>
            <ImgOverlay style={parallaxOverlayStyle} />
            <CoverImage src={String(rndImg.current)} alt={name} variants={coverImageVariants} />
          </ImgContainer>
        </ParallaxContainer>
        <Content variants={contentVariants}>
          <Title variants={contentTitleVariants}>{name}</Title>
          <Description variants={contentDescriptionVariants}>
            Eiusmod eu esse eu ad irure exercitation. Irure sit non laboris reprehenderit duis ex amet voluptate et
            exercitation esse commodo incididunt incididunt. Voluptate nulla cillum est nostrud.
          </Description>
        </Content>
      </Intro>
      <List variants={listVariants}>
        {models.map(m => (
          <ListItem key={m.id} variants={listItemVariants}>
            <ItemLink to={`/${categoryId}/${m.id}`}>
              <ItemImg src={m.image_url} alt={m.name} />
              <h2>{m.name}</h2>
            </ItemLink>
          </ListItem>
        ))}
      </List>
    </motion.div>
  )
}
