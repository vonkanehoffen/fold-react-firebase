import React from 'react'
import styled from 'styled-components'
import IconButton from '../components/IconButton'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import Icon from '../components/Icon'
import { colorFromString } from '../helpers/color'
import SmallTag from './SmallTag'
import SmallButton from './SmallButton'
import media from '../helpers/mediaQueries'
import URL from 'url-parse'
import tinycolor from 'tinycolor2'

class Fold extends React.Component {

  state = {
    expanded: false,
  }

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}))

  render() {

    const { fold: { title, uri, tags, description, createdAt }, edit, remove, setFilter } = this.props
    const color = colorFromString(tags[0])
    const btnColor = tinycolor(color).spin(180).toString()

    const dateDisplay = distanceInWordsToNow(createdAt.toDate(), { addSuffix: true });
    const urlParsed = new URL(uri)
    const { hostname, pathname } = urlParsed

    return (
      <Outer>
        <Card style={{ background: color }}>
          <Title>
            <h4><a href={uri} target="new">{title}</a></h4>
          </Title>
          <Path><Icon>link</Icon>{hostname}{pathname && <span>{pathname}</span>}</Path>
          <Date><Icon>access_time</Icon>{dateDisplay}</Date>
          <Description>
            {description}
          </Description>
          <StatusToggle style={{ background: btnColor }} onClick={this.toggleExpanded}>
            <Icon>more_vert</Icon>
            <Icon>mode_comment</Icon>
          </StatusToggle>
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
  position: relative;
`

const Title = styled.div`
  display: flex;
  padding: .5rem .5rem 0;
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
`

const Path = styled.div`
  font-size: .707rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 .5rem .5rem;
  span {
    opacity: .6;
  }
  .material-icons {
    font-size: 1rem;
    margin-right: .5rem;
    vertical-align: middle;
  }
`

const Date = styled.div`
  display: flex;
  align-items: center;
  font-size: .707rem;
  padding: 0 .5rem;
  .material-icons {
    font-size: 1rem;
    margin-right: .5rem;
  }
`

// TODO: Ellipsis doen't work here... Not an elegant CSS solution really.
// Maybe http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
const Description = styled.div`
  padding: 1rem .5rem;
  text-overflow: ellipsis;
  height: 4rem;
  overflow: hidden;
`

const Tags = styled.div`
  padding: .5rem;
  height: 1.3rem;
  white-space: nowrap;
  overflow: hidden;
`

const StatusToggle = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  bottom: .5rem;
  right: .5rem;
  width: 3rem;
  padding: .4rem;
  border-radius: 1rem;
  .material-icons {
    font-size: 1rem;
    color: white;
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  background-image: 
  linear-gradient(
    to right,
    rgba(0,0,0,0.4), 
    rgba(0,0,0,0.3)
  );
`

export default Fold