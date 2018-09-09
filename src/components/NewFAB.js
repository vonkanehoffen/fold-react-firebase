import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import colors from '../colors'

const NewFAB = (props) => {
  return (
    <FAB to="/new">
      <i className="material-icons" style={{fontSize: '2em'}}>add</i>
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
`

// const StyledIcon = styled(Icon)`
//   font-size: 4em;
// `

export default NewFAB