import React from 'react'
import styled from 'styled-components'
import IconButton from '../components/IconButton'
import Icon from '../components/Icon'
import { colorFromString } from '../helpers/color'
import SmallTag from './SmallTag'
import SmallButton from './SmallButton'

class Fold extends React.Component {

  state = {
    expanded: false,
  }

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}))

  render() {

    const { fold: { title, uri, tags, description }, edit, remove, setFilter } = this.props
    const color = colorFromString(tags[0])

    return (
      <Outer>
        <Card style={{ background: color }}>
          <Content>
            <Title>
              <h4><a href={uri} target="new">{title}<Icon>link</Icon></a></h4>
              <IconButton onClick={this.toggleExpanded} icon="more_vert"/>
            </Title>
            <Description>
              {description}
            </Description>
            {tags.map(tag => <SmallTag key={tag} text={tag} onClick={() => setFilter([tag])}/>)}
          </Content>
          {this.state.expanded &&
          <Actions>
            <SmallButton onClick={edit} title="Edit" foreground={color} background="black" icon="edit"/>
            <SmallButton onClick={remove} title="Remove" foreground={color} background="black" icon="delete"/>
          </Actions>
          }
        </Card>
      </Outer>
    )
  }
}

const Outer = styled.div`
  width: 33%;
`
const Card = styled.div`
  margin: .5rem 0 0 .5rem;
`

const Title = styled.div`
  display: flex;
  h4 {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .material-icons {
    margin-left: .5rem;
    vertical-align: middle;
  }
`

const Content = styled.div`
  padding: .5rem;
`

const Description = styled.div`
  padding: .5em 0;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  background-image: 
  linear-gradient(
    to right,
    rgba(0,0,0,0.4), 
    rgba(0,0,0,0.3)
  );
`

export default Fold