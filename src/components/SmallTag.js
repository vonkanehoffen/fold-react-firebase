import React from 'react'
import styled from 'styled-components'
import { colorFromString } from '../helpers/color'

const StyledSmallTag = styled.div`
  //display: inline-block;
  font-size: .8rem;
  font-weight: 700;
  line-height: 1.2rem;
  text-transform: capitalize;
  margin: 0 .5rem .5rem 0;
  padding: .2rem .5rem;
  background: ${props => colorFromString(props.text)};
  color: white;
  border-radius: .2rem;
  cursor: pointer;
`

const SmallTag = (props) =>
  <StyledSmallTag {...props}>{props.text}</StyledSmallTag>

export default SmallTag