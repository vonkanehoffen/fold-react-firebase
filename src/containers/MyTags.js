import React, { Component } from 'react'
import { db } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { colorFromString } from '../helpers/color'
import colors from '../colors'
import PropTypes from 'prop-types'
import Tag from '../components/Tag'

class MyTags extends Component {

  static propTypes = {
    filterTags: PropTypes.array.isRequired,
    setFilterTags: PropTypes.func.isRequired,
  }

  toggleTag = (tag) => {
    const { setFilterTags, filterTags } = this.props
    if(filterTags.includes(tag)) {
      setFilterTags(filterTags.filter(t => t !== tag))
    } else {
      setFilterTags([tag, ...filterTags])
    }
  }

  render() {
    const { tags, filterTags } = this.props;

    if(tags.length < 1) return false

    return (
      <Outer>
        {tags
          .map(tag =>
          <Tag
            color={colorFromString(tag)}
            key={tag}
            onClick={() => this.toggleTag(tag)}
            removeIcon={filterTags.includes(tag)}
          >
            {tag}
          </Tag>
        )}
      </Outer>
    )
  }

}

const Outer = styled.div`
  display: flex;
  overflow: auto;
  padding: 1rem .5rem .5rem;
  ::-webkit-scrollbar { 
    background:${colors.pageBg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.controlBg};
    height: .5rem;
    border-radius: .5rem;
    border: solid 3px ${colors.pageBg};
  }
`

export default MyTags 
