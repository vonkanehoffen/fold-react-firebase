import React from 'react'
import styled from 'styled-components'
import colors from '../colors'
import Icon from './Icon'

const InfoChip = (props) =>
  <Chip {...props}>
    {props.children}
    {props.icon && <Icon>{props.icon}</Icon>}
  </Chip>

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${colors.secondary};
  color: white;
  font-size: .9rem;
  font-weight: bold;
  padding: .5rem 1rem;
  border-radius: 1.5rem;
  .material-icons {
    margin-left: 1rem;
  }
`

export default InfoChip