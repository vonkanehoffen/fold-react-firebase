import React from 'react'
import styled from 'styled-components'

const TextInput = styled.input`
  background: none;
  font-size: 1.414rem;
  border: none;
  border-bottom: 2px solid rgba(0,0,0,0.3);
  outline: none;
  width: 100%;
  &:focus {    
    border-bottom-color: black;
  }
`

export default TextInput