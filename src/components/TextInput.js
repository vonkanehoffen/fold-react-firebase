import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

const TextInput = styled.input`
  background: none;
  font-size: 1.414rem;
  border: none;
  border-bottom: 2px dotted ${props => props.light ? colors.primary : 'black'};
  outline: none;
  width: 100%;
  color: ${props => props.light ? colors.primary : 'black'};
  ::placeholder {
    color: ${props => props.light ? colors.primary : 'rgba(0,0,0,0.5)'};
  }
  :focus {    
    border-bottom-style: solid;
  }
  :disabled {
    opacity: 0.5
  }
  :-webkit-autofill {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
  }
`

// https://css-tricks.com/snippets/css/change-autocomplete-styles-webkit-browsers/

export default TextInput