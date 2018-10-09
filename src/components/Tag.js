import React from 'react'
import styled from 'styled-components'
import colors from '../colors'


const Tag = ({ addIcon, removeIcon, onClick, outline, children, color }) => {
  return (
    <Outer onClick={onClick} outline={outline} color={color}>
      {addIcon && <i className="material-icons">add_box</i>}
      {removeIcon && <i className="material-icons">close</i>}
      <Title>
        {children}
      </Title>
    </Outer>
  )
}

const Outer = styled.div`
  display: inline-block;
  background: black;
  border-radius: 5px;
  color: ${colors.primary};
  margin-right: .5rem;
  cursor: pointer;
  text-transform: capitalize;
  line-height: 2.7rem;
  height: 2.7rem;
  white-space: nowrap;
  padding: 0 1rem .1rem 1rem;
  .material-icons {
    vertical-align: middle;
    margin-left: -.5rem;
  }
  ${props => props.outline && ` // not used....
    background: ${colors.primary};
    color: black;
  `}
  ${props => props.color && `
    background: ${props.color};
    color: white;
  `}
`

const Title = styled.div`
  display: inline;
  vertical-align: middle;
`

export default Tag