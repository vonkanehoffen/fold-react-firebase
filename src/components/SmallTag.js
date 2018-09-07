import React from 'react'
import styled from 'styled-components'
import { colorFromString } from '../helpers/color'

const StyledSmallTag = styled.div`
  display: inline-block;
  font-size: .8em;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0 .5rem 5px 0;
  padding: .2rem .5rem;
  color: ${props => colorFromString(props.text)};
  background: white;
  border-radius: .2rem;
`

const SmallTag = (props) =>
  <StyledSmallTag {...props}>{props.text}</StyledSmallTag>

export default SmallTag