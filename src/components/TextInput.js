import React from 'react'
import styled from 'styled-components'

const TextInput = styled.input`
  background: none;
  font-size: 1.414rem;
  border: none;
  border-bottom: 2px dotted black;
  outline: none;
  width: 100%;
  ::placeholder {
    color: rgba(0,0,0,0.5);
  }
  :focus {    
    border-bottom-style: solid;
  }
  :disabled {
    border-bottom-color: rgba(0,0,0,0.3);
  }
`

export default TextInput