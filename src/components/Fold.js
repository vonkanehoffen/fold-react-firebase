import React from 'react'
import styled from 'styled-components'
import IconButton from '../components/IconButton'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Icon from '../components/Icon'
import { colorFromString } from '../helpers/color'
import SmallTag from './SmallTag'
import SmallButton from './SmallButton'
import media from '../helpers/mediaQueries'

class Fold extends React.Component {

  state = {
    expanded: false,
  }

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}))

  render() {

    const { fold: { title, uri, tags, description, createdAt }, edit, remove, setFilter } = this.props
    const color = colorFromString(tags[0])

    const dateDisplay = distanceInWordsToNow(createdAt.toDate(), { addSuffix: true });

    return (
      <Outer>
        <Card style={{ background: color }}>
          <Content>
            <Title>
              <h4><a href={uri} target="new">{title}<Icon>link</Icon></a></h4>
              <IconButton onClick={this.toggleExpanded} icon="more_vert"/>
            </Title>
            <Date>{dateDisplay}</Date>
            <Description>
              {description}
            </Description>
          </Content>
          <Tags>
            {tags.map(tag => <SmallTag key={tag} text={tag} onClick={() => setFilter([tag])}/>)}
          </Tags>
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
  width: 100%;
  ${media.sm`width: 50%;`}
  ${media.md`width: 33%;`}
  ${media.lg`width: 326px;`}
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
  padding: 1rem 0;
  text-overflow: ellipsis;
  height: 4rem;
  overflow: hidden;
`

const Date = styled.div`
  font-size: .707rem;
`

const Tags = styled.div`
  background: rgba(255,255,255,0.2);
  padding: .5rem;
  height: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
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