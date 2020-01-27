import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const SHOW_SPINNER_DELAY_MS = 100
const SPINNER_SPEED_MS = 1800

const spinCube = keyframes`
  25% { transform: translateX(2rem) rotate(-90deg) scale(0.5) }
  50% { transform: translateX(2rem) translateY(2rem) rotate(-180deg) }
  75% { transform: translateX(0px) translateY(2rem) rotate(-270deg) scale(0.5) }
  100% { transform: rotate(-360deg) }
`

const View = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const Cubes = styled.div`
  position: relative;
`

const Cube = styled.div<{ bg: string; delay: number }>`
  animation: ${spinCube} ${SPINNER_SPEED_MS}ms infinite ease-in-out;
  animation-delay: ${props => `${props.delay}ms`};
  background-color: ${props => props.bg};
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  top: -1.5rem;
  left: -1.5rem;
`

export const Loader: React.FC = () => {
  const [isSpinnerVisible, setSpinnerVisibility] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(setSpinnerVisibility, SHOW_SPINNER_DELAY_MS, true)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <View>
      {isSpinnerVisible && (
        <Cubes>
          <Cube bg="#005E9D" delay={0} />
          <Cube bg="#FFDA1A" delay={(SPINNER_SPEED_MS / 2) * -1} />
        </Cubes>
      )}
    </View>
  )
}
