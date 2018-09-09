import React from 'react'
import { createGlobalStyle } from 'styled-components'

const Background = createGlobalStyle`
  html, body, #root {
    height: 100%;
    background: ${props => props.color};
  }
`

export default Background