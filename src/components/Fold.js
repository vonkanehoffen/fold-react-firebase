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
import colors from '../colors'

class Fold extends React.Component {

  state = {
    expanded: false,
  }

  toggleExpanded = () => this.setState(s => ({expanded: !s.expanded}))

  render() {

    const { fold: { title, uri, tags, description, createdAt }, edit, remove, setFilter } = this.props
    const { expanded } = this.state
    const color = colorFromString(tags[0])
    const btnColor = tinycolor(color).spin(180).toString()

    const dateDisplay = distanceInWordsToNow(createdAt.toDate(), { addSuffix: true });
    const urlParsed = new URL(uri)
    const { hostname, pathname } = urlParsed

    return (
      <Outer>
        <Card color={color}>
          <Title {...{expanded}}><a href={uri} target="new">{title}</a></Title>
          <Path color={color}><MetaIcon color={color}>link</MetaIcon>{hostname}{pathname && <span>{pathname}</span>}</Path>
          <Date color={color}><MetaIcon color={color}>access_time</MetaIcon>{dateDisplay}</Date>
          <Description {...{expanded}}>
            {description}
          </Description>
          <StatusToggle onClick={this.toggleExpanded}>
            <Icon>{expanded ? 'expand_less' : 'expand_more'}</Icon>
          </StatusToggle>
          <Tags {...{expanded}}>
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
  margin: .5rem;
  position: relative;
  border-top: .5rem solid ${props => props.color};
  background: black;
`

const Title = styled.h4`
  display: block;
  margin: .5rem .5rem .5rem;
  font-size: 1rem;
  line-height: 1.4rem;
  ${p => p.expanded && 'min-'}height: ${1.4*2}rem;
  //line-height: 1.8rem;
  overflow: hidden;
  font-weight: 700;
  color: ${colors.primary};
  a {
    text-decoration: none;
    color: inherit;
  }
`

const MetaIcon = styled(Icon)`
  color: white;
  font-size: 1rem;
  margin-right: .5rem;
  vertical-align: middle;
`
const Path = styled.div`
  font-size: .8rem;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: .5rem .5rem .1rem;
  color: white;
  span {
    opacity: .6;
  }
`

const Date = styled.div`
  color: rgba(255,255,255,.6);
  display: flex;
  align-items: center;
  font-size: .8rem;
  padding: 0 .5rem .5rem;
  //border-bottom: 2px solid #eee;
`

// TODO: Ellipsis doen't work here... Not an elegant CSS solution really.
// Maybe http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
const Description = styled.div`
  //font-size: 1rem;
  position: relative;
  margin: 1rem .5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.4rem;
  ${p => p.expanded && 'min-'}height: ${1.4*3}rem;
  color: white;
  //:after {
  //  position: absolute;
  //  content: ' ';
  //  background: linear-gradient(rgba(255,255,255,0) 0%, #fff 98%);
  //  bottom: -1px;
  //  left: 0;
  //  right: 0;
  //  height: 2rem;
  //}
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: .5rem .5rem 0;
  ${p => !p.expanded && `
    height: 2.1rem;
    white-space: nowrap;
    overflow: hidden;
  `}
`

const StatusToggle = styled.div`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  bottom: .5rem;
  right: .5rem;
  width: 2rem;
  padding: 0 .4rem;
  border-radius: 1rem;
  background:#597496;
  transition: background-color .3s ease-in-out;
  cursor: pointer;
  .material-icons {
    //font-size: 1rem;
    color: white;
  }
  &:hover {
    background:#6c8db0;
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