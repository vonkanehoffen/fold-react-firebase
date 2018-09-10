import React from 'react'
import styled from 'styled-components'

const SmallButton = (props) => {
  return (
    <Outer {...props}>
      <i className="material-icons">{props.icon}</i>
      {props.title}
    </Outer>
  )
}

const Outer = styled.div`
  display: inline-flex;
  border-radius: 5px;
  background: ${props => props.background};
  color: ${props => props.foreground};
  margin: .5rem;
  padding: .25rem .5rem .25rem .25rem;
  font: bold 13px Lato, sans-serif;
  cursor: pointer;
  .material-icons {
    font-size: 18px;
    margin-right: .25rem;
  }
`

export default SmallButton