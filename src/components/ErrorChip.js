import React from 'react'
import styled from 'styled-components'
import colors from '../colors'

const Chip = styled.div`
  display: flex;
  align-items: center;
  margin: .5rem;
  padding: .5rem;
  color: white;
  background: ${colors.validationRed};
  border-radius: 5px;
  .material-icons {
    margin-right: .5rem;
  }
`

const ErrorChip = ({children}) =>
  <Chip>
    <i className="material-icons">error_outline</i>
    {children}
  </Chip>

export default ErrorChip
