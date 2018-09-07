import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { colorFromString } from '../helpers/color'
import SmallTag from './SmallTag'

const Fold = ({ fold: { title, tags, description }, edit, remove }) => {
  return (
    <Outer style={{background: colorFromString(tags[0])}}>
      <h3>{title}</h3>
      <Description>
        {description}
      </Description>
      {tags.map(tag => <SmallTag key={tag} text={tag}/>)}
      <IconButton onClick={edit}>
        <Icon>edit</Icon>
      </IconButton>
      <IconButton onClick={remove}>
        <Icon>delete</Icon>
      </IconButton>
    </Outer>
  )
}

const Outer = styled.div`
  display: block;
  width: 40%;
  margin: .5rem;
  padding: .5rem;
`

const Description = styled.div`
  padding: .5em 0;
`

export default Fold