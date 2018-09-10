import React from 'react'
import styled from 'styled-components'
import colors from '../colors'


const Tag = ({ add, remove, outline, children }) => {
  return (
    <Outer onClick={add || remove} outline={outline}>
      <Action>
        {add && <i className="material-icons">add_box</i>}
        {remove && <i className="material-icons">close</i>}
      </Action>
      <Title>
        {children}
      </Title>
    </Outer>
  )
}

const Outer = styled.div`
  display: inline-flex;
  align-items: center;
  background: black;
  border-radius: 5px;
  border: 2px solid black;
  color: ${colors.primary};
  margin: .5rem .5rem .5rem 0;
  cursor: pointer;
  text-transform: capitalize;
  ${props => props.outline && `
    background: ${colors.primary};
    color: black;
  `}
`

const Action = styled.div`
  padding: .25rem;
`

const Title = styled.div`
  padding: .5rem;
`

export default Tag