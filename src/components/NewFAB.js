import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../colors'
import { Add } from 'styled-icons/material'

const NewFAB = (props) => {
  return (
    <FAB to="/new">
      <Icon/>
    </FAB>
  )
}

const FAB = styled(Link)`
  display: block;
  position: fixed;
  text-align: center;
  vertical-align: middle;
  bottom: 1rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${colors.primary};
  box-shadow: 0 5px 20px rgba(0,0,0,.5);
`

const Icon = styled(Add)`
  width: 2rem;
  margin-top: 1rem;
  color: black;
`

export default NewFAB