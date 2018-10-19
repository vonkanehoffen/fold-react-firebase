import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

const Button = styled.div`
  display: inline-block;
  padding: 1rem 2rem;
  margin-right: 1rem;
  border: 2px solid ${props => props.mainColor || 'black'};
  ${props => props.filled && `background: ${props.mainColor};`}
  color: ${props => props.fgColor || (props.filled && 'black' || props.mainColor || 'black')};
  font-size: 1.414rem;
  border-radius: 5px;
  cursor: pointer;
  ${props => props.secondary && `opacity: 0.4`}
  // :hover {
  //   background: ${props => props.filled && 'black' || props.mainColor || 'black'};
  //   color: ${props => props.filled ? props.mainColor : (props.mainColor ? 'black' : colors.primary)}
  // }
`



export default Button