import React from 'react'
import styled from 'styled-components'


const Tag = ({ add, remove, children }) => {
  return (
    <Outer onClick={add || remove}>
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
  background: #000000;
  border-radius: .5rem;
  color: #fff;
  display: inline-flex;
  align-items: center;
  margin: 0 .5rem .5rem 0;
  cursor: pointer;
`

const Action = styled.div`
  padding: .5rem;
`

const Title = styled.div`
  padding: .5rem;
`

export default Tag