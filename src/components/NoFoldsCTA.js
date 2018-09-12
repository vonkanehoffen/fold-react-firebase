import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import CenterVH from './CenterVH'
import Button from './Button'
import { Link } from 'react-router-dom'

const NoFoldsCTA = (props) => {
  return (
    <Outer>
      <Inner>
        <h2>No links :-(</h2>
        <Link to="/new"><Button mainColor={colors.secondary} filled>Create a link</Button></Link>
        <Button mainColor={colors.tertiary}>Get the browser extension</Button>
      </Inner>
    </Outer>
  )
}

const Outer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 25vh; // TODO: This centre props ain't good on mobile
  color: ${colors.primary};
  width: 100vw;
  height: 50vh;
`

const Inner = styled.div`
  h2 {
  margin-bottom: 2rem;  
  }
  text-align: center;
`

export default NoFoldsCTA