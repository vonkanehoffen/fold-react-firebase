import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

const Button = styled.div`
  display: inline-block;
  padding: 1rem 2rem;
  margin-right: 1rem;
  border: 2px solid #000;
  font-size: 1.414rem;
  border-radius: 5px;
  cursor: pointer;
  ${props => props.secondary && `opacity: 0.4`}
  :hover {
    background: black;
    color: ${colors.primary}
  }
`



export default Button